import { ModelValidatorSys } from "..";
/**
 * Класс с шаблонами правил для одного поля
 */
export declare class ModelValidatorTaskS {
    private vValidatorSys;
    private data;
    constructor(vModelValidatorSys: ModelValidatorSys);
    /**
     * Валидирует и экранирует строковое значение
     *
     * @param string sKey - ключ в базе данных
     * @param string sTpl - регулярное выражение по которому проверять
     * @return boolean
     */
    fValidString(sKey: string, sTpl: RegExp | (number | string)[]): boolean;
    /**
     * Экранирует текст
     *
     * @param string sKey
     * @return boolean
     */
    fValidText(sKey: string): boolean;
    /**
     * Валидирует булевую переменную
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidBool(sKey: string): boolean;
    /**
     * Проверяет числовые значения
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidInt(sKey: string): boolean;
    /**
     * Проверяет числовые значения - 2.22
     *
     * @param string sKey
     * @return boolean
     */
    fValidDecimal(sKey: string): boolean;
    /**
     * Проверяет массив чисел
     *
     * @param string sKey
     * @return boolean
     */
    fValidArrayNumbers(sKey: string): boolean;
    /**
     * Проверка Enum параметров
     *
     * @param sKey - ключ значения
     * @param aEnumList - Список возможных значений
     */
    fValidEnum(sKey: string, aEnumList: any[]): boolean;
    /**
     * Экранирует JSON и проверяет
     * Если это массив конвертирует в JSON
     *
     * @param string sKey
     * @return boolean
     */
    fValidJson(sKey: string): boolean;
    /**
     * Проверяет объект ли это
     *
     * @param string sKey
     * @return boolean
     */
    fValidObject(sKey: string): boolean;
    /**
     * Проверяет массив ли это
     *
     * @param string sKey
     * @return boolean
     */
    fValidArray(sKey: string): boolean;
    /**
     * Проверяет на больше
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMore(sKey: string, iVal: number): boolean;
    /**
     * Проверяет на больше или равно
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMoreOrEqual(sKey: string, iVal: number): boolean;
    /**
     * Проверяет на меньше
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidLess(sKey: string, iVal: number): boolean;
    /**
     * Проверяет на меньше или равно
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidLessOrEqual(sKey: string, iVal: number): boolean;
    /**
     * Проверяет на макс количество символов
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMaxLen(sKey: string, iLen: number): boolean;
    /**
     * Проверяет минимальное количество символов
     *
     * @param string stringKey
     * @param number checkValue
     * @return boolean
     */
    fValidMinLen(stringKey: string, checkValue: number): boolean;
    /**
     * Проверить существование значения
     * @param val - Значение
     */
    checkExist(val: any): boolean;
}
