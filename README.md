# Pizza
- [NestJs](backend/README.md)
- [NextJs](frontend-nextjs/README.md)
- [Nuxt](frontend-nuxt/README.md)
- [Telegram Bot](telegram-bot/README.md)

## Todo
- Чето с сущностями приколдес какой-то, надо подправить
- Дополнить каждый документ, библиотеками или оставить их здесь, а в личный доках, как запустить и т.д.
- Разнести на мини репы - IDEA_шка умирает а то
- Хочу автогенерацию моделек, enum и dto в типы, класс

## Todo Nest
- Заменить получение токена в cart-token, на полученин CurrentCart
- Добавить suspense для модалок
- Добавить suspense для nested pages

- Shared вынести в пакеты
- Добавить мидлы и гуарды
- Добавить изменение пароля для сохранения в бд
- Добавить возврат кастомных ошибок
- кукис cartToken через passport сделать
- добавить google & yandex auth
- задокументировать через swagger нормально все, кукисы, query, params и т.д.
- настроить CORS
- пофиксить баги и настроить обработку ошибок
- добавить обработку ошибок для запросов
- запросы с findFirstAndThrow по итогу 500 ошибку тригерят

## Todo Nuxt
- Добавить везде обработку Loading и т.д..
- Loading с учетом гидрации
- /Profile & /Order запускать без SSR 
- Утащить i18n конфиг отсюда https://github.com/roke-to/roketo-business-ui/blob/master/apps/near-dapp/src/app/initI18n.ts
- Nested Routes перезагружает контент (надо чтоб просто модалка закрылась и всё)
- Поддержка КЛАВИАТУРЫ
- Переходы по ссылками с учетом локализация (сейчас на / переходишь, без локализации)
- Service to Store
- Перенести все schema to model/schema.ts
- Чето в pages (model) странности происходят
- Ошибка валидации ЛОКАЛИЗИРОВАТЬ + ВЫВОДИТЬ 
- Добавить I к интерфейсам
- Вырубить где не надо use-select и добавить cursor: pointer куда надо
- все zod схемы вынести 
- привести название файлов и папок к единному стандарту (widgets/Header/ui)
- надо написать чтоб все ru.json в тепизацию интернац t(...), как раньше делали на проекте
- импорты для Nuxt сделать автоматически, для того же cn, как для компоненов
- подправить что при импорте у нас WidgetUiHeader дописывается UI, это только надо для shared
- подправить что при импорте у нас ~/src/shared..., чтоб просто ~/shared/
- исправить todo-шки
- Настроить SEO
- Сделать верстку по феншую - сементики придерживатся
- Devtools console.error Hydration completed but contains mismatches.
- Ожидание загрузки шрифтов (что сразу же показывало)
- Добавить темизацию
- Донастроить интернациолизацию - конфигурацию
- В shared ui компоненты ссылаются типа сами на себя, тотже Input используется в себе Input
- Разделить монорепо на несколько мелких - IDEA-шка некорректно ведет себя
- Поддержка разного курса валют
- Ко всем кнопкам что с запросами, добавить loading, обработку error и т.д.. 
- обработку нажатия Enter при ошибках и загрузках