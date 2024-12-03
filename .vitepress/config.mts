import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OneScript",
  description: "OneScript. Официальная документация, релизы, справка, синтакс-помощник",

  appearance: 'dark',

  // TODO cделать яндекс-метрику и иконку favicon
  // head: [
  //   [
  //     'script',
  //     { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-ZHG1MYKGV9' }
  //   ],
  //   [
  //     'script',
  //     {},
  //     "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-ZHG1MYKGV9');"
  //   ],
  //   ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  // ],

  lang: 'ru-RU',

  base: '/OneScript.WebSite',

  srcDir: 'docs',

  cleanUrls: true,

  lastUpdated: true,

  ignoreDeadLinks: [
    '/downloads/index'
  ],

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru'
    },

  },

  markdown: {
    container: {
      tipLabel: 'Совет',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее'
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Изучить', link: '/learn/' },
      { text: 'Скачать', link: '/downloads/' },
      { text: 'Синтакс-помощник', link: '/syntax/' },
      { text: 'Сообщество', link: '/community/' },
    ],

    sidebar: {
      '/learn/': [
        {
          text: 'Быстрое вхождение',
          items: [
            { text: 'Что такое 1Скрипт?', link: '/learn/' },
            { text: 'Установка', link: '/learn/install' },
            { text: 'Среда разработки', link: '/learn/dev-tools' },
            { text: 'Урок: Информация о системе', link: '/learn/tutorial-info'},
            { text: 'Урок: Сортировка фотографий', link: '/learn/tutorial-photos'},
          ]
        },
        {
          text: 'Начало работы',
          items: [
            { text: 'Новый проект', link: '/learn/new-project' },
            { text: 'Устройство и инфраструктура', link: '/learn/infra'},
            { text: 'Отладка', link: '/learn/debug'},
            { text: 'Тестирование', link: '/learn/testing'},
            { text: 'Конфигурация', link: '/learn/config'},
            { text: 'Библиотеки', link: '/learn/libraries'},
            { text: 'Основы синтаксиса', link: '/learn/syntax-basics'},
            { text: 'Корпоративным пользователям', link: '/learn/enterprise'},
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/EvilBeaver/OneScript' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            displayDetails: 'Отображать детали',
            resetButtonTitle: 'Сбросить',
            backButtonTitle: 'Назад',
            noResultsText: 'Нет результатов',
            footer: {
              selectText: 'Выбрать',
              selectKeyAriaLabel: 'Выбрать',
              navigateText: 'Навигация',
              navigateUpKeyAriaLabel: 'Вверх',
              navigateDownKeyAriaLabel: 'Вниз',
              closeText: 'Закрыть',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    },

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },

    outline: { label: 'Содержание страницы' },
    darkModeSwitchLabel: 'Оформление',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на тёмную тему',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться к началу',
  }
})