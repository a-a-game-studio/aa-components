import { ModelOneRuleC } from "./ModelOneRuleC";
/**
 * Конструктор правил валидации
 */
export declare class Validator {
    private aRules;
    constructor();
    rule(sColumn: string): ModelOneRuleC;
    set(oneRule: ModelOneRuleC): void;
    get(): {
        [key: string]: any;
    };
}
