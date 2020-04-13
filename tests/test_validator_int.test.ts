import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	rules.set(rules.rule('int_boolean_true_1')
		.typeInt()
		.require()
		.errorEx('int_boolean_true_1', 'int_boolean_true_1')
	);

	rules.set(rules.rule('int_boolean_true_2')
		.typeInt()
		.require()
		.errorEx('int_boolean_true_2', 'int_boolean_true_2')
	);

	// =============================================
	// NUMBER

	rules.set(rules.rule('int_number_true_1')
		.typeInt()
		.require()
		.errorEx('int_number_true_1', 'int_number_true_1')
	);

	rules.set(rules.rule('int_number_true_2')
		.typeInt()
		.require()
		.errorEx('int_number_true_2', 'int_number_true_2')
	);

	rules.set(rules.rule('int_number_true_3')
		.typeInt()
		.require()
		.errorEx('int_number_true_3', 'int_number_true_3')
	);

	rules.set(rules.rule('int_number_false_1')
		.typeInt()
		.require()
		.errorEx('int_number_false_1', 'int_number_false_1')
	);

	// =================================================
	// STRING

	rules.set(rules.rule('int_string_true_1')
		.typeInt()
		.require()
		.errorEx('int_string_true_1', 'int_string_true_1')
	);

	rules.set(rules.rule('int_string_false_1')
		.typeInt()
		.require()
		.errorEx('int_string_false_1', 'int_string_false_1')
	);

	rules.set(rules.rule('int_string_false_2')
		.typeInt()
		.require()
		.errorEx('int_string_false_2', 'int_string_false_2')
	);

	rules.set(rules.rule('int_string_false_3')
		.typeInt()
		.require()
		.errorEx('int_string_false_3', 'int_string_false_3')
	);

	const validator = new System.ModelValidatorSys(new System.ErrorSys());
	validator.fValid(rules.get(), data);

	return validator.getResult();
}


const result = valid({
	int_boolean_true_1: true,
	int_boolean_true_2: false,

	int_number_true_1: 1,
	int_number_true_2: '1',
	int_number_true_3: '0',
	int_number_false_1: 's1',

	int_string_true_1:'12',
	int_string_false_1: null,
	int_string_false_2: undefined,
	int_string_false_3:'s12s',
});
console.log('======================================');
console.log('===int_boolean_true_1>', result.int_boolean_true_1);
console.log('===int_boolean_true_2>', result.int_boolean_true_2);
console.log('======================================');
console.log('===int_number_true_1>', result.int_number_true_1);
console.log('===int_number_true_2>', result.int_number_true_2);
console.log('===int_number_true_3>', result.int_number_true_3);
console.log('===int_number_false_1>', result.int_number_false_1);
console.log('======================================');
console.log('===int_string_true_1>', result.int_string_true_1);
console.log('===int_string_false_1>', result.int_string_false_1);
console.log('===int_string_false_2>', result.int_string_false_2);
console.log('===int_string_false_3>', result.int_string_false_3);
console.log('======================================');