import {
    Entity,
    EntityData,
    Recurrence,
    RecurrenceData
} from '@olegpolyakov/core';

import type Project from './project.ts';
import type Tag from './tag.ts';

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export type TaskData = {
    title: string;
    completed: boolean;
    important: boolean;
    dueDate?: Date;
    recurrence?: RecurrenceData;
    content: string;
    priority: TaskPriority;
    tagIds: string[];
    childrenIds: string[];
} & EntityData;

export type TaskRefs = {
    tags?: Tag[];
    projects?: Project[];
    children?: Task[];
    parent?: Task | null;
};

export default class Task extends Entity implements TaskData {
    readonly title: string;
    readonly completed: boolean;
    readonly important: boolean;
    readonly dueDate?: Date;
    readonly recurrence?: RecurrenceData;
    readonly content: string;
    readonly priority: TaskPriority;
    readonly tagIds: string[];
    readonly childrenIds: string[];

    parent: Task | null;
    children: Task[];
    tags: Tag[];
    projects: Project[];

    constructor(
        {
            title = '',
            completed = false,
            important = false,
            dueDate,
            recurrence,
            content = '',
            priority = TaskPriority.Medium,
            tagIds = [],
            childrenIds = [],
            ...rest
        }: Partial<TaskData>,
        {
            tags = [],
            projects = [],
            children = [],
            parent = null
        }: TaskRefs = {}
    ) {
        super(rest);

        this.title = title;
        this.completed = completed;
        this.important = important;
        this.dueDate = dueDate;
        this.recurrence = recurrence;
        this.content = content;
        this.priority = priority;
        this.tagIds = tagIds;
        this.childrenIds = childrenIds;

        this.parent = parent;
        this.children = children;
        this.tags = tags;
        this.projects = projects;
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