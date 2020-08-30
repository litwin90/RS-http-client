import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DialogService } from '../services';

@Injectable()
export class CatchHttpErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: DialogService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next
            .handle(request)
            .pipe
            // tap(() => {
            //     console.log('CatchHttpErrorInterceptor');
            // }),
            // catchError((error: Error) => {
            //     this.dialog.show({ message: error.message });
            //     return throwError(error);
            // }),
            ();
    }
}
