import { ModelOneRuleC } from "..";


/**
 * Класс с шаблонами правил для одного поля
 */
export class ModelTplRuleC {

	private vRule:ModelOneRuleC;

	constructor(sColumn: string) {
		this.vRule = new ModelOneRuleC(sColumn);
	}
}

