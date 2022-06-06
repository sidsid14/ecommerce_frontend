import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    const userDetails$ = this.getUserDetails();
    userDetails$.subscribe((data) => {
      this.isAuthenticated = data.isAuth;
      this.userFullName = data.username;
    });
  }

  getUserDetails() {
    return this._oktaStateService.authState$.pipe(
      filter(
        (authState: AuthState) => !!authState && !!authState.isAuthenticated
      ),
      map((authState: AuthState) => {
        return {
          isAuth: authState.isAuthenticated ?? false,
          username: authState.idToken?.claims.name ?? '',
        };
      })
    );
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
