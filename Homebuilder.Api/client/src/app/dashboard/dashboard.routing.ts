import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
];

export const DashboardRoutes = RouterModule.forChild(routes);
