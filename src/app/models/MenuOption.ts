export enum IconType {
    material,
    fontawesome
}
export class MenuOption {
    name: string;
    active?: boolean;
    routePath?: string;
    icon?: string;
    iconType?: IconType;


    constructor(name = "menu") {
        this.name = name;
    }
}