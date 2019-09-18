

# aa-components
node typescript base class

Базовые классы и компонеты для forntend и backend

## ErrorSys

## Validator

## BaseClass

## SimpleI

## FieldValidator

```typescript
    // Пример использования
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
