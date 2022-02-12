import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityBillComponent } from './utility-bill.component';
import { UtilityBillRoutes } from './utility-bill.routing';
import { BillsComponent } from './bills/bills.component';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityBillChartComponent } from './utility-bill-chart/utility-bill-chart.component';
import { CreateUtilityBillPopupComponent } from './bills/create-utility-bill-popup/create-utility-bill-popup.component';

@NgModule({
    declarations: [
        UtilityBillComponent,
        BillsComponent,
        UtilityBillChartComponent,
        CreateUtilityBillPopupComponent
    ],
    imports: [
        CommonModule,
        UtilityBillRoutes,
        RouterModule,
        MatIconModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ChartsModule,
        MatPaginatorModule
    ],
    entryComponents: [
        CreateUtilityBillPopupComponent
    ]
})
export class UtilityBillModule { }
