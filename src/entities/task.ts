import {
    DateTime,
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
    date?: Date;
    recurrence?: RecurrenceData;
    content: string;
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
    readonly date?: Date;
    readonly recurrence?: RecurrenceData;
    readonly content: string;
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
            date,
            recurrence,
            content = '',
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
        this.date = date ? new Date(date) : undefined;
        this.recurrence = recurrence;
        this.content = content;
        this.tagIds = tagIds;
        this.childrenIds = childrenIds;

        this.parent = parent;
        this.children = children;
        this.tags = tags;
        this.projects = projects;
    }

    get dateTime(): DateTime | undefined {
        return this.date ? DateTime.fromJSDate(this.date) : undefined;
    }

    get dateTimeString(): string | undefined {
        if (!this.dateTime) return;

        if (this.isCurrent) {
            return this.dateTime.toRelativeCalendar() ?? '';
        }

        return this.dateTime.toLocaleString();
    }

    get isCurrent(): boolean {
        if (!this.dateTime) return false;
        
        if (this.isOverdue || this.isDueToday) return true;

        return (
            this.dateTime < DateTime.now().endOf('week') &&
            this.dateTime >= DateTime.now().startOf('week')
        );
    }

    get isNext(): boolean {
        if (!this.date) return false;

        const today = DateTime.now();
        const tomorrow = today.plus({ 'days': 1 }).startOf('day');
        const endOfPeriod = today.plus({ 'days': 21 }).endOf('day');
        const date = DateTime.fromJSDate(this.date);

        return date >= tomorrow && date < endOfPeriod;
    }

    get isOverdue(): boolean {
        return !this.completed && (this.date
            ? DateTime.fromJSDate(this.date) < DateTime.now().startOf('day')
            : false); 
    }

    get isDueToday(): boolean {
        return this.date
            ? DateTime.fromJSDate(this.date).hasSame(DateTime.now(), 'day')
            : false;
    }

    get hasTags(): boolean {
        return this.tagIds.length > 0;
    }

    get hasProjects(): boolean {
        return this.projects.length > 0;
    }

    get hasParent(): boolean {
        return !!this.parent;
    }

    get hasChildren(): boolean {
        return this.childrenIds.length > 0;
    }

    getNextDate(): Date | undefined {
        return this.date && this.recurrence
            ? Recurrence.create(this.recurrence).calculateNextDate(this.date)
            : undefined;
    }
}