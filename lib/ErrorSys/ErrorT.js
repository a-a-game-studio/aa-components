"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Стандартные сообщения об ошибках
var ErrorMsgT;
(function (ErrorMsgT) {
    ErrorMsgT["throwAccess"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430";
    ErrorMsgT["throwValid"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445";
    ErrorMsgT["throwValidRoute"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0440\u043E\u0443\u0442\u0438\u043D\u0433\u0430";
    ErrorMsgT["throwValidDB"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u0411\u0414";
    ErrorMsgT["throwDB"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0432 \u0411\u0414";
    ErrorMsgT["throwLogic"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F - \u0432 \u0431\u0438\u0437\u043D\u0435\u0441 \u043B\u043E\u0433\u0438\u043A\u0435";
    ErrorMsgT["throw"] = "\u041F\u0440\u043E\u0431\u0440\u043E\u0441 \u043E\u0448\u0438\u0431\u043A\u0438";
})(ErrorMsgT = exports.ErrorMsgT || (exports.ErrorMsgT = {}));
;
// Типы ошибок
var ErrorT;
(function (ErrorT) {
    ErrorT["throwAccess"] = "throw_access";
    ErrorT["throwValid"] = "throw_valid";
    ErrorT["throwValidRoute"] = "throw_valid_route";
    ErrorT["throwValidDB"] = "throw_valid_db";
    ErrorT["throwDB"] = "throw_db";
    ErrorT["throwLogic"] = "throw_logic";
    ErrorT["throw"] = "throw"; // Проброс ошибки
})(ErrorT = exports.ErrorT || (exports.ErrorT = {}));
;
//# sourceMappingURL=ErrorT.js.map