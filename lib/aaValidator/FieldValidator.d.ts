import { ErrorSys } from "../ErrorSys";
/**
 * Валидатор поля
 */
export declare class FieldValidator {
    errorSys: ErrorSys;
    protected bOk: boolean;
    protected data: any;
    protected sErr: string;
    protected iCounter: number;
    constructor(errorSys: ErrorSys, data: any);
    protected fErr(sError: string): void;
    fGetErrorSys(): ErrorSys;
    fIsOk(): boolean;
    /**
     * строка примечание к ошибке
     * @param e
     */
    fSetErrorString(sErr: string): FieldValidator;
    /**
     * Существование значения
     * @error isNotExist
     */
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
    * @error isNotBool
    * @param string sKey
    * @param string sTpl
    * @return boolean
    */
    fBool(): FieldValidator;
    /**
     * Проверяет числовые значения
     * @error isNotInt
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fInt(): FieldValidator;
    /**
     * Проверяет дату
     * @error isNotDate
     * @param string sKey
     * @return boolean
     */
    fDate(): FieldValidator;
    /**
     * Проверяет числовые значения - 2.22
     * @error isNotDecimal
     * @param string sKey
     * @return boolean
     */
    fDecimal(): FieldValidator;
    /**
     * Проверяет на больше
     * @error isNotMoreThan
     * @param iVal: number
     */
    fMore(iVal: number): FieldValidator;
    /**
     * Проверяет на больше
     * @error isNotMoreOrEqualThan
     * @param iVal: number
     */
    fMoreOrEqual(iVal: number): FieldValidator;
    /**
     * Проверяет на меньше
     *
     * @param iVal: number
     */
    fLess(iVal: number): FieldValidator;
    /**
     * Проверяет на меньше или равно
     *
     * @param iVal: number
     */
    fLessOrEqual(iVal: number): FieldValidator;
    /**
     * Проверяет на макс количесво символов
     *
     * @param iLen: number
     */
    fMaxLen(iLen: number): FieldValidator;
    /**
     * Проверяет на минимальное количесво символов
     *
     * @param iLen: number
     */
    fMinLen(iLen: number): FieldValidator;
    fEqual(Val: any): FieldValidator;
}
