import { unwrapData } from './utils/dataWrapper';
import { getCapabilities } from './utils/getCapabilities';
import { getBlockPointer, getPointer, IPointer } from './utils/getPointer';
import { functionCalls, parser } from './utils/pactGrammar';
import { FAILED } from './utils/parser-utilities';
import { getModuleFullName, IModuleLike } from './utils/utils';

interface ISchema {
  name: string;
  doc?: string;
  properties?: Array<{
    name: string;
    type: string | { kind: string; value: string };
  }>;
}

interface IMethod {
  name: string;
  returnType?: string | { kind: string; value: string };
  doc?: string;
  parameters?: Array<{
    name: string;
    type: string | { kind: string; value: string };
  }>;
}

export interface IFunction extends IMethod {
  bodyPointer?: number;
  requiredCapabilities?: string[];
  withCapabilities?: string[];
  functionCalls?: {
    internal: string[];
    external: Array<{ namespace?: string; module: string; func: string }>;
  };
  externalFnCalls?: Array<{
    namespace?: string;
    module: string;
    func: string;
  }>;
  allExtractedCaps?: Array<{
    name: string;
    fullModuleName: string;
    reason: 'with-capability' | 'compose-capability';
    origin: string;
    capability: ICapability;
  }>;
}

export interface ICapability extends IMethod {
  composeCapabilities?: string[];
}

export interface IModule {
  kind: string;
  namespace: string;
  name: string;
  doc: string;
  governance: string;
  usedModules?: Array<{
    name: string;
    namespace?: string;
    hash?: string;
    imports?: string[];
  }>;
  usedInterface?: Array<{ name: string; namespace?: string }>;
  functions?: IFunction[];
  capabilities?: ICapability[];
  schemas?: ISchema[];
}

interface IUsedModules {
  name: string;
  hash?: string;
  location?: number;
  namespace?: string;
  imports?: string[];
}

interface IPactTree {
  namespace?: string[];
  usedModules?: Array<IUsedModules>;
  module?: IModule[];
}

// return the namespace of the module in case the file has multiple modules and namespaces
const getNamespace = (
  moduleLoc: number,
  allNamespaces?: Array<{ location: number; name: string }>,
): string => {
  if (!allNamespaces) return '';
  const { name } = allNamespaces.reduce(
    (namespace, { location, name }) => {
      if (location < moduleLoc && location > namespace.location) {
        return { location, name };
      }
      return namespace;
    },
    { location: 0, name: '' },
  );
  return name;
};

// return the list of modules used in the module including the modules used in root level
const getUsedModules = (
  moduleLoc: number,
  allUsedModules?: IUsedModules[],
): Array<Omit<IUsedModules, 'location'>> => {
  if (!allUsedModules) return [];
  const list = allUsedModules.reduce((list, { location, ...mod }) => {
    if (location !== undefined && location < moduleLoc) {
      return [...list, mod];
    }
    return list;
  }, [] as Exclude<IPactTree['usedModules'], undefined>);

  return list;
};

// returns the list of modules used in the functions of the module without using "use" keyword in the module
function getUsedModulesInFunctions(
  functions?: IFunction[],
): Required<IModuleLike>[] {
  if (!functions) return [];

  return functions.flatMap((fun) => {
    const externalFnCalls = fun.externalFnCalls;
    if (!externalFnCalls) return [];
    return externalFnCalls.map(({ namespace, module: name }) => ({
      namespace: namespace ?? '',
      name,
    }));
  });
}
type IsNotDuplicated = <T>(
  isEqual: (a: T, b: T) => boolean,
) => (a: T, idx: number, list: T[]) => boolean;

const isNotDuplicated: IsNotDuplicated =
  <T>(isEqual: (a: T, b: T) => boolean) =>
  (a: T, idx: number, list: T[]): boolean =>
    list.findIndex((b) => isEqual(a, b)) === idx;

// eslint-disable-next-line @rushstack/typedef-var
const isNotDuplicatedModule = isNotDuplicated<IModuleLike>(
  (a, b) => a.name === b.name && a.namespace === b.namespace,
);

function fileParser(
  contract: string,
  namespace: string = '',
): [IModule[], IPointer] {
  const pointer = getPointer(contract);
  const result = parser(pointer);
  if (result === FAILED) {
    console.error('there is no rule matched with this token', pointer.next());
    throw new Error('parsing error');
  }
  const tree = unwrapData(result);
  const { modules, namespaces, usedModules } = tree;

  const extModules =
    modules !== undefined
      ? modules.map(({ location, module: mod }) => ({
          ...mod,
          namespace: getNamespace(location, namespaces) || namespace,
          usedModules: [
            ...(mod.usedModules || []),
            ...getUsedModules(location, usedModules),
            ...getUsedModulesInFunctions(mod.functions),
          ].filter(isNotDuplicatedModule),
        }))
      : [];

  return [extModules, pointer];
}

interface IModuleLoader {
  getModule(moduleFullName: string): Promise<IModuleWithPointer | undefined>;
  parserFile(content: string): void;
  getStorage(): Map<string, IModuleWithPointer>;
}

const moduleLoader = (
  fetchModule: (moduleFullName: string) => Promise<string>,
): IModuleLoader => {
  const storage = new Map<string, IModuleWithPointer>();

  const parseModule = (content: string, namespace?: string): void => {
    const [modules, pointer] = fileParser(content, namespace);
    modules.forEach((mod) => {
      storage.set(getModuleFullName(mod), { ...mod, pointer });
    });
  };

  const cache = new Map<string, Promise<string>>();
  const fetchContract = (name: string): Promise<string> => {
    if (cache.has(name)) return cache.get(name)!;
    const pr = fetchModule(name);
    cache.set(name, pr);
    return pr;
  };

  return {
    async getModule(moduleFullName: string) {
      const slogs = moduleFullName.split('.');
      const namespace = slogs.length === 2 ? slogs[0] : '';

      const mod = storage.get(moduleFullName);
      if (mod !== undefined) return mod;

      const content = await fetchContract(moduleFullName);
      if (content) {
        parseModule(content, namespace);
      }

      return storage.get(moduleFullName)!;
    },
    parserFile(content: string) {
      parseModule(content);
    },
    getStorage() {
      return storage;
    },
  };
};

interface IModuleWithPointer extends IModule {
  pointer?: IPointer;
}

// parse a module and its dependencies
async function loadModuleDependencies(
  fullName: string,
  getModule: (name: string) => Promise<IModuleWithPointer | undefined>,
): Promise<Array<IModuleWithPointer>> {
  const module = await getModule(fullName);
  // skip this module if its not available
  if (!module) return [];

  const interfaceOrModule = [
    ...(module.usedModules || []),
    ...(module.usedInterface || []),
  ];

  const mods = await Promise.all(
    interfaceOrModule.map(async (usedModule) =>
      loadModuleDependencies(getModuleFullName(usedModule), getModule),
    ),
  );
  const dependencies = mods.flat();

  return [module, ...dependencies].filter(isNotDuplicatedModule);
}

// check function body again for checking function calls, internal and external
const getFunctionCalls = (
  bodyPointer: number | undefined,
  pointer: IPointer,
  fnList: string[],
  availableExternals: Array<{
    namespace?: string;
    module: string;
    func: string;
  }>,
): {
  internal?: string[];
  external?: Array<{ namespace?: string; module: string; func: string }>;
} => {
  if (bodyPointer !== undefined) {
    pointer.reset(bodyPointer);
    const blockPointer = getBlockPointer(pointer);
    const data = functionCalls(fnList, availableExternals)(blockPointer);
    if (data !== FAILED) {
      return unwrapData(data);
    }
  }

  return {};
};

// adding function calls to each function in the module
function addFunctionCalls(
  mod: IModule,
  allModule: Map<string, IModule>,
  pointer: IPointer,
): void {
  if (mod.kind !== 'module') return;

  const usedModules = mod.usedModules;
  let externalFunctions: Array<{
    module: string;
    namespace: string | undefined;
    func: string;
  }> = [];

  if (usedModules && usedModules.length) {
    externalFunctions = usedModules.flatMap(({ name, namespace, imports }) => {
      if (imports && imports.length) {
        return imports.map((func) => ({
          module: name,
          namespace,
          func,
        }));
      }
      const usedModule = allModule.get(getModuleFullName({ name, namespace }));
      if (!usedModule || !usedModule.functions) return [];
      return usedModule.functions.map(({ name: func }) => ({
        module: name,
        namespace,
        func,
      }));
    });
  }
  if (!mod.functions) {
    mod.functions = [];
  }
  const internalFunctions = mod.functions.map(({ name }) => name);
  mod.functions = mod.functions.map((fun) => {
    if (fun.bodyPointer === undefined) {
      return fun;
    }

    const { internal = [], external = [] } = getFunctionCalls(
      fun.bodyPointer,
      pointer,
      internalFunctions,
      externalFunctions,
    );

    fun.functionCalls = {
      internal,
      external: [...external, ...(fun.externalFnCalls || [])],
    };
    delete fun.bodyPointer;

    return fun;
  });
}

// extract all capabilities for each function in the module
function addFunctionCapabilities(
  mod: IModule,
  allModule: Map<string, IModule>,
): void {
  if (mod.kind !== 'module' || !mod.functions) return;
  mod.functions.forEach((fun) => {
    fun.allExtractedCaps = getCapabilities(
      allModule,
      getModuleFullName(mod),
      fun.name,
    );
  });
}

/**
 * @alpha
 */
export async function pactParser({
  contractNames,
  files,
  getContract,
}: {
  contractNames?: string[];
  files?: string[];
  getContract: (fullName: string) => Promise<string>;
}): Promise<{ [k: string]: IModule }> {
  const loader = moduleLoader(getContract);

  // parse files if presented
  if (files !== undefined) {
    files.forEach((content) => {
      loader.parserFile(content);
    });
  }

  // fetch and parse contracts by name if presented
  if (contractNames !== undefined) {
    await Promise.all(
      contractNames.map((contract) => {
        return loader.getModule(contract);
      }),
    );
  }

  const parsedModules = loader.getStorage();

  if (parsedModules.size === 0) {
    throw new Error('no module loaded');
  }

  // load all dependencies
  await Promise.all(
    [...parsedModules.keys()].map((name) => {
      return loadModuleDependencies(name, loader.getModule);
    }),
  );

  const allModules = loader.getStorage();

  allModules.forEach((mod) => {
    addFunctionCalls(mod, allModules, mod.pointer!);
    delete mod.pointer;
  });

  allModules.forEach((mod) => {
    addFunctionCapabilities(mod, allModules);
  });

  return Object.fromEntries(allModules);
}
