export interface KeyVal {
    [key: string]: any;
    [key: number]: any;
}
export declare enum SortDirection {
    asc = "asc",
    desc = "desc"
}
export interface listArg {
    offset?: number;
    limit?: number;
    sortField?: string;
    sort?: SortDirection;
    search?: string;
}
