"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function initBaseCore(conf) {
    const core = {
        conf: conf,
        apikey: '',
        env: conf.env,
        sys: {
            errorSys: null,
        }
    };
    core.sys.errorSys = new __1.ErrorSys(conf.env);
    return core;
}
exports.initBaseCore = initBaseCore;
//# sourceMappingURL=BaseCore.js.map