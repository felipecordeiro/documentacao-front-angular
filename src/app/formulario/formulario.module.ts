import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'formulario', component: FormularioComponent }
]

@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FormularioModule { }
