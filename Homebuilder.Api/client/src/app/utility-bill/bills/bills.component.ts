import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal.component';
import { HomeBuilderConstants } from 'src/app/shared/models/constants/home-builder.constants';
import { MonthEnum } from 'src/app/shared/models/enums/month-enum';
import { UtilityBillNameEnum } from 'src/app/shared/models/enums/utility-bill-name-enum';
import { UtilityBillGetAllViewItem } from 'src/app/shared/models/utility-bills/utility-bill-get-all-view-item';
import { UtilityBillService } from 'src/app/shared/services/utility-bill.service';
import { CreateUtilityBillPopupComponent } from './create-utility-bill-popup/create-utility-bill-popup.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  public pageSize: number = 10;
  public page: number = 1;

  public months: string[];
  public utilityBillNames: Map<number, string>;

  public utilityBills: UtilityBillGetAllViewItem[] = [];

  private subscription: Subscription;

  constructor(private utilityFoodService: UtilityBillService,
    public matDialog: MatDialog,
    private notificationService: ToastrService) { }

  ngOnInit() {
    this.getUtilityBills(this.page, this.pageSize, null);
    this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
    this.getUtilityBillNames();
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

  public openCreateItemModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'app-create-to-do-popup';
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';

    const matDialog = this.matDialog.open(CreateUtilityBillPopupComponent, dialogConfig);
    matDialog.afterClosed().subscribe(res => {
      this.getUtilityBills(this.page, this.pageSize, null);
    });
  }

  private getUtilityBills(page: number, pageSize: number, category: string): void {
    this.subscription = this.utilityFoodService.getAll().subscribe(res => {
      this.utilityBills = res.items;
      this.subscription.unsubscribe();
    })
  }

  public getChipsColour(price: number): string {
    if (price <= 100) {
      return HomeBuilderConstants.chipColorGreen;
    }
    if (price <= 250) {
      return HomeBuilderConstants.chipColorYellow;
    }
    if (price >= 251) {
      return HomeBuilderConstants.chipColorRed;
    }
  }

  public openDeleteModal(item: UtilityBillGetAllViewItem): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'app-delete-modal';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';

    dialogConfig.data = {
      name: 'deleteProduct',
      title: 'Are you sure you want to delete this Utility bill?',
      description: 'If you continue, the food utility bill with category ' + item.name + 'will be deleted.',
      actionButtonText: 'Delete',
      TodoId: item.id
    };
    const modalDialog = this.matDialog.open(DeleteModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(res => {
      if (res) {
        this.utilityFoodService.delete(item.id).subscribe(() => {
          this.notificationService.info('Food product was deleted');
          this.getUtilityBills(this.page, this.pageSize, null);
        }, error => {
          this.notificationService.error(`Utility bill with category ${item.name} wasn't deleted!`);
        });
      }
    });
  }
}
