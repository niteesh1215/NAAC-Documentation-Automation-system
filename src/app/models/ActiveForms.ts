export enum IconType {
    material,
    fontawesome
}
export class ActiveForms {
    name: string;
    folder?: string;
    activefrom?: string;
    totalresponses?: number;
    filecolor?: string;
    active?: boolean;
    routePath?: string;
    icon?: string;
    iconType?: IconType;


    constructor(name = "menu") {
        this.name = name;
    }
}