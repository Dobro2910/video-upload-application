import { HttpClient } from '@angular/common/http';
import { 
    Injectable, 
} from '@angular/core';
import { User, UserLoginCredential } from '../store/model/user.model';
import { Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient, 
        // @Inject(PLATFORM_ID) private platformId: any
    ) {}

    UserRegister(user: User): Observable<any> {
        return this.http.post('http://localhost:3000/authentication/createuser', user);
    }

    UserLogin(userlogincredential: UserLoginCredential): Observable<any> {
        return this.http.post('http://localhost:3000/authentication/login', userlogincredential)
    }

    CreateUserWithRole(newUser: User): Observable<any> {
        const token = this.getToken(); // Adjust this if you store the token elsewhere

        // Create the headers object and include the Authorization header with the JWT token
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

        return this.http.post('http://localhost:3000/authentication/createadminrole', newUser, { headers });
    }

    storeToken(token: string) {
        localStorage.setItem('token', token); // or sessionStorage.setItem('token', token)
    }

    getToken(): string | null {
        return localStorage.getItem('token'); // or sessionStorage.getItem('token')
    }

    getUserEmailFromToken(): string | null {
        const jwtHelper = new JwtHelperService(); 
        const token = this.getToken();

        if (token) {
            const decodedToken = jwtHelper.decodeToken(token);
            const userEmail = decodedToken.email as string;

            return userEmail;
        } else {
            return null;
        }
    }

    removeToken() {
        localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
    }
}