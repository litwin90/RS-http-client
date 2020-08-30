import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { DialogService } from '../services';

@Injectable()
export class CatchHttpErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: DialogService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        console.log('Current interceptor: CatchHttpErrorInterceptor');

        console.log(`Next interceptor:`);

        console.log(next);

        return of(
            new HttpResponse({
                body: [
                    {
                        name: 'New Entity',
                        id: 't-8_2AJ',
                    },
                    {
                        name: 'New Entity',
                        id: '9t-guY0',
                    },
                ],
            }),
        );
    }
}
