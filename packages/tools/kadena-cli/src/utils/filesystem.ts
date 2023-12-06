import type { PathLike, WriteFileOptions } from 'fs';
import {
  accessSync,
  existsSync,
  promises as fsPromises,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import path from 'path';

import chalk from 'chalk';
import { readdir, rm } from 'fs/promises';

/**
 * Checks if a given path exists.
 *
 * @param {PathLike} path - The path to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, otherwise false.
 */
export function PathExists(path: PathLike): boolean {
  try {
    accessSync(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a file exists at a given path.
 *
 * @param filePath - The path to the file.
 */
export function ensureFileExists(filePath: string): boolean {
  return existsSync(filePath);
}

/**
 * Writes data to a file, creating any necessary directories along the path if they don't exist.
 *
 * @param {string} filePath - The path to the file.
 * @param {string | NodeJS.ArrayBufferView} data - The data to be written to the file. Can be a string or a buffer view.
 * @param {string | BaseEncodingOptions | undefined} options - Encoding options or a string specifying the encoding. Can be undefined.
 */
export function writeFile(
  filePath: string,
  data: string | NodeJS.ArrayBufferView,
  options: WriteFileOptions | undefined,
): void {
  const dirname = path.dirname(filePath);
  if (!PathExists(dirname)) {
    mkdirSync(dirname, { recursive: true });
  }
  writeFileSync(filePath, data, options);
}

export async function writeFileAsync(
  filePath: string,
  data: string | NodeJS.ArrayBufferView,
  options: WriteFileOptions | undefined,
): Promise<void> {
  const dirname = path.dirname(filePath);
  try {
    await fsPromises.access(dirname);
  } catch {
    await fsPromises.mkdir(dirname, { recursive: true });
  }
  await fsPromises.writeFile(filePath, data, options);
}

/**
 * Removes a file.
 *
 * @param {string} filePath - The path to the file.
 */
export function removeFile(filePath: string): void {
  rmSync(filePath);
}

/**
 * Ensures that a directory exists, and if it doesn't, creates it.
 *
 * @function
 * @param {string} directoryPath - The path of the directory to ensure it exists.
 * @throws Will throw an error if unable to create the directory.
 * @example
 * // Ensures that the 'myDirectory' exists, if not it will be created.
 * ensureDirectoryExists('path/to/myDirectory');
 */
export function ensureDirectoryExists(directoryPath: string): void {
  if (!PathExists(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}

/**
 * Asynchronously deletes all files in a given directory.
 *
 * @param {string} dirPath - The path of the directory whose files are to be deleted.
 */
export async function deleteAllFilesInDirAsync(dirPath: string): Promise<void> {
  try {
    const files = await readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      await rm(filePath);
    }
    console.log(chalk.green(`\nAll files in ${dirPath} have been deleted.\n`));
  } catch (error) {
    console.error(
      chalk.red(`Error during file deletion in ${dirPath}: ${error.message}`),
    );
    throw error;
  }
}
