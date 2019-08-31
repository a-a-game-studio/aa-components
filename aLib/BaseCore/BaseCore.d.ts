import { ErrorSys } from "..";
export interface BaseCoreI {
    conf: BaseConfI;
    apikey: string;
    env: string;
    system: {
        errorSys: ErrorSys;
    };
}
export interface BaseConfI {
    env: string;
}
export declare function initBaseCore(conf: BaseConfI): BaseCoreI;
