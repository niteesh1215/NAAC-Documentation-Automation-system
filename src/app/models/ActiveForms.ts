export enum IconType {
    material,
    fontawesome
}
export class ActiveForms {
    name: string;
    folder?: string;
    activefrom?: string;
    totalresponses?: number;
    active?: boolean;
    routePath?: string;
    icon?: string;
    iconType?: IconType;


    constructor(name = "menu") {
        this.name = name;
    }
}