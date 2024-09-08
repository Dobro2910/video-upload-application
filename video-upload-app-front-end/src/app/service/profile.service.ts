import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { 
    Injectable, 
} from '@angular/core';
import { Observable } from 'rxjs'
import { UpdateUser } from '../store/model/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {}

    GetProfile(userEmail: string): Observable<any> {
        const token = this.authService.getToken(); // Adjust this if you store the token elsewhere

        // Create the headers object and include the Authorization header with the JWT token
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

        return this.http.get(`http://localhost:3000/authentication/getprofile/${userEmail}`, { headers });
    }

    UpdateProfile(updateUser: UpdateUser, userEmail: string): Observable<any> {
        // Create HttpParams for query parameters
        let params = new HttpParams().set('userEmail', userEmail);

        // Send the request with both params and body
        return this.http.put(
            'http://localhost:3000/authentication/updateProfile',
            updateUser, // Body of the request (updateUser object)
            { params }  // Query parameters
        );
    }
}