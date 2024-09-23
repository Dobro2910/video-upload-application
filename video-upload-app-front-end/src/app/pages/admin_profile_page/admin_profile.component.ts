import { Component, OnInit } from '@angular/core';
import { Product, ProductColorVarietyDetail } from '../../store/model/product.model';
import { User } from '../../store/model/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createProductAction } from '../../store/product/product.action';
import { createUserWithRoleAction } from '../../store/authentication/authentication.action';
import { AuthenticationService } from '../../service/authentication.service';
import * as ProfileActions from '../../store/profile/profile.action';
import { ProfileState } from '../../store/profile/profile.reducer';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from '../shared/update_profile_dialog/update_profile_dialog.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin_profile.component.html',
  styleUrls: ['./admin_profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  // Observable Variables
  currentUser$: Observable<User| null>;

  // Normal Variables
  newProduct: Product;
  newUser: User;
  productColorVarietiesDetail: ProductColorVarietyDetail[] = [];
  // an unique set of size to store all size when the customer use filter
  productSizeSet: Set<string> = new Set();

  updateProductSize(newSize: string, varietyIndex: number, sizeIndex: number): void {
    // Update the product size at the specific index
    this.productColorVarietiesDetail[varietyIndex].productSize[sizeIndex] = newSize;
    // Add the new size to the Set (automatically handles uniqueness)
    this.productSizeSet.add(newSize);
  }

  constructor(private store: Store<{ profile: ProfileState }>, private authService: AuthenticationService, private dialog: MatDialog) { 
    this.currentUser$ = this.store.select(state => state.profile.currentUser);

    this.newUser = {
      userEmail: '',
      userName: '',
      userPassword: '',
      userRole: ''
    }

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

    console.log('Admin profile component initialized');
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

  createNewUserWithRole() {
    this.store.dispatch(createUserWithRoleAction({ newUser: this.newUser } ));
  }

  displayProfileUpdateDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent);
  }
}
