import { ErrorSys } from "./ErrorSys";
import * as SimpleI from "./SimpleI";
import { Validator } from "./Validator/Validator";
import { ModelValidatorSys } from "./Validator/ModelValidatorSys";
import { ModelOneRuleC } from "./Validator/ModelOneRuleC";
import { ModelRulesC, ModelRulesT } from "./Validator/ModelRulesC";
import { BaseClass } from "./BaseClass";

import { BaseCoreI, initBaseCore, BaseConfI } from "./BaseCore/BaseCore";

export {
    ErrorSys,
    SimpleI,
    Validator,
    ModelValidatorSys,
    ModelOneRuleC,
    ModelRulesC,
    ModelRulesT,
    BaseClass,
    BaseCoreI, // Базовый интерфейс ядра
    initBaseCore, // Инициализация базового core объекта
    BaseConfI // Базовый интерфейс конфига
}