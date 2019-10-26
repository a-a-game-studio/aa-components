declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';

import { FieldValidator } from "../src/aaValidator/FieldValidator";
import { ErrorSys } from "../src/ErrorSys";

let iCounter = 0;

function run() {

    /* описание теста */
    describe('Тест throw', () => {

        it('throwAccess', () => {

            let ok = true;
            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwAccess('Сообщение об ошибке доступа');
            } catch(e){
                errorSys.errorEx(e, 'throwAccess-Success', 'Проврка ошибки доступа успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_access']);
        }); //it

        it('throwLogin', () => {

            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwLogin('Сообщение об ошибке логики');
            } catch(e){
                errorSys.errorEx(e, 'throwLogin-Success', 'Проврка ошибки логики успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_logic']);
        }); //it

        it('throwValid', () => {

            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwValid('Сообщение об ошибке валидации ОБЩЕЙ');
            } catch(e){
                errorSys.errorEx(e, 'throwValid-Success', 'Проврка ошибки валидации успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_valid']);
        }); //it

        it('throwValidRoute', () => {

            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwValidRoute('Сообщение об ошибке валидации данных роутинга');
            } catch(e){
                errorSys.errorEx(e, 'throwValidRoute-Success', 'Проврка ошибки валидации роутинга успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_valid_route']);
        }); //it

        it('throwValidDB', () => {

            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwValidDB('Сообщение об ошибке валидации данных при записи в БД');
            } catch(e){
                errorSys.errorEx(e, 'throwValidDB-Success', 'Проврка ошибки валидации при записи в БД успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_valid_db']);
        }); //it

        it('throwDB', () => {

            const errorSys = new ErrorSys('dev');
            try{
                throw errorSys.throwDB('Сообщение об ошибке запроса в БД');
            } catch(e){
                errorSys.errorEx(e, 'throwDB-Success', 'Проврка ошибки валидации при записи в БД успешно выполнена')
            }

            let errList = errorSys.getErrors();

            assert.ok(errList['throw_db']);
        }); //it
    });
}


run();

