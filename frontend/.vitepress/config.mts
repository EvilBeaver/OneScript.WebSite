import { DefaultTheme, defineConfig } from 'vitepress'
import fs from 'fs';
import path from 'path';

// Import lightbox plugin
import lightbox from "vitepress-plugin-lightbox"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OneScript",
  description: "OneScript. Официальная документация, релизы, справка, синтакс-помощник",

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Preload critical resources for faster initial load
    ['link', { rel: 'preload', href: '/2.png', as: 'image' }],
    ['link', { rel: 'preload', href: '/logo-white.png', as: 'image' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    // Inline script to set home page class immediately to prevent navbar flash
    ['script', {}, `
      (function() {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
          document.documentElement.classList.add('is-home-page');
        }
      })();
    `],
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

    editLink: {
      pattern: 'https://github.com/EvilBeaver/OneScript.WebSite/tree/main/frontend/docs/:path',
      text: 'Редактировать эту страницу'
    },

    sidebar: {
      '/learn/': [
        {
          text: 'Быстрое вхождение',
          items: [
            { text: 'Что такое OneScript?', link: '/learn/' },
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
    
    footer: {
      message: 'All trademarks, logos, and brand names are the property of their respective owners. Use of these names, trademarks, and brands does not imply endorsement.',
      copyright: `© ${new Date().getFullYear()} OneScript. All rights reserved.`
    },
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