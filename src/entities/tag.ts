import { Entity, EntityData } from '@olegpolyakov/core';

import type { Task } from './index.ts';

export type TagData = {
    name: string;
    icon?: string;
} & EntityData;

export default class Tag extends Entity implements TagData {
    readonly name: string;
    readonly icon?: string;
    declare readonly tasksCount: number;
    declare readonly tasks: Task[];

    constructor({
        name = '',
        icon,
        ...rest
    }: Partial<TagData> = {}) {
        super(rest);

        this.name = name;
        this.icon = icon;
    }
}