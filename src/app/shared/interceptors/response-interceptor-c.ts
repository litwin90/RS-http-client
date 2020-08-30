import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { logConfig } from './loger-config';

@Injectable()
export class ResponseInterceptorC implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (logConfig.logIntercept) {
            console.log('intercept: ResponseInterceptorC');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : ResponseInterceptorC');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : ResponseInterceptorC');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : ResponseInterceptorC');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log('DownloadProgress : ResponseInterceptorC');
                        break;
                    case HttpEventType.Response:
                        console.log('Response : ResponseInterceptorC');
                        break;
                    case HttpEventType.User:
                        console.log('User : ResponseInterceptorC');
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
