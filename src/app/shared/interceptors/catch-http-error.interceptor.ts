import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DialogService } from '../services';
import { logConfig } from './loger-config';

@Injectable()
export class CatchHttpErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: DialogService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (logConfig.logIntercept) {
            console.log('intercept: CatchHttpErrorInterceptor');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : CatchHttpErrorInterceptor');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log(
                            'UploadProgress : CatchHttpErrorInterceptor',
                        );
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log(
                            'ResponseHeader : CatchHttpErrorInterceptor',
                        );
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log(
                            'DownloadProgress : CatchHttpErrorInterceptor',
                        );
                        break;
                    case HttpEventType.Response:
                        console.log('Response : CatchHttpErrorInterceptor');
                        break;
                    case HttpEventType.User:
                        console.log('User : CatchHttpErrorInterceptor');
                        break;
                    default: {
                        console.log('Unknown event');
                    }
                }
                return event;
            }),
            catchError((error: Error) => {
                this.dialog.show({ message: error.message });
                return throwError(error);
            }),
        );
    }
}
