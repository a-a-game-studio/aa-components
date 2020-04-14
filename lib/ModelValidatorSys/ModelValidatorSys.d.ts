import { ErrorSys } from '../ErrorSys/ErrorSys';
import { ModelValidatorTaskS } from './ModelValidatorTaskS';
import { ModelRulesI } from './ModelRulesE';
/**
 * Системный сервис валидации данных для моделей
 */
export declare class ModelValidatorSys {
    protected okResult: boolean;
    protected abValidOK: any;
    data: any;
    aResult: any;
    protected aResultType: any;
    protected aMsg: string[];
    /**
     * Система регистрации ошибок
     */
    errorSys: ErrorSys;
    protected vValidatorTask: ModelValidatorTaskS;
    constructor(errorSys: ErrorSys);
    /**
     * Получить проверенные отфильтрованные данные в качестве массива
     *
     * @return array|null
     */
    getResult(): any;
    getStatus(): boolean;
    getMsg(): string[];
    /**
     * Валидация данных
     * @param aRules
     * @param data
     */
    fValid(aRules: {
        [key: string]: ModelRulesI;
    }, data: {
        [key: string]: any;
    }): boolean;
    /**
     * TODO проверить работоспособность
     * Проверяет корректно условие зависимости или нет
     * @param v
     */
    private fDepend;
    /**
     * Проверка поля на наличие
     * @param kRule
     * @param vRule
     */
    private fRequire;
    /**
     * Проверка типа str
     * @param kRule
     * @param vRule
     */
    private fTypeStr;
    /**
     * Проверка типа boolean
     * @param kRule
     * @param vRule
     */
    private fTypeBool;
    /**
     * Проверка типа boolean
     * @param kRule
     * @param vRule
     */
    private fTypeInt;
    /**
     * Проверка типа enum
     * @param kRule
     * @param vRule
     */
    private fTypeEnum;
    /**
     * Проверка типа text
     * @param kRule
     * @param vRule
     */
    private fTypeText;
    /**
     * Проверка типа json поля
     * @param kRule
     * @param vRule
     */
    private fTypeJson;
    /**
     * Проверка типа decimal поля
     * @param kRule
     * @param vRule
     */
    private fTypeDecimal;
    /**
     * Проверка типа arrayNumbers поля
     * @param kRule
     * @param vRule
     */
    private fTypeArrayNumbers;
    /**
     * Проверка типа object поля
     * @param kRule
     * @param vRule
     */
    private fTypeObject;
    /**
     * Проверка типа array поля
     * @param kRule
     * @param vRule
     */
    private fTypeArray;
    /**
     * Проверка больше
     * @param kRule
     * @param vRule
     */
    private fMore;
    /**
     * Проверка больше или равно
     * @param kRule
     * @param vRule
     */
    private fMoreOrEqual;
    /**
     * Проверка меньше
     * @param kRule
     * @param vRule
     */
    private fLess;
    /**
     * Проверка меньше или равно
     * @param kRule
     * @param vRule
     */
    private fLessOrEqual;
    /**
     * Проверка меньше или равно
     * @param kRule
     * @param vRule
     */
    private fMaxLen;
    /**
     * Проверка меньше или равно
     * @param kRule
     * @param vRule
     */
    private fMinLen;
}
