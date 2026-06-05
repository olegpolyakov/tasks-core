import {
    Entity,
    EntityData,
    Recurrence,
    RecurrenceData
} from '@olegpolyakov/core';

import type Tag from './tag.ts';

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export type TaskData = {
    title: string;
    completed: boolean;
    dueDate?: Date;
    recurrence?: RecurrenceData;
    content: string;
    priority: TaskPriority;
    tagIds: string[];
} & EntityData;

export default class Task extends Entity implements TaskData {
    readonly title: string;
    readonly completed: boolean;
    readonly dueDate?: Date;
    readonly recurrence?: RecurrenceData;
    readonly content: string;
    readonly priority: TaskPriority;
    readonly tagIds: string[];
    declare readonly tags: Tag[];

    constructor({
        title = '',
        completed = false,
        dueDate,
        recurrence,
        content = '',
        priority = TaskPriority.Medium,
        tagIds = [],
        ...rest
    }: Partial<TaskData>) {
        super(rest);

        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
        this.recurrence = recurrence;
        this.content = content;
        this.priority = priority;
        this.tagIds = tagIds;
    }

    getNextDueDate(): Date | undefined {
        return this.recurrence && this.dueDate
            ? Recurrence.create(this.recurrence).calculateNextDate(this.dueDate)
            : undefined;
    }
}