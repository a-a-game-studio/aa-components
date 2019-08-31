import { ModelValidatorSys } from './Validator/ModelValidatorSys';
import { ErrorSys } from './ErrorSys';
export declare class BaseClass {
    errorSys: ErrorSys;
    modelValidatorSys: ModelValidatorSys;
    constructor(errorSys: ErrorSys);
    protected className(): string;
}
