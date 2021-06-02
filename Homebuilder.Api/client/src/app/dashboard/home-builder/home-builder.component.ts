import { UpdateToDoView } from '../../shared/models/to-do/update-to-do-view';
import { StateEnum } from './../../shared/models/enums/state-enum';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ToDoService } from 'src/app/shared/services/to-do.service';
import { ToDoTaskGetAllViewItem } from 'src/app/shared/models/to-do/to-do-task-get-all-view-item';
import { HomeBuilderConstants } from 'src/app/shared/models/constants/home-builder.constants';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CreateToDoPopupComponent } from './create-to-do-popup/create-to-do-popup.component';

@Component({
  selector: 'app-home-builder',
  templateUrl: './home-builder.component.html',
  styleUrls: ['./home-builder.component.scss']
})
export class HomeBuilderComponent implements OnInit {
  public isAddItemModal: boolean;
  public subscription: Subscription;
  public toDoList: ToDoTaskGetAllViewItem[] = [];
  constructor(private todoService: ToDoService,
              public matDialog: MatDialog,
              private notificationService: ToastrService) {
  }

  ngOnInit() {
    this.getToDoList();
    timer(0, 5000).subscribe(() => this.getToDoList());
  }

  public openDeleteModal(item: ToDoTaskGetAllViewItem): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'app-delete-modal';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'deleteProduct',
      title: 'Are you sure you want to delete this todo?',
      description: 'If you continue, the todo with name ' + item.toDo + 'will be deleted.',
      actionButtonText: 'Delete',
      TodoId: item.id
    };
    const modalDialog = this.matDialog.open(DeleteModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(res => {
      if (res) {
        this.todoService.delete(item.id).subscribe(() => {
          this.notificationService.info('Todo was deleted');
          this.getToDoList();
        }, error => {
          this.notificationService.error(`Todo ${item.toDo} wasn't deleted!`);
        });
      }
    });
  }

  public onDeleteItem(item: ToDoTaskGetAllViewItem): void {
    this.subscription = this.todoService.delete(item.id).subscribe(res => {
      this.subscription.unsubscribe();
      if (res) {
        this.getToDoList();
      }
    });
  }
  public openCreateItemModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'app-create-to-do-popup';
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    const matDialog = this.matDialog.open(CreateToDoPopupComponent, dialogConfig);
    matDialog.afterClosed().subscribe(res => {
      if (res) {
        this.getToDoList();
      }
    });
  }

  public getChipsColour(state: string): string {
    if (StateEnum.Final === state) {
      return HomeBuilderConstants.chipColorGreen;
    }
    if (StateEnum.HighPrice === state) {
      return HomeBuilderConstants.chipColorRed;
    }
    if (StateEnum.Medium === state) {
      return HomeBuilderConstants.chipColorYellow;
    }
  }

  public updateStatus(item: ToDoTaskGetAllViewItem) {
    const updatedTodo: UpdateToDoView = {
      id: item.id,
      isComppleted: !item.isComppleted
    };
    this.todoService.update(updatedTodo).subscribe(res => {
      if (res === true) {
        item.isComppleted = !item.isComppleted;
      }
    });
  }

  private getToDoList(): void {
    this.subscription = this.todoService.getAll().subscribe(res => {
      this.toDoList = res.toDos;
      this.subscription.unsubscribe();
    });
  }
}
