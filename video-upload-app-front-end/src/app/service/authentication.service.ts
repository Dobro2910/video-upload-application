import { HttpClient } from '@angular/common/http';
import { 
    Injectable, 
    // Inject  
} from '@angular/core';
import { User, UserLoginCredential } from '../store/model/user.model';
import { Observable } from 'rxjs'

// import { isPlatformBrowser } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';

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

    storeToken(token: string) {
        localStorage.setItem('token', token); // or sessionStorage.setItem('token', token)
    }

    getToken(): string | null {
        return localStorage.getItem('token'); // or sessionStorage.getItem('token')
    }

    removeToken() {
        localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
    }

    // storeToken(token: string) {
    //     if (isPlatformBrowser(this.platformId)) {
    //         console.log('Storing token:', token);
    //         localStorage.setItem('token', token); // or sessionStorage.setItem('token', token)
    //     }
    // }

    // getToken(): string | null {
    //     if (isPlatformBrowser(this.platformId)) {
    //       const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
    //       console.log('Retrieved token:', token);
    //       return token;
    //     }
    //     return null;
    // }

    // removeToken() {
    //     if (isPlatformBrowser(this.platformId)) {
    //         localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
    //     }
    // }
}