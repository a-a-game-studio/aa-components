import { ModelRulesT } from "..";
/**
 * Класс констроирующий правила для одного поля
 */
export declare class ModelOneRuleC {
    private aRule;
    constructor(sColumn: string);
    /**
     * [str, int, enum, text] - тип приавила
     *
     * @param string sType
     * @return ModelOneRuleC
     */
    type(sType: ModelRulesT): ModelOneRuleC;
    /** Целое число */
    typeInt(): ModelOneRuleC;
    /** Текст */
    typeText(): ModelOneRuleC;
    /** Строка - if:RegExp / if:enum(Array) */
    typeStr(): ModelOneRuleC;
    /** Булево значение */
    typeBool(): ModelOneRuleC;
    /** Список значений(number|string) */
    typeEnum(): ModelOneRuleC;
    /** JSON строка */
    typeJson(): ModelOneRuleC;
    /** float двойной точности 10.00 */
    typeDecimal(): ModelOneRuleC;
    /** js object {} */
    typeObject(): ModelOneRuleC;
    /** js array [2,{},'dd'] */
    typeArray(): ModelOneRuleC;
    /** js array [2,3,1,5] */
    typeArrayNumbers(): ModelOneRuleC;
    /**
     * [rgexp<string>, enum(array)] - условие валидации
     *
     * @param mixed if
     * @return ModelOneRuleC
     */
    if(ifType: any): ModelOneRuleC;
    /**
     * [true, false] - обязательное поле?
     *
     * @param boolean bRequire
     * @return ModelOneRuleC
     */
    require(): ModelOneRuleC;
    /**
     * [column] От какого поля зависит
     *
     * @param string sDepend
     * @return ModelOneRuleC
     */
    depend(sDepend: string): ModelOneRuleC;
    /**
     * [текст ошибки] - Сообщение в случае если проверка не прошла
     *
     * @param string sError
     * @return ModelOneRuleC
     */
    error(sError: string): ModelOneRuleC;
    /**
     * [клич ошибки, сообшение ошибки] - Ключ и сообщение ошибки в случае если проверка не прошла
     *
     * @param string sError
     * @return ModelOneRuleC
     */
    errorEx(sKey: string, sError: string): ModelOneRuleC;
    /**
     * Значение по умолчанию
     *
     * @param mixed val
     * @return ModelOneRuleC
     */
    def(val: any): ModelOneRuleC;
    /**
     * Максимальная длинна строки
     *
     * @param [type] iVal
     * @return ModelOneRuleC
     */
    maxLen(iVal: number): ModelOneRuleC;
    /**
     * Минимальная длинна строки
     *
     * @param [type] iVal
     * @return ModelOneRuleC
     */
    minLen(iVal: number): ModelOneRuleC;
    /**
     * Больше
     * @param iVal - Числовое сравнение [больше]
     */
    more(iVal: number): ModelOneRuleC;
    /**
     * Больше или равно
     * @param iVal - Числовое сравнение [больше или равно]
     */
    moreOrEq(iVal: number): ModelOneRuleC;
    /**
     * Меньше
     * @param iVal - Числовое сравнение [меньше]
     */
    less(iVal: number): ModelOneRuleC;
    /**
     * Меньше или равно
     * @param iVal - Числовое сравнение [меньше или равно]
     */
    lessOrEq(iVal: number): ModelOneRuleC;
    /**
     * Получить правило
     *
     * @return array
     */
    get(): {
        [key: string]: any;
    };
    /**
     * Получить название колонки
     *
     * @return string
     */
    getKey(): string;
}
