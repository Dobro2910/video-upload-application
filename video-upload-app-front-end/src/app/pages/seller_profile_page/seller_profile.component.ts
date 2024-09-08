import { Component, OnInit } from '@angular/core';
import { ProductColorVarietyDetail } from '../../store/model/product.model';
import { Store } from '@ngrx/store';
import { Product } from '../../store/model/product.model';
import { createProductAction } from '../../store/product/product.action';

import { Observable } from 'rxjs';
import { User } from '../../store/model/user.model';
import { AuthenticationService } from '../../service/authentication.service';
import * as ProfileActions from '../../store/profile/profile.action';
import { ProfileState } from '../../store/profile/profile.reducer';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller_profile.component.html',
  styleUrls: ['./seller_profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  // Observable Variables
  currentUser$: Observable<User| null>;

  // Normal Variables
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

  constructor(private store: Store<{ profile: ProfileState }>, private authService: AuthenticationService) { 
    this.currentUser$ = this.store.select(state => state.profile.currentUser);

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

  closeVariety(varietyIndex: number) {
    this.productColorVarietiesDetail.splice(varietyIndex, 1);
  }

  closeSizeAndStock(varietyIndex: number, sizeAndStockIndex: number) {
    this.productColorVarietiesDetail[varietyIndex].productSize.splice(sizeAndStockIndex, 1);
    this.productColorVarietiesDetail[varietyIndex].productStock.splice(sizeAndStockIndex, 1);
  }

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmailFromToken();

    if (userEmail) {
      this.store.dispatch(ProfileActions.getProfileAction({userEmail: userEmail}));
    } else {
      this.store.dispatch(ProfileActions.getProfileActionFailure({error: "Cannot find current session token"}));
    }

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