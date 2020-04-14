import * as System from '../src';

function valid(data: any) {
	const rules = new System.ModelRulesC();

	// =================================================
	// DEFVAL

	rules.set(rules.rule('int_defval_true_1')
		.typeInt()
		.require()
		.def(16)
		.errorEx('int_defval_true_1', 'int_defval_true_1')
	);

	rules.set(rules.rule('int_defval_true_2')
		.typeInt()
		.require()
		.def(16)
		.errorEx('int_defval_true_2', 'int_defval_true_2')
	);

	rules.set(rules.rule('int_defval_true_3')
		.typeInt()
		.require()
		.def(16)
		.errorEx('int_defval_true_3', 'int_defval_true_3')
	);

	rules.set(rules.rule('int_defval_true_4')
		.typeInt()
		.require()
		.def(0)
		.errorEx('int_defval_true_4', 'int_defval_true_4')
	);

	rules.set(rules.rule('int_defval_true_5')
		.typeInt()
		.require()
		.def(false)
		.errorEx('int_defval_true_5', 'int_defval_true_5')
	);

	rules.set(rules.rule('int_defval_true_6')
		.typeInt()
		.require()
		.def(16)
		.errorEx('int_defval_true_6', 'int_defval_true_6')
	);


	const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
	validator.fValid(rules.get(), data);

	return validator.getResult();
}


const result = valid({

	int_defval_true_1:0, // DEF 16
	int_defval_true_2:false, // DEF 16
	int_defval_true_3:null, // DEF 16
	int_defval_true_4:null, // DEF 0
	int_defval_true_5:null, // DEF false
	int_defval_true_6:19, // DEF 16
});

console.log('======================================');
console.log('===int_defval_true_1>', result.int_defval_true_1);
console.log('===int_defval_true_2>', result.int_defval_true_2);
console.log('===int_defval_true_3>', result.int_defval_true_3);
console.log('===int_defval_true_4>', result.int_defval_true_4);
console.log('===int_defval_true_5>', result.int_defval_true_5);
console.log('===int_defval_true_6>', result.int_defval_true_6);
console.log('======================================');