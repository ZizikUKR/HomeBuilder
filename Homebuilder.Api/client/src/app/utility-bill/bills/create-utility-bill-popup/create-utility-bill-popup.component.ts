import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MonthEnum } from 'src/app/shared/models/enums/month-enum';
import { UtilityBillNameEnum } from 'src/app/shared/models/enums/utility-bill-name-enum';
import { CreateUtilityBillView } from 'src/app/shared/models/utility-bills/create-utility-bill-view';
import { UtilityBillService } from 'src/app/shared/services/utility-bill.service';

@Component({
  selector: 'app-create-utility-bill-popup',
  templateUrl: './create-utility-bill-popup.component.html',
  styleUrls: ['./create-utility-bill-popup.component.scss']
})
export class CreateUtilityBillPopupComponent implements OnInit {
  public utilityBillForm: FormGroup;
  public subscription: Subscription;
  public monthNumbers: number[];
  public months: string[];

  public utilityBillNames: Map<number, string>;
  // public utilityBillNames: Map<number>;

  constructor(
    private utilityBillService: UtilityBillService,
    public matDialog: MatDialog,
    private notificationService: ToastrService,
    public dialogRef: MatDialogRef<CreateUtilityBillPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any) {
  }
  ngOnInit(): void {
    this.initForm();
    this.getUtilityBillNames();
    this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
    this.monthNumbers = Object.keys(MonthEnum).filter(f => !isNaN(Number(f))).map(Number);
  }

  private getUtilityBillNames(): void {
    this.utilityBillNames = new Map<number, string>([
      [UtilityBillNameEnum.Electricity, 'Electricity'],
      [UtilityBillNameEnum.HotWater, 'Hot Water'],
      [UtilityBillNameEnum.ColdWater, 'Cold Water'],
      [UtilityBillNameEnum.Heating, 'Heating'],
      [UtilityBillNameEnum.DoorPhone, 'Door Phone'],
      [UtilityBillNameEnum.GarbageUtilization, 'Garbage Utilization'],
      [UtilityBillNameEnum.Gas, 'Gas'],
      [UtilityBillNameEnum.GasDelivery, 'Gas Delivery'],
      [UtilityBillNameEnum.RentBill, 'Rent Bill'],
      [UtilityBillNameEnum.Sanitation, 'Sanitation']
    ]);
  }

  private initForm(): void {
    const currentDate = new Date();
    this.utilityBillForm = new FormGroup({
      month: new FormControl(currentDate.getMonth() + 1, Validators.required),
      year: new FormControl(currentDate.getFullYear(), Validators.required),
      price: new FormControl('', Validators.required),
      name: new FormControl(0, Validators.required)
    });
  }

  public onCreate(): void {
    debugger;
    const request = this.utilityBillForm.value as CreateUtilityBillView;
    this.subscription = this.utilityBillService.create(request).subscribe(res => {
      this.subscription.unsubscribe();
      this.notificationService.success('Utility Bill was created!');
      this.utilityBillForm.reset();
      this.dialogRef.close();
    }, () => {
      this.notificationService.error('Something went wrong!');
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
