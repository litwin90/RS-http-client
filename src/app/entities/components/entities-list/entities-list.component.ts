import { Component, OnInit } from '@angular/core';

import { WithSubscriptions } from '../../../shared';
import { IEntity } from '../../models';
import { IEditableEntity } from '../../models/IEditableEntity';
import { EntitiesService } from '../../services';

@Component({
    selector: 'app-entities-list',
    templateUrl: './entities-list.component.html',
    styleUrls: ['./entities-list.component.scss'],
})
export class EntitiesListComponent extends WithSubscriptions implements OnInit {
    entities: IEditableEntity[];
    displayedColumns: string[] = ['id', 'name', 'controls'];
    newEntity: Pick<IEntity, 'name'> = {
        name: 'New Entity',
    };

    constructor(private entitiesService: EntitiesService) {
        super();
    }

    ngOnInit(): void {
        const entities$ = this.entitiesService.entitiesSubject.subscribe(
            (entities) => {
                this.entities = this.mapToEditableEntity([...entities]);
            },
        );

        this.subscriptions.push(entities$);
    }

    onAddEntity() {
        this.entitiesService.add({ name: this.newEntity.name });
        this.newEntity.name = 'New Entity';
    }

    onEditEntity(entityId: string) {
        this.markOtherEntitiesAsNotEdited(entityId);

        const entityToEdit = this.entities.find(({ id }) => id === entityId);

        if (entityToEdit) {
            entityToEdit.isEdited = true;
        }
    }

    onSaveEntity(entityId: string) {
        const entityToSave = this.entities.find(({ id }) => id === entityId);

        if (entityToSave) {
            this.updateEntity(entityId, { name: entityToSave.name });
            entityToSave.isEdited = false;
        }
    }

    onDeleteEntity(id: string) {
        this.entitiesService.delete(id);
    }

    private updateEntity(id: string, { name }: Partial<Pick<IEntity, 'name'>>) {
        this.entitiesService.update(id, { name });
    }

    private mapToEditableEntity(entities: IEntity[]): IEditableEntity[] {
        return entities.map((entity) => ({ ...entity, isEdited: false }));
    }

    private markOtherEntitiesAsNotEdited(entityId: string) {
        this.entities = this.entities.map((entity) => {
            if (entityId !== entity.id) {
                entity.isEdited = false;
            }
            return entity;
        });
    }
}
