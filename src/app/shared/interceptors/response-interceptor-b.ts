import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logConfig } from './loger-config';

@Injectable()
export class ResponseInterceptorB implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (logConfig.logIntercept) {
            console.log('intercept : ResponseInterceptorB');
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : ResponseInterceptorB');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : ResponseInterceptorB');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : ResponseInterceptorB');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log('DownloadProgress : ResponseInterceptorB');
                        break;
                    case HttpEventType.Response:
                        console.log('Response : ResponseInterceptorB');
                        break;
                    case HttpEventType.User:
                        console.log('User : ResponseInterceptorB');
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
