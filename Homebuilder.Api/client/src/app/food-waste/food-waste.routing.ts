import { Routes, RouterModule } from '@angular/router';
import { FoodWasteComponent } from './food-waste.component';



const routes: Routes = [
    { path: 'food-waste', component: FoodWasteComponent }
];

export const FoodWasteRoutes = RouterModule.forChild(routes);
