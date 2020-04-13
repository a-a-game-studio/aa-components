"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelValidatorSys_1 = require("./ModelValidatorSys/ModelValidatorSys");
class BaseClass {
    constructor(errorSys) {
        this.modelValidatorSys = new ModelValidatorSys_1.ModelValidatorSys(errorSys);
        this.errorSys = errorSys;
    }
    className() {
        return this.constructor.name;
    }
}
exports.BaseClass = BaseClass;
//# sourceMappingURL=BaseClass.js.map