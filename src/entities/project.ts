import {
    Entity,
    EntityData
} from '@olegpolyakov/core';

export type ProjectSectionData = {
    id: string;
    name: string;
    icon?: string;
    taskIds: string[];
};

export type ProjectData = {
    name: string;
    description?: string;
    icon?: string;
    taskIds: string[];
    sectionIds: string[];
    sectionData: Record<string, ProjectSectionData>;
} & EntityData;

export default class Project extends Entity implements ProjectData {
    readonly name: string;
    readonly description?: string;
    readonly icon?: string;
    readonly taskIds: string[];
    readonly sectionIds: string[];
    readonly sectionData: Record<string, ProjectSectionData>;

    constructor({
        name = '',
        icon,
        description,
        taskIds = [],
        sectionIds = [],
        sectionData = {},
        ...rest
    }: Partial<ProjectData>) {
        super(rest);

        this.name = name;
        this.icon = icon;
        this.description = description;
        this.taskIds = taskIds;
        this.sectionIds = sectionIds;
        this.sectionData = sectionData;
    }
}