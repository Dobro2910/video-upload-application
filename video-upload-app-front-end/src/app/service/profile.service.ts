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

    // Method to update user profile with image upload
    UpdateProfile(updateUser: UpdateUser, userEmail: string): Observable<any> {
        const token = this.authService.getToken(); // Get JWT token from auth service

        // Create FormData to send both the image file and other form fields
        const formData = new FormData();

        // Append form fields to FormData
        if (updateUser.userName) {
            formData.append('userName', updateUser.userName);
        }
        if (updateUser.userEmail) {
            formData.append('userEmail', updateUser.userEmail);
        }
        if (updateUser.userImage) {
            formData.append('userImage', updateUser.userImage);  // Send the file
        }

        // Set the Authorization header
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        // Send the PUT request with FormData and headers (no need for query params)
        return this.http.put(
            `http://localhost:3000/authentication/updateProfile/${userEmail}`,
            formData, // Send FormData object as body
            { headers }  // Send Authorization header
        );
    }
}