export enum IconType {
    material,
    fontawesome
}
export class ActiveForms {
    name: string;
    id?: string;
    folder?: string;
    createdOn?: string;
    totalresponses?: number;
    active?: boolean;
    routePath?: string;
    icon?: string;
    iconType?: IconType;
    description?: string;


    constructor(name = "menu") {
        this.name = name;
    }
}