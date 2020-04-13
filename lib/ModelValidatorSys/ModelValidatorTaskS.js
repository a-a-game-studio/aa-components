"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Класс с шаблонами правил для одного поля
 */
class ModelValidatorTaskS {
    constructor(vModelValidatorSys) {
        this.vValidatorSys = vModelValidatorSys;
    }
    /**
     * Валидирует и экранирует строковое значение
     *
     * @param string sKey - ключ в базе данных
     * @param string sTpl - регулярное выражение по которому проверять
     * @return boolean
     */
    fValidString(sKey, sTpl) {
        let bSuccess = false;
        let s = String(this.vValidatorSys.data[sKey]).trim();
        if (s || s === '') {
            if (sTpl instanceof RegExp) { // Проверка на регулярное выражение
                if (sTpl.exec(s)) {
                    this.vValidatorSys.aResult[sKey] = s;
                    bSuccess = true;
                }
            }
            else {
                this.vValidatorSys.aResult[sKey] = s;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Экранирует текст
     *
     * @param string sKey
     * @return boolean
     */
    fValidText(sKey) {
        let bSuccess = false;
        let s = String(this.vValidatorSys.data[sKey]).trim();
        if (s || s === '') {
            this.vValidatorSys.aResult[sKey] = s;
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
        let i = Number(this.vValidatorSys.data[sKey]);
        if (!isNaN(i)) {
            if (i == 0 || i == 1) {
                this.vValidatorSys.aResult[sKey] = i;
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
        let i = Math.round(Number(this.vValidatorSys.data[sKey]));
        if (!isNaN(i)) {
            this.vValidatorSys.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Проверяет числовые значения - 2.22
     *
     * @param string sKey
     * @return boolean
     */
    fValidDecimal(sKey) {
        let bSuccess = false;
        let i = parseFloat(Number(this.vValidatorSys.data[sKey]).toFixed(2));
        if (!isNaN(i)) {
            this.vValidatorSys.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Проверяет массив чисел
     *
     * @param string sKey
     * @return boolean
     */
    fValidArrayNumbers(sKey) {
        let bSuccess = false;
        let checkArray = true;
        let array = this.vValidatorSys.data[sKey];
        if (Array.isArray(array)) {
            for (let i = 0; i < array.length; i++) {
                if (checkArray) {
                    if (!array[i] && array[i] !== 0) {
                        checkArray = false;
                    }
                    else {
                        array[i] = Number(array[i]);
                        if (!array[i] && array[i] !== 0) {
                            checkArray = false;
                        }
                    }
                }
            }
        }
        else {
            checkArray = false;
        }
        if (checkArray) {
            this.vValidatorSys.aResult[sKey] = array;
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
        let v = null; // this.vValidatorSys.data[sKey];
        let bNumberVal = false;
        let bStringVal = false;
        // Пробуем значение сконвертировать в цифру
        if (Number(this.vValidatorSys.data[sKey]) || Number(this.vValidatorSys.data[sKey]) == 0) {
            v = Number(this.vValidatorSys.data[sKey]);
            bNumberVal = true;
        }
        // Если не цифра - пробуем конвертировать в строку
        if (!bNumberVal && String(this.vValidatorSys.data[sKey])) {
            v = String(this.vValidatorSys.data[sKey]);
            bStringVal = true;
        }
        if ((bNumberVal || bStringVal) && aEnumList.indexOf(v) >= 0) {
            let index = aEnumList.indexOf(v);
            this.vValidatorSys.aResult[sKey] = aEnumList[index];
            bSuccess = true;
        }
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
        let vJsonValue = this.vValidatorSys.data[sKey];
        let sJsonValue = '';
        let bSuccess = false;
        if (vJsonValue) {
            // Проверка на массив
            if (Object(vJsonValue)) {
                sJsonValue = JSON.stringify(vJsonValue);
            }
            else {
                sJsonValue = vJsonValue;
            }
            // Проверка строки на корректный JSON
            try {
                let obj = null;
                obj = JSON.parse(sJsonValue);
                if (obj) {
                    this.vValidatorSys.aResult[sKey] = sJsonValue;
                    bSuccess = true;
                }
            }
            catch (e) {
                this.vValidatorSys.errorSys.errorEx(e, sKey + '_json_parse', sKey + ' - неверный формат json поля');
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет объект ли это
     *
     * @param string sKey
     * @return boolean
     */
    fValidObject(sKey) {
        let bSuccess = false;
        if (this.vValidatorSys.data[sKey] === Object(this.vValidatorSys.data[sKey])) {
            this.vValidatorSys.aResult[sKey] = this.vValidatorSys.data[sKey];
            bSuccess = true;
        }
        return bSuccess;
    }
    /**
     * Проверяет массив ли это
     *
     * @param string sKey
     * @return boolean
     */
    fValidArray(sKey) {
        let bSuccess = false;
        if (Array.isArray(this.vValidatorSys.data[sKey])) {
            this.vValidatorSys.aResult[sKey] = this.vValidatorSys.data[sKey];
            bSuccess = true;
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
        let i = Number(this.vValidatorSys.aResult[sKey]);
        if (!isNaN(i)) {
            if (i > iVal) { // Если значение больше - все хорошо
                this.vValidatorSys.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет на больше или равно
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMoreOrEqual(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.vValidatorSys.aResult[sKey]);
        if (!isNaN(i)) {
            if (i >= iVal) { // Если значение больше - все хорошо
                this.vValidatorSys.aResult[sKey] = i;
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
        let i = Number(this.vValidatorSys.aResult[sKey]);
        if (!isNaN(i)) {
            if (i < iVal) { // Если значение меньше - все хорошо
                this.vValidatorSys.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет на меньше или равно
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidLessOrEqual(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.vValidatorSys.aResult[sKey]);
        if (!isNaN(i)) {
            if (i <= iVal) { // Если значение меньше - все хорошо
                this.vValidatorSys.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    /**
     * Проверяет на макс количество символов
     *
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fValidMaxLen(sKey, iLen) {
        let bSuccess = false;
        if (this.vValidatorSys.aResult[sKey] || this.vValidatorSys.aResult[sKey] == '') {
            let s = String(this.vValidatorSys.aResult[sKey]);
            if (s.length <= iLen) { // Если значение меньше - все хорошо
                this.vValidatorSys.aResult[sKey] = s;
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
     * Проверяет минимальное количество символов
     *
     * @param string stringKey
     * @param number checkValue
     * @return boolean
     */
    fValidMinLen(stringKey, checkValue) {
        if (this.vValidatorSys.aResult[stringKey]) {
            const preparedInputString = String(this.vValidatorSys.aResult[stringKey]);
            if (preparedInputString.length >= checkValue) {
                this.vValidatorSys.aResult[stringKey] = preparedInputString;
                return true;
            }
        }
        return false;
    }
    /**
     * Проверить существование значения
     * @param val - Значение
     */
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
}
exports.ModelValidatorTaskS = ModelValidatorTaskS;
//# sourceMappingURL=ModelValidatorTaskS.js.map