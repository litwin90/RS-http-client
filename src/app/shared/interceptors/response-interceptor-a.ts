import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logConfig } from './loger-config';

@Injectable()
export class ResponseInterceptorA implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (logConfig.logIntercept) {
            console.log('intercept : ResponseInterceptorA');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : ResponseInterceptorA');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : ResponseInterceptorA');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : ResponseInterceptorA');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log('DownloadProgress : ResponseInterceptorA');
                        break;
                    case HttpEventType.Response:
                        console.log('Response : ResponseInterceptorA');
                        break;
                    case HttpEventType.User:
                        console.log('User : ResponseInterceptorA');
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
