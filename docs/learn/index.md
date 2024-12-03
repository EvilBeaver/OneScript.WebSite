# Что такое 1Скрипт?

OneScript это независимая кросс-платформенная реализация виртуальной машины, исполняющей скрипты на языке 1С:Предприятие 8.При этом библиотеки системы 1С:Предприятие не используются и не требуется установка системы 1С:Предприятие на целевой машине.

Иными словами, это возможность писать программы на языке 1С без использования платформы 1С:Предприятие.

## С чем можно сравнить?

Ближайший аналог по концепции - это Python или Node.JS. Это интерпретатор текстовых скриптов, преимущественно консольных, которые позволяют выполнять те или иные задачи. Вы пишете код в простом текстовом файле на 1С, как если бы писали его на Python. Затем отправляете его в интерпретатор и он выполняется.

## Это бесплатная 1С?

Нет. Проект не является заменой 1С, попыткой заменить 1С и вообще никак не конкурирует с 1С.

Наш скриптовый движок является помощником 1С-специалиста для автоматизации рутинных операций - выпуска релизов, обновлений, тестирования, DevOps и прочее в таком духе. Здесь нет регистров бухгалтерии, отчетов, справочников и всего того, за что мы любим 1С, как фреймворк быстрого создания бизнес-приложений.

Это самостоятельная реализация интерпретатора языка 1С и набор библиотек для него. Здесь нет учетных функций для автоматизации бизнеса.

## Экосистема библиотек

Разумеется, никто уже не пишет с нуля. В 1Скрипт есть развитая система готовых библиотек, из которых вы строите свое приложение. Библиотеки разрабатываются сообществом и вы можете опубликовать для сообщества собственные разработки, если возникнет такое желание.

Существуют библиотеки для самых разных задач, с которыми сталкивается специалист на 1С:

* Обновление баз
* Скачивание типовых конфигураций
* Работа со сторонними REST-API
* Тестирование
* Управление кластером серверов 1С
* Continuos Integration 
* и многое другое