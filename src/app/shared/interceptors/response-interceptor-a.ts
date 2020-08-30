import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptorA implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do smth with response

                    console.log('Current interceptor: ResponseInterceptorA');

                    return new HttpResponse({
                        ...event,
                        body: [
                            {
                                name: 'New Entity',
                                id: 't-8_2AJ',
                            },
                            {
                                name: 'New Entity',
                                id: '9t-guY0',
                            },
                        ],
                    });
                }
                return event;
            }),
        );
    }
}
