import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, PageEvent } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs/internal/Subscription";
import { DeleteModalComponent } from "src/app/shared/modals/delete-modal.component";
import { MonthEnum } from "src/app/shared/models/enums/month-enum";
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
    public months: string[];

    public length = 0;
    public pageSize: number = 10;
    public page: number = 10;


    constructor(private foodProductService: FoodProductService,
        public matDialog: MatDialog,
        private notificationService: ToastrService) {
    }

    ngOnInit(): void {
        this.getFoodProducts(1, this.pageSize);
        this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
    }

    private getFoodProducts(page: number, pageSize: number): void {
        this.subscription = this.foodProductService.GetAll(page, pageSize, null, null).subscribe(res => {
            this.foodProducts = res.items;
            this.length = res.count;
            this.subscription.unsubscribe();
        })
    }
    public getChipsColour(price: number): string {
        if (price <= 50) {
            return HomeBuilderConstants.chipColorGreen;
        }
        if (price <= 100) {
            return HomeBuilderConstants.chipColorYellow;
        }
        if (price >= 101) {
            return HomeBuilderConstants.chipColorRed;
        }
    }

    public onPaginateFood(pageEvent: PageEvent): void {
        this.page = pageEvent.pageIndex + 1;
        this.getFoodProducts(this.page, this.pageSize);
    }

    public openCreateItemModal(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'app-create-to-do-popup';
        dialogConfig.height = '600px';
        dialogConfig.width = '600px';

        const matDialog = this.matDialog.open(CreateFoodProductPopupComponent, dialogConfig);
        matDialog.afterClosed().subscribe(res => {
            this.getFoodProducts(this.page, this.pageSize);
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
                    this.getFoodProducts(this.page, this.pageSize);
                }, error => {
                    this.notificationService.error(`Food product with category ${item.category.name} wasn't deleted!`);
                });
            }
        });
    }
}