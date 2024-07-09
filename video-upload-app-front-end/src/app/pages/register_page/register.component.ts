// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import * as AuthActions from '../../store/authentication/authentication.action'
// import { User, UserLoginCredential } from '../../store/model/user.model';
// import { AuthState } from '../../store/authentication/authentication.reducer';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent implements OnInit {
//   errorMessage$: Observable<string | null>;

//   ngOnInit(): void {
//     console.log('Register component initialized');
//   }

//   constructor(private store: Store<{ auth: AuthState }>) {
//     this.errorMessage$ = this.store.select(state => state.auth.error);
//   }

//   onRegister(nameInput: string, emailInput: string, passwordInput: string) {
//     const newUser: User = { userName: nameInput, userEmail: emailInput, userPassword: passwordInput };
//     this.store.dispatch(AuthActions.createUserAction({ user: newUser }));
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/authentication/authentication.action';
import { User } from '../../store/model/user.model';
import { AuthState } from '../../store/authentication/authentication.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthState }>) {
    this.errorMessage$ = this.store.select(state => state.auth.error);

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    console.log('Register component initialized');
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { userName, userEmail, userPassword } = this.registerForm.value;
      const newUser: User = { userName, userEmail, userPassword };
      this.store.dispatch(AuthActions.createUserAction({ user: newUser }));
    } else {
      this.registerForm.markAllAsTouched(); // Mark all fields as touched to display errors
    }
  }

  // Getter methods for easier access in template
  get userName() {
    return this.registerForm.get('userName');
  }

  get userEmail() {
    return this.registerForm.get('userEmail');
  }

  get userPassword() {
    return this.registerForm.get('userPassword');
  }
}



