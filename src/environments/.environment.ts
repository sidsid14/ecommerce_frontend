export const environment = {
  production: false,
  oidc: {
    clientId: '',
    issuer: '',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
