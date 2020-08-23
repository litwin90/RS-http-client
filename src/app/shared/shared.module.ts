import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { ConfirmationComponent } from './components';
import { httpInterceptorsProviders } from './interceptors';

@NgModule({
    declarations: [ConfirmationComponent],
    imports: [CommonModule, MaterialModule, HttpClientModule, FormsModule],
    exports: [CommonModule, MaterialModule, HttpClientModule, FormsModule],
    providers: [TitleCasePipe, httpInterceptorsProviders],
})
export class SharedModule {}
