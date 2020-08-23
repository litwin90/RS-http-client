import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { DialogService } from '../../shared';
import { ConfirmationService } from '../../shared/services/confirmation.service';
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
        entitiesHTTP.getEntities().subscribe((entities) => {
            this.entities = entities;
            this.updateData();
        });
    }

    add(entity: Pick<IEntity, 'name'>) {
        this.entitiesHTTP.addEntity(entity).subscribe((newEntity) => {
            this.entities.push(newEntity);
            this.updateData();
        });
    }

    update(entityId: string, { name }: Partial<IEntity>) {
        this.entitiesHTTP
            .updateEntity(entityId, { name })
            .subscribe((updatedEntity) => {
                const entityToUpdate = this.entities.find(
                    (entity) => entity.id === updatedEntity.id,
                );

                entityToUpdate.name = name ? name : entityToUpdate.name;

                this.updateData();
            });
    }

    delete(entityId: string) {
        this.confirmation
            .ask({
                message: 'Are you sure you want to delete entity?',
                acceptAction: () => {
                    this.entitiesHTTP.delete(entityId).subscribe(() => {
                        this.entities = this.entities.filter(
                            ({ id }) => id !== entityId,
                        );
                        this.updateData();
                    });
                },
            })
            .subscribe();
    }

    private updateData() {
        this.entitiesSubject.next([...this.entities]);
    }
}
