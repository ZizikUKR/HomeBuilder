import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityGetAllViewItem } from 'src/app/shared/models/activities/activity-get-all-view-item';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public subscription: Subscription;
  public activities: ActivityGetAllViewItem[] = [];
  constructor(private activityService: ActivityService) { }

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

}
