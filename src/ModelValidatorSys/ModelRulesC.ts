
import { ModelOneRuleC } from "./ModelOneRuleC"
import { ModelTplRuleC } from "./ModelTplRuleC";


/**
 * Конструктор правил валидации
 */
export class ModelRulesC {

	private aRules: { [key: string]: any };

	constructor() {
		this.aRules = {};
	}

	public rule(sColumn: string): ModelOneRuleC {
		return new ModelOneRuleC(sColumn);
	}

	public tpl(sColumn: string): ModelTplRuleC {
		return new ModelTplRuleC(sColumn);
	}

	public set(oneRule: ModelOneRuleC) {
		let k = oneRule.getKey();
		let a = oneRule.get();
		this.aRules[k] = a;
	}

	public get(): { [key: string]: any } {
		return this.aRules;
	}

}
