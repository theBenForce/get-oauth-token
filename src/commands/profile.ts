import { program } from 'commander';
import produce from 'immer';
import inquirer from 'inquirer';
import { buildProfile, getOpenIdConfiguration, listProfileNames, loadProfile, OAuthProfile, saveProfile } from '../profile';



program.command('new-profile [name]')
  .action(async (profileName?: string) => {
    const existingProfiles = await listProfileNames();
    const metaInfo = await inquirer.prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What is the profile name?',
        default: profileName,
      },
      {
        type: 'confirm',
        name: 'isExtension',
        message: 'Is this based on an existing profile?',
        when: () => existingProfiles.length,
        default: false,
      },
      {
        type: 'list',
        name: 'extends',
        when: prev => prev.isExtension && existingProfiles.length,
        message: 'Which profile does this extend?',
        choices: existingProfiles,

      }]);

    let baseProfile: OAuthProfile | undefined;

    if (metaInfo.extends) {
      baseProfile = await loadProfile(metaInfo.extends);
    }

    const { baseUrl } = await inquirer.prompt([
      {
        type: 'text',
        name: 'baseUrl',
        message: 'What is the base url?',
        default: baseProfile?.baseUrl,
      }]);

    const config = await getOpenIdConfiguration({ baseUrl } as unknown as OAuthProfile);

    const profileInfo: OAuthProfile = await buildProfile({ baseProfile, config, baseUrl });

    const newProfile = produce(profileInfo, (draft: Partial<OAuthProfile>) => {
      if (metaInfo.extends) {
        draft.extends = metaInfo.extends;
      }

      if (baseProfile) {
        for (const key of Object.keys(draft)) {
          // @ts-ignore
          if (draft[key] === baseProfile[key]) {
            // @ts-ignore
            delete draft.key;
          }
        }
      }
    });

    await saveProfile(metaInfo.name, newProfile);
  });


