import { generateDts, pactParser } from '@kadena/pactjs-generator';
import type { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname, join } from 'path';
import rimraf from 'rimraf';
import { retrieveContractFromChain } from '../utils/retrieveContractFromChain';
import type { IContractGenerateOptions } from './';

export const TARGET_PACKAGE: '.kadena/pactjs-generated' =
  '.kadena/pactjs-generated' as const;

const shallowFindFile = (path: string, file: string): string | undefined => {
  while (!existsSync(join(path, file))) {
    path = join(path, '..');
    if (path === '/') {
      return;
    }
  }
  return join(path, file);
};

function verifyTsconfigTypings(
  tsconfigPath: string | undefined,
  program: Command,
): void {
  if (tsconfigPath === undefined || tsconfigPath.length === 0) {
    console.error('Could not find tsconfig.json, skipping types verification');
  } else {
    console.log(`\nVerifying tsconfig.json at \`${tsconfigPath}\``);
    const tsconfig: string = readFileSync(tsconfigPath, 'utf8');

    if (!tsconfig.includes('.kadena/pactjs-generated')) {
      console.log(
        `\n!!! WARNING: You have not added .kadena/pactjs-generated to tsconfig.json. Add it now.
{ "compilerOptions": { "types": [".kadena/pactjs-generated"] } }`,
      );
    }
  }
}

async function generator(
  args: IContractGenerateOptions,
): Promise<Map<string, string>> {
  if (args.contract !== undefined) {
    console.log(
      `Generating pact contracts from chainweb for ${args.contract.join(',')}`,
    );
  }

  if (args.file !== undefined) {
    console.log(
      `Generating pact contracts from files for ${args.file.join(',')}`,
    );
  }

  const getContract = async (name: string): Promise<string> => {
    console.log('fetching', name);
    if (
      args.api !== undefined &&
      args.chain !== undefined &&
      args.network !== undefined
    ) {
      const content = await retrieveContractFromChain(
        name,
        args.api,
        args.chain,
        args.network,
      );
      return content ?? '';
    }
    console.log(`
      the generator tries to fetch ${name} from the blockchain but the api data is not presented.
      this happen because ${name} mentioned via --contracts directly or it is a dependency of a module.
      the scrip skips this module
      `);
    return '';
  };

  const files: string[] =
    args.file === undefined
      ? []
      : args.file.map((file) =>
          readFileSync(join(process.cwd(), file), 'utf-8'),
        );

  const modules = await pactParser({
    contractNames: args.contract,
    files,
    getContract,
    namespace: args.namespace,
  });

  if (process.env.DEBUG === 'dev') {
    writeFileSync(
      join(process.cwd(), 'modules.json'),
      JSON.stringify(modules, undefined, 2),
    );
  }

  const moduleDtss = new Map();

  Object.keys(modules).map((name) => {
    if (['', undefined, null].includes(modules[name].namespace)) {
      console.log(`
      WARNING: No namespace found for module "${name}". You can pass --namespace as a fallback.
      `);
    }
    moduleDtss.set(name, generateDts(name, modules));
  });

  return moduleDtss;
}

interface IGenerate {
  (program: Command, version: string): (args: IContractGenerateOptions) => void;
}
export const generate: IGenerate = (program, version) => async (args) => {
  // walk up in file tree from process.cwd() to get the package.json
  const targetPackageJson: string | undefined = shallowFindFile(
    process.cwd(),
    'package.json',
  );

  if (
    targetPackageJson === undefined ||
    targetPackageJson.length === 0 ||
    targetPackageJson === '/'
  ) {
    program.error('Could not find package.json');
    return;
  }

  const moduleDtss = await generator(args);

  console.log(`Using package.json at ${targetPackageJson}`);

  const targetDirectory: string = join(
    dirname(targetPackageJson),
    'node_modules',
    TARGET_PACKAGE,
  );

  if (args.clean === true) {
    console.log(`Cleaning ${targetDirectory}`);
    rimraf.sync(targetDirectory);
  }

  if (!existsSync(targetDirectory)) {
    console.log(`Creating directory ${targetDirectory}`);
    mkdirp.sync(targetDirectory);
  }

  const indexPath: string = join(targetDirectory, 'index.d.ts');

  moduleDtss.forEach((dts, moduleName) => {
    const targetFilePath: string = join(
      dirname(targetPackageJson),
      'node_modules',
      TARGET_PACKAGE,
      `${moduleName}.d.ts`,
    );
    // always overwrite existing file
    console.log(`Writing to new file ${targetFilePath}`);
    writeFileSync(targetFilePath, dts);
  });

  const doNotEdit =
    '/** THIS FILE IS GENERATED BY pactjs-cli. DO NOT EDIT IT */';

  // if indexPath exists, append export to existing file otherwise create new file
  let indexDts: string = existsSync(indexPath)
    ? readFileSync(indexPath, 'utf8').replace(doNotEdit, '')
    : '';

  // add doNotEdit comment to index.d.ts
  indexDts = `${doNotEdit}\n${indexDts}`;

  moduleDtss.forEach((_, moduleName) => {
    const importStatement: string = `import './${moduleName}';`;
    // We have used "export * ..." previously, which wasn't necessary and caused some bugs.
    const exportStatement: string = `export * from './${moduleName}';`;

    // Remove the export statement if it's there;
    indexDts = indexDts.replace(exportStatement, '');

    // Append the import to the file if it's not already there.
    if (!indexDts.includes(importStatement)) {
      indexDts = `${indexDts}\n${importStatement}`;
    }
  });

  // remove redundant line breaks and write index.d.ts
  writeFileSync(indexPath, `${indexDts.replace(/\n+/g, '\n').trim()}\n`);

  // write npm init to package.json
  const defaultPackageJsonPath: string = join(targetDirectory, 'package.json');

  // if exists, do nothing
  if (existsSync(defaultPackageJsonPath)) {
    console.log(`Package.json already exists at ${defaultPackageJsonPath}`);
  } else {
    // write default contents to package.json
    console.log(`Writing default package.json to ${defaultPackageJsonPath}`);
    writeFileSync(
      defaultPackageJsonPath,
      JSON.stringify(
        {
          name: TARGET_PACKAGE,
          version: version,
          description: 'TypeScript definitions for @kadena/client',
          types: 'index.d.ts',
          keywords: ['pact', 'contract', 'pactjs'],
          author: `@kadena/pactjs-cli@${version}`,
        },
        null,
        2,
      ),
    );
  }

  const tsconfigPath: string | undefined = shallowFindFile(
    join(process.cwd()),
    'tsconfig.json',
  );

  verifyTsconfigTypings(tsconfigPath, program);
};
