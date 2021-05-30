import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryStoreComponent } from './grocery-store.component';
import { ProjectsRoutes } from './grocery-store.routing';
import { FoodChartComponent } from './food-chart/food-chart.component';
import { FoodProductsComponent } from './food/food-products.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateFoodProductPopupComponent } from './food/create-food-product-popup/create-food-product-popup.component';
import { NgSelect2Module } from 'ng-select2';
import { Select2Module } from 'ng-select2-component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        GroceryStoreComponent,
        FoodChartComponent,
        FoodProductsComponent,
        CreateFoodProductPopupComponent
    ],
    imports: [
        CommonModule,
        ProjectsRoutes,
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
        // NgSelect2Module,
        // Select2Module,
        MatAutocompleteModule,
        ChartsModule,
        MatPaginatorModule,
        ModalModule.forRoot()
    ],
    providers: [
    ],
    entryComponents: [
        CreateFoodProductPopupComponent
    ]
})
export class GroceryStoreModule { }
