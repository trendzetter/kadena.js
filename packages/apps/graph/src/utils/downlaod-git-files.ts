import https from 'https';
import { createDirAndWriteFile } from './path';

export async function downloadGitFiles(
  {
    owner,
    name,
    path,
    branch,
  }: {
    owner: string;
    name: string;
    path: string;
    branch: string;
  },
  destinationPath: string = process.cwd(),
  fileExtension: string = 'yaml',
): Promise<void> {
  const folderUrl = buildGitApiUrl(owner, name, path, branch);

  const gitData = await getGitData(folderUrl);

  if (gitData instanceof Array) {
    // if gitData is an array, it means that it is a folder and we can download the files
    for (const file of gitData) {
      if (
        !file.name.endsWith(fileExtension) ||
        file.type !== 'file' ||
        !file.download_url
      ) {
        continue;
      }
      await donwloadGitFile(file.download_url, file.name, destinationPath);
    }
  } else if (gitData instanceof Object) {
    // if gitData is an object, it means that it's a file and we can download it
    await donwloadGitFile(gitData.download_url, gitData.name, destinationPath);
  } else {
    throw new Error('Provided path is not a valid ');
  }
}

export async function getGitData(
  url: string,
  rawResponse: boolean = false,
): Promise<any> {
  const options = {
    headers: {
      'User-Agent': 'node.js',
    },
  };

  const data = await new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(rawResponse ? data : JSON.parse(data)));
      res.on('error', reject);
    });
  });

  return data;
}

async function donwloadGitFile(
  url: string,
  filename: string,
  path: string,
): Promise<void> {
  const content = await getGitData(url, true);
  createDirAndWriteFile(path, filename, content);
}

function buildGitApiUrl(
  owner: string,
  name: string,
  path: string,
  branch: string,
): string {
  return `https://api.github.com/repos/${owner}/${name}/contents/${path}?ref=${branch}`;
}

export function getGitAbsolutePath(base: string, relative: string): string {
  const baseSplit = base.split('/');
  const relativeSplit = relative.split('/');

  // Remove the last component of the base path(should be the file name)
  baseSplit.pop();

  for (const component of relativeSplit) {
    if (component === '..') {
      baseSplit.pop();
    } else if (component !== '.') {
      // If the component is not '.', add it to the end of the base path
      baseSplit.push(component);
    }
  }

  // Join the components of the base path back into a single string
  const absolutePath = baseSplit.join('/');
  return absolutePath;
}
