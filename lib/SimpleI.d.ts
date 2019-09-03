export interface KeyVal {
    [key: string]: any;
    [key: number]: any;
}
/**
 * Направления сортировки
 */
export declare enum SortDirection {
    asc = "asc",
    desc = "desc"
}
/**
 * Аргументы для функций списков
 */
export interface listArg {
    offset?: number;
    limit?: number;
    sortField?: string;
    sort?: SortDirection;
    search?: string;
}
