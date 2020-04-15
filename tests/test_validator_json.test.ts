import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	rules.set(rules.rule('json_array_true_1')
		.typeJson()
		.require()
		.errorEx('json_array_true_1', 'json_array_true_1')
	);

	rules.set(rules.rule('json_array_true_2')
		.typeJson()
		.require()
		.errorEx('json_array_true_2', 'json_array_true_2')
	);

	rules.set(rules.rule('json_object_true_3')
		.typeJson()
		.require()
		.errorEx('json_object_true_3', 'json_object_true_3')
	);

	rules.set(rules.rule('json_object_true_4')
		.typeJson()
		.require()
		.errorEx('json_object_true_4', 'json_object_true_4')
	);

	// =============================================
	// BOOLEAN

	rules.set(rules.rule('json_boolean_false_1')
		.typeJson()
		.require()
		.errorEx('json_boolean_false_1', 'json_boolean_false_1')
	);

	rules.set(rules.rule('json_boolean_false_2')
		.typeJson()
		.require()
		.errorEx('json_boolean_false_2', 'json_boolean_false_2')
	);

	// =============================================
	// NUMBER

	rules.set(rules.rule('json_number_false_1')
		.typeJson()
		.require()
		.errorEx('json_number_false_1', 'json_number_false_1')
	);

	rules.set(rules.rule('json_number_false_2')
		.typeJson()
		.require()
		.errorEx('json_number_false_2', 'json_number_false_2')
	);

	rules.set(rules.rule('json_number_false_3')
		.typeJson()
		.require()
		.errorEx('json_number_false_3', 'json_number_false_3')
	);

	// =================================================
	// STRING

	rules.set(rules.rule('json_string_false_1')
		.typeJson()
		.require()
		.errorEx('json_string_false_1', 'json_string_false_1')
	);

	rules.set(rules.rule('json_string_false_2')
		.typeJson()
		.require()
		.errorEx('json_string_false_2', 'json_string_false_2')
	);

	rules.set(rules.rule('json_string_false_3')
		.typeJson()
		.require()
		.errorEx('json_string_false_3', 'json_string_false_3')
	);

	rules.set(rules.rule('json_string_false_4')
		.typeJson()
		.require()
		.errorEx('json_string_false_4', 'json_string_false_4')
	);

	const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
	validator.fValid(rules.get(), data);

	return validator.getResult();
}


const result = valid({
	json_array_true_1: '["количество","размер2","цветb", "2", "b"]',
	json_array_true_2: ["количество","размер2","цветb", "2", "b"],
	json_object_true_3: '{"количество":["цвет1","размер2","окуньb","2","b",2],"размер":["2",3,"xl"]}',
	json_object_true_4: {"количество":["цвет1","размер2","окуньb","2","b",2],"размер":["2",3,"xl"]},

	json_boolean_false_1: true,
	json_boolean_false_2: false,

	json_number_false_1: 11,
	json_number_false_2: 0,
	json_number_false_3: 10.02,

	json_string_false_1:'123',
	json_string_false_2:'Это текст - s12s',
	json_string_false_3: null,
	json_string_false_4: undefined,
	
});
console.log('======================================');
console.log('===json_array_true_1>', result.json_array_true_1);
console.log('===json_array_true_2>', result.json_array_true_2);
console.log('===json_object_true_3>', result.json_object_true_3);
console.log('===json_object_true_4>', result.json_object_true_4);
console.log('======================================');
console.log('===json_boolean_false_1>', result.json_boolean_false_1);
console.log('===json_boolean_false_2>', result.json_boolean_false_2);
console.log('======================================');
console.log('===json_number_false_1>', result.json_number_false_1);
console.log('===json_number_false_2>', result.json_number_false_2);
console.log('===json_number_false_3>', result.json_number_false_3);
console.log('======================================');
console.log('===json_string_false_1>', result.json_string_false_1);
console.log('===json_string_false_2>', result.json_string_false_2);
console.log('===json_string_false_3>', result.json_string_false_3);
console.log('===json_string_false_4>', result.json_string_false_4);
console.log('======================================');