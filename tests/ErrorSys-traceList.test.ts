declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';

import { FieldValidator } from "../src/aaValidator/FieldValidator";
import { ErrorSys } from "../src/ErrorSys";

let iCounter = 0;

function run() {

    /* Механизм получения трейсов ошибок в прод режиме */
    describe('Тест traceList', () => {

        it('traceList', () => {

            const errorSys = new ErrorSys();
            try{
                throw errorSys.throwAccess('Сообщение об ошибке доступа');
            } catch(e){
                errorSys.errorEx(e, 'throwAccess-Success', 'Проврка ошибки доступа успешно выполнена')
            }

            try{
                throw errorSys.throwValidRoute('Сообщение об ошибке валидации данных роутинга');
            } catch(e){
                errorSys.errorEx(e, 'throwValidRoute-Success', 'Проврка ошибки валидации роутинга успешно выполнена')
            }

            try{
                throw errorSys.throwLogin('Сообщение об ошибке логики');
            } catch(e){
                errorSys.errorEx(e, 'throwLogin-Success', 'Проврка ошибки логики успешно выполнена')
            }

            try{
                throw errorSys.throwValidDB('Сообщение об ошибке валидации данных при записи в БД');
            } catch(e){
                errorSys.errorEx(e, 'throwValidDB-Success', 'Проврка ошибки валидации при записи в БД успешно выполнена')
            }

            try{
                throw errorSys.throwValid('Сообщение об ошибке валидации ОБЩЕЙ');
            } catch(e){
                errorSys.errorEx(e, 'throwValid-Success', 'Проврка ошибки валидации успешно выполнена')
            }

            let traceList = errorSys.getTraceList();
            console.log(traceList);

            let errList = errorSys.getErrors();
            console.log('===>',errList);

            assert.ok(true);
        }); //it

    });
}


run();


