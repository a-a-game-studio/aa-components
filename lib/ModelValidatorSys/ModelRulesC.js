"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelOneRuleC_1 = require("./ModelOneRuleC");
const ModelTplRuleC_1 = require("./ModelTplRuleC");
/**
 * Конструктор правил валидации
 */
class ModelRulesC {
    constructor() {
        this.aRules = {};
    }
    /**
     * Создать правило
     * @param sColumn
     */
    rule(sColumn) {
        return new ModelOneRuleC_1.ModelOneRuleC(sColumn);
    }
    /**
     * Создать правило из шаблона
     * @param sColumn
     */
    tpl(sColumn, bRequire = false) {
        return new ModelTplRuleC_1.ModelTplRuleC(sColumn, bRequire);
    }
    /**
     * Добавить готовое правило
     * @param oneRule
     */
    set(oneRule) {
        let k = oneRule.getKey();
        let a = oneRule.get();
        this.aRules[k] = a;
    }
    /**
     * Получить список правил
     */
    get() {
        return this.aRules;
    }
}
exports.ModelRulesC = ModelRulesC;
//# sourceMappingURL=ModelRulesC.js.map