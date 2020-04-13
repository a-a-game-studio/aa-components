import { ModelOneRuleC } from "./ModelOneRuleC";
import { ModelTplRuleC } from "./ModelTplRuleC";
/**
 * Конструктор правил валидации
 */
export declare class ModelRulesC {
    private aRules;
    constructor();
    /**
     * Создать правило
     * @param sColumn
     */
    rule(sColumn: string): ModelOneRuleC;
    /**
     * Создать правило из шаблона
     * @param sColumn
     */
    tpl(sColumn: string, bRequire?: boolean): ModelTplRuleC;
    /**
     * Добавить готовое правило
     * @param oneRule
     */
    set(oneRule: ModelOneRuleC): void;
    /**
     * Получить список правил
     */
    get(): {
        [key: string]: any;
    };
}
