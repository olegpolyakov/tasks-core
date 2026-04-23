import { Entity } from '@olegpolyakov/core';

export default class Tag extends Entity {
    name: string;
    icon?: string;
    readonly tasksCount: number;

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