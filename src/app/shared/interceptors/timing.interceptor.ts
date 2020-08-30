import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logConfig } from './loger-config';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const startDate = Date.now();
        if (logConfig.logIntercept) {
            console.log('intercept : TimingInterceptor');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : TimingInterceptor');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : TimingInterceptor');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : TimingInterceptor');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log('DownloadProgress : TimingInterceptor');
                        break;
                    case HttpEventType.Response:
                        console.log('Response : TimingInterceptor');
                        break;
                    case HttpEventType.User:
                        console.log('User : TimingInterceptor');
                        break;
                    default: {
                        console.log('Unknown event');
                    }
                }
                return event;
            }),
        );
    }
}
