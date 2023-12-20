import { password } from '@inquirer/prompts';
import type { IPrompt } from '../utils/createOption.js';

export async function promptForPassword(
  message: string,
  isOptional: boolean = false,
): Promise<string> {
  return await password({
    message: message,
    validate: function (value) {
      if (isOptional && value.length === 0) {
        return true;
      }
      if (value.length < 8) {
        return 'Password should be at least 8 characters long.';
      }
      return true;
    },
  });
}

export const securityPasswordPrompt: IPrompt = async (
  prev = {},
  args,
  isOptional,
) => {
  return promptForPassword('Enter a password', isOptional);
};

export const securityPasswordVerifyPrompt: IPrompt = async (
  prev = {},
  args,
  isOptional,
) => {
  return promptForPassword(
    'Enter a password to verify with password',
    isOptional,
  );
};

export async function securityCurrentPasswordPrompt(): Promise<string> {
  return promptForPassword('Enter your current password');
}

export async function securityNewPasswordPrompt(): Promise<string> {
  return promptForPassword('Enter your new password');
}
