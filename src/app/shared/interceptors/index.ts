import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CatchHttpErrorInterceptor } from './catch-http-error.interceptor';
import { DelayInterceptor } from './delay.interceptor';
import { ProgressBarInterceptor } from './progress-bar.interceptor';
import { ResponseInterceptorA } from './response-interceptor-a';
import { ResponseInterceptorB } from './response-interceptor-b';
import { ResponseInterceptorC } from './response-interceptor-c';
import { TimingInterceptor } from './timing.interceptor';

export const httpInterceptorsProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CatchHttpErrorInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ProgressBarInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TimingInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DelayInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptorA,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptorB,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptorC,
        multi: true,
    },
];
