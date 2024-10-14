
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../store/model/order.model';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../../store/order/order.action';
import { OrderState } from '../../../store/order/order.reducer';

@Component({
    selector: 'app-seller-dashboard-dialog',
    templateUrl: './seller_dashboard_dialog.component.html',
    styleUrls: ['./seller_dashboard_dialog.component.scss']
})

export class SellerDashboardDialogComponent {
    constructor(public dialogRef: MatDialogRef<SellerDashboardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { order: Order, page: number, sellerEmail: string }, private store: Store<{ order: OrderState }>) {}

    ngOnInit(): void {
        console.log('Seller dashboard dialog component initialized');
    }

    onClose(): void {
        this.dialogRef.close();
    }

    completeOrder(orderId: string, productIndex: number): void {
        this.store.dispatch(OrderActions.completeOrderAction({ orderId: orderId, productIndex: productIndex }));
        this.onClose();
        // setTimeout(() => {
        //     this.store.dispatch(OrderActions.getPaginatedOrdersAction({ page: this.data.page, sellerEmail: this.data.sellerEmail }));
        // }, 10000); 
    }
}