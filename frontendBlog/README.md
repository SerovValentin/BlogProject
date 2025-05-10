Области хранения данных

- база данных на json-server
- BFF
- redux store

Сущности приложения

- пользователь: БД (список пользователей) BFF (сессия текущего) стор (отображение в браузере)

- роль пользователя: БД (список ролей) BFF (ссесия пользователя с ролью) стор (использование на клиенте)

- статья БД (список статей), стор (отображение в браузере)

- комментарий: БД (список комментариев) стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content / content_at

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стор (на клиенте):

- user: id / login / role_id / session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id/ author / content / publishedAt
- users: массив user: id / login / registeredAt / role
