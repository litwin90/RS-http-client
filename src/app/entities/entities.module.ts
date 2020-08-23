import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { EntitiesListComponent } from './components';

@NgModule({
    declarations: [EntitiesListComponent],
    imports: [CommonModule, SharedModule],
    exports: [EntitiesListComponent],
})
export class EntitiesModule {}
