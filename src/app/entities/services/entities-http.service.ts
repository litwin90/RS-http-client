import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IEntity } from '../models';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const responseToJson = (response) => response.json();

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    shouldReturnError = false;

    constructor() {}

    getEntities(): Promise<IEntity[]> {
        return fetch(environment.apiEntitiesUrl).then(responseToJson);
    }

    addEntity(entity: Pick<IEntity, 'name'>): Promise<IEntity> {
        return fetch(environment.apiEntitiesUrl, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(entity),
        }).then(responseToJson);
    }

    updateEntity(entityId: string, entity: Partial<IEntity>): Promise<IEntity> {
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(entity),
        };

        return fetch(
            `${environment.apiEntitiesUrl}/${entityId}`,
            requestOptions,
        ).then(responseToJson);
    }

    delete(entityId: string): Promise<void> {
        const requestOptions = {
            method: 'DELETE',
        };

        return fetch(
            `${environment.apiEntitiesUrl}/${entityId}`,
            requestOptions,
        ).then(responseToJson);
    }
}
