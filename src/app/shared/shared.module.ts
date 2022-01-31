import { NgModule } from '@angular/core';
import { CamposModule } from './components/campos/campos.module';


@NgModule({
    imports: [
        CamposModule
    ],
    exports: [
        CamposModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
