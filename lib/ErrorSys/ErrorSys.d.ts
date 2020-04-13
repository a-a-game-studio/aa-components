/**
 * Системный сервис обработки ошибок
 */
export declare class ErrorSys {
    private ok;
    private env;
    private ifDevMode;
    private errorList;
    private devWarningList;
    private warningList;
    private devNoticeList;
    private noticeList;
    private devLogList;
    private bMute;
    private traceList;
    private errorCount;
    constructor(env?: string);
    /**
     * Дополнительная конфигурация системы ошибок
     * @param option
     */
    option(option: {
        bMute?: boolean;
    }): void;
    /**
     * очистка стека
     */
    clear(): void;
    /**
     * Получить глобальный статус выполнения
     *
     * @return boolean
     */
    isOk(): boolean;
    /**
     * Получить режим окружения
     *
     * @return boolean
     */
    isDev(): boolean;
    /**
     * Добавляет ошибку в стек
     *
     * @param string kError - ключ ошибки
     * @param string sError - сообщение
     * @return void
     */
    error(kError: string, sError?: string): void;
    getErrorCount(): number;
    /**
     * Добавляет ошибку в стек,
     * В dev режиме выводит catch(e) ошибки в консоль
     *
     * @param e // Error exeption
     * @param kError // Ключ ошибки - для тестирования
     * @param sError // Сообщение об ошибке
     */
    errorEx(e: any, kError: string, sError: string): void;
    /**
     * Проброс ошибки
     * @param sError
     */
    throw(e: Error, sError: string): Error;
    /**
     * Проброс ошибки - можно указать кастомный ключ ошибки
     * @param sError
     */
    throwEx(e: Error, kError: string, sError: string): Error;
    /**
     * Ошибка доступа
     * @param sError
     */
    throwAccess(sError: string): Error;
    /**
     * Ошибка валидации данных ОБЩАЯ
     * @param sError
     */
    throwValid(sError: string): Error;
    /**
     * Ошибка валидации данных роутинга
     * @param sError
     */
    throwValidRoute(sError: string): Error;
    /**
     * Ошибка валидации данных при сохранении в БД
     * @param sError
     */
    throwValidDB(sError: string): Error;
    /**
     * Ошибка запроса в БД
     * @param sError
     */
    throwDB(e: Error, sError: string): Error;
    /**
     * Ошибка логическая - в бизнес логике
     * @param sError
     */
    throwLogic(sError: string): Error;
    /**
     * Добавляет уведомление в стек
     *
     * @param string kNotice - ключ ошибки
     * @param string sNotice - сообщение
     * @return void
     */
    notice(kNotice: string, sNotice: string): void;
    /**
     * Добавляет уведомление для разработки в стек
     *
     * @param string kNotice - ключ ошибки
     * @param string sNotice - сообщение
     * @return void
     */
    devNotice(kNotice: string, sNotice: string): void;
    /**
     * Добавляет предупреждение в стек
     *
     * @param string kWarning - ключ ошибки
     * @param string sWarning - сообщение
     * @return void
     */
    warning(kWarning: string, sWarning: string): void;
    /**
     * Добавляет предупреждение для разработки в стек
     * Добавляется информация только в тестовом режиме
     *
     * @param string kWarning - ключ ошибки
     * @param string sWarning - сообщение
     * @return void
     */
    devWarning(kWarning: string, sWarning: string): void;
    /**
     * Получить все ошибки
     *
     * @return array|null - возвращаются ошибки (key, val)
     */
    getErrors(): {
        [s: string]: string;
    };
    /**
     * Получить весь трейс ошибок
     *
     * @return - возвращаются ошибки {key, msg, e}[]
     */
    getTraceList(): {
        key: string;
        msg: string;
        e: Error;
    }[];
    /**
     * Получить все предупреждения для разработки
     *
     * @return array|null - возвращаются предупреждения (key, val)
     */
    getDevWarning(): {
        [s: string]: string;
    };
    /**
     * Получить все предупреждения для пользователя
     *
     * @return array|null - возвращаются предупреждения (key, val)
     */
    getWarning(): {
        [s: string]: string;
    };
    /**
     * Получить все уведомления для разработки
     *
     * @return array|null - возвращаются уведомления (key, val)
     */
    getDevNotice(): {
        [s: string]: string;
    };
    /**
     * Получить все уведомления для пользователя
     *
     * @return array|null - возвращаются уведомления (key, val)
     */
    getNotice(): {
        [s: string]: string;
    };
    /**
     * Получить все логи для разработки
     */
    getDevLog(): string[];
}
