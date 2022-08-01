import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { FormularioModule } from './formulario/formulario.module';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ExcelModule } from './excel/excel.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    CoreModule,
    FormularioModule,
    ExcelModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
