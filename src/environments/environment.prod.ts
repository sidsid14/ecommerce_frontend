export const environment = {
  production: true,
  oidc: {
    clientId: '',
    issuer: '',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
