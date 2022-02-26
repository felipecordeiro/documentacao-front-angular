import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [FooterComponent],
    declarations: [FooterComponent],
    providers: [],
})
export class FooterComponentModule { }
