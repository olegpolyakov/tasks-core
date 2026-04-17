import { Entity } from '@olegpolyakov/core';

export default class Settings extends Entity {
    userId: string;
    projectsOrder: string[] = [];
    tagsOrder: string[] = [];
    tasksOrder: Record<string, string[]> = {}; // { [key]: [taskId1, taskId2] }
    tasksSort: Record<string, string> = {}; // { [key]: 'createdAt:desc' }

    constructor({
        userId = '',
        projectsOrder = [],
        tagsOrder = [],
        tasksOrder = {},
        tasksSort = {},
        ...rest
    }: Settings & Entity) {
        super(rest);
        this.userId = userId;
        this.projectsOrder = projectsOrder;
        this.tagsOrder = tagsOrder;
        this.tasksOrder = tasksOrder;
        this.tasksSort = tasksSort;
    }
}
