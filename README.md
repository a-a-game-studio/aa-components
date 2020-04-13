

# aa-components
node typescript base class

Базовые классы и компонеты для forntend и backend

## ErrorSys

```ts
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
```

## ModelValidatorSys

### TPL VALIDATION
```ts
const rules = new System.ModelRulesC();

// ===========================
// ID

rules.set(rules.tpl('id_require_true_1', true)
    .tplID('ID обязателен для заполнения')
);

rules.set(rules.tpl('id_require_false_1', true)
    .tplID('ID обязателен для заполнения')
);

rules.set(rules.tpl('id_true_1')
    .tplID('ID не обязателен заполнения')
);

// ==========================-
// TEXT

rules.set(rules.tpl('text_true_1', true)
    .tplStr('Текст true_1')
);

// ===========================
// STR

rules.set(rules.tpl('str_true_1', true)
    .tplStr('Строка true_1')
);

rules.set(rules.tpl('str_regex_true_1', true)
    .tplStr('С регуларынм выражением true_1')
    .if(/^аист[ои]к$/)
);

rules.set(rules.tpl('str_regex_false_1', true)
    .tplStr('С регуларынм выражением false_1')
    .if(/^аист[ои]к$/)
);

// =============================
// ENUM

rules.set(rules.tpl('enum_number_true_1', true)
    .tplEnum('Сообщение - enum_number_true_1')
    .if([1,2])
);

rules.set(rules.tpl('enum_string_true_1', true)
    .tplEnum('Сообщение - enum_string_true_1')
    .if(['s1','s2', '1'])
);

const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
validator.fValid(rules.get(), data);

validator.getResult();
```

====

### Пример
```ts
const rules = new System.ModelRulesC();

rules.set(rules.rule('enum_boolean_true_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_true_1', 'enum_boolean_true_1')
);

rules.set(rules.rule('enum_boolean_true_2')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_true_2', 'enum_boolean_true_2')
);

rules.set(rules.rule('enum_boolean_true_3')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_true_3', 'enum_boolean_true_3')
);

rules.set(rules.rule('enum_boolean_true_4')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_true_4', 'enum_boolean_true_4')
);

rules.set(rules.rule('enum_boolean_false_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_false_1', 'enum_boolean_false_1')
);

rules.set(rules.rule('enum_boolean_false_2')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_false_2', 'enum_boolean_false_2')
);

rules.set(rules.rule('enum_boolean_false_3')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,0])
    .errorEx('enum_boolean_false_3', 'enum_boolean_false_3')
);

// =============================================
// NUMBER

rules.set(rules.rule('enum_number_true_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,2])
    .errorEx('enum_number_true_1', 'enum_number_true_1')
);

rules.set(rules.rule('enum_number_true_2')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,2])
    .errorEx('enum_number_true_2', 'enum_number_true_2')
);

rules.set(rules.rule('enum_number_false_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,2])
    .errorEx('enum_number_false_1', 'enum_number_false_1')
);

rules.set(rules.rule('enum_number_false_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if([1,2])
    .errorEx('enum_number_false_1', 'enum_number_false_1')
);

// =================================================
// STRING

rules.set(rules.rule('enum_string_true_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if(['s1','s2', '1'])
    .errorEx('enum_string_true_1', 'enum_string_true_1')
);

rules.set(rules.rule('enum_string_false_1')
    .type(System.ModelRulesT.enum)
    .require()
    .if(['s1','s2', '1'])
    .errorEx('enum_string_false_1', 'enum_string_false_1')
);

rules.set(rules.rule('enum_string_false_2')
    .type(System.ModelRulesT.enum)
    .require()
    .if(['s1','s2', '1'])
    .errorEx('enum_string_false_2', 'enum_string_false_2')
);

rules.set(rules.rule('enum_string_false_3')
    .type(System.ModelRulesT.enum)
    .require()
    .if(['s1','s2', '1'])
    .errorEx('enum_string_false_3', 'enum_string_false_3')
);

const validator = new System.ModelValidatorSys(new System.ErrorSys('dev'));
validator.fValid(rules.get(), data);

validator.getResult();
```

## FieldValidator

```typescript
    // Пример использования 1
    import { FieldValidator, ErrorSys } from "@a-a-game-studio/aa-components/lib";
    let data = '20d00';
    const errorSys = new ErrorSys();
    let myValidator = new FieldValidator(errorSys, data)
            .fSetErrorString('multy')
            .fInt()
            .fMoreOrEqual(5000)
            .fLess(5000);

    assert.ok(!myValidator.fIsOk());
    assert.ok(errorSys.getErrorCount() == 3);
```

Получился список ошибок
```JSON
    { 
        "multy.isNotInt": "isNotInt",
        "multy.isNotMoreOrEqualThan": "isNotMoreOrEqualThan",
        "multy.isNotLessThan": "isNotLessThan" 
    }
```

```typescript
    // Пример использования 2
    import { FieldValidator, ErrorSys } from "@a-a-game-studio/aa-components/lib";
    let data = 10000;
    const errorSys = new ErrorSys();

    let iArg1 = 1000;
    let iArg2 = 1000;

    const tstFnc = (arg1: number, arg2: number) => {
        iArg1 = arg1;
        iArg2 = arg2;
    };

    let myValidator = new FieldValidator(errorSys, data)
        .fSetErrorString('multy')
        .fInt()
        .fMoreOrEqual(5000)
        .fDoIfOk(tstFnc, [2, 3])
        ;

    assert.ok(myValidator.fIsOk());

    assert.ok(iArg1 == 2);
    assert.ok(iArg2 == 3);
```

```typescript
    // Пример использования 3
    import { FieldValidator, ErrorSys } from "@a-a-game-studio/aa-components/lib";
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

    let resp = await myValidator.fDoIfOkAsync(tstFnc, [2, 3]);

    assert.ok(myValidator.fIsOk());

    assert.ok(iArg1 == 2);
    assert.ok(iArg2 == 3);
```

```typescript
    // Пример использования 4
    import { FieldValidator, ErrorSys } from "@a-a-game-studio/aa-components/lib";
   
    const errorSys = new ErrorSys();
    let login = 'user';
    let pass = 'test pass';
    let passConfirm = 'test pass';

    const loginFnc = (login: string, pass: string) => {
        // Do login
    }

    new FieldValidator(errorSys, login)
        .fSetErrorString('login')
        .fExist()
        .fText()
        .fMinLen(5)

        .fSetData(pass)
        .fSetErrorString('pass')
        .fExist()
        .fText()
        .fMinLen(7)

        .fSetData(passConfirm)
        .fSetErrorString('passConfirm')
        .fExist()
        .fText()
        .fMinLen(7)
        .fEqual(pass)

        .fDoIfOk(loginFnc, [login, pass]);
```

```typescript
    // Пример использования 5 - асинхронная ф-я
    import { FieldValidator, ErrorSys } from "@a-a-game-studio/aa-components/lib";
    
    const errorSys = new ErrorSys();
    let login = 'user';
    let pass = 'test pass';
    let passConfirm = 'test pass';

    const faLoginFnc = async (login: string, pass: string) => {
        // Do login ...
    }
    const faAfterloginFnc = async (someData: any) => {
        // Do something ...
    }

    const myValidator = new FieldValidator(errorSys, login)
        .fSetErrorString('login')
        .fExist()
        .fText()
        .fMinLen(5)

        .fSetData(pass)
        .fSetErrorString('pass')
        .fExist()
        .fText()
        .fMinLen(7)

        .fSetData(passConfirm)
        .fSetErrorString('passConfirm')
        .fExist()
        .fText()
        .fMinLen(7)
        .fEqual(pass);

    myValidator.faDoIfOkAsync(() => faLoginFnc(login, pass))
        .then((data: any) => myValidator.faDoIfOkAsync(() => faAfterloginFnc(data)))
        .then((data: any) => myValidator.faDoIfOkAsync(() => faAfterloginFnc(data)))
        .then((data: any) => myValidator.faDoIfOkAsync(() => faAfterloginFnc(data)))
        
        ;

```
