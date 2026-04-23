import { Entity } from '@olegpolyakov/core';

export default class List extends Entity {
    name: string;
    icon?: string;
    description?: string;
    taskIds: string[];

    constructor({
        name,
        icon,
        description,
        taskIds = [],
        ...rest
    }: List & Entity) {
        super(rest);

        this.name = name;
        this.icon = icon;
        this.description = description;
        this.taskIds = taskIds;
    }
}