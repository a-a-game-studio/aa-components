"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Класс конструирующий правила для одного поля
 */
class ModelOneRuleC {
    constructor(sColumn) {
        this.aRule = {};
        this.aRule.key = sColumn;
    }
    // ===================================================
    /**
     * [str, int, enum, text] - тип правила
     *
     * @param string sType
     * @return ModelOneRuleC
     */
    type(sType) {
        this.aRule.type = sType;
        return this;
    }
    // arrayNumbers = "arrayNumbers", // js number[]
    /** Целое число */
    typeInt() {
        this.aRule.type = __1.ModelRulesT.int;
        return this;
    }
    /** Текст */
    typeText() {
        this.aRule.type = __1.ModelRulesT.text;
        return this;
    }
    /** Строка - if:RegExp / if:enum(Array) */
    typeStr() {
        this.aRule.type = __1.ModelRulesT.str;
        return this;
    }
    /** Булево значение */
    typeBool() {
        this.aRule.type = __1.ModelRulesT.boolean;
        return this;
    }
    /** Список значений(number|string) */
    typeEnum() {
        this.aRule.type = __1.ModelRulesT.enum;
        return this;
    }
    /** JSON строка */
    typeJson() {
        this.aRule.type = __1.ModelRulesT.json;
        return this;
    }
    /** float двойной точности 10.00 */
    typeDecimal() {
        this.aRule.type = __1.ModelRulesT.decimal;
        return this;
    }
    /** js object {} */
    typeObject() {
        this.aRule.type = __1.ModelRulesT.object;
        return this;
    }
    /** js array [2,{},'dd'] */
    typeArray() {
        this.aRule.type = __1.ModelRulesT.array;
        return this;
    }
    /** js array [2,3,1,5] */
    typeArrayNumbers() {
        this.aRule.type = __1.ModelRulesT.arrayNumbers;
        return this;
    }
    // ===================================================
    /**
     * [rgexp<string>, enum(array)] - условие валидации
     *
     * @param mixed if
     * @return ModelOneRuleC
     */
    if(ifType) {
        this.aRule.if = ifType;
        return this;
    }
    /**
     * [true, false] - обязательное поле?
     *
     * @param boolean bRequire
     * @return ModelOneRuleC
     */
    require() {
        this.aRule.require = true;
        return this;
    }
    /**
     * [column] От какого поля зависит
     *
     * @param string sDepend
     * @return ModelOneRuleC
     */
    depend(sDepend) {
        this.aRule.depend = sDepend;
        return this;
    }
    /**
     * [текст ошибки] - Сообщение в случае если проверка не прошла
     *
     * @param string sError
     * @return ModelOneRuleC
     */
    error(sError) {
        this.aRule.error = sError;
        return this;
    }
    /**
     * [клич ошибки, сообшение ошибки] - Ключ и сообщение ошибки в случае если проверка не прошла
     *
     * @param string sError
     * @return ModelOneRuleC
     */
    errorEx(sKey, sError) {
        this.aRule.error_key = { key: sKey, msg: sError };
        this.error(sError); // Вывод стандартных ошибок
        return this;
    }
    /**
     * Значение по умолчанию
     *
     * @param mixed val
     * @return ModelOneRuleC
     */
    def(val) {
        this.aRule.def = val;
        return this;
    }
    /**
     * Максимальная длинна строки
     *
     * @param [type] iVal
     * @return ModelOneRuleC
     */
    maxLen(iVal) {
        this.aRule.max_len = iVal;
        return this;
    }
    /**
     * Минимальная длинна строки
     *
     * @param [type] iVal
     * @return ModelOneRuleC
     */
    minLen(iVal) {
        this.aRule.min_len = iVal;
        return this;
    }
    /**
     * Больше
     * @param iVal - Числовое сравнение [больше]
     */
    more(iVal) {
        this.aRule.more = iVal;
        return this;
    }
    /**
     * Больше или равно
     * @param iVal - Числовое сравнение [больше или равно]
     */
    moreOrEq(iVal) {
        this.aRule.more_or_equal = iVal;
        return this;
    }
    /**
     * Меньше
     * @param iVal - Числовое сравнение [меньше]
     */
    less(iVal) {
        this.aRule.less = iVal;
        return this;
    }
    /**
     * Меньше или равно
     * @param iVal - Числовое сравнение [меньше или равно]
     */
    lessOrEq(iVal) {
        this.aRule.less_or_equal = iVal;
        return this;
    }
    /**
     * Получить правило
     *
     * @return array
     */
    get() {
        if (!this.aRule.type) { // Тип
            this.aRule.type = null;
        }
        if (!this.aRule.if) { // Условие
            this.aRule.if = null;
        }
        if (!this.aRule.require) { //  Поле обязательно для заполнения
            this.aRule.require = false;
        }
        if (!this.aRule.depend) { // Зависемость от другова поля
            this.aRule.depend = null;
        }
        if (!this.aRule.error) { // Текст об ошибке
            this.aRule.error = null;
        }
        return this.aRule;
    }
    /**
     * Получить название колонки
     *
     * @return string
     */
    getKey() {
        return this.aRule.key;
    }
}
exports.ModelOneRuleC = ModelOneRuleC;
//# sourceMappingURL=ModelOneRuleC.js.map