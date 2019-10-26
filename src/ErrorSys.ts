
/**
 * Системный сервис обработки ошибок
 */
export class ErrorSys {

	public errorClass: string = 'Base'; // откуда вызывается ошибка

	private ok: boolean; // Глобальный статус выполнения
	private env: string; // тип окружения
	private ifDevMode: boolean; // Флаг режима разработки
	private errorList: { [s: string]: string }; // Ошибки
	private errorDeclareList: { [s: string]: string }; // список декларированных ошибок
	private devWarningList: { [s: string]: string }; // Пердупреждения пользователю
	private warningList: { [s: string]: string }; // Пердупреждения пользователю
	private devNoticeList: { [s: string]: string }; // Уведомления для разработки и тестирования
	private noticeList: { [s: string]: string }; // Уведомления для пользователя
	private devLogList: string[]; // Массив для логирования тестовой информации

	private traceList: { // Трейс ошибок errorEx
		key:string, msg:string, e:Error
	}[]; 


	private errorCount: number = 0;

	constructor(env:string = 'prod') {

		this.ok = true;
		this.env = env;
		if (this.env == 'local' || this.env == 'dev') {
			this.ifDevMode = true;
		} else {
			this.ifDevMode = false;
		}
		this.errorList = {};
		this.errorDeclareList = {};
		this.devWarningList = {};
		this.warningList = {};
		this.devNoticeList = {};
		this.noticeList = {};
		this.devLogList = [];
		this.traceList = [];

		// Декларирование стандартных ошибок
		this.declareEx({
			throw_access:'Ошибка доступа',
			throw_valid:'Ошибка валидации данных ОБЩАЯ',
			throw_valid_route:'Ошибка валидации данных роутинга',
			throw_valid_db:'Ошибка валидации данных при сохранении в БД',
			throw_db:'Ошибка запроса в БД',
			throw_logic:'Ошибка логическая - в бизнес логике',
			throw:'Проброс ошибки'
		});

	}

	/**
	 * очистка стека
	 */
	public clear(): void {
		this.ok = true;
		this.errorList = {};
		this.devWarningList = {};
		this.warningList = {};
		this.devNoticeList = {};
		this.noticeList = {};
		this.devLogList = [];
		this.traceList = [];
		this.errorCount = 0;
		

	}

	/**
	 * Получить глобальный статус выполнения
	 *
	 * @return boolean
	 */
	public isOk(): boolean {
		return this.ok;
	}

	/**
	 * Получить режим окружения
	 *
	 * @return boolean
	 */
	public isDev(): boolean {
		return this.ifDevMode;
	}

	/**
	 *	Декларировать одну возможную ошибку
	 *
	 * @param keyError
	 */
	public decl(keyError: string, infoError: string) {
		this.errorDeclareList[keyError] = infoError;
	}

	/**
	 *	Декларация возможных ошибок
	 *
	 * @param keyErrorList
	 */
	public declare(keyErrorList: string[]) {
		for (let i = 0; i < keyErrorList.length; i++) {
			this.errorDeclareList[keyErrorList[i]] = null;
		}
	}

	/**
	 *	Декларация возможных ошибок
	 *
	 * @param keyErrorList
	 */
	public declareEx(keyErrorList: { [key: string]: string }) {

		Object.assign(this.errorDeclareList, keyErrorList);
	}

	/**
	 * Добавляет ошибку в стек
	 *
	 * @param string kError - ключ ошибки
	 * @param string sError - сообщение
	 * @return void
	 */
	public error(kError: string, sError?: string): void {

		if (sError) {
			this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
			this.errorList[kError] = sError;
		} else {
			this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
			this.errorList[kError] = kError;
		}

		if( this.ifDevMode ){
			this.devLogList.push('E:['+kError+'] - '+sError);
			console.log('E:['+kError+'] - '+sError);

			// Проверка на декларацию ошибок
			if (!(kError in this.errorDeclareList)) {
				this.devWarning(kError, 'Отсутствует декларация ошибки');
			}
		}

		this.errorCount++;

	}


	public getErrorCount(): number {
		return this.errorCount;
	}

	/**
	 * Добавление ошибки в стек по ключу декларирования
	 * @param kError 
	 */
	public setError(kError: string) {
		this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
		this.errorList[kError] = this.errorDeclareList[kError];

		// Проверка на декларацию ошибок
		if (!(kError in this.errorDeclareList)) {
			this.devWarning(kError, 'Отсутствует декларация ошибки');
		}
	}

	/**
	 * Сокращенный вариант
	 * Добавляет ошибку в стек (используя в качестве сообщения значение из декларации)
	 *
	 * @param string kError - ключ ошибки
	 * @return void
	 */
	public err( kError:string ): void{
		if( this.errorDeclareList[kError] ){
			this.error(kError, this.errorDeclareList[kError]);
		} else {
			this.error(kError, 'Неизвестная ошибка');
			this.devWarning(kError, 'Отсутствует декларация ошибки');
		}

	}

	/**
	 * Добавляет ошибку в стек,
	 * В dev режиме выводит catch(e) ошибки в консоль
	 *
	 * @param e // Error exeption
	 * @param kError // Ключ ошибки - для тестирования
	 * @param sError // Сообщение об ошибке
	 */
	public errorEx(e:any, kError:string, sError:string ): void{
		this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
		this.errorList[kError] = sError;
		this.traceList.push({
			key:kError,
			msg:sError,
			e:e
		});

		if( this.ifDevMode ){
			this.devLogList.push('E:['+kError+'] - '+sError);
			console.log('E:['+kError+'] - '+sError);
			console.log('Ошибка - ', e);

			// Проверка на декларацию ошибок
			if( !(kError in this.errorDeclareList) ){
				this.devWarning(kError, 'Отсутствует декларация ошибки');
			}
		}
	}

	/**
	 * Проброс ошибки
	 * @param sError 
	 */
	public throw(e:Error, sError:string){
		this.error('throw', sError);
		return e;
	}

	/**
	 * Ошибка доступа
	 * @param sError 
	 */
	public throwAccess(sError:string){
		this.error('throw_access', sError);
		return new Error(sError);
	}

	/**
	 * Ошибка валидации данных ОБЩАЯ
	 * @param sError 
	 */
	public throwValid(sError:string){
		this.error('throw_valid', sError);
		return new Error(sError);
	}

	/**
	 * Ошибка валидации данных роутинга
	 * @param sError 
	 */
	public throwValidRoute(sError:string){
		this.error('throw_valid_route', sError);
		return new Error(sError);;
	}

	/**
	 * Ошибка валидации данных при сохранении в БД
	 * @param sError 
	 */
	public throwValidDB(sError:string){
		this.error('throw_valid_db', sError);
		return new Error(sError);;
	}

	/**
	 * Ошибка запроса в БД
	 * @param sError 
	 */
	public throwDB(sError:string){
		this.error('throw_db', sError);
		return new Error(sError);;
	}

	/**
	 * Ошибка логическая - в бизнес логике
	 * @param sError 
	 */
	public throwLogin(sError:string){
		this.error('throw_logic', sError);
		return new Error(sError);;
	}

	/**
	 * Добавляет уведомление в стек
	 *
	 * @param string kNotice - ключ ошибки
	 * @param string sNotice - сообщение
	 * @return void
	 */
	public notice(kNotice: string, sNotice: string): void {
		this.noticeList[kNotice] = sNotice;
	}

	/**
	 * Добавляет уведомление для разработки в стек
	 *
	 * @param string kNotice - ключ ошибки
	 * @param string sNotice - сообщение
	 * @return void
	 */
	public devNotice(kNotice: string, sNotice: string): void {
		if (this.ifDevMode) {
			this.devNoticeList[kNotice] = sNotice;
			this.devLogList.push('N:[' + kNotice + '] - ' + sNotice);
			console.log('N:[' + kNotice + '] - ' + sNotice);
		}
	}

	/**
	 * Добавляет предупреждение в стек
	 *
	 * @param string kWarning - ключ ошибки
	 * @param string sWarning - сообщение
	 * @return void
	 */
	public warning(kWarning: string, sWarning: string): void {
		this.warningList[kWarning] = sWarning;
	}

	/**
	 * Добавляет предупреждение для разработки в стек
	 * Добавляется информация только в тестовом режиме
	 *
	 * @param string kWarning - ключ ошибки
	 * @param string sWarning - сообщение
	 * @return void
	 */
	public devWarning(kWarning: string, sWarning: string): void {
		if (this.ifDevMode) {
			this.devWarningList[kWarning] = sWarning;
			this.devLogList.push('W:[' + kWarning + '] - ' + sWarning);
			console.log('W:[' + kWarning + '] - ' + sWarning);
		}
	}

	// ==============================================================

	/**
	 * Получить все ошибки
	 *
	 * @return array|null - возвращаются ошибки (key, val)
	 */
	public getErrors(): { [s: string]: string } {
		return this.errorList;
	}

	/**
	 * Получить весь трейс ошибок
	 *
	 * @return - возвращаются ошибки {key, msg, e}[]
	 */
	public getTraceList(): { key:string, msg:string, e:Error }[] {
		return this.traceList;
	}

	/**
	 * Получить все декларации для DEV режима
	 */
	public getDeclareList(): { [s: string]: string } {
		return this.errorDeclareList;
	}

	/**
	 * Получить все декларации для DEV режима
	 */
	public getDevDeclare(): { [s: string]: string } {
		for (let k in this.errorDeclareList) {
			if (this.errorList[k] && !this.errorDeclareList[k]) {
				this.errorDeclareList[k] = this.errorList[k];
			}
		}

		return this.errorDeclareList;
	}

	/**
	 * Получить все предупреждения для разработки
	 *
	 * @return array|null - возвращаются предупреждения (key, val)
	 */
	public getDevWarning(): { [s: string]: string } {
		return this.devWarningList;
	}

	/**
	 * Получить все предупреждения для пользователя
	 *
	 * @return array|null - возвращаются предупреждения (key, val)
	 */
	public getWarning(): { [s: string]: string } {

		return this.warningList;
	}

	/**
	 * Получить все уведомления для разработки
	 *
	 * @return array|null - возвращаются уведомления (key, val)
	 */
	public getDevNotice(): { [s: string]: string } {

		return this.devNoticeList;
	}

	/**
	 * Получить все уведомления для пользователя
	 *
	 * @return array|null - возвращаются уведомления (key, val)
	 */
	public getNotice(): { [s: string]: string } {
		return this.noticeList;
	}

	/**
	 * Получить все логи для разработки
	 */
	public getDevLog(): string[] {
		return this.devLogList;
	}

}
