import { IEntity } from './IEntity';

export interface IEditableEntity extends IEntity {
    isEdited: boolean;
}
