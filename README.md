# JWT

### Запуск приложения:
- `npm run start:dev` - дев режим с моковым сервером (тестить на этом)
- `npm run start` - дев режим
- `npm run build:prod` - прод сборка

### Реализованные функции:
1. Авторизация через JWT (access и refresh токены)
2. Админ панелька для добавления пользователей и товаров
3. Главная страница со всеми товарами

#### Клиент:  
1. [refresh-запрос при инициализации приложения](./src/entities/User/model/service/checkAuth.ts)  
2. [авторизация пользователя](./src/features/AuthByUsername/model/services/loginByUsername/loginByUsername.ts)  
3. [выход из аккаунта (функция `onLogout()`)](./src/widgets/Navbar/ui/Navbar.tsx)

#### Сервер (json-server)  
1. Эндпоинт для регистрации: `/register` (на моковом сервере не работает)
2. Эндпоинт для авторизации: `/login`
3. Эндпоинт для логаута: `/logout`
4. Эндпоинт для рефреша: `/refresh`

#### Логика проверки авторизованности:
1. [App](src/app/App.tsx)
2. [MainPage](src/pages/MainPage/ui/MainPage.tsx)
