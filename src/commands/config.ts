import { program } from 'commander';
import { inspect } from 'util';
import { loadProfile } from '../profile';
import { getOpenIdConfiguration } from '../profile/getOpenIdConfiguration';

program.command('config <profile>')
  .action(async (profileName) => {
    const profile = await loadProfile(profileName);
    const config = await getOpenIdConfiguration(profile);

    console.info(inspect(config));
  });