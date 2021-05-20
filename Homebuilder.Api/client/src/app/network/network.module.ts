import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network.component';
import { NetworkRoutes } from './network.routing';

@NgModule({
    declarations: [
        NetworkComponent
    ],
    imports: [
        CommonModule,
        NetworkRoutes,
    ]
})
export class NetworkModule { }
