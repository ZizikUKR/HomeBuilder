import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { FoodProductService } from 'src/app/shared/services/food-product.service';
import { CreateFoodProductView } from 'src/app/shared/models/food-products/create-food-product-view';
import { MonthEnum } from 'src/app/shared/models/enums/month-enum';
import { FoodCategoryService } from 'src/app/shared/services/food-category.service';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'create-food-product-popup',
  templateUrl: './create-food-product-popup.component.html',
  styleUrls: ['./create-food-product-popup.component.scss']
})
export class CreateFoodProductPopupComponent implements OnInit {
  public foodProductForm: FormGroup;
  public subscription: Subscription;
  public monthNumbers: number[];
  public months: string[];
  public foodCategories: string[];

  public filteredOptions: Observable<string[]>;
  public myControl = new FormControl();


  constructor(
    private foodProductService: FoodProductService,
    private categoryService: FoodCategoryService,
    public matDialog: MatDialog,
    private notificationService: ToastrService,
    public dialogRef: MatDialogRef<CreateFoodProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any) {
  }
  ngOnInit(): void {
    this.getCreationData();
    this.initForm();
  }

  private getCreationData(): void {
    this.subscription = this.categoryService.getProductCreationData().subscribe(res => {
      this.foodCategories = res.categories;
      this.subscription.unsubscribe();

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterCategories(value))
      );
    });
    this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
    this.monthNumbers = Object.keys(MonthEnum).filter(f => !isNaN(Number(f))).map(Number);
  }

  private filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foodCategories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private initForm(): void {
    this.foodProductForm = new FormGroup({
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      orderDay: new FormControl('', Validators.required),
      category: this.myControl
    });
  }

  public changeTime(type: string, event: MatDatepickerInputEvent<Date>): void {
    event.value.setHours(5);
  }

  public onCreate(): void {
    debugger;
    const request = this.foodProductForm.value as CreateFoodProductView;
    this.subscription = this.foodProductService.Create(request).subscribe(res => {
      this.subscription.unsubscribe();
      this.notificationService.success('Food product was created!');
      this.foodProductForm.reset();
      this.dialogRef.close();
    }, () => {
      this.notificationService.error('Something went wrong!');
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
