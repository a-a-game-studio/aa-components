"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Системный сервис обработки ошибок
 */
class ErrorSys {
    constructor(env = 'prod') {
        this.errorClass = 'Base'; // откуда вызывается ошибка
        this.errorCount = 0;
        this.ok = true;
        this.env = env;
        if (this.env == 'local' || this.env == 'dev') {
            this.ifDevMode = true;
        }
        else {
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
            throw_access: 'Ошибка доступа',
            throw_valid: 'Ошибка валидации данных ОБЩАЯ',
            throw_valid_route: 'Ошибка валидации данных роутинга',
            throw_valid_db: 'Ошибка валидации данных при сохранении в БД',
            throw_db: 'Ошибка запроса в БД',
            throw_logic: 'Ошибка логическая - в бизнес логике',
            throw: 'Проброс ошибки'
        });
    }
    /**
     * очистка стека
     */
    clear() {
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
    isOk() {
        return this.ok;
    }
    /**
     * Получить режим окружения
     *
     * @return boolean
     */
    isDev() {
        return this.ifDevMode;
    }
    /**
     *	Декларировать одну возможную ошибку
     *
     * @param keyError
     */
    decl(keyError, infoError) {
        this.errorDeclareList[keyError] = infoError;
    }
    /**
     *	Декларация возможных ошибок
     *
     * @param keyErrorList
     */
    declare(keyErrorList) {
        for (let i = 0; i < keyErrorList.length; i++) {
            this.errorDeclareList[keyErrorList[i]] = null;
        }
    }
    /**
     *	Декларация возможных ошибок
     *
     * @param keyErrorList
     */
    declareEx(keyErrorList) {
        Object.assign(this.errorDeclareList, keyErrorList);
    }
    /**
     * Добавляет ошибку в стек
     *
     * @param string kError - ключ ошибки
     * @param string sError - сообщение
     * @return void
     */
    error(kError, sError) {
        if (sError) {
            this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
            this.errorList[kError] = sError;
        }
        else {
            this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
            this.errorList[kError] = kError;
        }
        if (this.ifDevMode) {
            this.devLogList.push('E:[' + kError + '] - ' + sError);
            console.log('E:[' + kError + '] - ' + sError);
            // Проверка на декларацию ошибок
            if (!(kError in this.errorDeclareList)) {
                this.devWarning(kError, 'Отсутствует декларация ошибки');
            }
        }
        this.errorCount++;
    }
    getErrorCount() {
        return this.errorCount;
    }
    /**
     * Добавление ошибки в стек по ключу декларирования
     * @param kError
     */
    setError(kError) {
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
    err(kError) {
        if (this.errorDeclareList[kError]) {
            this.error(kError, this.errorDeclareList[kError]);
        }
        else {
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
    errorEx(e, kError, sError) {
        this.ok = false; // При любой одной ошибке приложение отдает отрицательный ответ
        this.errorList[kError] = sError;
        this.traceList.push({
            key: kError,
            msg: sError,
            e: e
        });
        if (this.ifDevMode) {
            this.devLogList.push('E:[' + kError + '] - ' + sError);
            console.log('E:[' + kError + '] - ' + sError);
            console.log('Ошибка - ', e);
            // Проверка на декларацию ошибок
            if (!(kError in this.errorDeclareList)) {
                this.devWarning(kError, 'Отсутствует декларация ошибки');
            }
        }
    }
    /**
     * Проброс ошибки
     * @param sError
     */
    throw(e, sError) {
        this.error('throw', sError);
        return e;
    }
    /**
     * Ошибка доступа
     * @param sError
     */
    throwAccess(sError) {
        this.error('throw_access', sError);
        return new Error(sError);
    }
    /**
     * Ошибка валидации данных ОБЩАЯ
     * @param sError
     */
    throwValid(sError) {
        this.error('throw_valid', sError);
        return new Error(sError);
    }
    /**
     * Ошибка валидации данных роутинга
     * @param sError
     */
    throwValidRoute(sError) {
        this.error('throw_valid_route', sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка валидации данных при сохранении в БД
     * @param sError
     */
    throwValidDB(sError) {
        this.error('throw_valid_db', sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка запроса в БД
     * @param sError
     */
    throwDB(sError) {
        this.error('throw_db', sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка логическая - в бизнес логике
     * @param sError
     */
    throwLogic(sError) {
        this.error('throw_logic', sError);
        return new Error(sError);
        ;
    }
    /**
     * Добавляет уведомление в стек
     *
     * @param string kNotice - ключ ошибки
     * @param string sNotice - сообщение
     * @return void
     */
    notice(kNotice, sNotice) {
        this.noticeList[kNotice] = sNotice;
    }
    /**
     * Добавляет уведомление для разработки в стек
     *
     * @param string kNotice - ключ ошибки
     * @param string sNotice - сообщение
     * @return void
     */
    devNotice(kNotice, sNotice) {
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
    warning(kWarning, sWarning) {
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
    devWarning(kWarning, sWarning) {
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
    getErrors() {
        return this.errorList;
    }
    /**
     * Получить весь трейс ошибок
     *
     * @return - возвращаются ошибки {key, msg, e}[]
     */
    getTraceList() {
        return this.traceList;
    }
    /**
     * Получить все декларации для DEV режима
     */
    getDeclareList() {
        return this.errorDeclareList;
    }
    /**
     * Получить все декларации для DEV режима
     */
    getDevDeclare() {
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
    getDevWarning() {
        return this.devWarningList;
    }
    /**
     * Получить все предупреждения для пользователя
     *
     * @return array|null - возвращаются предупреждения (key, val)
     */
    getWarning() {
        return this.warningList;
    }
    /**
     * Получить все уведомления для разработки
     *
     * @return array|null - возвращаются уведомления (key, val)
     */
    getDevNotice() {
        return this.devNoticeList;
    }
    /**
     * Получить все уведомления для пользователя
     *
     * @return array|null - возвращаются уведомления (key, val)
     */
    getNotice() {
        return this.noticeList;
    }
    /**
     * Получить все логи для разработки
     */
    getDevLog() {
        return this.devLogList;
    }
}
exports.ErrorSys = ErrorSys;
//# sourceMappingURL=ErrorSys.js.map