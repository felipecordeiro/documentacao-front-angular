import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCoincapComponent } from './dashboard-coincap.component';
import { RouterModule, Routes } from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import { ChartModule } from 'primeng/chart';

const routes: Routes = [
  { path: 'dashboard-coincap', component: DashboardCoincapComponent }
]

@NgModule({
  declarations: [
    DashboardCoincapComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    CardModule,
    ChartModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardCoincapModule { }
