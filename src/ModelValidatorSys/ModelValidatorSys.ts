// Системные сервисы
import { ErrorSys } from '../ErrorSys/ErrorSys';
import { ModelValidatorTaskS } from './ModelValidatorTaskS';
import { ModelRulesI } from './ModelRulesE';
import { ModelRulesT } from '..';


/**
 * Системный сервис валидации данных для моделей
 */
export class ModelValidatorSys {
	protected okResult: boolean; // Статус проверки
	protected abValidOK: any; // поля успешно прошедшие проверку
	public data: any; // Входящие данные
	public aResult: any; // Отфильтрованные проверенные данные
	protected aResultType: any;
	protected aMsg: string[]; // Сообщения валидации

	/**
	 * Система регистрации ошибок
	 */
	public errorSys: ErrorSys;
	protected vValidatorTask:ModelValidatorTaskS;


	constructor(errorSys: ErrorSys) {
		this.errorSys = errorSys;
		this.vValidatorTask = new ModelValidatorTaskS(this);
	}

	// ================================================================

	/**
	 * Получить проверенные отфильтрованные данные в качестве массива
	 *
	 * @return array|null
	 */
	public getResult(): { [key: string]: any } { // Получить проверенные отфильтрованные данные
		return this.aResult;
	}
	public getStatus() { // Получиь статус проверки
		return this.okResult;
	}
	public getMsg(): string[] {
		return this.aMsg;
	}

	/**
	 * Валидация данных
	 * @param aRules
	 * @param data
	 */
	public fValid(aRules: {[key:string]:ModelRulesI}, data: { [key: string]: any }) { // Проверка данных

		this.data = data;
		this.okResult = true; // [true/false] - Успешно или нет прошла валидация
		this.abValidOK = {};
		this.aResult = {};
		this.aMsg = [];

		const akRules = Object.keys(aRules);
		for (let i = 0; i < akRules.length; i++) {
			const k = akRules[i]; // Ключ поля
			const v = aRules[k]; // Правила валидации

			this.abValidOK[k] = true;

			//Подстановка значений по умолчанию, если значения нет
			if( this.okResult && (v.def || v.def === 0) && !this.data[k] ){
				this.data[k] = v.def;
			}

			if( 'error_key' in v ){ // Если указываем ключ ошибки декларируем ее
				let errorKey:any = {};
				errorKey[v.error_key.key] = v.error_key.msg;
			}

			//Проверка существования данных
			let bExist = this.vValidatorTask.checkExist(this.data[k]);

			//Проверка зависимостей
			let bDpend = true;
			if( v.depend ){
				this.fDepend(k,v);
			}//if

			//Проверка - обязательного поля
			if( v.require ){
				this.fRequire(k,v);
			}

			// Обработка [string] значений
			if( bExist && bDpend && v.type == ModelRulesT.str ){
				this.fTypeStr(k,v);
			}

			// Обработка [boolean] значений
			if( bExist && bDpend && v.type == ModelRulesT.boolean ){
				this.fTypeBool(k,v);
			}

			// Обработка [integer] значений
			if( bExist && bDpend && v.type == ModelRulesT.int ){
				this.fTypeInt(k,v);
			}

			// Обработка [enum] значений
			if( bExist && bDpend && v.type == ModelRulesT.enum ){
				this.fTypeEnum(k,v);
			}

			// Обработка [text] значений
			if( bExist && bDpend && v.type == ModelRulesT.text ){
				this.fTypeText(k,v);
			}

			// Обработка [json] значений
			if( bExist && bDpend && v.type == ModelRulesT.json ){
				this.fTypeJson(k,v);
			}

			// Обработка [decimal] значений
			if( bExist && bDpend && v.type == ModelRulesT.decimal ){
				this.fTypeDecimal(k,v);
			}

            // Обработка [arrayNumbers] значений
            if (bExist && bDpend && v.type === ModelRulesT.arrayNumbers) {
				this.fTypeArrayNumbers(k,v);
			}
			
			// Обработка [object] значений
			if( bExist && bDpend && v.type == ModelRulesT.object ){
				this.fTypeObject(k,v);
			}

			// Обработка [array] значений
			if( bExist && bDpend && v.type == ModelRulesT.array ){
				this.fTypeArray(k,v);
			}

			// =================================================
			// Логические проверки
			// =================================================

			// Обработка [more] значений - Проверка на больше
			if( bExist && 'more' in v ){
				this.fMore(k,v);
			}

			// Обработка [more_or_equal] значений - Проверка на больше или равно
			if (bExist && 'more_or_equal' in v) {
				this.fMoreOrEqual(k,v);
			}

			// Обработка [less] значений - Проверка на меньше
			if( bExist && 'less' in v ){
				this.fLess(k,v);
			}

			// Обработка [less_or_equal] значений - Проверка на меньше или равно
			if (bExist && 'less_or_equal' in v) {
				this.fLessOrEqual(k,v);
			}

			// Обработка [max_len] значений - Проверка на большее
			if( bExist && 'max_len' in v ){
				this.fMaxLen(k,v);
            }

            // Обработка [min_len] значений - Проверка на меньшее
            if (bExist && 'min_len' in v) {
				this.fMinLen(k,v);
            }

            // ============================================

			// Кастомная ошибка на поле [error_key]
			if( !this.abValidOK[k] && 'error_key' in v ){ // Вызываем кастомную ошибку, если она произошла и была указана
				this.errorSys.error(v.error_key.key, v.error_key.msg);
			}



		} // for

		return this.okResult;
	}

	/**
	 * TODO проверить работоспособность
	 * Проверяет корректно условие зависимости или нет
	 * @param v 
	 */
	private fDepend(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		const akDepend = Object.keys(vRule.depend);
		for (let i = 0; i < akDepend.length; i++) {
			const kDepend = akDepend[i];
			// TODO востановить работу

			// const vDepend = vRule.depend[kDepend];
			// if( this.okResult && this.abValidOK[kDepend] ){
			// 	if( this.abValidOK[kDepend] && this.data[kDepend] ){
			// 		if( !(this.data[kDepend] == vDepend || vDepend == '*') ){

			// 			bOk = false;
			// 			this.errorSys.error('valid_'+kRule+'_depend', kRule+' - поле не прошло проверку зависимостей');

			// 		}
			// 	}
			// }//if
		}; //for

		return bOk;
	}

	// ==============================================================

	/**
	 * Проверка поля на наличие
	 * @param kRule 
	 * @param vRule 
	 */
	private fRequire(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.checkExist(this.data[kRule]) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_require', kRule+' - поле обязательно для заполнения');
		}

		return bOk;
	}

	/**
	 * Проверка типа str
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeStr(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidString(kRule, vRule.if) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_str', vRule.error+' Ошибка string = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа boolean
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeBool(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidBool(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_bool', vRule['error']+' Ошибка boolean = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа boolean
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeInt(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidInt(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_int', vRule['error']+' Ошибка int = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа enum
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeEnum(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidEnum(kRule, <any[]>vRule.if) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_enum', vRule['error']+' Ошибка enum = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа text
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeText(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidText(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_text', vRule.error+' Ошибка text = '+this.data[kRule]);
		}

		return bOk;
	}
	
	/**
	 * Проверка типа json поля
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeJson(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidJson(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_json', vRule['error']+' Ошибка json = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа decimal поля
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeDecimal(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidDecimal(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_decimal', vRule.error+' Ошибка decimal = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа arrayNumbers поля
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeArrayNumbers(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if (!this.vValidatorTask.fValidArrayNumbers(kRule)) {
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_' + kRule + '_arrayNumbers', vRule.error + ' Ошибка arrayNumbers = ' + this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа object поля
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeObject(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidObject(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_object', vRule.error+' Ошибка object = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка типа array поля
	 * @param kRule 
	 * @param vRule 
	 */
	private fTypeArray(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( !this.vValidatorTask.fValidArray(kRule) ){
			this.okResult = false;
			this.abValidOK[kRule] = false;
			this.errorSys.error('valid_'+kRule+'_array', vRule.error+' Ошибка array = '+this.data[kRule]);
		}

		return bOk;
	}

	/**
	 * Проверка больше
	 * @param kRule 
	 * @param vRule 
	 */
	private fMore(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if( vRule.type == ModelRulesT.int || vRule.type == ModelRulesT.decimal ){
			if( !this.vValidatorTask.fValidMore(kRule, vRule.more) ){
				this.okResult = false;
				this.abValidOK[kRule] = false;
				this.errorSys.error('valid_'+kRule+'_more', vRule['error']+' Число слишком маленькое = '+this.data[kRule]);
			}
		} else {
			this.errorSys.error('valid_'+kRule+'_more_no_number', vRule['error']+' Поле не является числом');
		}

		return bOk;
	}

	/**
	 * Проверка больше или равно
	 * @param kRule 
	 * @param vRule 
	 */
	private fMoreOrEqual(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if (vRule.type == ModelRulesT.int || vRule.type == ModelRulesT.decimal) {
			if( !this.vValidatorTask.fValidMoreOrEqual(kRule, vRule.more_or_equal) ){
				this.abValidOK[kRule] = false;
				this.okResult = false;
				this.errorSys.error('valid_' + kRule + '_more_or_equal', vRule.error + ' Число слишком маленькое = ' + this.data[kRule]);
			}
		} else {
			this.errorSys.error('valid_' + kRule + '_more_or_equal_no_number', vRule.error + ' Поле не является числом');
		}

		return bOk;
	}

	/**
	 * Проверка меньше
	 * @param kRule 
	 * @param vRule 
	 */
	private fLess(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if (vRule.type == ModelRulesT.int || vRule.type == ModelRulesT.decimal) {
			if( !this.vValidatorTask.fValidLess(kRule, vRule.less) ){
				this.okResult = false;
				this.abValidOK[kRule] = false;
				this.errorSys.error('valid_'+kRule+'_less', vRule.error+' Число слишком большое = '+this.data[kRule]);
			}
		} else {
			this.errorSys.error('valid_'+kRule+'_less_no_number', vRule.error+' Поле не является числом');
		}

		return bOk;
	}

	/**
	 * Проверка меньше или равно
	 * @param kRule 
	 * @param vRule 
	 */
	private fLessOrEqual(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		if (vRule.type == ModelRulesT.int || vRule.type == ModelRulesT.decimal) {
		
			if ( !this.vValidatorTask.fValidLessOrEqual(kRule, vRule.less_or_equal) ){
				this.abValidOK[kRule] = false;
				this.okResult = false;
				this.errorSys.error('valid_' + kRule + '_less_or_equal', vRule['error'] + ' Число слишком большое = ' + this.data[kRule]);
			}
		} else {
			this.errorSys.error('valid_' + kRule + '_less_or_equal_no_number', vRule['error'] + ' Поле не является числом');
		}

		return bOk;
	}


	/**
	 * Проверка меньше или равно
	 * @param kRule 
	 * @param vRule 
	 */
	private fMaxLen(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		// Проверка является ли поле текстовым
		if( vRule.type == ModelRulesT.text || vRule.type == ModelRulesT.str ){
			if( !this.vValidatorTask.fValidMaxLen(kRule, vRule.max_len) ){

				this.okResult = false;
				this.abValidOK[kRule] = false;
				this.errorSys.error('valid_'+kRule+'_max_len', vRule['error']+' Превышено количество символов = '+this.data[kRule] );
			}
		} else {
			this.errorSys.error('valid_'+kRule+'_max_len_no_string', 'Поле не является строкой');
		}

		return bOk;
	}

	/**
	 * Проверка меньше или равно
	 * @param kRule 
	 * @param vRule 
	 */
	private fMinLen(kRule:string,vRule:ModelRulesI):boolean{
		let bOk = true;

		// Проверка является ли поле текстовым
		if( vRule.type == ModelRulesT.text || vRule.type == ModelRulesT.str ){
			if (this.vValidatorTask.fValidMinLen(kRule, vRule.min_len)) {
				this.abValidOK[kRule] = true;
			} else {
				this.okResult = false;
				this.errorSys.error(
					`valid_'${kRule}_min_len`,
					`${vRule.error} Количество символов меньше минимального значения = ${this.data[kRule]}`);
			}
		} else {
			this.errorSys.error(`valid_${kRule}_min_len_no_string`, 'Поле не является строкой');
		}

		return bOk;
	}		
	
}
