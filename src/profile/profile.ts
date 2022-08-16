
export interface OAuthProfile {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  callbackPort: number;
  callbackHost: string;
  callbackPath: string;
  callbackHttps: boolean;
  extends?: string;
  scopes: Array<string>
}