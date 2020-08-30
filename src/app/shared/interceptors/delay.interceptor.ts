import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { logConfig } from './loger-config';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (logConfig.logIntercept) {
            console.log('intercept : DelayInterceptor');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : DelayInterceptor');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : DelayInterceptor');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : DelayInterceptor');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log('DownloadProgress : DelayInterceptor');
                        break;
                    case HttpEventType.Response:
                        console.log('Response : DelayInterceptor');
                        break;
                    case HttpEventType.User:
                        console.log('User : DelayInterceptor');
                        break;
                    default: {
                        console.log('Unknown event');
                    }
                }
                return event;
            }),
            delay(2000),
        );
    }
}
