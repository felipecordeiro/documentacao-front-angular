import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { FormularioModule } from './formulario/formulario.module';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ExcelModule } from './excel/excel.module';
import { PrimengModule } from './primeng/primeng.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { carteiraReducer } from './core/store/reducers/carteira.reducer';
import { clienteReducer } from './core/store/reducers/cliente.reducer';
import { TestesNgrxModule } from './testes-ngrx/testes-ngrx.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CoreModule,
    FormularioModule,
    ExcelModule,
    TestesNgrxModule,
    PrimengModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ cliente: clienteReducer, carteira: carteiraReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
