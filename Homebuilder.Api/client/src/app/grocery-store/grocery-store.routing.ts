import { Routes, RouterModule } from '@angular/router';
import { GroceryStoreComponent } from './grocery-store.component';


const routes: Routes = [
    { path: 'grocery-store', component: GroceryStoreComponent }
];

export const ProjectsRoutes = RouterModule.forChild(routes);
