import { ModelValidatorSys } from './ModelValidatorSys/ModelValidatorSys';
import { ErrorSys } from './ErrorSys/ErrorSys';
export declare class BaseClass {
    errorSys: ErrorSys;
    modelValidatorSys: ModelValidatorSys;
    constructor(errorSys: ErrorSys);
    protected className(): string;
}
