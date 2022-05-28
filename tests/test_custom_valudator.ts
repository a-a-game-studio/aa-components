import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();


    const fCustomRule: System.TCustomFn = (data: any): boolean =>{ 
      console.log('fCustomRule',data);
      return data === 22;
    }

    rules.set(
      rules.rule('custom_field')
      .require()
      .custom(fCustomRule)
      .errorEx('custom_field', 'custom_field') 
    )

	const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
	validator.fValid(rules.get(), data);

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
