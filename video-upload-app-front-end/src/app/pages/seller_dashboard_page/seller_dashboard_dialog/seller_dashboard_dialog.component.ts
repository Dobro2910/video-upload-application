
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
    constructor(public dialogRef: MatDialogRef<SellerDashboardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Order, private store: Store<{ order: OrderState }>) {}

    ngOnInit(): void {
        console.log('Seller dashboard dialog component initialized');
    }

    onClose(): void {
        this.dialogRef.close();
    }

    completeOrder(orderId: string): void {
        this.store.dispatch(OrderActions.completeOrderAction({ orderId: orderId }));
        this.onClose();
    }
}