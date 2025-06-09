# Гайд по доработке движка

Разработка ведется в фичаветках, которые потом вливаются в ствол. Специальных веток, наподобие git-flow мы не используем, оказалось, что для нас слишком много формализма и слишком мало пользы.

Стволов у нас несколько, потому что одновременно поддерживается несколько версий:

* Очередная версия, которая активно разрабатывается (ветка develop)
* Ветка разработки стабильного релиза (ветка latest) поддерживаемого в части багфиксов (latest)
* Ветки фиксации релизов (release/*) - после вливания в одну из этих веток CI начнет публикацию релиза на сайт
    * release/latest - последний релиз стабильной версии 1.x
    * release/preview - релиз ознакомительной версии. Сейчас это релиз-кандидаты мажорной версии 2.0
    * release/lts - релиз LTS версии, поддерживаемой в части багфиксов (latest)

### Версия 1.x

Версия 1.x на данный момент самая распространенная и считается стабильной. Разработка новых фич в ней не ведется. Основана на .NET 4.8, на линуксе требует Mono

### Версия 2.0

Разрабатываемая мажорная версия, пока не выпущена как официальная замена версии 1. Основана на актуальных версиях .NET, кроссплатформенная, собирается под windows, linus, MacOS ARM и x86

## Добавление класса

Вам нужно добавить обычный новый класс C#, дать ему какое-то имя %ВашеИмя% и унаследовать его от класса `AutoContext<%ВашеИмя%>`. Кроме того, класс нужно пометить атрибутом `ContextClassAttribute`. 

```csharp

using System;
using System.IO;
using ScriptEngine.Machine;
using ScriptEngine.Machine.Contexts;

namespace ScriptEngine.Machine.Library
{
	[ContextClass("ЧтениеТекста", "TextReader")]
	class TextReadImpl : AutoContext<TextReadImpl>, IDisposable
	{
		StreamReader _reader;

		[ContextMethod("Открыть", "Open")]
		public void Open(string path, string encoding = null)
		{
			if (encoding == null)
			{
				_reader = Environment.FileOpener.OpenReader(path);
			}
			else
			{
				var enc = Encoding.GetEncoding(encoding);
				_reader = Environment.FileOpener.OpenReader(path, enc);
			}
		}
    }
}
```

В примере приведен фрагмент класса `TextReadImpl`, который в языке виден, как **ЧтениеТекста**. Класс унаследован от `AutoContext<TextReadImpl>` и помечен атрибутом `ContextClassAttribute`.

В принципе, этих простых действий достаточно, чтобы ваш класс появился в языке.

## Конструкторы класса

В приведенном примере класс не имеет конструктора. Экземпляр такого класса нельзя создать через оператор `Новый`, однако его можно вернуть, как результат какого-либо метода.

Чтобы экземпляры класс могли создаваться через оператор `Новый`, нашему классу нужно задать конструкторы. Конструктор реализуется в виде статического метода класса, помеченного атрибутом `ScriptConstructorAttribute` и возвращающего `IRuntimeContextInstance`.

```csharp

    [ScriptConstructor(Name="По имени файла и кодировке")]
    public static IRuntimeContextInstance Constructor(IValue path, IValue encoding)
    {
        var reader = new TextReadImpl();
        reader.Open(path.AsString(), encoding.AsString());
        return reader;
    }
```

## Методы класса

Методы класса - это обычные методы-члены класса C#, которые помечены атрибутом `ContextMethodAttribute`.

Типы параметров автоматически транслируются из типов языка 1С в типы языка C#

```csharp

    [ContextMethod("Открыть", "Open")]
	public void Open(string path, string encoding = null)
	{
		if (encoding == null)
		{
			_reader = Environment.FileOpener.OpenReader(path);
		}
		else
		{
			var enc = Encoding.GetEncoding(encoding);
			_reader = Environment.FileOpener.OpenReader(path, enc);
		}
	}
```

Обратите внимание, параметры заявлены, как string. OneScript самостоятельно транслирует типы значений, передаваемых из скрипта в методы C# и выбрасывает исключения, если типы несовместимы.

### Выходные параметры методов

Если метод имеет выходной параметр (возвращает значение в параметре), то этот параметр должен иметь тип IVariable и быть помечен атрибутом ByRefAttribute. Т.е. это должно выглядеть примерно так:

```csharp

[ContextMethod("Свойство", "Property")]
public bool HasProperty(string name, [ByRef] IVariable value = null)
{
    value.Value = ValueFactory.Create("Это строковое значение, передаваемое в скрипт");
}
```


Второй параметр `value` является необязательным и в нем можно вернуть значение обратно в скрипт.

## Свойства классов

Свойство класса - это обычное свойство класса C#, помеченное атрибутом `ContextPropertyAttribute`.

```csharp
[ContextProperty("Имя","Name")]
public string Name
{
    get
    {
        return "some name";
    }
}
```

Доступность чтения и записи свойства регулируется двумя способами:

* Обычная видимость get/set элементов свойства
* Параметры CanRead/CanWrite атрибута `ContextPropertyAttribute`

В приведенном примере свойство не содержит части set, поэтому оно будет доступно в скриптах только, как свойство "Для чтения". Если добавить туда часть set, то свойство будет доступно для записи.

1Script самостоятельно регистрирует в системе доступность свойств и автоматически транслирует типы значений языка 1С в типы C# и обратно.

## Итоги

Чтобы добавить свой класс в язык, вам нужно:

1. Создать обычный класс C#
2. Пометить его атрибутом ContextClass
3. Унаследовать его от AutoContext<ИмяВашегоКласса>
4. Пометить нужные свойства класса атрибутом ContextProperty
5. Пометить нужные методы класса атрибутом ContextMethod
6. Создать статический метод для конструктора и пометить его атрибутом ScriptConstructor
7. Все, ваш класс теперь можно использовать в сценариях.