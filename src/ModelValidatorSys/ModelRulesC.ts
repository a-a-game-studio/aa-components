
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

	/**
	 * Создать правило
	 * @param sColumn 
	 */
	public rule(sColumn: string): ModelOneRuleC {
		return new ModelOneRuleC(sColumn);
	}

	/**
	 * Создать правило из шаблона
	 * @param sColumn 
	 */
	public tpl(sColumn: string, bRequire:boolean = false): ModelTplRuleC {
		return new ModelTplRuleC(sColumn, bRequire);
	}

	/**
	 * Добавить готовое правило
	 * @param oneRule 
	 */
	public set(oneRule: ModelOneRuleC) {
		let k = oneRule.getKey();
		let a = oneRule.get();
		this.aRules[k] = a;
	}

	/**
	 * Получить список правил
	 */
	public get(): { [key: string]: any } {
		return this.aRules;
	}

}
