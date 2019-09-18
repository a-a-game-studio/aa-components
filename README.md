

# aa-components
node typescript base class

Базовые классы и компонеты для forntend и backend

## ErrorSys

## Validator

## BaseClass

## SimpleI

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
        "multy0": "isNotInt",
        "multy1": "isNotMoreOrEqualThan",
        "multy2": "isNotLessThan" 
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
        .fSetErrorString('.login')
        .fExist()
        .fText()
        .fMinLen(5)

        .fSetData(pass)
        .fSetErrorString('.pass')
        .fExist()
        .fText()
        .fMinLen(7)

        .fSetData(passConfirm)
        .fSetErrorString('.passConfirm')
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

    const loginFnc = async (login: string, pass: string) => {
        // Do login ...
    }
    const afterloginFnc = async (someData: any) => {
        // Do something ...
    }

    const myValidator = new FieldValidator(errorSys, login)
        .fSetErrorString('.login')
        .fExist()
        .fText()
        .fMinLen(5)

        .fSetData(pass)
        .fSetErrorString('.pass')
        .fExist()
        .fText()
        .fMinLen(7)

        .fSetData(passConfirm)
        .fSetErrorString('.passConfirm')
        .fExist()
        .fText()
        .fMinLen(7)
        .fEqual(pass);

    myValidator.fDoIfOkAsync(loginFnc, [login, pass])
        .then((data: any) => myValidator.fDoIfOkAsync(afterloginFnc, [data]))
        .then((data: any) => myValidator.fDoIfOkAsync(afterloginFnc, [data]))
        .then((data: any) => myValidator.fDoIfOkAsync(afterloginFnc, [data]))
        .then((data: any) => myValidator.fDoIfOkAsync(afterloginFnc, [data]))
        
        ;

```
