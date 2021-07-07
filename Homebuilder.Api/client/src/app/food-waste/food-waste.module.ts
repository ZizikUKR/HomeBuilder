import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodWasteComponent } from './food-waste.component';
import { FoodWasteRoutes } from './food-waste.routing';
import { RouterModule } from '@angular/router';
import { AllWasteComponent } from './waste/all-waste.component';
import { CreateWastePopupComponent } from './waste/create-waste-product-popup/create-waste-popup.component';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { WasteChartComponent } from './waste-chart/waste-chart.component';

@NgModule({
    declarations: [
        FoodWasteComponent,
        AllWasteComponent,
        CreateWastePopupComponent,
        WasteChartComponent
    ],
    imports: [
        CommonModule,
        FoodWasteRoutes,
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
    providers: [
    ],
    entryComponents: [
        CreateWastePopupComponent
    ]
})
export class FoodWasteModule { }
