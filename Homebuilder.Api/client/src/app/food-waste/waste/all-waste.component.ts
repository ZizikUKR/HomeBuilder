import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig, PageEvent } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { map, startWith } from "rxjs/operators";
import { DeleteModalComponent } from "src/app/shared/modals/delete-modal.component";
import { MonthEnum } from "src/app/shared/models/enums/month-enum";
import { FoodProductGetAllViewItem } from "src/app/shared/models/food-products/food-product-get-all-view-item";
import { HomeBuilderConstants } from "src/app/shared/models/constants/home-builder.constants";
import { FoodCategoryService } from "src/app/shared/services/food-category.service";
import { FoodProductService } from "src/app/shared/services/food-product.service";
import { CreateWastePopupComponent } from "./create-waste-product-popup/create-waste-popup.component";
import { WasteProductService } from "src/app/shared/services/waste-product.service";

@Component({
    selector: 'app-waste',
    templateUrl: './all-waste.component.html',
    styleUrls: ['all-waste.component.scss']
})

export class AllWasteComponent implements OnInit {
    public foodProducts: FoodProductGetAllViewItem[] = [];
    public subscription: Subscription;
    public subscription2: Subscription;

    public months: string[];

    public filteredOptions: Observable<string[]>;
    public foodCategories: string[];
    public myControl = new FormControl('');
    public filteredCategory: string;

    public length = 0;
    public pageSize: number = 10;
    public page: number = 1;


    constructor(private wasteProductService: WasteProductService,
        private categoryService: FoodCategoryService,
        public matDialog: MatDialog,
        private notificationService: ToastrService) {
    }

    ngOnInit(): void {
        this.getFoodProducts(1, this.pageSize, null);
        this.getAllCategories();
        this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
    }

    private getAllCategories(): void {
        this.subscription2 = this.categoryService.getProductCreationData().subscribe(res => {
            this.foodCategories = res.categories;
            this.subscription2.unsubscribe();
            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => this.filterCategories(value))
            );
        });
    }

    private filterCategories(value: string): string[] {
        debugger;
        if (value) {
            const filterValue = value.toLowerCase();

            return this.foodCategories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
        }
    }

    private getFoodProducts(page: number, pageSize: number, category: string): void {
        this.subscription = this.wasteProductService.GetAll(page, pageSize, category, null).subscribe(res => {
            this.foodProducts = res.items;
            this.length = res.count;
            this.subscription.unsubscribe();
        });
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

    public onChangeCategory(event: string): void {
        debugger;
        const s = this.filteredCategory;

        this.getFoodProducts(this.page, this.pageSize, event);
    }

    public onPaginateFood(pageEvent: PageEvent): void {
        this.page = pageEvent.pageIndex + 1;
        this.getFoodProducts(this.page, this.pageSize, this.myControl.value);
    }

    public openCreateItemModal(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'app-create-popup';
        dialogConfig.height = '550px';
        dialogConfig.width = '350px';

        const matDialog = this.matDialog.open(CreateWastePopupComponent, dialogConfig);
        matDialog.afterClosed().subscribe(res => {
            this.getFoodProducts(this.page, this.pageSize, this.myControl.value);
        });
    }

    public openDeleteModal(item: FoodProductGetAllViewItem): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'app-delete-modal';
        dialogConfig.data = {
            title: 'Waste Product',
            description: 'If you continue, the food product with category ' + item.category.name + ' will be deleted.',
            actionButtonText: 'Delete',
            TodoId: item.id
        };
        const modalDialog = this.matDialog.open(DeleteModalComponent, dialogConfig);

        modalDialog.afterClosed().subscribe(res => {
            if (res) {
                this.wasteProductService.Delete(item.id).subscribe(() => {
                    this.notificationService.info('Waste product was deleted');
                    this.getFoodProducts(this.page, this.pageSize, this.myControl.value);
                }, error => {
                    this.notificationService.error(`Waste product with category ${item.category.name} wasn't deleted!`);
                });
            }
        });
    }
}