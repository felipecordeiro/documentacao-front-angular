import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelComponent } from './excel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'excel', component: ExcelComponent }
]

@NgModule({
  declarations: [
    ExcelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExcelModule { }
