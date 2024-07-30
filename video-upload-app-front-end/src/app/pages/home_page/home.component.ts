// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   constructor(
//     private router: Router
//   ) { }

//   productGender: string = '';
//   productCategory: string = '';
//   productBrand: string = '';
//   productSize: string = '';

//   ngOnInit(): void {
//     console.log('Home component initialized');
//   }

//   setValue(gender: string, category: string, size: string, brand: string): void {
//     this.productGender = gender;
//     this.productCategory = category;
//     this.productSize = size;
//     this.productBrand = brand;
//     this.navigateToProductPage();
//   }

//   navigateToProductPage(): void {
//     this.router.navigate(['/product'], {
//       queryParams: {
//         gender: this.productGender,
//         category: this.productCategory,
//         brand: this.productBrand,
//         size: this.productSize,
//         page: 1
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private filterService: FilterService
  ) { }

  // filterVar = this.filterService.getFilters();

  ngOnInit(): void {
    console.log('Home component initialized');
  }

  setValue(gender: string, category: string, size: string, brand: string): void {
    this.filterService.setFilters(gender, category, size, brand);
    this.navigateToProductPage();
  }

  navigateToProductPage(): void {
    this.router.navigate(['/product']);
  }
}