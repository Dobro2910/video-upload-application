import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../store/model/product.model';
import { Observable } from 'rxjs'

import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {}

    getPaginatedProducts(page: number): Observable<any> {
        let params = new HttpParams();
        params = params.set('page', page);
        return this.http.get('http://localhost:3000/product/getpaginatedproduct', { params });
    }

    getPaginatedProductsByFilter(filters: { [key: string]: any }): Observable<any> {
        let params = new HttpParams();
        for (const key in filters) {
            if (filters[key] !== undefined && filters[key] !== null) {
                params = params.append(key, filters[key]);
            }
        }
        return this.http.get('http://localhost:3000/product/search/filter', { params });
    }

    createProduct(product: Product): Observable<any> {
        const token = this.authService.getToken(); // Adjust this if you store the token elsewhere
    
        // Create FormData to handle file upload and other form fields
        const formData = new FormData();
    
        // Append all fields except the productImage file to FormData
        formData.append('productName', product.productName);
        formData.append('productDescription', product.productDescription);
        formData.append('productPrice', product.productPrice.toString());
        formData.append('productGender', product.productGender);
        formData.append('productCategory', product.productCategory);
        formData.append('productBrand', product.productBrand);
        formData.append('productAmountSold', product.productAmountSold.toString());
    
        // Append productColorVarietyDetail as a JSON string (since FormData can't handle complex objects directly)
        if (product.productColorVarietyDetail) {
            formData.append('productColorVarietyDetail', JSON.stringify(product.productColorVarietyDetail));
        }
    
        // Append the productImage file if it exists
        if (product.productImage) {
            formData.append('productImage', product.productImage);
        }
    
        // Create headers with the Authorization token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        // Send the POST request with FormData and headers
        return this.http.post('http://localhost:3000/product/createproduct', formData, { headers });
    }

    updateproductColorVarietyDetail(productId: string, productStock: number): Observable<any> {
        return this.http.put('http://localhost:3000/product/updateproductcolorvarietydetail/${productId}', productStock);
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete('http://localhost:3000/product/delete/${productId}')
    }

    // getAllProduct(): Observable<any> {
    //     return this.http.get('http://localhost:3000/product/allproduct');
    // }

    // getProductInfo(productId: string): Observable<any> {
    //     return this.http.get('http://localhost:3000/product/${productId}');
    // }
}