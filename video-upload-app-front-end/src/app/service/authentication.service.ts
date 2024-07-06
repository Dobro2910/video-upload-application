import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLoginCredential } from '../store/model/user.model';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) {}

    UserRegister(user: User) {
        return this.http.post('http://localhost:3000/authentication/createuser', user);
    }

    UserLogin(userlogincredential: UserLoginCredential): Observable<any>  {
        return this.http.post('http://localhost:3000/authentication/login', userlogincredential)
        .pipe(
            tap((response: any) => {
                this.storeToken(response.token); // Store the token in local storage upon successful login
            })
        );
    }

    UserLoginSuccess() {
        this.router.navigate(['/home']);
    }

    storeToken(token: string) {
        localStorage.setItem('token', token); // or sessionStorage.setItem('token', token)
    }

    getToken(): string | null {
        return localStorage.getItem('token'); // or sessionStorage.getItem('token')
    }

    removeToken() {
        localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
    }

}