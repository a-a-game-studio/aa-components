"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Системный сервис валидации данных для моделей
 */
class ModelValidatorSys {
    constructor(errorSys) {
        this.errorSys = errorSys;
    }
    /**
     * Валидирует и экранирует строковое значени
     *
     * @param string sKey - ключ в базе данных
     * @param string sTpl - регулярное выражение по которому проверять
     * @return boolean
     */
    fValidString(sKey, sTpl) {
        let bSuccess = false;
        let s = String(this.data[sKey]).trim();
        if (s) {
            //s = utf8.encode(s);
            if (sTpl instanceof RegExp) { // Проверка на регулярное выражение
                if (sTpl.exec(s)) {
                    this.aResult[sKey] = s;
                    bSuccess = true;
                }
            }
            else {
                this.aResult[sKey] = s;
                bSuccess = true;
            }
        }
        /* если пустая строка */
        if (this.data[sKey] == '') {
            this.aResult[sKey] = this.data[sKey];
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Text validator
     *
     * @param string sKey
     * @return boolean
     */
    fValidText(sKey) {
        let bSuccess = false;
        /* if string is not empty */
        let s = String(this.data[sKey]).trim();
        if (s) {
            this.aResult[sKey] = s;
            bSuccess = true;
        }
        /* if string is empty */
        if (this.data[sKey] == '') {
            this.aResult[sKey] = this.data[sKey];
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Валидирует булевую переменную
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidBool(sKey) {
        let bSuccess = false;
        let i = Number(this.data[sKey]);
        if (!isNaN(i)) {
            if (i == 0 || i == 1) {
                this.aResult[sKey] = i;
                bSuccess = true;
            }
            else {
                bSuccess = false;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет числовые значения
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidInt(sKey) {
        let bSuccess = false;
        let i = Math.round(Number(this.data[sKey]));
        if (!isNaN(i)) {
            this.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Проверяет дату
     *
     * @param string sKey
     * @return boolean
     */
    fValidDate(sKey) {
        let dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        // Match the date format through regular expression
        if (Boolean(this.data[sKey].match(dateformat))) {
            //Test which seperator is used '/' or '-'
            let opera1 = this.data[sKey].split('/');
            let opera2 = this.data[sKey].split('-');
            let lopera1 = opera1.length;
            let lopera2 = opera2.length;
            // Extract the string into month, date and year
            let aKey;
            if (lopera1 > 1) {
                aKey = this.data[sKey].split('/');
            }
            else if (lopera2 > 1) {
                aKey = this.data[sKey].split('-');
            }
            let dd = parseInt(aKey[2]);
            let mm = parseInt(aKey[1]);
            let yy = parseInt(aKey[0]);
            // Create list of days of a month [assume there is no leap year by default]
            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    return false;
                }
            }
            if (mm == 2) {
                let lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    return false;
                }
            }
            this.aResult[sKey] = this.data[sKey];
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Проверяет числовые значения - 2.22
     *
     * @param string sKey
     * @return boolean
     */
    fValidDecimal(sKey) {
        let bSuccess = false;
        let i = parseFloat(Number(this.data[sKey]).toFixed(2));
        if (!isNaN(i)) {
            this.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Проверка Enum параметров
     *
     * @param sKey - ключ значения
     * @param aEnumList - Список возможных значений
     */
    fValidEnum(sKey, aEnumList) {
        let bSuccess = false;
        /* TODO: убрать lodash */
        /* let v: any = this.data[sKey];

        if (_.indexOf(aEnumList, v) >= 0) {
            let index = _.indexOf(aEnumList, this.data[sKey]);

            this.aResult[sKey] = aEnumList[index];
            bSuccess = true;
        } */
        return bSuccess;
    }
    /**
     * Экранирует JSON и проверяет
     * Если это массив конвертирует в JSON
     *
     * @param string sKey
     * @return boolean
     */
    fValidJson(sKey) {
        let vJsonValue = this.data[sKey];
        let sJsonValue = '';
        let bSuccess = false;
        if (vJsonValue) {
            /* TODO: убрать lodash */
            /* // Проверка на массив
            if (_.isObject(vJsonValue)) {
                sJsonValue = JSON.stringify(vJsonValue);
            } else {
                sJsonValue = vJsonValue;
            } */
            // Проверка строки на корректный JSON
            try {
                let obj = null;
                obj = JSON.parse(sJsonValue);
                if (obj) {
                    this.aResult[sKey] = sJsonValue;
                    bSuccess = true;
                }
            }
            catch (e) {
                this.errorSys.errorEx(e, sKey + '_json_parse', sKey + ' - неверный формат json поля');
            }
        }
        return bSuccess;
    }
    // ================================================================
    // Логические проверки
    // ================================================================
    /**
     * Проверяет на больше
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMore(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.aResult[sKey]);
        if (i) {
            if (i > iVal) { // Если значение больше - все хорошо
                this.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет на меньше
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidLess(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.aResult[sKey]);
        if (i) {
            if (i < iVal) { // Если значение меньше - все хорошо
                this.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет на макс количесво символов
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMaxLen(sKey, iLen) {
        let bSuccess = false;
        if (this.aResult[sKey]) {
            let s = String(this.aResult[sKey]);
            if (s.length <= iLen) { // Если значение меньше - все хорошо
                this.aResult[sKey] = s;
                bSuccess = true;
            }
        }
        if (bSuccess) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Проверяет на минимальное количесво символов
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMinLen(sKey, iLen) {
        let bSuccess = false;
        if (this.aResult[sKey]) {
            let s = String(this.aResult[sKey]);
            if (s.length >= iLen) { // Если значение минимальное - все хорошо
                this.aResult[sKey] = s;
                bSuccess = true;
            }
        }
        if (bSuccess) {
            return true;
        }
        else {
            return false;
        }
    }
    // ================================================================
    /**
     * Получить проверенные отфильтрованные данные в качестве массива
     *
     * @return array|null
     */
    getResult() {
        return this.aResult;
    }
    getStatus() {
        return this.okResult;
    }
    getMsg() {
        return this.aMsg;
    }
    checkExist(val) {
        let resp = true;
        if (val == undefined) {
            resp = false;
        }
        if (val == null) {
            resp = false;
        }
        return resp;
    }
    //ФОРМАТ ПРАВИЛА [
    //	key_field :[0:type, 1:condition, 2:required, 3:depend, 4:msg_error]
    //]
    fValid(aRules, data) {
        this.data = data;
        this.okResult = true; // [true/false] - Успешно или нет прошла валидация
        this.abValidOK = {};
        this.aResult = {};
        this.aMsg = [];
        //_.forEach(aRules, (v: any, k: any) => 
        for (let k in aRules) {
            let v = aRules[k];
            //Подстановка значений по умолчанию, если значения нет
            if (this.okResult && v['def'] && !this.data[k]) {
                this.data[k] = v['def'];
            }
            if ('error_key' in v) { // Если указываем ключ ошибки декларируем ее
                let errorKey = {};
                errorKey[v['error_key']['key']] = v['error_key']['msg'];
                this.errorSys.declareEx(errorKey);
            }
            //Проверка существования данных
            let bExist = this.checkExist(this.data[k]);
            //Проверка зависимостей
            let bDpend = true;
            if (v['depend']) {
                this.errorSys.decl('valid_' + k + '_depend', 'errorValidate');
                for (let kDepend in v['depend']) {
                    if (this.okResult && this.abValidOK[kDepend]) {
                        if (this.abValidOK[kDepend] && this.data[kDepend]) {
                            if (!(this.data[kDepend] == v['depend'][kDepend] || v['depend'][kDepend] == '*')) {
                                bDpend = false;
                                this.errorSys.error('valid_' + k + '_depend', k + ' - поле не прошло проверку зависимостей');
                            }
                        }
                    } //if
                }
            } //if
            //Проверка - обязательного поля
            if (v['require']) {
                this.errorSys.decl('valid_' + k + '_require', 'errorValidate');
                if (!this.checkExist(this.data[k])) {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_require', k + ' - поле обязательно для заполнения');
                }
            }
            // Обработка [string] значений
            if (bExist && bDpend && v['type'] == 'str') {
                this.errorSys.decl('valid_' + k + '_str', 'errorValidate');
                if (this.fValidString(k, v['if'])) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_str', v['error'] + ' Ошибка string = ' + this.data[k]);
                }
            }
            // Обработка [boolean] значений
            if (bExist && bDpend && v['type'] == 'boolean') {
                this.errorSys.decl('valid_' + k + '_bool', 'errorValidate');
                if (this.fValidBool(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_bool', v['error'] + ' Ошибка boolean = ' + this.data[k]);
                }
            }
            // Обработка [boolean] значений
            if (bExist && bDpend && v['type'] == 'date') {
                this.errorSys.decl('valid_' + k + '_date', 'errorValidate');
                if (this.fValidDate(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_date', v['error'] + ' Ошибка date = ' + this.data[k]);
                }
            }
            // Обработка [integer] значений
            if (bExist && bDpend && v['type'] == 'int') {
                this.errorSys.decl('valid_' + k + '_int', 'errorValidate');
                if (this.fValidInt(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_int', v['error'] + ' Ошибка int = ' + this.data[k]);
                }
            }
            // Обработка [enum] значений
            if (bExist && bDpend && v['type'] == 'enum') {
                this.errorSys.decl('valid_' + k + '_enum', 'errorValidate');
                if (this.fValidEnum(k, v['if'])) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_enum', v['error'] + ' Ошибка enum = ' + this.data[k]);
                }
            }
            // Обработка [text] значений
            if (bExist && bDpend && v['type'] == 'text') {
                this.errorSys.decl('valid_' + k + '_text', 'errorValidate');
                if (this.fValidText(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_text', v['error'] + ' Ошибка text = ' + this.data[k]);
                }
            }
            // Обработка [json] значений
            if (bExist && bDpend && v['type'] == 'json') {
                this.errorSys.decl('valid_' + k + '_json', 'errorValidate');
                if (this.fValidJson(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_json', v['error'] + ' Ошибка json = ' + this.data[k]);
                }
            }
            // Обработка [decimal] значений
            if (bExist && bDpend && v['type'] == 'decimal') {
                this.errorSys.decl('valid_' + k + '_decimal', 'errorValidate');
                if (this.fValidDecimal(k)) {
                    this.abValidOK[k] = true;
                }
                else {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_decimal', v['error'] + ' Ошибка decimal = ' + this.data[k]);
                }
            }
            // =================================================
            // Логические проверки
            // =================================================
            // Обработка [more] значений - Проверка на больше
            if (bExist && 'more' in v) {
                this.errorSys.decl('valid_' + k + '_more', 'errorValidate');
                if (v['type'] == 'int' || v['type'] == 'decimal') {
                    if (this.fValidMore(k, v['more'])) {
                        this.abValidOK[k] = true;
                    }
                    else {
                        this.okResult = false;
                        this.errorSys.error('valid_' + k + '_more', v['error'] + ' Число слишком маленькое = ' + this.data[k]);
                    }
                }
                else {
                    this.errorSys.error('valid_' + k + '_more_no_number', v['error'] + ' Поле не является числом');
                }
            }
            // Обработка [less] значений - Проверка на меньше
            if (bExist && 'less' in v) {
                this.errorSys.decl('valid_' + k + '_less', 'errorValidate');
                if (v['type'] == 'int' || v['type'] == 'decimal') {
                    if (this.fValidLess(k, v['less'])) {
                        this.abValidOK[k] = true;
                    }
                    else {
                        this.okResult = false;
                        this.errorSys.error('valid_' + k + '_less', v['error'] + ' Число слишком большое = ' + this.data[k]);
                    }
                }
                else {
                    this.errorSys.error('valid_' + k + '_less_no_number', v['error'] + ' Поле не является числом');
                }
            }
            // Обработка [max_len] значений - Проверка на большее
            if (bExist && 'max_len' in v) {
                this.errorSys.decl('valid_' + k + '_max_len', 'errorValidate');
                this.errorSys.decl('valid_' + k + '_max_len_no_string', 'errorValidate');
                // Проверка является ли поле текстовым
                if (v['type'] == 'text' || v['type'] == 'str') {
                    if (this.fValidMaxLen(k, v['max_len'])) {
                        this.abValidOK[k] = true;
                    }
                    else {
                        this.okResult = false;
                        this.errorSys.error('valid_' + k + '_max_len', v['error'] + ' Превышено количество символов = ' + this.data[k]);
                    }
                }
                else {
                    this.errorSys.error('valid_' + k + '_max_len_no_string', 'Поле не является строкой');
                }
            }
            // Обработка [min_len] значений - Проверка на большее
            if (bExist && 'min_len' in v) {
                this.errorSys.decl('valid_' + k + '_min_len', 'errorValidate');
                this.errorSys.decl('valid_' + k + '_min_len_no_string', 'errorValidate');
                // Проверка является ли поле текстовым
                if (v['type'] == 'text' || v['type'] == 'str') {
                    if (this.fValidMinLen(k, v['min_len'])) {
                        this.abValidOK[k] = true;
                    }
                    else {
                        this.okResult = false;
                        this.errorSys.error('valid_' + k + '_min_len', v['error'] + ' Малое количество символов = ' + this.data[k]);
                    }
                }
                else {
                    this.errorSys.error('valid_' + k + '_min_len_no_string', 'Поле не является строкой');
                }
            }
            // Кастомная ошибка на поле [error_key]
            if (!this.abValidOK[k] && 'error_key' in v) { // Вызываем кастомную ошибку, если она произошла и была указана
                this.errorSys.error(v['error_key']['key'], v['error_key']['msg']);
            }
        }
        ; // foreach
        return this.okResult;
    }
}
exports.ModelValidatorSys = ModelValidatorSys;
//# sourceMappingURL=ModelValidatorSys.js.map