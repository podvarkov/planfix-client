### Описание
Модифицированная версия [planfix-api](https://www.npmjs.com/package/planfix-api).
Добавлены недостающие методы и обработка ошибок.

### Инициализация

```js
const planfix = require('planfix-client');

const client = planfix({
    account: 'your_account_name',
    privateKey: 'your_private_key',
    apiKey: 'your_api_key',
    url: 'your_planfix_url', //optional
    token: 'your_planfix_auth_token' //optional
});
```

### Авторизация по логину/паролю

Перед тем как вызывать любыем методы, необходимо произвести авторизацию, после чего клиент будем прикреплять id сессии к каждому запросу автоматически

```js
client.auth.login({
    login: 'John',
    password: 'Galt'
});
```

### Авторизация по токену
Если в параметры инициализации был передан токен, метод `auth.login`
вызывать не нужно.

### Доступные методы

Имена методов и их параметры совпадают с [оригинальной документацией](https://planfix.ru/docs/XML_API_v1), только вместо `xml` используется `json` (автоматически кновертируется в xml)

## Пример использования

```js
// Авторизация по логину и паролю
client.auth
  .login({
    login: 'John',
    password: 'Galt'
  })
  .then(() => client.user.getList({ pageCurrent: 1, pageSize: 100 }))
  .then(res => console.log(res.users.user))

// Авторизация по токену
client.user.getList({ pageCurrent: 1, pageSize: 100 })
  .then(res => console.log(res.users.user))
```

## Обработка ошибок
В случае возникновения ошибки в `catch` блок будет возвращен
`Error` c ее описанием. Коды ошибок с описанием [тут](https://planfix.ru/docs/%D0%9A%D0%BE%D0%B4%D1%8B_%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)
  
```
type PlanfixError = {
  statusCode: string // 400
  code: string // 1001 
  message: string // planfix message
  description: string // Неверный логин или пароль
}
```
