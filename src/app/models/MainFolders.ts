export enum IconType {
    material,
    fontawesome
}
export class MainFolders {
    name: string;
    active?: boolean;
    routePath?: string;
    iconType?: IconType;


    constructor(name = "menu") {
        this.name = name;
    }
}