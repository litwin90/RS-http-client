import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IEntity } from '../models';

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    shouldReturnError = false;

    constructor(private http: HttpClient) {}

    getEntities(): Promise<IEntity[]> {
        return this.shouldReturnError
            ? Promise.reject('Smth wrong')
            : this.http.get<IEntity[]>(environment.apiEntitiesUrl).toPromise();
    }

    addEntity(entity: Pick<IEntity, 'name'>): Promise<IEntity> {
        return this.http
            .post<IEntity>(environment.apiEntitiesUrl, entity)
            .toPromise();
    }

    updateEntity(
        entityId: string,
        { name }: Partial<IEntity>,
    ): Promise<IEntity> {
        return this.http
            .put<IEntity>(`${environment.apiEntitiesUrl}/${entityId}`, {
                name,
            })
            .toPromise();
    }

    delete(entityId: string): Promise<void> {
        return this.http
            .delete<void>(`${environment.apiEntitiesUrl}/${entityId}`)
            .toPromise();
    }
}
