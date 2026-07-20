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
    projectIds: string[];
    childrenIds: string[];
} & EntityData;

export default class Task extends Entity implements TaskData {
    readonly title: string;
    readonly completed: boolean;
    readonly dueDate?: Date;
    readonly recurrence?: RecurrenceData;
    readonly content: string;
    readonly priority: TaskPriority;
    readonly tagIds: string[];
    readonly projectIds: string[];
    readonly childrenIds: string[];

    tags: Tag[] = [];
    children: Task[] = [];
    parent?: Task | null;

    constructor({
        title = '',
        completed = false,
        dueDate,
        recurrence,
        content = '',
        priority = TaskPriority.Medium,
        tagIds = [],
        projectIds = [],
        childrenIds = [],
        ...rest
    }: Partial<TaskData>, parent?: Task) {
        super(rest);

        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
        this.recurrence = recurrence;
        this.content = content;
        this.priority = priority;
        this.tagIds = tagIds;
        this.projectIds = projectIds;
        this.childrenIds = childrenIds;
        this.parent = parent;
    }

    get hasParent(): boolean {
        return !!this.parent;
    }

    get hasChildren(): boolean {
        return this.childrenIds.length > 0;
    }

    getNextDueDate(): Date | undefined {
        return this.recurrence && this.dueDate
            ? Recurrence.create(this.recurrence).calculateNextDate(this.dueDate)
            : undefined;
    }
}