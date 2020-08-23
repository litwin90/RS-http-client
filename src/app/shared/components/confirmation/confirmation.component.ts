import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IConfirmationDialogOptions } from '../../models';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public options: IConfirmationDialogOptions,
    ) {}

    ngOnInit(): void {}
}
