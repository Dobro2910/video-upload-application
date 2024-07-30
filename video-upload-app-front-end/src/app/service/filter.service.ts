import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  productGender: string = '';
  productCategory: string = '';
  productBrand: string = '';
  productSize: string = '';
  currentPage: number = 1;

  setFilters(gender: string, category: string, size: string, brand: string) {
    this.productGender = gender || '';
    this.productCategory = category || '';
    this.productBrand = brand || '';
    this.productSize = size || '';
    this.currentPage = 1;
  }
  
  getFilters() {
    return {
      productGender: this.productGender,
      productCategory: this.productCategory,
      productBrand: this.productBrand,
      productSize: this.productSize,
      currentPage: this.currentPage
    };
  }
}
