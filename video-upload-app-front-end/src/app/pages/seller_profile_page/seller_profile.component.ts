import { Component, OnInit } from '@angular/core';
import { ProductColorVarietyDetail } from '../../store/model/product.model';
import { Store } from '@ngrx/store';
import { Product } from '../../store/model/product.model';
import { createProductAction } from '../../store/product/product.action';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller_profile.component.html',
  styleUrls: ['./seller_profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  newProduct: Product;
  productColorVarietiesDetail: ProductColorVarietyDetail[] = [];

  // an unique set of size to store all size when the customer use filter
  productSizeSet: Set<string> = new Set();
  updateProductSize(newSize: string, varietyIndex: number, sizeIndex: number): void {
    // Update the product size at the specific index
    this.productColorVarietiesDetail[varietyIndex].productSize[sizeIndex] = newSize;
    // Add the new size to the Set (automatically handles uniqueness)
    this.productSizeSet.add(newSize);
  }

  constructor(private store: Store) { 
    this.newProduct = {
      productCategory: '',
      productBrand: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productGender: '',
      productImage: '',
      productAmountSold: 0,
      productColorVarietyDetail: []
    };
  }

  ngOnInit(): void {
      console.log('Seller profile component initialized');
  }

  addVariety(): void {
    console.log(this.productColorVarietiesDetail);
    this.productColorVarietiesDetail.push({ productColor: '', productSize: [], productStock: [] });
  }

  addSizeStock(varietyIndex: number): void {
    this.productColorVarietiesDetail[varietyIndex].productSize.push('');
    this.productColorVarietiesDetail[varietyIndex].productStock.push(0);
  }

  createNewProduct() {
    const productSizeArray: string[] = Array.from(this.productSizeSet);
    this.newProduct.productColorVarietyDetail = this.productColorVarietiesDetail;
    this.newProduct.productSize = productSizeArray;
    this.store.dispatch(createProductAction({ newProduct: this.newProduct }));
  }
}