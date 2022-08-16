import Axios from 'axios';
import { OAuthProfile } from './profile';

export interface OpenIdConfiguration {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  device_authorization_endpoint: string;
  userinfo_endpoint: string;
  mfa_challenge_endpoint: string;
  jwks_uri: string;
  registration_endpoint: string;
  revocation_endpoint: string;
  scopes_supported: Array<string>;
  response_types_supported: Array<string>;
  code_challenge_methods_supported: Array<string>;
  response_modes_supported: Array<string>;
  subject_types_supported: Array<string>;
  id_token_signing_alg_values_supported: Array<string>;
  token_endpoint_auth_methods_supported: Array<string>;
  claims_supported: Array<string>;
  request_uri_parameter_supported: boolean;
  request_parameter_supported: boolean;
}

export const getOpenIdConfiguration = async (profile: OAuthProfile): Promise<OpenIdConfiguration> => {
  const response = await Axios.get<OpenIdConfiguration>('.well-known/openid-configuration', {
    baseURL: profile.baseUrl,
  });

  return response.data;
};