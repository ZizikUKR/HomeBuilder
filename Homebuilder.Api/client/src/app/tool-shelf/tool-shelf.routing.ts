import { Routes, RouterModule } from '@angular/router';
import { ToolShelfComponent } from './tool-shelf.component';



const routes: Routes = [
    { path: 'tool-shelf', component: ToolShelfComponent }
];

export const ToolShelfRoutes = RouterModule.forChild(routes);
