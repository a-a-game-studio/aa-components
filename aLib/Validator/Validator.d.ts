import { ModelOneRuleC } from "./ModelOneRuleC";
export declare class Validator {
    private aRules;
    constructor();
    rule(sColumn: string): ModelOneRuleC;
    set(oneRule: ModelOneRuleC): void;
    get(): {
        [key: string]: any;
    };
}
