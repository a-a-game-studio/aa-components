// Системные сервисы
import { ErrorSys } from '../ErrorSys/ErrorSys';
import { isArray } from 'lodash';
import { ModelValidatorTaskS } from './ModelValidatorTaskS';


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

	//ФОРМАТ ПРАВИЛА [
	//	key_field :[0:type, 1:condition, 2:required, 3:depend, 4:msg_error]
	//]
	public fValid(aRules: any, data: { [key: string]: any }) { // Проверка данных

		this.data = data;
		this.okResult = true; // [true/false] - Успешно или нет прошла валидация
		this.abValidOK = {};
		this.aResult = {};
		this.aMsg = [];

		//_.forEach(aRules, (v: any, k: any) => 
		for (let k in aRules) {
			let v = aRules[k];

			this.abValidOK[k] = true;

			//Подстановка значений по умолчанию, если значения нет
			if (this.okResult && (v['def'] || v['def'] == 0) && !this.data[k]) {
				this.data[k] = v['def'];
			}

			if( 'error_key' in v ){ // Если указываем ключ ошибки декларируем ее
				let errorKey:any = {};
				errorKey[v['error_key']['key']] = v['error_key']['msg'];
			}

			//Проверка существования данных
			let bExist = this.vValidatorTask.checkExist(this.data[k]);

			//Проверка зависимостей
			let bDpend = true;
			if (v['depend']) {

				

			}//if

			//Проверка - обязательного поля
			if (v['require']) {

				if ( !this.vValidatorTask.checkExist(this.data[k]) ) {
					this.okResult = false;
					this.abValidOK[k] = false;
					this.errorSys.error('valid_' + k + '_require', k + ' - поле обязательно для заполнения');
				}
			}

			// Обработка [string] значений
			if (bExist && bDpend && v['type'] == 'str') {

				if ( !this.vValidatorTask.fValidString(k, v['if']) ) {
					this.okResult = false;
					this.abValidOK[k] = false;
					this.errorSys.error('valid_' + k + '_str', v['error'] + ' Ошибка string = ' + this.data[k]);
				}
			}

			// Обработка [boolean] значений
			if (bExist && bDpend && v['type'] == 'boolean') {

				if ( !this.vValidatorTask.fValidBool(k) ) {
					this.okResult = false;
					this.abValidOK[k] = false;
					this.errorSys.error('valid_' + k + '_bool', v['error'] + ' Ошибка boolean = ' + this.data[k]);
				}
			}

			// Обработка [integer] значений
			if (bExist && bDpend && v['type'] == 'int') {

				if ( !this.vValidatorTask.fValidInt(k) ) {
					this.abValidOK[k] = false;
					this.okResult = false;
					this.errorSys.error('valid_' + k + '_int', v['error'] + ' Ошибка int = ' + this.data[k]);
				}
			}

			// Обработка [enum] значений
			if (bExist && bDpend && v['type'] == 'enum') {

				if ( !this.vValidatorTask.fValidEnum(k, v['if']) ) {
					this.abValidOK[k] = false;
					this.okResult = false;
					this.errorSys.error('valid_' + k + '_enum', v['error'] + ' Ошибка enum = ' + this.data[k]);
				}
			}

			// Обработка [text] значений
			if (bExist && bDpend && v['type'] == 'text') {

				if ( !this.vValidatorTask.fValidText(k) ) {
					this.abValidOK[k] = false;
					this.okResult = false;
					this.errorSys.error('valid_' + k + '_text', v['error'] + ' Ошибка text = ' + this.data[k]);
				}
			}

			// Обработка [json] значений
			if (bExist && bDpend && v['type'] == 'json') {

				if ( !this.vValidatorTask.fValidJson(k) ) {
					this.abValidOK[k] = false;
					this.okResult = false;
					this.errorSys.error('valid_' + k + '_json', v['error'] + ' Ошибка json = ' + this.data[k]);
				}
			}

			// Обработка [decimal] значений
			if (bExist && bDpend && v['type'] == 'decimal') {

				if ( !this.vValidatorTask.fValidDecimal(k) ) {
					this.okResult = false;
					this.abValidOK[k] = false;
					this.errorSys.error('valid_' + k + '_decimal', v['error'] + ' Ошибка decimal = ' + this.data[k]);
				}
			}

			// Обработка [array] значений
			if( bExist && bDpend && v['type'] == 'array' ){

				if( !this.vValidatorTask.fValidArray(k) ){
					this.okResult = false;
					this.abValidOK[k] = false;
					this.errorSys.error('valid_'+k+'_array', v['error']+' Ошибка array = '+this.data[k]);
				}
			}

			// =================================================
			// Логические проверки
			// =================================================

			// Обработка [more] значений - Проверка на больше
			if (bExist && 'more' in v) {

				if (v['type'] == 'int' || v['type'] == 'decimal') {
					if ( !this.vValidatorTask.fValidMore(k, v['more']) ) {
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_more', v['error'] + ' Число слишком маленькое = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_more_no_number', v['error'] + ' Поле не является числом');
				}
			}

			// Обработка [more_or_equal] значений - Проверка на больше или равно
			if (bExist && 'more_or_equal' in v) {

				if (v['type'] == 'int' || v['type'] == 'decimal') {
					if( !this.vValidatorTask.fValidMoreOrEqual(k, v['more_or_equal']) ){
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_more_or_equal', v['error'] + ' Число слишком маленькое = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_more_or_equal_no_number', v['error'] + ' Поле не является числом');
				}
			}

			// Обработка [less] значений - Проверка на меньше
			if (bExist && 'less' in v) {

				if (v['type'] == 'int' || v['type'] == 'decimal') {

					if ( !this.vValidatorTask.fValidLess(k, v['less']) ) {
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_less', v['error'] + ' Число слишком большое = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_less_no_number', v['error'] + ' Поле не является числом');
				}
			}

			// Обработка [less_or_equal] значений - Проверка на меньше или равно
			if (bExist && 'less_or_equal' in v) {

				if (v['type'] == 'int' || v['type'] == 'decimal') {

					if ( !this.vValidatorTask.fValidLessOrEqual(k, v['less_or_equal']) ){
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_less_or_equal', v['error'] + ' Число слишком большое = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_less_or_equal_no_number', v['error'] + ' Поле не является числом');
				}
			}

			// Обработка [max_len] значений - Проверка на большее
			if (bExist && 'max_len' in v) {

				// Проверка является ли поле текстовым
				if (v['type'] == 'text' || v['type'] == 'str') {
					if ( !this.vValidatorTask.fValidMaxLen(k, v['max_len']) ){
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_max_len', v['error'] + ' Превышено количество символов = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_max_len_no_string', 'Поле не является строкой');
				}
			}

			// Обработка [min_len] значений - Проверка на большее
			if (bExist && 'min_len' in v) {

				// Проверка является ли поле текстовым
				if (v['type'] == 'text' || v['type'] == 'str') {
					if ( !this.vValidatorTask.fValidMinLen(k, v['min_len']) ){
						this.abValidOK[k] = false;
						this.okResult = false;
						this.errorSys.error('valid_' + k + '_min_len', v['error'] + ' Малое количество символов = ' + this.data[k]);
					}
				} else {
					this.errorSys.error('valid_' + k + '_min_len_no_string', 'Поле не является строкой');
				}
			}

			// Кастомная ошибка на поле [error_key]
			if( !this.abValidOK[k] && 'error_key' in v ){ // Вызываем кастомную ошибку, если она произошла и была указана
				this.errorSys.error(v['error_key']['key'], v['error_key']['msg']);
			}

		}; // foreach

		return this.okResult;
	}

	/**
	 * Проверяет корректно условие зависимости или нет
	 * @param v 
	 */
	private fDepend(k:string,v:any):boolean{
		let bDpend = true;

		for (let kDepend in v['depend']) {
			if (this.okResult && this.abValidOK[kDepend]) {
				if (this.abValidOK[kDepend] && this.data[kDepend]) {
					if (!(this.data[kDepend] == v['depend'][kDepend] || v['depend'][kDepend] == '*')) {

						bDpend = false;
						this.errorSys.error('valid_' + k + '_depend', k + ' - поле не прошло проверку зависимостей');

					}
				}
			}//if
		}

		return bDpend;
	}

}
