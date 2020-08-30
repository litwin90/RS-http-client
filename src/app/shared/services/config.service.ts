import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IConfig } from '../models/IConfig';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private configUrl = 'assets/config.json';

    config: IConfig;

    constructor(private http: HttpClient) {}

    getConfig(): Observable<IConfig> {
        return this.http.get<IConfig>(this.configUrl).pipe(
            tap((config) => {
                this.config = { ...config };
            }),
        );
    }
}
