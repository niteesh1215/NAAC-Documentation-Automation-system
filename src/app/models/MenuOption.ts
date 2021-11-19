export class MenuOption {
    name: string;
    active: boolean;
    routePath?: string;

    constructor(name = "menu", active = false) {
        this.name = name;
        this.active = active;
    }
}