export enum IconType {
    material,
    fontawesome
}
export class RecentForms {
    name: string;
    folder?: string;
    closedon?: string;
    totalresponses?: number;
    active?: boolean;
    routePath?: string;
    icon?: string;
    iconType?: IconType;


    constructor(name = "menu") {
        this.name = name;
    }
}