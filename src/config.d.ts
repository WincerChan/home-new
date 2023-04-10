export interface Link {
    name: string;
    url: string;
    title: string;
    color?: string;
}

export interface Portfolio {
    name: string;
    url: string;
    cover: string;
    desc: string;
}

export interface Config {
    avatar?: string;
    desc?: string;
    email?: string;
    website?: string
    name: {
        base: string;
        note: string;
    };
    links: Link[];
    Portfolio: Portfolio[];
}
