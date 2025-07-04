---
outline: [2, 3]
---

# РезультатЧтенияДанных / ReadDataResult


Содержит описание результата чтения данных из потока.


## Свойства


### ИндексМаркера / MarkerIndex

* Чтение: Да
* Запись: Нет

**Тип значения:** Число (Number)


Индекс найденного маркера.


### МаркерНайден / MarkerFound

* Чтение: Да
* Запись: Нет

**Тип значения:** Булево (Boolean)


Содержит признак обнаружения маркера:
 - Истина - если в процессе чтения данных был обнаружен маркер.
 - Ложь - если маркер не был найден или операция не предполагала поиска маркера.


### Размер / Size

* Чтение: Да
* Запись: Нет

**Тип значения:** Число (Number)


Размер данных в байтах. В некоторых случаях может быть равен нулю. Например, при чтении двоичных данных из конца потока или при разделении данных.


## Методы


### ОткрытьПотокДляЧтения / OpenStreamForRead


Открывает поток для чтения данных.


#### Возвращаемое значение


Представляет собой поток данных, который можно последовательно читать и/или в который можно последовательно писать. 
Экземпляры объектов данного типа можно получить с помощью различных методов других объектов.


### ПолучитьБуферДвоичныхДанных / GetBinaryDataBuffer


Получает результат в виде буфера двоичных данных. Необходимо учитывать, что при этом данные будут полностью загружены в оперативную память. Если требуется избежать загрузки оперативной памяти, следует использовать другие методы получения двоичных данных.


#### Возвращаемое значение


Коллекция байтов фиксированного размера с возможностью произвольного доступа и изменения по месту.


### ПолучитьДвоичныеДанные / GetBinaryData


Получает результат чтения в виде двоичных данных.

