import { ModelValidatorSys } from "..";

/**
 * Класс с шаблонами правил для одного поля
 */
export class ModelValidatorTaskS {

	private vValidatorSys:ModelValidatorSys;
	private data:any;

	constructor(vModelValidatorSys: ModelValidatorSys) {
		this.vValidatorSys = vModelValidatorSys;
	}

	/**
	 * Валидирует и экранирует строковое значение
	 *
	 * @param string sKey - ключ в базе данных
	 * @param string sTpl - регулярное выражение по которому проверять
	 * @return boolean
	 */
    public fValidString(sKey: string, sTpl: RegExp|(number|string)[]): boolean {

        let bSuccess = false;
        let s = String(this.vValidatorSys.data[sKey]).trim();

        if ( s || s === '' ) {

            if (sTpl instanceof RegExp) { // Проверка на регулярное выражение

                if (sTpl.exec(s)) {
                    this.vValidatorSys.aResult[sKey] = s;

                    bSuccess = true;
                }
            } else {
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
    public fValidText(sKey: string): boolean {

        let bSuccess = false;
        let s = String(this.vValidatorSys.data[sKey]).trim();

        if ( s || s === '' ) {

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
    public fValidBool(sKey: string): boolean {

        let bSuccess = false;
        let i = Number(this.vValidatorSys.data[sKey]);

        if (!isNaN(i)) {

            if (i == 0 || i == 1) {

                this.vValidatorSys.aResult[sKey] = i;
                bSuccess = true;
            } else {
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
    public fValidInt(sKey: string): boolean {

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
    public fValidDecimal(sKey: string): boolean {

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
    public fValidArrayNumbers(sKey: string): boolean {

		let bSuccess = false;
		let checkArray = true;

		let array = this.vValidatorSys.data[sKey];
		if (Array.isArray(array)) {
			for(let i = 0; i < array.length; i++){

				if (checkArray) {
					if (!array[i] && array[i] !== 0) {
                        checkArray = false;
					} else {
                        array[i] = Number(array[i]);

                        if (!array[i] && array[i] !== 0) {
                            checkArray = false;
                        }
                    }
                }
			}
		} else {
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
    public fValidEnum(sKey: string, aEnumList: any[]) {

        let bSuccess = false;
		let v: any = null; // this.vValidatorSys.data[sKey];

		let bNumberVal = false;
		let bStringVal = false;

		// Пробуем значение сконвертировать в цифру
		if(Number(this.vValidatorSys.data[sKey]) || Number(this.vValidatorSys.data[sKey]) == 0){
			v = Number(this.vValidatorSys.data[sKey])
			bNumberVal = true;
		}
		// Если не цифра - пробуем конвертировать в строку
		if(!bNumberVal && String(this.vValidatorSys.data[sKey])){
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
    public fValidJson(sKey: string): boolean {
        let vJsonValue = this.vValidatorSys.data[sKey];
        let sJsonValue = '';
        let bSuccess = false;

        if (vJsonValue) {

            // Проверка на массив
            if (Object(vJsonValue)) {
                sJsonValue = JSON.stringify(vJsonValue);
            } else {
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
            } catch (e) {
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
    public fValidObject(sKey: string): boolean {

		let bSuccess = false;

        if ( this.vValidatorSys.data[sKey] === Object(this.vValidatorSys.data[sKey]) ) {

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
    public fValidArray(sKey: string): boolean {

		let bSuccess = false;

        if ( Array.isArray(this.vValidatorSys.data[sKey]) ) {

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
    public fValidMore(sKey: string, iVal: number): boolean {

        let bSuccess = false;
        let i = Number(this.vValidatorSys.aResult[sKey])

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
	public fValidMoreOrEqual(sKey: string, iVal: number): boolean {

		let bSuccess = false;
		let i = Number(this.vValidatorSys.aResult[sKey])

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
    public fValidLess(sKey: string, iVal: number): boolean {

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
	public fValidLessOrEqual(sKey: string, iVal: number): boolean {

		let bSuccess = false;
		let i = Number(this.vValidatorSys.aResult[sKey]);

		if ( !isNaN(i) ) {
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
    public fValidMaxLen(sKey: string, iLen: number): boolean {

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
        } else {
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

    public fValidMinLen(stringKey: string, checkValue: number): boolean {

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
	public checkExist(val: any): boolean {
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

