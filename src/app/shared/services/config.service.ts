import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IConfig } from '../models/IConfig';
import { DialogService } from './dialog.service';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private configUrl = 'assets/config.json';

    config: IConfig;

    constructor(private http: HttpClient, private dialog: DialogService) {}

    getConfig() {
        return this.http
            .get<IConfig>(this.configUrl, { observe: 'response' })
            .pipe(catchError(this.handleError.bind(this)));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.

            this.dialog.show({
                message:
                    'A client-side or network error occurred. Handle it accordingly.',
            });

            console.log('ERROR RESPONSE:');
            console.log(errorResponse);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.

            this.dialog.show({
                message: 'The backend returned an unsuccessful response code.',
            });

            console.log('ERROR RESPONSE:');
            console.log(errorResponse);
        }

        return throwError('Something bad happened; please try again later.');
    }
}
