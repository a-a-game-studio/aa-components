import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	// =================================================
	// DEFVAL

	rules.set(rules.rule('int_defval_true_1')
		.typeInt()
		.require(true)
		.def(16)
		.errorEx('int_defval_true_1', 'int_defval_true_1')
	);

	rules.set(rules.rule('int_defval_true_2')
		.typeInt()
		.require(true)
		.def(16)
		.errorEx('int_defval_true_2', 'int_defval_true_2')
	);

	rules.set(rules.rule('int_defval_true_3')
		.typeInt()
		.require(true)
		.def(16)
		.errorEx('int_defval_true_3', 'int_defval_true_3')
	);

	rules.set(rules.rule('int_defval_true_4')
		.typeInt()
		.require(true)
		.def(0)
		.errorEx('int_defval_true_4', 'int_defval_true_4')
	);

	rules.set(rules.rule('int_defval_true_5')
		.typeInt()
		.require(true)
		.def(false)
		.errorEx('int_defval_true_5', 'int_defval_true_5')
	);

	rules.set(rules.rule('int_defval_true_6')
		.typeInt()
		.require(true)
		.def(16)
		.errorEx('int_defval_true_6', 'int_defval_true_6')
	);

	rules.set(rules.rule('text_defval_true_1')
		.typeText()
		.def('')
		.errorEx('text_defval_true_1', 'text_defval_true_1')
	);


    const errorSys = new System.ErrorSys('dev');

	const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
	validator.fValid(rules.get(), data);

	return validator.getResult();
}

const result = valid({

	int_defval_true_1:'sdfsdf', // DEF 16
	int_defval_true_2:'aasdasd', // DEF 16
	int_defval_true_3:'aasdasd', // DEF 16
	int_defval_true_4:'aasdasd', // DEF 0
	int_defval_true_5:'aasdasd', // DEF false
	int_defval_true_6:19, // DEF 16
	text_defval_true_1:123123
});


console.log('======================================');
console.log('===int_defval_true_1>', result.int_defval_true_1, '<=', 16);
console.log('===int_defval_true_2>', result.int_defval_true_2, '<=', 16);
console.log('===int_defval_true_3>', result.int_defval_true_3, '<=', 16);
console.log('===int_defval_true_4>', result.int_defval_true_4, '<=', 0);
console.log('===int_defval_true_5>', result.int_defval_true_5, '<=', 'false');
console.log('===int_defval_true_6>', result.int_defval_true_6, '<=', 16);
console.log('===text_defval_true_1>', result.text_defval_true_1, '<=', '""');
console.log('======================================');