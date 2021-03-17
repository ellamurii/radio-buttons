
export interface MenuItem {
    id: string;
    value: string;
}

export interface Rules {
    [key: string]: number[];
}

export interface MenuRules {
    menus: MenuItem[][],
    rules: Rules,
}
