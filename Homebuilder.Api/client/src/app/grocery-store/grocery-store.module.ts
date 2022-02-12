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
import { ChartsModule } from 'ng2-charts';
import { UploadFoodProductPopupComponent } from './food/upload-food-products-popup/upload-food-product-popup.component';

@NgModule({
    declarations: [
        GroceryStoreComponent,
        FoodChartComponent,
        FoodProductsComponent,
        CreateFoodProductPopupComponent,
        UploadFoodProductPopupComponent
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
        MatAutocompleteModule,
        ChartsModule,
        MatPaginatorModule,
        ModalModule.forRoot()
    ],
    providers: [
    ],
    entryComponents: [
        CreateFoodProductPopupComponent,
        UploadFoodProductPopupComponent
    ]
})
export class GroceryStoreModule { }
