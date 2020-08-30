import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ConfigService } from '../../shared';
import { IEntity } from '../models';

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
    ) {}

    getEntities(): Observable<IEntity[]> {
        const { config } = this.configService;

        if (!config) {
            return this.configService.getConfig().pipe(
                switchMap((response) => {
                    if (response) {
                        const {
                            body,
                            headers,
                            ok,
                            status,
                            statusText,
                            type,
                            url,
                        } = response;

                        const keys = headers.keys();
                        console.log(`Response is ok: ${ok}`);
                        console.log(`Response status: ${status}`);
                        console.log(`Response statusText: ${statusText}`);
                        console.log(`Response type: ${type}`);
                        console.log(`Response url: ${url}`);
                        console.log(`Response headers keys: ${keys}`);

                        console.log('Response object:');
                        console.log(response);

                        return this.http.get<IEntity[]>(body.apiEntitiesUrl);
                    }
                    return of([]);
                }),
            );
        }

        return this.http.get<IEntity[]>(config.apiEntitiesUrl);
    }

    addEntity(entity: Pick<IEntity, 'name'>): Observable<IEntity> {
        return this.http.post<IEntity>(environment.apiEntitiesUrl, entity);
    }

    updateEntity(
        entityId: string,
        entity: Partial<IEntity>,
    ): Observable<IEntity> {
        return this.http.put<IEntity>(
            `${environment.apiEntitiesUrl}/${entityId}`,
            entity,
        );
    }

    delete(entityId: string): Observable<void> {
        return this.http.delete<void>(
            `${environment.apiEntitiesUrl}/${entityId}`,
        );
    }
}
