import { Entity } from '@olegpolyakov/core';

import type Project from './project.ts';
import type Tag from './tag.ts';

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export default class Task extends Entity {
    title: string;
    completed: boolean;
    content?: string;
    priority: TaskPriority;
    dueDate?: Date;
    projectIds: string[];
    tagIds: string[];

    projects: Project[] = [];
    tags: Tag[] = [];

    constructor({
        title,
        completed = false,
        content = '',
        dueDate,
        priority = TaskPriority.Medium,
        tagIds = [],
        projectIds = [],
        ...rest
    }: Task & Entity) {
        super(rest);

        this.title = title;
        this.completed = completed;
        this.content = content;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectIds = projectIds;
        this.tagIds = tagIds;
    }
}