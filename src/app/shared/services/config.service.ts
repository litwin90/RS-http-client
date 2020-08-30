import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IConfig } from '../models/IConfig';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private configUrl = 'assets/config.json';

    config: IConfig;

    constructor(private http: HttpClient) {}

    getConfig() {
        return this.http
            .get<IConfig>(this.configUrl, { observe: 'response' })
            .pipe(
                catchError((errorResponse) => {
                    console.log('Error response object:');

                    console.log(errorResponse);
                    return of(null);
                }),
            );
    }
}
