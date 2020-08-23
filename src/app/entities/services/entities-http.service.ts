import { Injectable } from '@angular/core';

import { GeneratorService, ProgressBarService } from '../../shared';
import { IEntity } from '../models';

let ENTITIES: IEntity[] = [
    {
        id: 'AOONAga',
        name: 'Entity 1',
    },
    {
        name: 'Entity 2',
        id: 'AOONAgs',
    },
    {
        name: 'Entity 3',
        id: 'ka3poDh',
    },
    {
        name: 'Entity 4',
        id: 'I9EDJNK',
    },
];

@Injectable({
    providedIn: 'root',
})
export class EntitiesHttpService {
    shouldReturnError = false;

    constructor(
        private stringGenerator: GeneratorService,
        private progressBar: ProgressBarService,
    ) {}

    getEntities(): Promise<IEntity[]> {
        return this.shouldReturnError
            ? this.rejectedPromiseWithDelay()
            : Promise.resolve([...ENTITIES]);
    }

    addEntity(entity: Pick<IEntity, 'name'>): Promise<IEntity> {
        const newEntity = {
            ...entity,
            id: this.stringGenerator.getRandomString(5),
        };
        ENTITIES.push(newEntity);
        return this.shouldReturnError
            ? this.rejectedPromiseWithDelay()
            : this.promiseWithDelay(newEntity);
    }

    updateEntity(
        entityId: string,
        { name }: Partial<IEntity>,
    ): Promise<IEntity> {
        ENTITIES = ENTITIES.filter(({ id }) => id !== entityId);
        ENTITIES.push({ id: entityId, name });
        return this.shouldReturnError
            ? this.rejectedPromiseWithDelay()
            : this.promiseWithDelay({ id: entityId, name });
    }

    delete(entityId: string): Promise<void> {
        ENTITIES = ENTITIES.filter(({ id }) => id !== entityId);
        return this.shouldReturnError
            ? this.rejectedPromiseWithDelay()
            : this.promiseWithDelay();
    }

    private promiseWithDelay<T>(dataToResolve?: T): Promise<T> {
        return new Promise((resolve) => {
            this.progressBar.show();
            setTimeout(() => {
                this.progressBar.hide();
                resolve(dataToResolve);
            }, 2000);
        });
    }

    private rejectedPromiseWithDelay<T>() {
        return new Promise<T>((_, reject) => {
            this.progressBar.show();
            setTimeout(() => {
                this.progressBar.hide();
                reject('Smth went wrong');
            }, 2000);
        });
    }
}
