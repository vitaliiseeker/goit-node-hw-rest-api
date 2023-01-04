# REST API Документація

## Ендпоінти для роботи з колекцією контактів

- [Реєстрація користувача:](#register) `POST /api/users/register/`
- [Одержання токена для авторизації - логін:](#login) `POST /api/users/login/`
- [Видалення токена - логаут:](#logout) `POST /api/users/logout/`
- [Поточний користувач - отримати дані за токеном:](#getCurrent) `GET /api/users/current/`
- [Оновлення підписки (subscription) користувача:](#updateSubscription) `PATCH /api/users/`
- [Оновлення аватару користувача:](#updateAvatar) `PATCH /api/users/avatars/`
---
<a name="register"><h2>Реєстрація користувача</h2></a>

**URL:** `/api/users/register/`

**Метод:** `POST`

**Приклад вмісту:** для запиту з наступними даними

```json
{
   "email": "example3@gmail.com",
   "password": "exA7$mpless"
}
```
*Примітка: Пароль повинен складатися з літер латинського алфавіту (A-z), арабських цифр (0-9) і спеціальних символів, літерна частина пароля повинна містити як малі, так і великі літери, довжина пароля повинна бути не менше 8 і не більше 16 символів.*

### Успішна відповідь:

**Код:** `201 Created`

**Приклад вмісту**

```json
{
   "email": "example3@gmail.com",
   "password": "$2b$10$MQs6///0fiJGJJ9qJDxfi.vFKZ1dpRWFYKejnPHWLZJl.ZCmmiLOO",
   "subscription": "starter"
}
```
### Відповідь на помилку:

**Приклад відповіді:** не валідний `"password": "exa7$mpless"`, не відповідає вимогам

**Код:** `400 Bad Request`

```json
 {
    "message": "The password must consist of Latin letters (A-z), Arabic numerals (0-9) and special characters, the literal part of the password must contain both lowercase and uppercase letters, the length of the password must be at least 8 and no more than 16 characters"
 }
```

**Приклад відповіді:** користувач з таким `"email"` вже існує

**Код:** `409 Conflict`

```json
   "message": "Email in use"
```

---
<a name="login"><h2>Одержання токена для авторизації - логін</h2></a>

**URL:** `/api/users/login/`

**Метод:** `POST`

**Приклад вмісту:** для запиту з наступними даними

```json
{
   "email": "example3@gmail.com",
   "password": "exA7$mpless"
}
```
### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTRmNmFkYTU5YzI3MWE5OGFkZmYzZSIsImlhdCI6MTY3MjA4ODE0NywiZXhwIjoxNjcyMTc0NTQ3fQ.oODwvg1r8t1q8hiyJmYMjkNsSO4JWZRyUPeuTGEhEiE",
   "user": {
      "email": "example3@gmail.com",
      "subscription": "pro"
    }
}
```
### Відповідь на помилку:

**Приклад відповіді:** не валідний `"password": "exa7$mpless"`, не відповідає вимогам

**Код:** `400 Bad Request`

```json
{
 "message": "The password must consist of Latin letters (A-z), Arabic  numerals (0-9) and special characters, the literal part of the password must contain both lowercase and uppercase letters, the length of the password  must be at least 8 and no more than 16 characters"
}
```

**Приклад відповіді:** не вірне значення `"password"`

**Код:** `401 Unauthorized`

```json
   "message": "Password invalid"
```
---
**Для використання наступних ендпоїндів обов'язкова авторизація для кожного запиту через передачу в заголовку Authorization: Bearer JWT-токену, отриманого в попередньому запиті. Час дії токену - 24 години.**

<a name="logout"><h2>Видалення токена - логаут</h2></a>

**URL:** `/api/users/logout/`

**Метод:** `POST`

**Приклад вмісту:** для запиту з наступними даними

**Authorization: "Bearer {{token}}"**

### Успішна відповідь:

**Код:** `204 No Content`

### Відповідь на помилку:

**Приклад відповіді:** не вірний токен

**Код:** `401 Unauthorized`

```json
{
  "message": "Not authorized"
}
```
---
<a name="getCurrent"><h2>Поточний користувач - отримати дані за токеном</h2></a>

**URL:** `/api/users/current/`

**Метод:** `GET`

**Приклад вмісту:** для запиту з наступними даними

**Authorization: "Bearer {{token}}"**

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
{
   "email": "example3@gmail.com",
   "subscription": "pro"
}
```

### Відповідь на помилку:

**Приклад відповіді:** не вірний токен

**Код:** `401 Unauthorized`

```json
{
  "message": "Not authorized"
}
```
---
<a name="updateSubscription"><h2>Оновлення підписки (subscription) користувача</h2></a>

**URL:** `/api/users/`

**Метод:** `PATCH`

Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']

**Приклад вмісту:** для запиту з наступними даними

**Authorization: "Bearer {{token}}"**

**Приклад вмісту**

```json
{
   "subscription": "pro"
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
{
   "email": "example3@gmail.com",
   "subscription": "pro"
}
```

### Відповідь на помилку:

**Приклад відповіді:** не вірний токен

**Код:** `401 Unauthorized`

```json
{
  "message": "Not authorized"
}
```

**Приклад відповіді:** не вірне значення `"subscription"`

**Код:** `400 Bad Request`

```json
{
 "message": "\"subscription\" must be one of [starter, pro, business]"
}
```

---
<a name="updateAvatar"><h2>Оновлення аватару користувача</h2></a>

**URL:** `/api/users/avatars/`

**Метод:** `PATCH`

Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']

**Приклад вмісту:** для запиту з наступними даними

**Authorization: "Bearer {{token}}"**

**Приклад вмісту**

Content-Type: multipart/form-data

RequestBody: *файл з новою аватаркою - avatar.png*

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
{
   "avatarURL": "avatars\\63b1b1bb6791630ec46263ea_avatar.png"
}
```

### Відповідь на помилку:

**Приклад відповіді:** не вірний токен

**Код:** `401 Unauthorized`

```json
{
  "message": "Not authorized"
}
```

---

**Використовуйте наступні запити для перегляду та редагування контактів:**

- [Отримати список всіх контактів:](#getContacts) `GET /api/contacts/`
- [Отримати дані контакту:](#getContact) `GET /api/contacts/:id/`
- [Додати новий контакт:](#addContact) `POST /api/contacts/`
- [Оновити контакт:](#updateContact) `PUT /api/contacts/:id/`
- [Видалити контакт:](#deleteContact) `DELETE /api/contacts/:id/`
- [Оновити статус контакту:](#updateStatusContact) `PATCH /api/contacts/:id/favorite/`

---

<a name="getContacts"><h2>Отримати список всіх контактів</h2></a>

**URL:** `/api/contacts/`

**Метод:** `GET`

**Authorization: "Bearer {{token}}"**



### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
{
   "page": "1",
   "per_page": "5",
   "total": 5,
   "data": [
      {
         "favorite": false,
         "_id": "63a510739d819e19947d0a2a",
         "name": "Abbot Franks",
         "email": "scelerisque@magnis.org",
         "phone": "(186) 568-3720",
         "owner": {
            "subscription": "pro",
            "email": "example3@gmail.com"
            }
      },
      ...,
     {
      ...,
     }
   ]
}
```
Де `"page"` - номер сторінки, `"per_page"` - (limit) кількість контактів на сторінці, `"total"` - загальна кількість контактів, відповідно до запиту

**Додаткові налаштування запиту:**

ПАГІНАЦІЯ додайте параметри запиту до запитів GET:

**URL:** `/api/contacts/?page=1&limit=10`

Примітка: якщо ви опустите параметри пагінації значення за замовчуванням буде `page=1` та `limit=20`

СОРТУВАННЯ додайте параметри запиту до запитів GET:

**URL:** `/api/contacts/?sort=[name field]&order=desc`, де [name field] - назва полю по якому буде виконано сортування, desc - сортування за зменшенням

Примітка: якщо ви опустите параметр порядку, порядок за замовчуванням буде зростаючим по полю `"name"` - `sort="name"` та `order="asc"`

ПОШУК І ФІЛЬТРАЦІЯ додайте параметри запиту до запитів GET:

**URL:** `/api/contacts/?[name field=value field]`, де [name field] і [value field] - назва поля та значення по якому буде виконано пошук і фільтрація

---
<a name="getContact"><h2>Отримати дані контакту</h2></a>

**URL:** `/api/contacts/:id/`

**Метод:** `GET`

**Authorization: "Bearer {{token}}"**

**Приклад вмісту запиту** для контакту з ідентифікатором `"_id" - "63aac14a3ca32c25b4470065"` в базі даних

### Успішна відповідь:

**Код:** `200 OK`

```json
{
  "_id": "63aac14a3ca32c25b4470065",
  "name": "Chaim Lewise",
  "email": "is@n.net",
  "phone": "+38(099)212-5453",
  "favorite": true,
  "owner": {
     "subscription": "pro",
     "email": "example3@gmail.com"
   },
   "createdAt": "2022-12-23T02:29:58.278Z",
   "updatedAt": "2022-12-23T02:29:58.278Z"
}
```

### Відповідь на помилку:

**Приклад відповіді:** для запиту контакта з ідентифікатором `"_id" - "63aac14a3ca32c25b447006"`, не відповідає дійсному шаблону ідентифікатора mongo

**Код:** `404 Bad Request`

```json
   "message": "\"_id\" with value \"63aac14a3ca32c25b447006\" fails to match the valid mongo id pattern"
```

---
<a name="addContact"><h2>Додати новий контакт</h2></a>

**URL:** `/api/contacts/`

**Метод:** `POST`

**Authorization: "Bearer {{token}}"**

**Приклад вмісту:** для запиту з наступними даними

```json
{
  "name": "Chaim Lewise",
  "email": "dui.in@egetlacus.com",
  "phone": "(294) 840-6685",
  "favorite": true
}
```

### Успішна відповідь:

**Код:** `201 Created`

```json
{
   "_id": "63aa2bb2241c29195c11d190",
   "name": "Chaim Lewise",
   "email": "dui.in@egetlacus.com",
   "phone": "(294) 840-6685",
   "favorite": true,
   "owner": "63a4f6ada59c271a98adff3e",
   "createdAt": "2022-12-26T23:18:10.486Z",
   "updatedAt": "2022-12-26T23:18:10.486Z"
}
```
*Примітка: при відсутності даних з полем "favorite" за замовчуванням "favorite" буде присвоєно "false".*

### Відповідь на помилку:

**Приклад вмісту** для запиту з наступними даними:

```json
{
   "name": "Chaim Lewis",
   "phone": "(294) 840-6685"
}
```

**Код:** `400 Bad Request`

**Приклад вмісту**

```json
   "message": "\"email\" is required"
```
---
<a name="updateContact"><h2>Оновити дані контакту</h2></a>

**URL:** `/api/contacts/:id/`

**Метод:** `PUT`

**Authorization: "Bearer {{token}}"**

**Приклад запиту:**

"\_id" - "6393def55e1f48171bfecbe8"

```json
{
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe8",
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false,
   "owner": "63a4f6ada59c271a98adff3e",
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-12-14T23:48:12.126Z"
}
```

Допускаються часткові дані:

```json
{
   "phone": "+38-096-765-43-21"
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe8",
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false,
   "owner": "63a4f6ada59c271a98adff3e",
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-12-14T23:48:12.126Z"
}
```

### Відповідь на помилку:

**Приклад запиту** якщо надані недійсні дані, наприклад невалідне поле "email"

```json
{
   "email": "dsseest@utquamvel#net"
}
```

**Код:** `400 Bad Request`

**Приклад вмісту**

```json
{
   "message": "\"email\" must be a valid email"
}
```

---

<a name="deleteContact"><h2>Видалити контакт</h2></a>

**URL:** `/api/contacts/:id/`

**Метод:** `DELETE`

**Authorization: "Bearer {{token}}"**

**Приклад запиту:**

"_id" - "639a5561e150fa0f00310f9f"

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту:** відповідь відображатиме інформацію про видалення контакту

```json
"Contact by 'Id' - '639a5561e150fa0f00310f9f' deleted"
```

### Відповідь на помилку:

**Приклад вмісту** якщо надані недійсні дані, наприклад неіснуючий "\_id":

**Код:** `404 Not Found`

```json
{
   "message": "Not Found"
}
```

---

<a name="updateStatusContact"><h2>Оновити статус контакту</h2></a>

**URL:** `/api/contacts/:id/favorite`

**Метод:** `PATCH`

**Authorization: "Bearer {{token}}"**

**Приклад запиту:**

"_id" - "6393def55e1f48171bfecbe3"

```json
{
  "favorite": true
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe3",
   "name": "Allen Raymond",
   "email": "nulla.ante@vestibul.co.uk",
   "phone": "(992) 914-3792",
   "favorite": true,
   "owner": "63a4f6ada59c271a98adff3e",
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-13-14T23:48:12.126Z"
}
```

### Відповідь на помилку:

**Приклад вмісту**, якщо надані недійсні дані, наприклад відсутнє поле "favorite":

**Код:** `400 Bad Request`

```json
{
   "message": "Missing field favorite"
}
```

---
---
## Free

---
The code in this repository is not licensed in any way.

Do what you want, [Unlicense dot org](http://unlicense.org/), spread the word.

---
