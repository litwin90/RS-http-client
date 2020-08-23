import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CatchHttpErrorInterceptor } from './catch-http-error.interceptor';
import { DelayInterceptor } from './delay.interceptor';
import { ProgressBarInterceptor } from './progress-bar.interceptor';
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
];
