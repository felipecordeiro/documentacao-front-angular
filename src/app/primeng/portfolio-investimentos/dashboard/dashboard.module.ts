import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  { path: 'portfolio-investimentos/dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard', {})
  ]
})
export class DashboardModule { }
