import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateToDoView } from 'src/app/shared/models/create-to-do-view';
import { ToDoService } from 'src/app/shared/services/to-do.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-create-to-do-popup',
    templateUrl: './create-to-do-popup.component.html',
    styleUrls: ['./create-to-do-popup.component.scss']
  })
  export class CreateToDoPopupComponent implements OnInit {
    public toDoForm: FormGroup;
    public subscription: Subscription;

    constructor(private todoService: ToDoService,
                public matDialog: MatDialog,
                private notificationService: ToastrService,
                public dialogRef: MatDialogRef<CreateToDoPopupComponent>,
                @Inject(MAT_DIALOG_DATA) private modalData: any) {
}
    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.toDoForm = new FormGroup({
          toDo: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          information: new FormControl('', Validators.required)
        });
      }

      public onCreate(): void {
        const request = this.toDoForm.value as CreateToDoView;
        this.subscription = this.todoService.create(request).subscribe(res => {
          this.subscription.unsubscribe();
          this.notificationService.success('Todo was created!');
          this.toDoForm.reset();
          this.dialogRef.close();
        }, () => {
          this.notificationService.error('Something went wrong!');
        });
      }

      public closeModal(): void {
        this.dialogRef.close();
      }
  }
