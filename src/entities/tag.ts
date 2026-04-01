import { Entity } from '@olegpoliakov/core';

export default class Tag extends Entity {
    name: string;
    icon?: string;
    tasksCount?: number;

    constructor({
        name,
        icon,
        tasksCount = 0,
        ...rest
    }: Tag & Entity) {
        super(rest);

        this.name = name;
        this.icon = icon;
        this.tasksCount = tasksCount;
    }
}