Перем мТокенВерсии;
Перем мВарианты;
Перем мНесуществующаяВерсия;

Процедура ПриСозданииОбъекта(Знач Токен, Знач СоставВерсии, Знач НесуществующаяВерсия)
	мТокенВерсии = Токен;
	мВарианты = СоставВерсии;
	мНесуществующаяВерсия = НесуществующаяВерсия;
КонецПроцедуры

Функция ТокенВерсии() Экспорт
	Возврат мТокенВерсии;
КонецФункции

// Получает таблицу вариантов дистрибутива
// Возвращаемое значение:
//  Наименование - Строка
//  Варианты - ТаблицаЗначений
//    - Идентификатор: Строка
//    - Представление: Строка
//    - Ссылка - относительный путь файла дистрибутива
//    - ДатаФайла - дата создания файла
//
Функция ПолучитьСостав() Экспорт
	Возврат мВарианты;
КонецФункции

Функция Существует() Экспорт
	Возврат мНесуществующаяВерсия = Ложь;
КонецФункции

Функция НайтиВариантСборки(Идентификатор, Разрядность) Экспорт
	Найденное = мВарианты.НайтиСтроки(Новый Структура("Идентификатор, Архитектура", Идентификатор, Разрядность));
	Если Найденное.Количество() Тогда
		Возврат Найденное[0];
	Иначе
		Найденное = мВарианты.НайтиСтроки(
			Новый Структура("Идентификатор, Архитектура", Идентификатор, Архитектуры.Универсальная.Идентификатор()));
		Если Найденное.Количество() Тогда
			Возврат Найденное[0];
		КонецЕсли;
		Возврат Неопределено;
	КонецЕсли;
КонецФункции

