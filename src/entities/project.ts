import { Entity } from '@olegpolyakov/core';

export type ProjectSection = {
    id: string;
    name: string;
    taskIds: string[];
};

export default class Project extends Entity {
    name: string;
    icon?: string;
    description?: string;
    archived: boolean;
    taskIds: string[];
    sectionIds: string[];
    sections: Record<string, ProjectSection>;

    constructor({
        name,
        icon,
        description,
        archived = false,
        taskIds = [],
        sectionIds = [],
        sections = {},
        ...rest
    }: Project & Entity) {
        super(rest);

        this.name = name;
        this.icon = icon;
        this.description = description;
        this.archived = archived;
        this.taskIds = taskIds;
        this.sectionIds = sectionIds;
        this.sections = sections;
    }
}