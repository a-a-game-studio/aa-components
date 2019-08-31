"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelValidatorSys {
    constructor(errorSys) {
        this.errorSys = errorSys;
    }
    fValidString(sKey, sTpl) {
        let bSuccess = false;
        let s = String(this.data[sKey]).trim();
        if (s) {
            if (sTpl instanceof RegExp) {
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
        if (this.data[sKey] == '') {
            this.aResult[sKey] = this.data[sKey];
            bSuccess = true;
        }
        return bSuccess;
    }
    fValidText(sKey) {
        let bSuccess = false;
        let s = String(this.data[sKey]).trim();
        if (s) {
            this.aResult[sKey] = s;
            bSuccess = true;
        }
        if (this.data[sKey] == '') {
            this.aResult[sKey] = this.data[sKey];
            bSuccess = true;
        }
        return bSuccess;
    }
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
    fValidInt(sKey) {
        let bSuccess = false;
        let i = Math.round(Number(this.data[sKey]));
        if (!isNaN(i)) {
            this.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    fValidDate(sKey) {
        let dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        if (Boolean(this.data[sKey].match(dateformat))) {
            let opera1 = this.data[sKey].split('/');
            let opera2 = this.data[sKey].split('-');
            let lopera1 = opera1.length;
            let lopera2 = opera2.length;
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
    fValidDecimal(sKey) {
        let bSuccess = false;
        let i = parseFloat(Number(this.data[sKey]).toFixed(2));
        if (!isNaN(i)) {
            this.aResult[sKey] = i;
            bSuccess = true;
        }
        return bSuccess;
    }
    fValidEnum(sKey, aEnumList) {
        let bSuccess = false;
        return bSuccess;
    }
    fValidJson(sKey) {
        let vJsonValue = this.data[sKey];
        let sJsonValue = '';
        let bSuccess = false;
        if (vJsonValue) {
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
    fValidMore(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.aResult[sKey]);
        if (i) {
            if (i > iVal) {
                this.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    fValidLess(sKey, iVal) {
        let bSuccess = false;
        let i = Number(this.aResult[sKey]);
        if (i) {
            if (i < iVal) {
                this.aResult[sKey] = i;
                bSuccess = true;
            }
        }
        return bSuccess;
    }
    fValidMaxLen(sKey, iLen) {
        let bSuccess = false;
        if (this.aResult[sKey]) {
            let s = String(this.aResult[sKey]);
            if (s.length <= iLen) {
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
    fValidMinLen(sKey, iLen) {
        let bSuccess = false;
        if (this.aResult[sKey]) {
            let s = String(this.aResult[sKey]);
            if (s.length >= iLen) {
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
    fValid(aRules, data) {
        this.data = data;
        this.okResult = true;
        this.abValidOK = {};
        this.aResult = {};
        this.aMsg = [];
        for (let k in aRules) {
            let v = aRules[k];
            if (this.okResult && v['def'] && !this.data[k]) {
                this.data[k] = v['def'];
            }
            let bExist = this.checkExist(this.data[k]);
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
                    }
                }
            }
            if (v['require']) {
                this.errorSys.decl('valid_' + k + '_require', 'errorValidate');
                if (!this.data[k]) {
                    this.okResult = false;
                    this.errorSys.error('valid_' + k + '_require', k + ' - поле обязательно для заполнения');
                }
            }
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
            if (bExist && 'max_len' in v) {
                this.errorSys.decl('valid_' + k + '_max_len', 'errorValidate');
                this.errorSys.decl('valid_' + k + '_max_len_no_string', 'errorValidate');
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
            if (bExist && 'min_len' in v) {
                this.errorSys.decl('valid_' + k + '_min_len', 'errorValidate');
                this.errorSys.decl('valid_' + k + '_min_len_no_string', 'errorValidate');
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
        }
        ;
        return this.okResult;
    }
}
exports.ModelValidatorSys = ModelValidatorSys;
//# sourceMappingURL=ModelValidatorSys.js.map