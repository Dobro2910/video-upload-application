import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/authentication/authentication.action'
import { UserLoginCredential } from '../../store/model/user.model';
import { AuthState } from '../../store/authentication/authentication.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string | null>;

  constructor(private router: Router, private store: Store<{ auth: AuthState }>) {
    this.errorMessage$ = this.store.select(state => state.auth.error);
  }

  ngOnInit(): void {
    console.log('Login component initialized');
  }

  navigateToRegister(): void {
    this.store.dispatch(AuthActions.resetAuthError());
    this.router.navigate(['/register']);
  }

  onLogin(emailInput: string, passwordInput: string) {
    const credentials: UserLoginCredential = { userEmail: emailInput, userPassword: passwordInput };
    this.store.dispatch(AuthActions.userLoginAction({ userlogincredential: credentials }));
  }
}
