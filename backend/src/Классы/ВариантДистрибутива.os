Перем мЛокаторы;

Перем мИдентификатор;
Перем мВидДистрибутива;

Функция ПолучитьИдентификатор() Экспорт
	Возврат мИдентификатор;
КонецФункции

Функция ПолучитьВидДистрибутива() Экспорт
	Возврат мВидДистрибутива;
КонецФункции

Процедура ПриСозданииОбъекта(Знач Идентификатор, Знач ВидДистрибутива)
	мИдентификатор = Идентификатор;
	мВидДистрибутива = ВидДистрибутива;
КонецПроцедуры

Функция ДобавитьФайл(Знач Архитектура, Знач Каталог, Знач Маска, Знач ТолькоДляКороткойСсылки = Ложь) Экспорт
	СтрокаПоиска = мЛокаторы.Добавить();
	СтрокаПоиска.Архитектура = Архитектура.Идентификатор();
	СтрокаПоиска.Подкаталог = Каталог;
	СтрокаПоиска.ЛокаторФайла = Новый ЛокаторФайла(Маска, Каталог);
	СтрокаПоиска.ТолькоДляКороткойСсылки = ТолькоДляКороткойСсылки;
	Возврат ЭтотОбъект;
КонецФункции

Функция ПолучитьФайлы(Знач БазовыйКаталог) Экспорт
	Варианты = Новый ТаблицаЗначений();
	Варианты.Колонки.Добавить("Архитектура");
	Варианты.Колонки.Добавить("ВидДистрибутива");
	Варианты.Колонки.Добавить("Подкаталог");
	Варианты.Колонки.Добавить("Файл");

	Дедупликатор = Новый Соответствие();

	Для Каждого СтрЛокатор Из мЛокаторы Цикл
		Если СтрЛокатор.ТолькоДляКороткойСсылки Тогда
			Продолжить;
		КонецЕсли;

		Файл = СтрЛокатор.ЛокаторФайла.ПолучитьФайл(БазовыйКаталог);
		Если Файл.Существует() Тогда
			Если Дедупликатор[Файл.ПолноеИмя] = Неопределено Тогда
				Дедупликатор[Файл.ПолноеИмя] = Истина;
			Иначе
				Продолжить;
			КонецЕсли;
			СтрВариант = Варианты.Добавить();
			СтрВариант.Архитектура = СтрЛокатор.Архитектура;
			СтрВариант.ВидДистрибутива = мВидДистрибутива;
			СтрВариант.Подкаталог = СтрЛокатор.Подкаталог;
			СтрВариант.Файл = Файл;
		КонецЕсли;
	КонецЦикла;

	Возврат Варианты;

КонецФункции

мЛокаторы = Новый ТаблицаЗначений();
мЛокаторы.Колонки.Добавить("Архитектура");
мЛокаторы.Колонки.Добавить("ЛокаторФайла");
мЛокаторы.Колонки.Добавить("Подкаталог");
// жесткий костыль, надо найти время переписать нормально.
мЛокаторы.Колонки.Добавить("ТолькоДляКороткойСсылки", Новый ОписаниеТипов("Булево"));