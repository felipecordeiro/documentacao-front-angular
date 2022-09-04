import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
