import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GroceryStoreModule } from './grocery-store/grocery-store.module';
import { UtilityBillModule } from './utility-bill/utility-bill.module';
import { ToolShelfModule } from './tool-shelf/tool-shelf.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './shared/modals/delete-modal.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeleteModalComponent
  ],
  exports: [
    DeleteModalComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DashboardModule,
    GroceryStoreModule,
    UtilityBillModule,
    ToolShelfModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    DeleteModalComponent
  ],
  providers: [
   // { provide: ToastrService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
