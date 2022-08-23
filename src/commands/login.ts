import { program } from 'commander';
import { getOpenIdConfiguration, loadProfile } from '../profile';
import open from 'open';
import * as http from 'http';
import Axios from 'axios';

program.command('login [profile]')
  .description('Run the auth flow and display the resulting token')
  .action(async (profileName?: string) => {
    const profile = await loadProfile(profileName);
    const config = await getOpenIdConfiguration(profile);
    const port = profile.callbackPort ?? 8000;
    const host = profile.callbackHost ?? 'localhost';
    const protocol = profile.callbackHttps ? 'https' : 'http';

    const redirectUri = `${protocol}://${host}:${port}${profile.callbackPath}`;
    const url = new URL(config.authorization_endpoint);
    url.searchParams.append('client_id', profile.clientId);
    url.searchParams.append('redirect_uri', redirectUri);
    url.searchParams.append('scope', profile.scopes.join(' '));
    url.searchParams.append('response_type', 'code');

    const runningServer = new Promise((resolve, reject) => {
      let server: http.Server | undefined;
      const requestListener: http.RequestListener = async (req, res) => {
        const [path, params] = req.url!.split('?');
        if (path !== profile.callbackPath ?? '/') {
          console.info(`Unknown path: ${path}`);
          res.writeHead(404).end();
          return;
        }

        const queryParams = new URLSearchParams(params);
        const code = queryParams.get('code');

        if (!code) {
          throw new Error(`Didn't get code: ${req.url}`);
        }

        const data = {
          grant_type: 'authorization_code',
          client_id: profile.clientId,
          client_secret: profile.clientSecret,
          code,
          redirect_uri: redirectUri,
        };

        const tokenResponse = await Axios.request({
          url: config.token_endpoint,
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: new URLSearchParams(data).toString(),
          validateStatus: () => true,
        });

        console.info(tokenResponse.data);

        const createTokenSection = (title: string, token: string) => token ? `
        <h3>${title}</h3>
        <a href="https://jwt.io/?token=${token}">View</a> | <a onClick="navigator.clipboard.writeText('${token}')">Copy</a>
        <p>${token}</p>` : '';

        res.writeHead(200, undefined, {
          'content-type': 'application/html',
        });
        res.end(`<html>
                    <body>
                        ${createTokenSection('Access Token', tokenResponse.data.access_token)}
                        ${createTokenSection('ID Token', tokenResponse.data.id_token)}
                    </body>
                </html>`);

        server?.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });

        process.exit(0);
      };

      server = http.createServer(requestListener);
      server.listen(port, host, () => {
        console.info(`Listening on http://${host}:${port}`);
      });
    });

    const loginUrl = url.toString();
    console.info(`Opening ${loginUrl}`);
    await open(loginUrl);
    await runningServer;
  });