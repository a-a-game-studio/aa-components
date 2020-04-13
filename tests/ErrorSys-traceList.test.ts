declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';

import { ErrorSys } from "../src/ErrorSys/ErrorSys";

let iCounter = 0;

function run() {

    /* Механизм получения трейсов ошибок в прод режиме */
    describe('Тест traceList', () => {

        it('traceList', () => {

            const errorSys = new ErrorSys(); // Режим прода, для режима разработки указать ErrorSys('dev')
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
                throw errorSys.throwLogic('Сообщение об ошибке логики');
            } catch(e){
                errorSys.errorEx(e, 'throwLogic-Success', 'Проврка ошибки логики успешно выполнена')
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

            errorSys.errorEx(new Error(), 'error', 'Генерация обычной ошибки с трейсом')

            errorSys.error('simple_error', 'обычной ошибки');

            errorSys.notice('notice', 'Уведомление пользователю');
            errorSys.devNotice('devNotice', 'Уведомление пользователю в режиме разработки, на проде не генерирет');

            errorSys.warning('warning', 'Предупреждение пользователю');
            errorSys.devWarning('devWarnig', 'Предупреждение пользователю в режиме разработки, на проде не генерирет');

            let traceList = errorSys.getTraceList();
            console.log('===trace-list>', traceList);

            let errList = errorSys.getErrors();
            console.log('===error>',errList);

            console.log('===notice>',errorSys.getNotice());
            console.log('===warning>',errorSys.getWarning());

            assert.ok(true);
        }); //it

    });
}


run();


