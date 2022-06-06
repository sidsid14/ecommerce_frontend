import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      baseUrl: environment.oidc.issuer.split('/oauth2')[0],
      clientId: environment.oidc.clientId,
      redirectUri: environment.oidc.redirectUri,
      logo: 'assets/images/logo.png',
      authParams: {
        pkce: true,
        issuer: environment.oidc.issuer,
        scopes: environment.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignin
      .showSignInToGetTokens({
        el: '#okta-sign-in-widget',
        scopes: environment.oidc.scopes,
      })
      .then((tokens: Tokens) => {
        // Remove the widget
        this.oktaSignin.remove();

        // In this flow the redirect to Okta occurs in a hidden iframe
        this.oktaAuth.handleLoginRedirect(tokens);
      })
      .catch((err: any) => {
        // Typically due to misconfiguration
        throw err;
      });
  }

  ngOnDestroy() {
    this.oktaSignin.remove();
  }
}
