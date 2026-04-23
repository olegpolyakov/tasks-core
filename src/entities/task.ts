import { Entity } from '@olegpolyakov/core';

import type Tag from './tag.ts';

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export default class Task extends Entity {
    title: string;
    completed: boolean;
    dueDate?: Date;
    content: string;
    priority: TaskPriority;
    tagIds: string[];

    tags: Tag[] = [];

    constructor({
        title,
        completed = false,
        dueDate,
        content = '',
        priority = TaskPriority.Medium,
        tagIds = [],
        ...rest
    }: Task & Entity) {
        super(rest);

        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
        this.content = content;
        this.priority = priority;
        this.tagIds = tagIds;
    }
}