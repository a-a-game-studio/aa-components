import { ErrorSys } from "../ErrorSys";
/**
 * Валидатор поля
 */
export declare class FieldValidator {
    protected errorSys: ErrorSys;
    protected bOk: boolean;
    protected data: any;
    protected sErr: string;
    constructor(errorSys: ErrorSys, data: any);
    protected fErr(sError: string): void;
    fGetErrorSys(): ErrorSys;
    /**
     * строка примечание к ошибке
     * @param e
     */
    setErrorString(sErr: string): FieldValidator;
    fExist(): FieldValidator;
    /**
     * Text validator
     *
     * @param string sKey
     * @return boolean
     */
    fText(): FieldValidator;
    /**
    * Валидирует булевую переменную
    *
    * @param string sKey
    * @param string sTpl
    * @return boolean
    */
    protected fBool(): FieldValidator;
    /**
     * Проверяет числовые значения
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    protected fInt(): FieldValidator;
    /**
     * Проверяет дату
     *
     * @param string sKey
     * @return boolean
     */
    protected fDate(): FieldValidator;
    /**
     * Проверяет числовые значения - 2.22
     *
     * @param string sKey
     * @return boolean
     */
    protected fDecimal(): FieldValidator;
    /**
     * Проверяет на больше
     *
     * @param string sTpl
     * @return boolean
     */
    protected fMore(iVal: number): FieldValidator;
    /**
     * Проверяет на больше
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    protected fMoreOrEqual(iVal: number): FieldValidator;
    /**
     * Проверяет на меньше
     *
     * @param string sTpl
     * @return boolean
     */
    protected fLess(iVal: number): FieldValidator;
    /**
     * Проверяет на меньше или равно
     *
     * @param string number
     */
    protected fLessOrEqual(iVal: number): FieldValidator;
    /**
     * Проверяет на макс количесво символов
     *
     * @param iLen: number
     */
    protected fMaxLen(iLen: number): FieldValidator;
    /**
     * Проверяет на минимальное количесво символов
     *
     * @param iLen: number
     */
    protected fMinLen(iLen: number): FieldValidator;
}
