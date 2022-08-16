
export * from './getOpenIdConfiguration';
export * from './profile';
export * from './buildProfile';

import { OAuthProfile } from './profile';
import { homedir } from 'os';
import { join } from 'path';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import inquirer from 'inquirer';

const profileFileName = join(homedir(), '.oauthrc');

interface ProfileFile {
  default?: string;
  profiles: Record<string, OAuthProfile>;
}

const loadProfileFile = async (mustExist = true): Promise<ProfileFile> => {
  if (!fs.existsSync(profileFileName)) {
    if (mustExist) {
      throw new Error('No profile file created');
    }

    return {
      profiles: {},
    };
  }

  const data = await fsp.readFile(profileFileName, 'utf-8');
  return JSON.parse(data);
};

export const listProfileNames = async (): Promise<Array<string>> => {
  const profileFile = await loadProfileFile(false);

  return Object.keys(profileFile.profiles);
};

export const loadProfile = async (name?: string): Promise<OAuthProfile> => {
  const profileSettings = await loadProfileFile();
  let profileName = name ?? profileSettings.default;
  const availableProfiles = Object.keys(profileSettings.profiles);

  if (profileName && !availableProfiles.includes(profileName)) {
    profileName = undefined;
  }

  const { selectedProfile } = await inquirer.prompt([
    {
      name: 'selectedProfile',
      type: 'list',
      message: 'Which profile do you want to use?',
      choices: availableProfiles,
    },
  ], { selectedProfile: profileName });

  profileName = selectedProfile;

  if (!profileName) {
    throw new Error('No profile name provided!');

  }

  if (!profileSettings?.profiles?.[profileName]) {
    throw new Error(`No profile named "${profileName}" was found`);
  }

  let profile = profileSettings.profiles[profileName];

  if (profile.extends) {
    const baseProfile = await loadProfile(profile.extends);
    profile = {
      ...baseProfile,
      ...profile,
    };
  }

  return profile;
};

export const saveProfile = async (name: string, profile: OAuthProfile) => {
  const profileFile = await loadProfileFile(false);

  profileFile.profiles[name] = profile;

  await fsp.writeFile(profileFileName, JSON.stringify(profileFile, null, 2), 'utf-8');
};