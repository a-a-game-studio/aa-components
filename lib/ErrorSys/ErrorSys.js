"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorT_1 = require("./ErrorT");
/**
 * Системный сервис обработки ошибок
 */
class ErrorSys {
    constructor(env = 'prod') {
        this.errorCount = 0;
        this.ok = true;
        this.bMute = false;
        this.env = env;
        if (this.env == 'local' || this.env == 'dev' || this.env == 'test') {
            this.ifDevMode = true;
        }
        else {
            this.ifDevMode = false;
        }
        this.errorList = {};
        this.devWarningList = {};
        this.warningList = {};
        this.devNoticeList = {};
        this.noticeList = {};
        this.devLogList = [];
        this.traceList = [];
    }
    /**
     * Дополнительная конфигурация системы ошибок
     * @param option
     */
    option(option) {
        if (option.bMute) {
            this.bMute = true; // Включить режим тишины - НЕ генерировать ошибки
        }
        else {
            this.bMute = false; // Выключить режим тишины - генерировать ошибки
        }
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
     * Добавляет ошибку в стек
     *
     * @param string kError - ключ ошибки
     * @param string sError - сообщение
     * @return void
     */
    error(kError, sError) {
        if (!this.bMute) { // Режим тишины
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
            }
            this.errorCount++;
        }
    }
    getErrorCount() {
        return this.errorCount;
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
        if (!this.bMute) { // Режим тишины
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
            }
        }
    }
    /**
     * Проброс ошибки
     * @param sError
     */
    throw(e, sError) {
        this.error(ErrorT_1.ErrorT.throw, sError);
        return e;
    }
    /**
     * Проброс ошибки - можно указать кастомный ключ ошибки
     * @param sError
     */
    throwEx(e, kError, sError) {
        this.error(kError, sError);
        return e;
    }
    /**
     * Ошибка доступа
     * @param sError
     */
    throwAccess(sError) {
        this.error(ErrorT_1.ErrorT.throwAccess, sError);
        return new Error(sError);
    }
    /**
     * Ошибка валидации данных ОБЩАЯ
     * @param sError
     */
    throwValid(sError) {
        this.error(ErrorT_1.ErrorT.throwValid, sError);
        return new Error(sError);
    }
    /**
     * Ошибка валидации данных роутинга
     * @param sError
     */
    throwValidRoute(sError) {
        this.error(ErrorT_1.ErrorT.throwValidRoute, sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка валидации данных при сохранении в БД
     * @param sError
     */
    throwValidDB(sError) {
        this.error(ErrorT_1.ErrorT.throwValidDB, sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка запроса в БД
     * @param sError
     */
    throwDB(e, sError) {
        this.error(ErrorT_1.ErrorT.throwDB, sError);
        return e;
    }
    /**
     * Ошибка логическая - в бизнес логике
     * @param sError
     */
    throwLogic(sError) {
        this.error(ErrorT_1.ErrorT.throwLogic, sError);
        return new Error(sError);
        ;
    }
    /**
     * Ошибка логическая расширенная - в бизнес логике
     * @param sKey ключ ошибки
     * @param sError Сообщение ошибки
     */
    throwLogicEx(sKey, sError) {
        this.error(ErrorT_1.ErrorT.throwLogic, sError);
        this.error(sKey, sError);
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
    /**
    *	Декларация возможных ошибок
    * @deprecated
    */
    declare(p) { }
}
exports.ErrorSys = ErrorSys;
//# sourceMappingURL=ErrorSys.js.map