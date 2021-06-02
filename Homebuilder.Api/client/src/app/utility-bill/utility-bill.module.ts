import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityBillComponent } from './utility-bill.component';
import { UtilityBillRoutes } from './utility-bill.routing';
import { BillsComponent } from './bills/bills.component';

@NgModule({
    declarations: [
        UtilityBillComponent,
        BillsComponent
    ],
    imports: [
        CommonModule,
        UtilityBillRoutes
    ]
})
export class UtilityBillModule { }
