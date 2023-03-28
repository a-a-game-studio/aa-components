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

	/** login */
	public tplLogin(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^[a-z][a-z0-9._-]*$/);
		this.vRule.minLen(3);
		this.vRule.maxLen(150);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** UUID 36 символов */
	public tplUUID(sMsg:string): ModelOneRuleC {
		this.vRule.typeText();
		this.vRule.minLen(36);
		this.vRule.maxLen(36);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** MD5 32 символа */
	public tplMD5(sMsg:string): ModelOneRuleC {
		this.vRule.typeText();
		this.vRule.minLen(32);
		this.vRule.maxLen(32);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** email name12@yandex.ru */
	public tplEmail(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,4}$/);
		this.vRule.minLen(5);
		this.vRule.maxLen(100);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** Телефон 79998887766 */
	public tplTel(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^79\d{9}$/);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** Пароль 123456asd */
	public tplPswd(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.minLen(6);
		this.vRule.maxLen(100);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** Дата 2022-09-15 */
	public tplDate(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])$/);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** Время 08:01:00 */
	public tplTime(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}

	/** Дата и время 2022-09-15 08:01:00 */
	public tplDateTime(sMsg:string): ModelOneRuleC {
		this.vRule.typeStr();
		this.vRule.if(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9]) ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/);
		this.vRule.errorEx(this.vRule.getKey(), sMsg);
		return this.vRule;
	}
}
