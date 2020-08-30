import {
    HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProgressBarService } from '../services';
import { logConfig } from './loger-config';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
    constructor(private progressBar: ProgressBarService) {}
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        this.progressBar.show();
        if (logConfig.logIntercept) {
            console.log('intercept : ProgressBarInterceptor');
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Sent : ProgressBarInterceptor');
                        break;
                    case HttpEventType.UploadProgress:
                        console.log('UploadProgress : ProgressBarInterceptor');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('ResponseHeader : ProgressBarInterceptor');
                        break;
                    case HttpEventType.DownloadProgress:
                        console.log(
                            'DownloadProgress : ProgressBarInterceptor',
                        );
                        break;
                    case HttpEventType.Response:
                        console.log('Response : ProgressBarInterceptor');
                        break;
                    case HttpEventType.User:
                        console.log('User : ProgressBarInterceptor');
                        break;
                    default: {
                        console.log('Unknown event');
                    }
                }
                return event;
            }),
            finalize(() => {
                this.progressBar.hide();
            }),
        );
    }
}
