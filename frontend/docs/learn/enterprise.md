---
aside: false
---
# Документы и полезная информация для организаций и учреждений

[[toc]]

## Применимость в корпоративной среде

1Script популярный открытый движок, который используется в корпоративной среде, в т.ч. в крупных компаниях, корпорациях, банках. Авторам известно, что он используется как минимум:

* В операторе сотовой связи из "большой тройки"
* федеральном банке из ТОП-5
* федеральной компании со словом "Газ" в названии
* судостроении
* и много где еще

На данной странице публикуются материалы, которые вы можете найти материалы, помогающие в работе с корпоративными службами при внедрении 1Script

## Материалы по информационной безопасности

Типовые требования служб ИБ к информационным системам

|Требование|Реализация в 1Script|
|-|-|
|Методы оповещения пользователей об уязвимостях решения и рекомендациях по их устранению.|Пользователи уведомляются в канале https://t.me/oscript_library. Информация о критичных уязвимостях показывается на [главной странице сайта](https://oscript.io) |
|Политика устранения уязвимостей|Обнаруживаемые уязвимости устраняются в приоритетном порядке, как только авторы уязвимых библиотек, фреймворков выпускают исправление. Как правило, это 2-3 дня после появления исправления. Уязвимости в самом движке так же исправляются в приоритетном порядке. Гарантии по срокам исправления доступны только на базе платной поддержки.|
|Политика обновления используемых библиотек, платформ|Движок основан на последних актуальных релизах .NET Framework и .NET. При выходе LTS-релизов осуществляется переход на них в плановом порядке|
|Отсутствие недокументированных возможностей (НДВ)|НДВ отсутствуют, исходный код открыт|
|Отсутствие неотключаемых функций взаимодействия с Интернет|Неотключаемые функции отсутствуют, при блокировании доступа в Интернет работоспособность 1Script сохраняется. Перестанут работать только попытки пользователя явно выйти в интернет средствами программы.|
|Параметры резервного копирования, перечень компонентов, подлежащих резервному копированию.|Неприменимо, т.к. отсутствует база данных и какое-либо хранимое состояние, требующее резервного копирования.|
|Релизная политика, сроки выпуска релизов.|Стабильные номерные релизы выпускаются в среднем каждые 3-4 месяца. Версии с долгосрочной поддержкой (LTS) выпускаются каждые 6-8 месяцев, ошибки в них исправляются в течение года с момента выпуска. Релизы выпускаются по мере накопления полезной функциональности или исправления ошибок. Кроме того, на сайте публикуются ночные сборки. В них включены самые свежие изменения. Можно сказать, что публикация исправлений происходит немедленно после внесения исправления в код.|
|Change Logs и описания изменений.|К каждому релизу прилагается Changelog, кроме того, за счет открытости кода, все изменения видны в логе коммитов git. Увидеть changelog каждой версии можно на странице версии (см. "Предыдущие версии" страницы скачивания релизов)|

## Информационная поддержка

Мы будем признательны, если Ваша компания разрешит нам опубликовать на сайте информацию о том, что Вы применяете 1Script. Нам доверяют многие крупные компании, но мы не вели с ними переговоров об использовании нами брендов на сайте, поэтому не называем имен. Если вы хотите дать нам такое разрешение или знаете, к кому в Вашей компании можно обратиться за таким разрешением, [напишите нам, пожалуйста](https://t.me/oscript_library).

## Платная поддержка

У команды разработчиков на данный момент отсутствует функция платной поддержки, т.к. за таковой никто не обращался, но мы открыты к предложениям. Напишите в Telegram-канал https://t.me/oscript_library или создайте [issue на github](https://github.com/EvilBeaver/OneScript/issues).
