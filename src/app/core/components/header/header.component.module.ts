import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    providers: [],
})
export class HeaderComponentModule { }
