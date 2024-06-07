import 'dotenv/config';

export const errors: string[] = [];
export const success: string[] = [];
export const CHANGELOGFILENAME = './src/data/changelogs.json';
export const MAX_TRIES = 1;
export const MAXCALLS = 300;
export const CURRENTPACKAGE = 'kadena.js';

export enum VersionPosition {
  PACKAGE = 0,
  VERSION = 1,
  PATCH = 2,
  MINOR = 3,
  MISC = 4,
}

// TODO: we should add this to the config.yaml
export const REPOS: IRepo[] = [
  {
    name: 'Pact 4',
    slug: 'pact',
    repo: 'https://github.com/kadena-io/pact.git',
    directory: '/',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-io',
    repoName: 'pact',
  },
  {
    name: 'Kadena Cli',
    slug: 'kadena-cli',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/tools/kadena-cli',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Create Kadena App',
    slug: 'create-kadena-app',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/tools/create-kadena-app',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Client',
    slug: 'client',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/client',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Client Utils',
    slug: 'client-utils',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/client-utils',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'HD Wallet',
    slug: 'hd-wallet',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/hd-wallet',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'GraphQL',
    slug: 'graph',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/apps/graph',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'ChainwebJS',
    slug: 'chainwebjs',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/chainwebjs',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Chainweb Stream Client',
    slug: 'chainweb-stream-client',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/chainweb-stream-client',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Chainweb Node CLient',
    slug: 'chainweb-node-client',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/chainweb-node-client',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'PactJS Cli',
    slug: 'pactjs-cli',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/tools/pactjs-cli',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'PactJS Generator',
    slug: 'pactjs-generator',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/pactjs-generator',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Kode UI Components',
    slug: 'kode-ui-components',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/react-ui',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Kode Icons',
    slug: 'kode-icons',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/react-icons',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Cryptography Utils',
    slug: 'cryptography-utils',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/cryptography-utils',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'Tools',
    slug: 'tools',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/apps/tools',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'PactJS',
    slug: 'pactjs',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/pactjs',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
  {
    name: 'KadenaJS',
    slug: 'kadenajs',
    repo: 'https://github.com/kadena-community/kadena.js.git',
    directory: '/packages/libs/kadena.js',
    fileName: 'CHANGELOG.md',
    owner: 'kadena-community',
    repoName: 'kadena.js',
  },
];
