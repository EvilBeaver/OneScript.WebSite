---
outline: [2, 3]
---

# ЧтениеТекста / TextReader


Предназначен для последовательного чтения файлов, в том числе большого размера.


## Методы


### Открыть / Open


Открывает текстовый файл для чтения. Ранее открытый файл закрывается.


#### Параметры

* **input**: Путь к файлу или поток
* **encoding**: Кодировка *Необязательный*. 
* **lineDelimiter**: Раздедитель строк *Необязательный*. Значение по умолчанию: 

* **eolDelimiter**: Разделитель строк в файле *Необязательный*. 
* **monopoly**: Открывать монопольно *Необязательный*. 

### Прочитать / Read


Считывает строку указанной длины или до конца файла.


#### Параметры

* **size**: Размер строки. Если не задан, текст считывается до конца файла *Необязательный*. Значение по умолчанию: 0

#### Возвращаемое значение


Строка - считанная строка, Неопределено - в файле больше нет данных


### ПрочитатьСтроку / ReadLine


Считывает очередную строку текстового файла.


#### Параметры

* **overridenLineDelimiter**: Подстрока, считающаяся концом строки. Переопределяет РазделительСтрок,
            переданный в конструктор или в метод Открыть *Необязательный*. 

#### Возвращаемое значение


Строка - в случае успешного чтения, Неопределено - больше нет данных


### Закрыть / Close


Закрывает открытый текстовый файл. Если файл был открыт монопольно, то после закрытия он становится доступен.


## Конструкторы


### На основании файла или потока без кодировки


Открывает текстовый файл для чтения.


#### Параметры

* **input**: Путь к файлу или поток

#### Возвращаемое значение


ЧтениеТекста


### Формирование неинициализированного объекта


Создаёт неинициализированный объект. Для инициализации необходимо открыть файл методом Открыть.


#### Возвращаемое значение


ЧтениеТекста


### На основании потока или файла


Открывает текстовый файл или поток для чтения. Работает аналогично методу Открыть.


#### Параметры

* **input**: Путь к файлу или поток
* **encoding**: Кодировка *Необязательный*. 
* **lineDelimiter**: Разделитель строк *Необязательный*. 
* **eolDelimiter**: Разделитель строк в файле *Необязательный*. 
* **monopoly**: Открывать файл монопольно *Необязательный*. Значение по умолчанию: True

#### Возвращаемое значение


ЧтениеТекста

