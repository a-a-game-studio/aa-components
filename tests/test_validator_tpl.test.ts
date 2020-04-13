import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	// ===========================
	// ID

	rules.set(rules.tpl('id_require_true_1', true)
		.id('ID обязателен для заполнения')
	);

	rules.set(rules.tpl('id_true_1')
		.id('ID не обязателен заполнения')
	);

	// ==========================-
	// TEXT

	rules.set(rules.tpl('text_true_1', true)
		.str('Текст true_1')
	);

	// ===========================
	// STR

	rules.set(rules.tpl('str_true_1', true)
		.str('Строка true_1')
	);

	rules.set(rules.tpl('str_regex_true_1', true)
		.str('С регуларынм выражением true_1')
		.if(/^аист[ои]к$/)
	);

	rules.set(rules.tpl('str_regex_false_1', true)
		.str('С регуларынм выражением false_1')
		.if(/^аист[ои]к$/)
	);

	// =============================
	// ENUM

	rules.set(rules.tpl('enum_number_true_1', true)
		.enum('Сообщение - enum_number_true_1')
		.if([1,2])
	);

	rules.set(rules.tpl('enum_string_true_1', true)
		.enum('Сообщение - enum_string_true_1')
		.if(['s1','s2', '1'])
	);

	const validator = new System.ModelValidatorSys(new System.ErrorSys());
	validator.fValid(rules.get(), data);

	return validator.getResult();
}


const result = valid({
	id_require_true_1: 45,
	id_true_1: 165,

	text_true_1: 'это простой текст',

	str_true_1: 'это обычная строка',
	str_regex_true_1: 'аистик',
	str_regex_false_1: 'гастенок',

	enum_number_true_1: 2,
	enum_string_true_1: 's2',
});
console.log('======================================');
console.log('===id_require_true_1>', result.id_require_true_1);
console.log('===id_true_1>', result.id_true_1);
console.log('======================================');
console.log('===text_true_1>', result.text_true_1);
console.log('======================================');
console.log('===str_true_1>', result.str_true_1);
console.log('===str_regex_true_1>', result.str_regex_true_1);
console.log('===str_regex_false_1>', result.str_regex_false_1);
console.log('======================================');
console.log('===enum_number_true_1>', result.enum_number_true_1);
console.log('===enum_string_true_1>', result.enum_string_true_1);
console.log('======================================');