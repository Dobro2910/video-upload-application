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
import { UserLoginCredential } from '../../store/model/user.model';
import { AuthState } from '../../store/authentication/authentication.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.errorMessage$ = this.store.select(state => state.auth.error);
  }

  ngOnInit(): void {
    console.log('Login component initialized');
  }

  onLogin(email: string, password: string) {
    const credentials: UserLoginCredential = { userEmail: email, userPassword: password };
    this.store.dispatch(AuthActions.userLoginAction({ userlogincredential: credentials }));
  }
}
