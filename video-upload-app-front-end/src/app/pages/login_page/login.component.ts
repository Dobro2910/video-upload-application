// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })

// export class LoginComponent implements OnInit {
//     constructor() { }

//     ngOnInit(): void {
//       console.log('Login component initialized');
//     }
// }

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/authentication/authentication.action'
import { User, UserLoginCredential } from '../../store/model/user.model';
import { AuthState } from '../../store/authentication/authentication.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string | null>;

  ngOnInit(): void {
    console.log('Login component initialized');
  }

  constructor(private store: Store<{ auth: AuthState }>) {
    this.errorMessage$ = this.store.select(state => state.auth.error);
  }

  onLogin(emailInput: string, passwordInput: string) {
    const credentials: UserLoginCredential = { userEmail: emailInput, userPassword: passwordInput };
    this.store.dispatch(AuthActions.userLoginAction({ userlogincredential: credentials }));
  }
}
