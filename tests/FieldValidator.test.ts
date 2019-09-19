declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';

import { FieldValidator } from "../src/aaValidator/FieldValidator";
import { ErrorSys } from "../src/ErrorSys";

let iCounter = 0;

function run() {

    /* описание теста */
    mocha.describe('Тест FieldValidator', () => {

        iCounter++; mocha.it(iCounter + ': Test Int true', () => {

            let data = 23;

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidateInt').fInt().fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fInt false', () => {
            let data = '23a';

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidateInt').fInt().fIsOk());
            assert.ok((errorSys.getErrors())['ValidateInt.isNotInt'] == 'isNotInt');
        }); //it ****

        /* ----------------------------- */

        iCounter++; mocha.it(iCounter + ': Test fExist true', () => {
            let data = '23a';

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefExist').fExist().fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fExist false', () => {
            let data: number;

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefExist').fExist().fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefExist.isNotExist'] == 'isNotExist');
        }); //it ****

        /* ----------------------------- */

        iCounter++; mocha.it(iCounter + ': Test fBool true', () => {
            let data = true;

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefBool').fBool().fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fBool false', () => {
            let data = '23a';

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefBool').fBool().fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefBool.isNotBool'] == 'isNotBool');
        }); //it ****

        /* ----------------------------- */

        iCounter++; mocha.it(iCounter + ': Test fDate true', () => {
            let data = '2019-01-01';

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefDate').fDate().fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fDate false', () => {
            let data = '23a';

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefDate').fDate().fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefDate' + '.isNotDate'] == 'isNotDate');
        }); //it ****

        /* ----------------------------- */
        iCounter++; mocha.it(iCounter + ': Test fDecimal true', () => {
            let data = '2000.02';

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefDecimal').fDecimal().fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fDecimal false', () => {
            let data = '20d00.02';

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefDecimal').fDecimal().fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefDecimal' + '.isNotDecimal'] == 'isNotDecimal');
        }); //it ****

        /* ----------------------------- */
        iCounter++; mocha.it(iCounter + ': Test fMore true', () => {
            let data = 1000;

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefMore').fMore(50).fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fMore 1 false', () => {
            let data = 1000;

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefMore').fMore(1001).fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefMore' + '.isNotMoreThan'] == 'isNotMoreThan');
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fMore 2 false', () => {
            let data = 'a1s000';

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefMore').fMore(1001).fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefMore' + '.isNotMoreThan'] == 'isNotMoreThan');
        }); //it ****
        iCounter++; mocha.it(iCounter + ': Test fMore 3 false', () => {
            let data = 1000;

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefMore').fMore(1000).fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefMore' + '.isNotMoreThan'] == 'isNotMoreThan');
        }); //it ****

        /* ----------------------------- */
        iCounter++; mocha.it(iCounter + ': Test fMoreOrEqual true', () => {
            let data = 2000;

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefMoreOrEqual').fMoreOrEqual(100).fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fMoreOrEqual true', () => {
            let data = 2000;

            const errorSys = new ErrorSys();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefMoreOrEqual').fMoreOrEqual(2000).fIsOk());
        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fMoreOrEqual false', () => {
            let data = 2000;

            const errorSys = new ErrorSys();

            assert.ok(!new FieldValidator(errorSys, data).fSetErrorString('ValidatefMoreOrEqual').fMoreOrEqual(5000).fIsOk());
            assert.ok((errorSys.getErrors())['ValidatefMoreOrEqual' + '.isNotMoreOrEqualThan'] == 'isNotMoreOrEqualThan');
        }); //it ****

        /* ----------------------------- */

        iCounter++; mocha.it(iCounter + ': Test multy errors', () => {

            let data = '20d00';

            const errorSys = new ErrorSys();

            let myValidator = new FieldValidator(errorSys, data)
                .fSetErrorString('multy')
                .fInt()
                .fMoreOrEqual(5000)
                .fLess(5000);

            assert.ok(!myValidator.fIsOk());
            assert.ok(errorSys.getErrorCount() == 3);

        }); //it ****
        /* ----------------------------- */

        iCounter++; mocha.it(iCounter + ': Test fDoIfOk', () => {

            let data = 10000;
            const errorSys = new ErrorSys();

            let iArg1 = 1000;
            let iArg2 = 1000;

            const tstFnc = (arg1: number, arg2: number) => {
                iArg1 = arg1;
                iArg2 = arg2;
                return 'funcOk';
            };

            let myValidator = new FieldValidator(errorSys, data)
                .fSetErrorString('multy')
                .fInt()
                .fMoreOrEqual(5000)
                ;

            let resp = myValidator.fDoIfOk(tstFnc, [2, 3]);

            assert.ok(myValidator.fIsOk());
            assert.ok(resp == 'funcOk');

            assert.ok(iArg1 == 2);
            assert.ok(iArg2 == 3);


        }); //it ****

       
        iCounter++; mocha.it(iCounter + ': Test fDoIfOkAsync', async () => {

            let data = 10000;
            const errorSys = new ErrorSys();

            let iArg1 = 1000;
            let iArg2 = 1000;

            const tstFnc = (arg1: number, arg2: number) => {
                return new Promise((resolve, reject) => {
                    iArg1 = arg1;
                    iArg2 = arg2;

                    resolve('funcOk');
                })
            };

            let myValidator = new FieldValidator(errorSys, data)
                .fSetErrorString('multy')
                .fInt()
                .fMoreOrEqual(5000);

            let resp = await myValidator.faDoIfOkAsync(async () => await tstFnc(2, 3));

            assert.ok(myValidator.fIsOk());
            assert.ok(resp = 'funcOk');

            assert.ok(iArg1 == 2);
            assert.ok(iArg2 == 3);


        }); //it ****

        iCounter++; mocha.it(iCounter + ': Test fNotExist true', () => {
            let data: number = undefined;

            const errorSys = new ErrorSys();

            let cV = new FieldValidator(errorSys, data).fSetErrorString('ValidatefNotExist').fNotExist().fIsOk();

            assert.ok(new FieldValidator(errorSys, data).fSetErrorString('ValidatefNotExist').fNotExist().fIsOk());
        }); //it ****

    });
}


run();


