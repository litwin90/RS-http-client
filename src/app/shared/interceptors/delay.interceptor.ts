import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        console.log('Current interceptor: DelayInterceptor');

        return next.handle(request).pipe(delay(2000));
    }
}
