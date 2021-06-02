import { Routes, RouterModule } from '@angular/router';
import { UtilityBillComponent } from './utility-bill.component';


const routes: Routes = [
    { path: 'utility-bill', component: UtilityBillComponent }
];

export const UtilityBillRoutes = RouterModule.forChild(routes);
