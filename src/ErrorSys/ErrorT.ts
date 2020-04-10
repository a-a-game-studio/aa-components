// Стандартные сообщения об ошибках
export enum ErrorMsgT{
	throwAccess='Ошибка доступа',
	throwValid='Ошибка валидации данных',
	throwValidRoute='Ошибка валидации данных роутинга',
	throwValidDB='Ошибка валидации данных для БД',
	throwDB='Ошибка запроса в БД',
	throwLogic='Ошибка логическая - в бизнес логике',
	throw='Проброс ошибки'
};

// Типы ошибок
export enum ErrorT{
	throwAccess='throw_access', // Ошибка доступа
	throwValid='throw_valid', // Ошибка валидации данных
	throwValidRoute='throw_valid_route', // Ошибка валидации данных роутинга
	throwValidDB='throw_valid_db', // Ошибка валидации данных для БД
	throwDB='throw_db', // Ошибка запроса в БД
	throwLogic='throw_logic', // Ошибка логическая - в бизнес логике
	throw='throw' // Проброс ошибки
};