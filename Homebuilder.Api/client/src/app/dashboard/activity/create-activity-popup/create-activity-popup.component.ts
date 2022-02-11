import { ActivityService } from 'src/app/shared/services/activity.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-activity-popup',
  templateUrl: './create-activity-popup.component.html',
  styleUrls: ['./create-activity-popup.component.scss']
})
export class CreateActivityPopupComponent implements OnInit {
  @ViewChild('childModal', { static: false }) public childModal: ModalDirective;

  public toDoForm: FormGroup;


  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.toDoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    });
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }
}
