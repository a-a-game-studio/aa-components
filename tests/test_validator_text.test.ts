import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	rules.set(rules.rule('text_boolean_true_1')
		.typeText()
		.require()
		.errorEx('text_boolean_true_1', 'text_boolean_true_1')
	);

	rules.set(rules.rule('text_boolean_true_2')
		.typeText()
		.require()
		.errorEx('text_boolean_true_2', 'text_boolean_true_2')
	);

	// =============================================
	// NUMBER

	rules.set(rules.rule('text_number_true_1')
		.typeText()
		.require()
		.errorEx('text_number_true_1', 'text_number_true_1')
	);

	rules.set(rules.rule('text_number_true_2')
		.typeText()
		.require()
		.errorEx('text_number_true_2', 'text_number_true_2')
	);

	rules.set(rules.rule('text_number_true_3')
		.typeText()
		.require()
		.errorEx('text_number_true_3', 'text_number_true_3')
	);

	// =================================================
	// STRING

	rules.set(rules.rule('text_string_true_1')
		.typeText()
		.require()
		.errorEx('text_string_true_1', 'text_string_true_1')
	);

	rules.set(rules.rule('text_string_true_2')
		.typeText()
		.require()
		.errorEx('text_string_true_2', 'text_string_true_2')
	);

	rules.set(rules.rule('text_string_false_1')
		.typeText()
		.require()
		.errorEx('text_string_false_1', 'text_string_false_1')
	);

	rules.set(rules.rule('text_string_false_2')
		.typeText()
		.require()
		.errorEx('text_string_false_2', 'text_string_false_2')
	);

	const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
	validator.fValid(rules.get(), data);

	return validator.getResult();
}


const result = valid({
	text_boolean_true_1: true,
	text_boolean_true_2: false,

	text_number_true_1: 11,
	text_number_true_2: '0',
	text_number_true_3: 10.02,

	text_string_true_1:'123',
	text_string_true_2:'Это текст - s12s',
	text_string_false_1: null,
	text_string_false_2: undefined,
	
});
console.log('======================================');
console.log('===text_boolean_true_1>', result.text_boolean_true_1);
console.log('===text_boolean_true_2>', result.text_boolean_true_2);
console.log('======================================');
console.log('===text_number_true_1>', result.text_number_true_1);
console.log('===text_number_true_2>', result.text_number_true_2);
console.log('===text_number_true_3>', result.text_number_true_3);
console.log('======================================');
console.log('===text_string_true_1>', result.text_string_true_1);
console.log('===text_string_true_2>', result.text_string_true_2);
console.log('===text_string_false_1>', result.text_string_false_1);
console.log('===text_string_false_2>', result.text_string_false_2);
console.log('======================================');