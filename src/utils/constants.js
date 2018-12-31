export const OAUTH_CONFIG = {
  issuer: `${process.env.OAUTH_ISSUER}`,
  clientId: `${process.env.OAUTH_CLIENT_ID}`,
  redirectUrl: `${process.env.OAUTH_CLIENT_REDIRECT_URL}`,
  scopes: ['openid', 'profile', 'offline_access', 'email'],
};