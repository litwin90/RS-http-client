import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ConfirmationService, DialogService } from '../../shared';
import { IEntity } from '../models';
import { EntitiesHttpService } from './entities-http.service';

@Injectable({
    providedIn: 'root',
})
export class EntitiesService {
    entitiesSubject: BehaviorSubject<IEntity[]>;

    private entities: IEntity[] = [];

    constructor(
        private entitiesHTTP: EntitiesHttpService,
        private confirmation: ConfirmationService,
        private dialog: DialogService,
    ) {
        this.entitiesSubject = new BehaviorSubject([...this.entities]);
        entitiesHTTP
            .getEntities()
            .then((entities) => {
                this.entities = entities;
                this.updateData();
            })
            .catch((error: string) => {
                dialog.show({
                    message: error,
                });
            });
    }

    add(entity: Pick<IEntity, 'name'>) {
        this.entitiesHTTP
            .addEntity(entity)
            .then((newEntity) => {
                this.entities.push(newEntity);
                this.updateData();
            })
            .catch((error: string) => {
                this.dialog.show({
                    message: error,
                });
            });
    }

    update(entityId: string, { name }: Partial<IEntity>) {
        this.entitiesHTTP
            .updateEntity(entityId, { name })
            .then((updatedEntity) => {
                const entityToUpdate = this.entities.find(
                    (entity) => entity.id === updatedEntity.id,
                );

                entityToUpdate.name = name ? name : entityToUpdate.name;

                this.updateData();
            })
            .catch((error: string) => {
                this.dialog.show({
                    message: error,
                });
            });
    }

    delete(entityId: string) {
        this.confirmation
            .ask({
                message: 'Are you sure you want to delete entity?',
                acceptAction: () => {
                    this.entitiesHTTP
                        .delete(entityId)
                        .then(() => {
                            this.entities = this.entities.filter(
                                ({ id }) => id !== entityId,
                            );
                            this.updateData();
                        })
                        .catch((error: string) => {
                            this.dialog.show({
                                message: error,
                            });
                        });
                },
            })
            .subscribe();
    }

    private updateData() {
        this.entitiesSubject.next([...this.entities]);
    }
}
