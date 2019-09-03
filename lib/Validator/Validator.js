"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelOneRuleC_1 = require("./ModelOneRuleC");
/**
 * Конструктор правил валидации
 */
class Validator {
    constructor() {
        this.aRules = {};
    }
    rule(sColumn) {
        return new ModelOneRuleC_1.ModelOneRuleC(sColumn);
    }
    set(oneRule) {
        let k = oneRule.getKey();
        let a = oneRule.get();
        this.aRules[k] = a;
    }
    get() {
        return this.aRules;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map