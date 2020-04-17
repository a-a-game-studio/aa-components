import { ModelOneRuleC } from "..";
/**
 * Класс с шаблонами правил для одного поля
 */
export declare class ModelTplRuleC {
    private vRule;
    constructor(sColumn: string, bRequire?: boolean);
    /** ID > 0 */
    tplID(sMsg: string): ModelOneRuleC;
    /** int - целое число */
    tplInt(sMsg: string): ModelOneRuleC;
    /** text - простой текст */
    tplText(sMsg: string): ModelOneRuleC;
    /** str - if опция if:RegEx if:['ss','af'] */
    tplStr(sMsg: string): ModelOneRuleC;
    /** array ['se',123,2,4,'12'] */
    tplArray(sMsg: string): ModelOneRuleC;
    /** array number [1,2,54,2] */
    tplArrayNumber(sMsg: string): ModelOneRuleC;
    /** boolean 1|0 */
    tplBool(sMsg: string): ModelOneRuleC;
    /** enum ['ws',2,34] => 34 */
    tplEnum(sMsg: string): ModelOneRuleC;
    /** decimal 10.01 */
    tplDecimal(sMsg: string): ModelOneRuleC;
    /** json "{}" "[]" */
    tplJson(sMsg: string): ModelOneRuleC;
    /** object {} */
    tplObject(sMsg: string): ModelOneRuleC;
    /** login */
    tplLogin(sMsg: string): ModelOneRuleC;
    /** UUID 36 символов */
    tplUUID(sMsg: string): ModelOneRuleC;
    /** MD5 32 символа */
    tplMD5(sMsg: string): ModelOneRuleC;
    /** email name12@yandex.ru */
    tplEmail(sMsg: string): ModelOneRuleC;
    /** Телефон 79998887766 */
    tplTel(sMsg: string): ModelOneRuleC;
    /** Пароль 123456asd */
    tplPswd(sMsg: string): ModelOneRuleC;
}
