import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestesNgrxComponent } from './testes-ngrx.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'testes-ngrx', component: TestesNgrxComponent }
]

@NgModule({
  declarations: [TestesNgrxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TestesNgrxModule { }
