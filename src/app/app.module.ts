import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { HeaderComponentModule } from './components/header/header.component.module';
import { FooterComponentModule } from './components/footer/footer.component.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    HomeComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HeaderComponentModule,
    FooterComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
