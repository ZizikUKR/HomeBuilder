import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs/internal/Subscription";
import { DeleteModalComponent } from "src/app/shared/modals/delete-modal.component";
import { FoodProductGetAllViewItem } from "src/app/shared/models/food-products/food-product-get-all-view-item";
import { HomeBuilderConstants } from "src/app/shared/models/home-builder.constants";
import { FoodProductService } from "src/app/shared/services/food-product.service";
import { CreateFoodProductPopupComponent } from "./create-food-product-popup/create-food-product-popup.component";

@Component({
    selector: 'food-products',
    templateUrl: './food-products.component.html',
    styleUrls: ['food-products.component.scss']
})

export class FoodProductsComponent implements OnInit {     
    public foodProducts: FoodProductGetAllViewItem[] = [];
    public subscription: Subscription;

    constructor(private foodProductService: FoodProductService,
        public matDialog: MatDialog,
        private notificationService: ToastrService) {
    }

    ngOnInit(): void {
        this.getFoodProducts();
    }

    private writeChart(): void {
    
    }

    private getFoodProducts(): void {
        this.subscription = this.foodProductService.GetAll().subscribe(res => {
            this.foodProducts = res.items;
            this.subscription.unsubscribe();
        })
    }
    public getChipsColour(price: number): string {
        if (price <= 50) {
            return HomeBuilderConstants.chipColorGreen;
        }
        if (price <= 150) {
            return HomeBuilderConstants.chipColorRed;
        }
        if (price >= 151) {
            return HomeBuilderConstants.chipColorYellow;
        }
    }

    public openCreateItemModal(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'app-create-to-do-popup';
        dialogConfig.height = '600px';
        dialogConfig.width = '600px';

        const matDialog = this.matDialog.open(CreateFoodProductPopupComponent, dialogConfig);
        matDialog.afterClosed().subscribe(res => {
            this.getFoodProducts();
        });
    }

    public openDeleteModal(item: FoodProductGetAllViewItem): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'app-delete-modal';
        dialogConfig.height = '350px';
        dialogConfig.width = '600px';

        dialogConfig.data = {
            name: 'deleteProduct',
            title: 'Are you sure you want to delete this todo?',
            description: 'If you continue, the food product with category ' + item.category.name + 'will be deleted.',
            actionButtonText: 'Delete',
            TodoId: item.id
        };
        const modalDialog = this.matDialog.open(DeleteModalComponent, dialogConfig);

        modalDialog.afterClosed().subscribe(res => {
            if (res) {
                this.foodProductService.Delete(item.id).subscribe(() => {
                    this.notificationService.info('Food product was deleted');
                    this.getFoodProducts();
                }, error => {
                    this.notificationService.error(`Food product with category ${item.category.name} wasn't deleted!`);
                });
            }
        });
    }
}