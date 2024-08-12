import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../store/model/product.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient) {}

    getPaginatedProducts(page: number): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
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
        return this.http.post('http://localhost:3000/product/createproduct', product);
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