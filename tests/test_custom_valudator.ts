import * as System from '../src';

function valid(data: any) {
  const rules = new System.ModelRulesC();


  const fCustomRule: System.TCustomFn = (data: any, errorSys: System.ErrorSys): boolean => {
    let bOk = data === 22
    if (!bOk) {
      errorSys.error(`valid_custom_rule`, `Мое сообшение об ошибке валидации`);
    }
    return bOk;
  }

  rules.set(
    rules.rule('custom_field')
      .require()
      .custom(fCustomRule)
      .errorEx('custom_field', 'custom_field')
  )

  const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
  validator.fValid(rules.get(), data);
  console.log(validator.errorSys.getErrors());

  return validator.getResult();
}

const resultInvalid = valid({
  id_require_true_1: 45,
  custom_field: 2,
});

const resultValid = valid({
  id_require_true_1: 45,
  custom_field: 22,
});

console.log('======================================');
console.log('===Valid>', resultValid);
console.log('======================================');

console.log('======================================');
console.log('===Invalid>', resultInvalid);
console.log('======================================');
