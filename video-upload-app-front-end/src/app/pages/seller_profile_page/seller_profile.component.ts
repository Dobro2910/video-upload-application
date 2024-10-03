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
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from '../shared/update_profile_dialog/update_profile_dialog.component';
import { ProductState } from '../../store/product/product.reducer';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller_profile.component.html',
  styleUrls: ['./seller_profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  // Observable Variables
  currentUser$: Observable<User| null>;
  profileComment$: Observable<string | null>;
  productComment$: Observable<string | null>;

  // Normal Variables
  newProduct: Product;
  productColorVarietiesDetail: ProductColorVarietyDetail[] = [];
  // an unique set of size to store all size when the customer use filter
  productSizeSet: Set<string> = new Set();
  showComment = false;
  comment: string | null = null;

  constructor(private store: Store<{ profile: ProfileState, product: ProductState }>, private authService: AuthenticationService, private dialog: MatDialog) { 
    this.currentUser$ = this.store.select(state => state.profile.currentUser);
    this.profileComment$ = this.store.select(state => state.profile.comment);
    this.productComment$ = this.store.select(state => state.product.comment);

    this.newProduct = {
      productCategory: '',
      productBrand: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productGender: '',
      productImage: undefined,
      productAmountSold: 0,
      productColorVarietyDetail: []
    };
  }

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmailFromToken();

    if (userEmail) {
      this.store.dispatch(ProfileActions.getProfileAction({userEmail: userEmail}));
    } else {
      this.store.dispatch(ProfileActions.getProfileActionFailure({error: "Cannot find current session token"}));
    }

    this.productComment$.pipe().subscribe(productComment => {
      if (productComment) {
        this.showCommentWithTimeout(productComment);
      }
    });

    this.profileComment$.pipe().subscribe(profileComment => {
      if (profileComment) {
        this.showCommentWithTimeout(profileComment);
      }
    });

    console.log('Seller profile component initialized');
  }

  // Method to show comment and hide it after 3 seconds
  showCommentWithTimeout(comment: string): void {
    this.comment = comment;
    this.showComment = true;

    setTimeout(() => {
      this.showComment = false;
    }, 5000); // Hide after 3 seconds
  }

  updateProductSize(newSize: string, varietyIndex: number, sizeIndex: number): void {
    // Update the product size at the specific index
    this.productColorVarietiesDetail[varietyIndex].productSize[sizeIndex] = newSize;
    // Add the new size to the Set (automatically handles uniqueness)
    this.productSizeSet.add(newSize);
  }

  closeVariety(varietyIndex: number) {
    this.productColorVarietiesDetail.splice(varietyIndex, 1);
  }

  closeSizeAndStock(varietyIndex: number, sizeAndStockIndex: number) {
    this.productColorVarietiesDetail[varietyIndex].productSize.splice(sizeAndStockIndex, 1);
    this.productColorVarietiesDetail[varietyIndex].productStock.splice(sizeAndStockIndex, 1);
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

  // File input must be handle differently, instead of using using Ngmodel, we use this function
  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      this.newProduct.productImage = file;  // Assign the selected file to updateUser
    }
  }

  displayProfileUpdateDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent);
  }
}