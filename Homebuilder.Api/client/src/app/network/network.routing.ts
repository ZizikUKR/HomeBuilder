import { Routes, RouterModule } from '@angular/router';
import { NetworkComponent } from './network.component';


const routes: Routes = [
    { path: 'network', component: NetworkComponent }
];

export const NetworkRoutes = RouterModule.forChild(routes);
