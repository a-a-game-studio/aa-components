
export interface KeyVal {
    [key: string]: any;
    [key: number]: any;
}


/**
 * Направления сортировки
 */
export enum SortDirection {
    asc =  'asc',
    desc = 'desc'
}

/**
 * Аргументы для функций списков
 */
export interface listArg {
    offset?: number;
    limit?: number;
    sortField?: string; // поле сортировки
    sort?: SortDirection; // направление сортировки
    search?: string; // фильтруемое значение
}
