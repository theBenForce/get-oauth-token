import inquirer from 'inquirer';
import { OpenIdConfiguration } from './getOpenIdConfiguration';
import { OAuthProfile } from './profile';

interface BuildProfileParams { baseProfile?: OAuthProfile; config: OpenIdConfiguration; baseUrl: string; }

export async function buildProfile({ baseProfile, config, baseUrl }: BuildProfileParams): Promise<OAuthProfile> {
  return inquirer.prompt([
    {
      type: 'text',
      name: 'baseUrl',
      message: 'What is the base url?',
      default: baseProfile?.baseUrl,
    },
    {
      type: 'text',
      name: 'clientId',
      message: 'What is the client id?',
      default: baseProfile?.clientId,
    },
    {
      type: 'password',
      name: 'clientSecret',
      message: 'What is the client secret?',
      default: baseProfile?.clientSecret,
    },
    {
      type: 'input',
      name: 'callbackHost',
      message: 'What host should be used for callbacks?',
      default: baseProfile?.callbackHost ?? 'localhost',
    },
    {
      type: 'number',
      name: 'callbackPort',
      message: 'What port are callbacks sent to?',
      default: baseProfile?.callbackPort ?? 8000,
    },
    {
      type: 'confirm',
      name: 'callbackHttps',
      message: 'Should HTTPS be used for callbacks?',
      default: baseProfile?.callbackHttps ?? false,
    },
    {
      type: 'input',
      name: 'callbackPath',
      message: 'What server path should callbacks be sent to?',
      default: baseProfile?.callbackPath ?? '/success',
    },
    {
      type: 'checkbox',
      name: 'scopes',
      message: 'What scopes should be requested?',
      choices: config.scopes_supported,
      default: baseProfile?.scopes,
    },
  ], { baseUrl });
}