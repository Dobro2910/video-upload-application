import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { AuthenticationService } from './authentication.service';   
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {}

    getPaginatedOrders(page: number, sellerEmail: string): Observable<any> {
        let params = new HttpParams();
        params = params.set('page', page.toString()); // Ensure page is a string
        params = params.set('sellerEmail', sellerEmail);  // Add sellerEmail to the parameters
    
        const token = this.authService.getToken(); // Adjust this if you store the token elsewhere
    
        // Create the headers object and include the Authorization header with the JWT token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        // Pass both headers and params in the HTTP GET request
        return this.http.get('http://localhost:3000/order/getpaginatedorders', { headers, params });
    }

    completeOrder(orderId: string): Observable<any> {
        const token = this.authService.getToken(); // Adjust this if you store the token elsewhere
    
        // Create the headers object and include the Authorization header with the JWT token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const body = { orderId };

        // Pass both headers and params in the HTTP GET request
        return this.http.put('http://localhost:3000/order/completeorder', body, { headers });
    }
}