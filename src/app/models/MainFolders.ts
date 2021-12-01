export enum IconType {
    material,
    fontawesome
}
export class MainFolders {
    id?: string;
    name: string;
    description?: string;
    active?: boolean;
    routePath?: string;
    type!: string;
    iconType?: IconType;
    formId?: string;


    constructor(name = "menu") {
        this.name = name;
    }
}