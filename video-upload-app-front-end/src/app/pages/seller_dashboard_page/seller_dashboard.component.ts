import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../store/model/order.model';
import { Store } from '@ngrx/store';
import { OrderState } from '../../store/order/order.reducer';
import * as OrderActions from '../../store/order/order.action';
import { FilterService } from '../../service/filter.service';
import { AuthenticationService } from '../../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { SellerDashboardDialogComponent } from './seller_dashboard_dialog/seller_dashboard_dialog.component';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller_dashboard.component.html',
  styleUrls: ['./seller_dashboard.component.scss'],
})
export class SellerDashboardComponent implements OnInit {
  constructor(private store: Store<{ order: OrderState }>, 
              private filterSevice: FilterService, 
              private authService: AuthenticationService, 
              private dialog: MatDialog) { 
    this.sellerEmail = '';
    this.orders$ = this.store.select(state => state.order.orders);
  }

  orders$: Observable<Order[] | null>;

  sellerEmail: string | null;
  filterVar = this.filterSevice.getFilters();

  ngOnInit(): void {
    console.log('Seller dashboard component initialized');

    this.loadOrders();

    // if we press nextpage and there are no product left to display, go back
    this.orders$.subscribe(orders => {
        if (!orders && this.filterVar.currentPage > 1) {
          this.prevPage();
        }
      }
    );
  }

  loadOrders(): void {
    this.sellerEmail = this.authService.getUserEmailFromToken();

    if (this.sellerEmail) {
      this.store.dispatch(
        OrderActions.getPaginatedOrdersAction({
          page: this.filterVar.currentPage,
          sellerEmail: this.sellerEmail
        })
      );
    } else {
      console.error('User email is not available');
    }
  }

  nextPage(): void {
    this.filterVar.currentPage++;
    this.loadOrders();
  }

  prevPage(): void {
    if (this.filterVar.currentPage > 1) {
      this.filterVar.currentPage--;
      this.loadOrders();
    }
  }

  displayOrder(order: Order): void {
    this.dialog.open(SellerDashboardDialogComponent, {
      data: order
    });
  }
}
