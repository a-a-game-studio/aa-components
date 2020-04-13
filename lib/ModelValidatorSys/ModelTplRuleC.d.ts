import { ModelOneRuleC } from "..";
/**
 * Класс с шаблонами правил для одного поля
 */
export declare class ModelTplRuleC {
    private vRule;
    constructor(sColumn: string, bRequire?: boolean);
    /** ID > 0 */
    id(sMsg: string): ModelOneRuleC;
    /** int - целое число */
    int(sMsg: string): ModelOneRuleC;
    /** text - простой текст */
    text(sMsg: string): ModelOneRuleC;
    /** str - if опция if:RegEx if:['ss','af'] */
    str(sMsg: string): ModelOneRuleC;
    /** array ['se',123,2,4,'12'] */
    array(sMsg: string): ModelOneRuleC;
    /** array number [1,2,54,2] */
    arrayNumber(sMsg: string): ModelOneRuleC;
    /** boolean 1|0 */
    bool(sMsg: string): ModelOneRuleC;
    /** enum ['ws',2,34] => 34 */
    enum(sMsg: string): ModelOneRuleC;
    /** decimal 10.01 */
    decimal(sMsg: string): ModelOneRuleC;
    /** json "{}" "[]" */
    json(sMsg: string): ModelOneRuleC;
    /** object {} */
    object(sMsg: string): ModelOneRuleC;
}
