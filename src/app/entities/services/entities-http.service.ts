import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IEntity } from '../models';

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    constructor(private http: HttpClient) {}

    getEntities(): Observable<IEntity[]> {
        return this.http.get<IEntity[]>(environment.apiEntitiesUrl);
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
