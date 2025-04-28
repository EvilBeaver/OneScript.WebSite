---
outline: [2, 3]
---

# ЗаписьXML / XMLWriter


## Свойства


### Отступ / Indent

* Чтение: Да
* Запись: Да

### КонтекстПространствИмен / NamespaceContext

* Чтение: Да
* Запись: Нет

### Параметры / Settings

* Чтение: Да
* Запись: Нет

## Методы


### ЗаписатьАтрибут / WriteAttribute


#### Параметры

* **localName**: 
* **valueOrNamespace**: 
* **value**:  *Необязательный*. 

### ЗаписатьБезОбработки / WriteRaw


#### Параметры

* **data**: 

### ЗаписатьИнструкциюОбработки / WriteProcessingInstruction


#### Параметры

* **name**: 
* **text**: 

### ЗаписатьКомментарий / WriteComment


#### Параметры

* **text**: 

### ЗаписатьКонецАтрибута / WriteEndAttribute


### ЗаписатьКонецЭлемента / WriteEndElement


### ЗаписатьНачалоАтрибута / WriteStartAttribute


#### Параметры

* **name**: 
* **ns**:  *Необязательный*. 

### ЗаписатьНачалоЭлемента / WriteStartElement


#### Параметры

* **name**: 
* **ns**:  *Необязательный*. 

### ЗаписатьОбъявлениеXML / WriteXMLDeclaration


### ЗаписатьСекциюCDATA / WriteCDATASection


#### Параметры

* **data**: 

### ЗаписатьСоответствиеПространстваИмен / WriteNamespaceMapping


#### Параметры

* **prefix**: 
* **uri**: 

### ЗаписатьСсылкуНаСущность / WriteEntityReference


#### Параметры

* **name**: 

### ЗаписатьТекст / WriteText


#### Параметры

* **text**: 

### ЗаписатьТекущий / WriteCurrent


#### Параметры

* **reader**: 

### ЗаписатьТипДокумента / WriteDocumentType


#### Параметры

* **name**: 
* **varArg2**: 
* **varArg3**:  *Необязательный*. 
* **varArg4**:  *Необязательный*. 

### НайтиПрефикс / LookupPrefix


#### Параметры

* **uri**: 

### Закрыть / Close


### ОткрытьФайл / OpenFile


#### Параметры

* **path**: 
* **encodingOrSettings**:  *Необязательный*. 
* **addBOM**:  *Необязательный*. 

### УстановитьСтроку / SetString


#### Параметры

* **encodingOrSettings**:  *Необязательный*. 

## Конструкторы


### Основной

