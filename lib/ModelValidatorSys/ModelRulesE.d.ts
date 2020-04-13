/** Типы валидации */
export interface ModelRulesI {
    key?: string;
    type?: string;
    def?: any;
    if?: RegExp | any[];
    require?: boolean;
    depend?: string;
    error?: string;
    error_key?: {
        key: string;
        msg: string;
    };
    max_len?: number;
    min_len?: number;
    more?: number;
    more_or_equal?: number;
    less?: number;
    less_or_equal?: number;
}
/** Типы валидации */
export declare enum ModelRulesT {
    str = "str",
    text = "text",
    boolean = "boolean",
    int = "int",
    enum = "enum",
    json = "json",
    decimal = "decimal",
    object = "object",
    array = "array",
    arrayNumbers = "arrayNumbers"
}
