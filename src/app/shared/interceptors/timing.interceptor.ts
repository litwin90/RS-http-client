import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const startDate = Date.now();
        return next.handle(request).pipe(
            // tap(() => {
            //     console.log('TimingInterceptor');
            // }),
            map((event: HttpEvent<any>) => {
                if (
                    event instanceof HttpResponse &&
                    event.url.includes(environment.apiEntitiesUrl)
                ) {
                    const requestTiming = Date.now() - startDate;
                    console.log(`Products request timing: ${requestTiming}`);
                }
                return event;
            }),
        );
    }
}
