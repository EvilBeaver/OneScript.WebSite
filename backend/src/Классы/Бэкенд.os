
&Деталька(Значение = "server.port", ЗначениеПоУмолчанию = 3030)
Перем ПортСервера;

&Пластилин
Перем КаталогиДанных;

&Пластилин(Значение = "Обработчик", Тип = "Массив")
Перем Обработчики;

Перем Сервер;

Процедура Старт() Экспорт
	
	Сервер = Новый ВебСервер(ПортСервера);
	Сервер.УстановитьКаталогСервера(КаталогиДанных.КаталогСервера());
	Сервер.УстановитьКорневойПуть(КаталогиДанных.КаталогФронтенда());

	Для Каждого Обработчик Из Обработчики Цикл
		Сервер.ДобавитьОбработчикЗапросов(Обработчик, "Обработать");
	КонецЦикла;

	Сервер.ИспользоватьСтатическиеФайлы();

	Сервер.Запустить();

КонецПроцедуры

&Желудь
Процедура ПриСозданииОбъекта()

КонецПроцедуры