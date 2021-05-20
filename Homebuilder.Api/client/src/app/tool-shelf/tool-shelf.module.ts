import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolShelfComponent } from './tool-shelf.component';
import { ToolShelfRoutes } from './tool-shelf.routing';

@NgModule({
    declarations: [
        ToolShelfComponent
    ],
    imports: [
        CommonModule,
        ToolShelfRoutes,
    ]
})
export class ToolShelfModule { }
