import { Component, OnInit } from '@angular/core';

import { ProgressBarService, WithSubscriptions } from './shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends WithSubscriptions implements OnInit {
    title = 'http-client';
    isProgressBarDisplayed = false;

    constructor(private progressBar: ProgressBarService) {
        super();
    }

    ngOnInit(): void {
        const progressBar$ = this.progressBar.progressBarSubject.subscribe(
            (isDisplayed) => {
                this.isProgressBarDisplayed = isDisplayed;
            },
        );

        this.subscriptions.push(progressBar$);
    }
}
