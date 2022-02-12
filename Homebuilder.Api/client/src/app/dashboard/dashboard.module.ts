import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ActivityComponent } from './activity/activity.component';
import { HomeBuilderComponent } from './home-builder/home-builder.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { CreateToDoPopupComponent } from './home-builder/create-to-do-popup/create-to-do-popup.component';
import { CreateActivityPopupComponent } from './activity/create-activity-popup/create-activity-popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        DashboardComponent,
        ActivityComponent,
        HomeBuilderComponent,
        CreateToDoPopupComponent,
        CreateActivityPopupComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutes,
        RouterModule,
        MatIconModule,
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        ModalModule.forRoot()
    ],
    providers: [
    ],
    entryComponents: [
        CreateToDoPopupComponent,
        CreateActivityPopupComponent
      ]
})
export class DashboardModule { }
