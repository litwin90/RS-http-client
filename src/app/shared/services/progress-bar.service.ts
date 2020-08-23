import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProgressBarService {
    isDisplayed = false;
    progressBarSubject: Subject<boolean> = new Subject();

    private showRequestsCount = 0;

    show() {
        this.showRequestsCount++;
        this.isDisplayed = true;
        this.progressBarSubject.next(true);
    }

    hide() {
        if (this.isDisplayed) {
            this.showRequestsCount--;
        }
        if (!this.showRequestsCount) {
            this.isDisplayed = false;
            this.progressBarSubject.next(false);
        }
    }
}
