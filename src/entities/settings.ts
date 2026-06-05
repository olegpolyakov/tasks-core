import { Settings, SettingsData } from '@olegpolyakov/core/entities';

export type TasksSettingsData = {
    listsOrder: string[];
    listsSort: string;
    tagsOrder: string[];
    tagsSort: string;
    tasksOrder: Record<string, string[]>; // { [id]: [taskId1, taskId2] }
    tasksSort: Record<string, string>; // { [id]: 'name:dir' }
} & SettingsData;

export default class TasksSettings extends Settings implements TasksSettingsData {
    listsOrder: string[];
    listsSort: string;
    tagsOrder: string[];
    tagsSort: string;
    tasksOrder: Record<string, string[]>;
    tasksSort: Record<string, string>;

    constructor({
        listsOrder = [],
        listsSort = 'createdAt:desc',
        tagsOrder = [],
        tagsSort = 'createdAt:desc',
        tasksOrder = {},
        tasksSort = {},
        ...rest
    }: Partial<TasksSettingsData> = {}) {
        super(rest);

        this.listsOrder = listsOrder;
        this.listsSort = listsSort;
        this.tagsOrder = tagsOrder;
        this.tagsSort = tagsSort;
        this.tasksOrder = tasksOrder;
        this.tasksSort = tasksSort;
    }
}
