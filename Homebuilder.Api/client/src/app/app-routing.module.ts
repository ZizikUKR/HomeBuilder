
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'grocery-store', loadChildren: () => import('./grocery-store/grocery-store.module').then(m => m.GroceryStoreModule) },
  { path: 'food-waste', loadChildren: () => import('./food-waste/food-waste.module').then(m => m.FoodWasteModule) },
  { path: 'utility-bill', loadChildren: () => import('./utility-bill/utility-bill.module').then(m => m.UtilityBillModule) }
];

export const AppRoutes = RouterModule.forChild(routes);
