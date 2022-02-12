import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivityGetAllViewItem } from 'src/app/shared/models/activities/activity-get-all-view-item';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { CreateActivityPopupComponent } from './create-activity-popup/create-activity-popup.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public subscription: Subscription;
  public activities: ActivityGetAllViewItem[] = [];
  constructor(private activityService: ActivityService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.getAllActivities();
  }
  private getAllActivities(): void {
    this.subscription = this.activityService.GetAll().subscribe(res => {
      this.activities = res.activities;
      this.subscription.unsubscribe();
    });
  }

  public toggleViewDropdawn(event): void {
    event.target.closest('.dropdown').classList.toggle('open');
  }

  public showChildModal(): void {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = '';
        dialogConfig.height = '500px';
        dialogConfig.width = '350px';

        const matDialog = this.matDialog.open(CreateActivityPopupComponent, dialogConfig);
        matDialog.afterClosed().subscribe(res => {
          //TODO upload new data
        });
  }
 
}
