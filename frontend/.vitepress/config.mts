import { DefaultTheme, defineConfig } from 'vitepress'
import fs from 'fs';
import path from 'path';

// Import lightbox plugin
import lightbox from "vitepress-plugin-lightbox"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OneScript",
  description: "OneScript. Официальная документация, релизы, справка, синтакс-помощник",

  // TODO cделать яндекс-метрику и иконку favicon
  head: [
  //   [
  //     'script',
  //     { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-ZHG1MYKGV9' }
  //   ],
  //   [
  //     'script',
  //     {},
  //     "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-ZHG1MYKGV9');"
  //   ],
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  ],

  lang: 'ru-RU',

  base: '/',

  srcDir: 'docs',
  outDir: getOutDir(),

  cleanUrls: true,

  lastUpdated: false,

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
    },
    config: (md) => {
      // Use lightbox plugin
      md.use(lightbox, {});
    }
  },

  themeConfig: {
    logo: '/logo-gradient.png',

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
            { text: 'Библиотеки', link: '/learn/libraries'},
            { text: 'Основы синтаксиса', link: '/learn/syntax-basics'},
            { text: 'Корпоративным пользователям', link: '/learn/enterprise'},
          ]
        },
        {
          text: 'Особенности и настройки',
          items: [
            { text: 'Конфигурация', link: '/learn/config'},
            { text: 'Native Mode', link: '/learn/native'},
            { text: 'Расширенные возможности', link: '/learn/advanced-usage'},
          ]
        }
      ],
      '/downloads': [
        {
          text: 'Файлы для скачивания',
          items: [
            { text: 'Главное', link: '/downloads' },
            { text: 'Актуальная версия', link: '/downloads/latest' },
            { text: 'Ознакомительная версия', link: '/downloads/preview' },
            { text: 'Версия LTS', link: '/downloads/lts' },
            { text: 'Версии в разработке', link: '/downloads/development' },
            { text: 'Архив версий', link: '/downloads/archive' },
          ]
        }
      ],
      '/syntax': loadSyntaxSidebar('docs/syntax'),
      '/community/': [
        { text: 'Я хочу помочь', link: '/community/contribute' },
        { text: 'Руководство по разработке', link: '/community/engine-dev'},
        { text: 'Как добавить свой пакет в хаб', link: '/community/send-ospx'},
        { text: 'Авторы', link: '/community/developers' },
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
  },
  
  async transformPageData(pageData, _) {
    if (pageData.params?.version) {
      pageData.title = `Версия ${pageData.params.version}`;
    }
  },
})

function loadSyntaxSidebar(contentDir: string): DefaultTheme.SidebarItem[] {
  const lookupFolder = `${process.cwd()}/${contentDir}`;
  
  const tocFile = path.join(lookupFolder, 'vitepress-toc.json');
  if (!fs.existsSync(tocFile)) {
    return [];
  }

  const fileContent = fs.readFileSync(tocFile, {encoding: 'utf-8'});
  
  return JSON.parse(fileContent) as DefaultTheme.SidebarItem[];
}

function getOutDir(): string {
  const envData = process.env.VITEPRESS_OUT;

  return envData ? envData : '../backend/data/wwwroot'
}