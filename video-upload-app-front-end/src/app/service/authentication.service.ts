import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLoginCredential } from '../store/model/user.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient) {}

    UserRegister(user: User): Observable<any> {
        return this.http.post('http://localhost:3000/authentication/createuser', user);
    }

    UserLogin(userlogincredential: UserLoginCredential): Observable<any> {
        return this.http.post('http://localhost:3000/authentication/login', userlogincredential)
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