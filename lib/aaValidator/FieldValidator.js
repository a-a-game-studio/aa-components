"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Валидатор поля
 */
class FieldValidator {
    constructor(errorSys, data) {
        this.bOk = true;
        this.iCounter = 0;
        this.errorSys = errorSys;
        this.data = data;
        this.sErr = 'Alert! Error is not set for ' + data;
        return this;
    }
    fErr(sError) {
        this.bOk = false;
        this.errorSys.error(this.sErr + this.iCounter, sError);
        this.iCounter++;
    }
    fGetErrorSys() {
        return this.errorSys;
    }
    fIsOk() {
        return this.bOk;
    }
    /**
     * строка примечание к ошибке
     * @param e
     */
    fSetErrorString(sErr) {
        this.sErr = sErr;
        return this;
    }
    /**
     * Существование значения
     * @error isNotExist
     */
    fExist() {
        if (!this.data) {
            this.fErr('isNotExist');
        }
        return this;
    }
    /**
     * Text validator
     *
     * @param string sKey
     * @return boolean
     */
    fText() {
        let bSuccess = false;
        try {
            /* if string is not empty */
            const s = String(this.data).trim();
            if (s) {
                bSuccess = true;
                this.data = s;
            }
            /* if string is empty */
            if (this.data == '') {
                bSuccess = true;
            }
            if (!bSuccess) {
                this.fErr('isNotText');
            }
        }
        catch (e) {
            this.fErr('isNotText');
        }
        return this;
    }
    /**
    * Валидирует булевую переменную
    * @error isNotBool
    * @param string sKey
    * @param string sTpl
    * @return boolean
    */
    fBool() {
        let bSuccess = false;
        try {
            const i = Number(this.data);
            if (!isNaN(i)) {
                if (i == 0 || i == 1) {
                    bSuccess = true;
                    this.data = Boolean(i);
                }
                else {
                    bSuccess = false;
                }
            }
            if (!bSuccess) {
                this.fErr('isNotBool');
            }
        }
        catch (e) {
            this.fErr('isNotBool');
        }
        return this;
    }
    /**
     * Проверяет числовые значения
     * @error isNotInt
     * @param string sKey
     * @param string sTpl
     * @return boolean
     */
    fInt() {
        let bSuccess = false;
        let i = Math.round(Number(this.data));
        try {
            if (!isNaN(i)) {
                bSuccess = true;
                this.data = i;
            }
            if (!bSuccess) {
                this.fErr('isNotInt');
            }
        }
        catch (e) {
            this.fErr('isNotInt');
        }
        return this;
    }
    /**
     * Проверяет дату
     * @error isNotDate
     * @param string sKey
     * @return boolean
     */
    fDate() {
        let dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        let bSuccess = false;
        try {
            // Match the date format through regular expression
            if (Boolean(this.data.match(dateformat))) {
                //Test which seperator is used '/' or '-'
                let opera1 = this.data.split('/');
                let opera2 = this.data.split('-');
                let lopera1 = opera1.length;
                let lopera2 = opera2.length;
                // Extract the string into month, date and year
                let aKey;
                if (lopera1 > 1) {
                    aKey = this.data.split('/');
                }
                else if (lopera2 > 1) {
                    aKey = this.data.split('-');
                }
                let dd = parseInt(aKey[2]);
                let mm = parseInt(aKey[1]);
                let yy = parseInt(aKey[0]);
                // Create list of days of a month [assume there is no leap year by default]
                let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (mm == 1 || mm > 2) {
                    if (dd > ListofDays[mm - 1]) {
                        bSuccess = false;
                    }
                }
                if (mm == 2) {
                    let lyear = false;
                    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                        lyear = true;
                    }
                    if ((lyear == false) && (dd >= 29)) {
                        bSuccess = false;
                    }
                    if ((lyear == true) && (dd > 29)) {
                        bSuccess = false;
                    }
                }
                bSuccess = true;
            }
            else {
                bSuccess = false;
            }
            if (!bSuccess) {
                this.fErr('isNotDate');
            }
        }
        catch (e) {
            this.fErr('isNotDate');
        }
        return this;
    }
    /**
     * Проверяет числовые значения - 2.22
     * @error isNotDecimal
     * @param string sKey
     * @return boolean
     */
    fDecimal() {
        let bSuccess = false;
        try {
            let i = parseFloat(Number(this.data).toFixed(2));
            if (!isNaN(i)) {
                this.data = i;
                bSuccess = true;
            }
            if (!bSuccess) {
                this.fErr('isNotDecimal');
            }
        }
        catch (e) {
            this.fErr('isNotDecimal');
        }
        return this;
    }
    // ================================================================
    // Логические проверки
    // ================================================================
    /**
     * Проверяет на больше
     * @error isNotMoreThan
     * @param iVal: number
     */
    fMore(iVal) {
        let bSuccess = false;
        try {
            let i = Number(this.data);
            if (!isNaN(i)) {
                if (i > iVal) { // Если значение больше - все хорошо
                    bSuccess = true;
                }
            }
            if (!bSuccess) {
                this.fErr('isNotMoreThan');
            }
        }
        catch (e) {
            this.fErr('isNotMoreThan');
        }
        return this;
    }
    /**
     * Проверяет на больше
     * @error isNotMoreOrEqualThan
     * @param iVal: number
     */
    fMoreOrEqual(iVal) {
        let bSuccess = false;
        try {
            let i = Number(this.data);
            if (!isNaN(i)) {
                if (i >= iVal) { // Если значение больше - все хорошо
                    bSuccess = true;
                }
            }
            if (!bSuccess) {
                this.fErr('isNotMoreOrEqualThan');
            }
        }
        catch (e) {
            this.fErr('isNotMoreOrEqualThan' + iVal);
        }
        return this;
    }
    /**
     * Проверяет на меньше
     *
     * @param iVal: number
     */
    fLess(iVal) {
        let bSuccess = false;
        try {
            let i = Number(this.data);
            if (!isNaN(i)) {
                if (i < iVal) { // Если значение меньше - все хорошо
                    bSuccess = true;
                }
            }
            if (!bSuccess) {
                this.fErr('isNotLessThan');
            }
        }
        catch (e) {
            this.fErr('isNotLessThan' + iVal);
        }
        return this;
    }
    /**
     * Проверяет на меньше или равно
     *
     * @param iVal: number
     */
    fLessOrEqual(iVal) {
        let bSuccess = false;
        try {
            let i = Number(this.data);
            if (!isNaN(i)) {
                if (i <= iVal) { // Если значение меньше - все хорошо
                    bSuccess = true;
                }
            }
            if (!bSuccess) {
                this.fErr('isLessOrEqualThan');
            }
        }
        catch (e) {
            this.fErr('isLessOrEqualThan' + iVal);
        }
        return this;
    }
    /**
     * Проверяет на макс количесво символов
     *
     * @param iLen: number
     */
    fMaxLen(iLen) {
        let bSuccess = false;
        try {
            let s = String(this.data);
            if (s.length <= iLen) { // Если значение меньше - все хорошо
                bSuccess = true;
            }
            if (!bSuccess) {
                this.fErr('MoreThanMaxLen');
            }
        }
        catch (e) {
            this.fErr('MoreThanMaxLen');
        }
        return this;
    }
    /**
     * Проверяет на минимальное количесво символов
     *
     * @param iLen: number
     */
    fMinLen(iLen) {
        let bSuccess = false;
        try {
            let s = String(this.data);
            if (s.length >= iLen) { // Если значение минимальное - все хорошо
                bSuccess = true;
            }
            if (!bSuccess) {
                this.fErr('LessThanMinLen');
            }
        }
        catch (e) {
            this.fErr('LessThanMinLen');
        }
        return this;
    }
    fEqual(Val) {
        let bSuccess = false;
        try {
            bSuccess = (Val == this.data);
            if (!bSuccess) {
                this.fErr('isNotEqual');
            }
        }
        catch (e) {
            this.fErr('isNotEqual');
        }
        return this;
    }
}
exports.FieldValidator = FieldValidator;
//# sourceMappingURL=FieldValidator.js.map