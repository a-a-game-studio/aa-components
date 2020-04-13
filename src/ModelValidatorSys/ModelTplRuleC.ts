import { ModelOneRuleC } from "..";


/**
 * Класс с шаблонами правил для одного поля
 */
export class ModelTplRuleC {

	private vRule:ModelOneRuleC;

	constructor(sColumn: string, bRequire:boolean = false) {
		this.vRule = new ModelOneRuleC(sColumn);

		if(bRequire){
			this.vRule.require();
		}
	}

	/** ID > 0 */
	public tplID(sMsg:string): ModelOneRuleC {
		this.vRule.typeInt();
		this.vRule.more(0);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** int - целое число */
	public tplInt(sMsg:string): ModelOneRuleC {
		this.vRule.typeInt();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** text - простой текст */
	public tplText(sMsg:string): ModelOneRuleC {
		this.vRule.typeText();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** str - if опция if:RegEx if:['ss','af'] */
	public tplStr(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** array ['se',123,2,4,'12'] */
	public tplArray(sMsg:string): ModelOneRuleC {
		this.vRule.typeArray();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** array number [1,2,54,2] */
	public tplArrayNumber(sMsg:string): ModelOneRuleC {
		this.vRule.typeArrayNumbers();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** boolean 1|0 */
	public tplBool(sMsg:string): ModelOneRuleC {
		this.vRule.typeBool();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** enum ['ws',2,34] => 34 */
	public tplEnum(sMsg:string): ModelOneRuleC {
		this.vRule.typeEnum();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** decimal 10.01 */
	public tplDecimal(sMsg:string): ModelOneRuleC {
		this.vRule.typeDecimal();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** json "{}" "[]" */
	public tplJson(sMsg:string): ModelOneRuleC {
		this.vRule.typeJson();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** object {} */
	public tplObject(sMsg:string): ModelOneRuleC {
		this.vRule.typeObject();
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}
}

