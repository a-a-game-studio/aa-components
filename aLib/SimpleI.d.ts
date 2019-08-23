export interface KeyVal {
    [s: string]: string;
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
