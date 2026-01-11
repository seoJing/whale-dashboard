export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

export interface TodoSettings {
    color?: string;
    transparency?: number;
}
