"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function initBaseCore(conf) {
    const core = {
        conf: conf,
        apikey: '',
        env: conf.env,
        system: {
            errorSys: null,
        }
    };
    core.system.errorSys = new __1.ErrorSys(core);
    return core;
}
exports.initBaseCore = initBaseCore;
//# sourceMappingURL=BaseCore.js.map