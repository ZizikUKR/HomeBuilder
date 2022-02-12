import { ActivityService } from 'src/app/shared/services/activity.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateActivityView } from 'src/app/shared/models/activities/create-activity-view';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-create-activity-popup',
  templateUrl: './create-activity-popup.component.html',
  styleUrls: ['./create-activity-popup.component.scss']
})
export class CreateActivityPopupComponent implements OnInit {
  public activityForm: FormGroup;
  public subscription: Subscription;

  constructor(private activityService: ActivityService,
    private notificationService: ToastrService,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<CreateActivityPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    const currentDate = new Date();
    this.activityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      scheduledDate: new FormControl(currentDate, Validators.required)
    });
  }

  public onCreate() {
    const request = this.activityForm.value as CreateActivityView;
    this.subscription = this.activityService.Create(request).subscribe(() => {
      this.subscription.unsubscribe();
      this.activityForm.reset();
      this.dialogRef.close();
    }, () => {
      this.notificationService.error('Error. Somethong went wrong!')
    })
  }

  public changeTime(type: string, event: MatDatepickerInputEvent<Date>): void {
    event.value.setHours(5);
  }

  public hideChildModal(): void {
    this.dialogRef.close();
  }
}
