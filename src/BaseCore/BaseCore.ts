import { ErrorSys } from "..";

/**
 * Базовый интерфейс ядра
 */
export interface BaseCoreI {
    conf:BaseConfI; //объект конфигурации
    apikey:string; // ключ доступа
    env:string; // Тип окружения (dev|prod)
    system:{
        errorSys:ErrorSys;
    }
}

/**
 * Базовый интерфейс конфигурации
 */
export interface BaseConfI {
    env:string;
}

/**
 * Инициализация базового ядра
 * @param conf 
 */
export function initBaseCore(conf:BaseConfI){
    
    const core:BaseCoreI = {
        conf: conf,
        apikey: '',
        env: conf.env,
        system:{
            errorSys: null,
        }
    }

    core.system.errorSys = new ErrorSys(core);

    return core;
}