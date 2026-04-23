import { Entity } from '@olegpolyakov/core';

export default class Settings extends Entity {
    userId: string;
    listsOrder: string[];
    listsSort: string;
    tagsOrder: string[];
    tagsSort: string;
    tasksOrder: Record<string, string[]>; // { [id]: [taskId1, taskId2] }
    tasksSort: Record<string, string>; // { [id]: 'name:dir' }

    constructor({
        userId = '',
        listsOrder = [],
        listsSort = 'createdAt:desc',
        tagsOrder = [],
        tagsSort = 'createdAt:desc',
        tasksOrder = {},
        tasksSort = {},
        ...rest
    }: Settings & Entity) {
        super(rest);
        this.userId = userId;
        this.listsOrder = listsOrder;
        this.listsSort = listsSort;
        this.tagsOrder = tagsOrder;
        this.tagsSort = tagsSort;
        this.tasksOrder = tasksOrder;
        this.tasksSort = tasksSort;
    }
}
