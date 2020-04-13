"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Класс с шаблонами правил для одного поля
 */
class ModelTplRuleC {
    constructor(sColumn, bRequire = false) {
        this.vRule = new __1.ModelOneRuleC(sColumn);
        if (bRequire) {
            this.vRule.require();
        }
    }
    /** ID > 0 */
    tplID(sMsg) {
        this.vRule.typeInt();
        this.vRule.more(0);
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** int - целое число */
    tplInt(sMsg) {
        this.vRule.typeInt();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** text - простой текст */
    tplText(sMsg) {
        this.vRule.typeText();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** str - if опция if:RegEx if:['ss','af'] */
    tplStr(sMsg) {
        this.vRule.typeStr();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** array ['se',123,2,4,'12'] */
    tplArray(sMsg) {
        this.vRule.typeArray();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** array number [1,2,54,2] */
    tplArrayNumber(sMsg) {
        this.vRule.typeArrayNumbers();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** boolean 1|0 */
    tplBool(sMsg) {
        this.vRule.typeBool();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** enum ['ws',2,34] => 34 */
    tplEnum(sMsg) {
        this.vRule.typeEnum();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** decimal 10.01 */
    tplDecimal(sMsg) {
        this.vRule.typeDecimal();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** json "{}" "[]" */
    tplJson(sMsg) {
        this.vRule.typeJson();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
    /** object {} */
    tplObject(sMsg) {
        this.vRule.typeObject();
        this.vRule.errorEx(this.vRule.getKey(), sMsg);
        return this.vRule;
    }
}
exports.ModelTplRuleC = ModelTplRuleC;
//# sourceMappingURL=ModelTplRuleC.js.map