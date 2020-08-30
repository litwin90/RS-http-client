import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ConfigService } from '../../shared';
import { IEntity } from '../models';

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    private textExampleFileUrl = 'assets/textExample.txt';

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
    ) {
        this.getText();
    }

    getText() {
        this.http
            .get(this.textExampleFileUrl, { responseType: 'text' })
            .subscribe((textFileContent) => {
                console.log(textFileContent);
            });
    }

    getEntities(): Observable<IEntity[]> {
        const { config } = this.configService;

        if (!config) {
            return this.configService
                .getConfig()
                .pipe(
                    switchMap(({ apiEntitiesUrl }) =>
                        this.http.get<IEntity[]>(apiEntitiesUrl),
                    ),
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
