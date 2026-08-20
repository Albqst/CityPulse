-- ============================
-- 1. РОЛИ
-- ============================

```sql
INSERT INTO "AspNetRoles" ("Id", "Name", "NormalizedName", "ConcurrencyStamp") VALUES
(1, 'Админ', 'АДМИН', gen_random_uuid()),
(2, 'Пользователь', 'ПОЛЬЗОВАТЕЛЬ', gen_random_uuid()),
(3, 'Исполнитель', 'ИСПОЛНИТЕЛЬ', gen_random_uuid()),
(4, 'ТехПоддержка', 'ТЕХПОДДЕРЖКА', gen_random_uuid()),
(5, 'КураторПроекта', 'КУРАТОРПРОЕКТА', gen_random_uuid()),
(6, 'БригадирКомандыСтроителей', 'БРИГАДИРКОМАНДЫСТРОИТЕЛЕЙ', gen_random_uuid()),
(7, 'ФиксаторЗаявки', 'ФИКСАТОРЗАЯВКИ', gen_random_uuid());
```
-- ============================
-- 2. ПОЛЬЗОВАТЕЛИ (рандомные)
-- ============================

-- Пароль для всех пользователей: 123456
-- Хэш сгенерирован через ASP.NET Core PasswordHasher<User>

```sql
INSERT INTO "AspNetUsers"
("Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail",
"EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp",
"PhoneNumber", "PhoneNumberConfirmed",
"TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount",
"DateOfBirth")
VALUES
(1, 'ivan.petrov', 'IVAN.PETROV', 'ivan.petrov@example.com', 'IVAN.PETROV@EXAMPLE.COM',
true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
NULL, false,
false, NULL, false, 0,
'1990-01-01'),

(2, 'alex.smirnov', 'ALEX.SMIRNOV', 'alex.smirnov@example.com', 'ALEX.SMIRNOV@EXAMPLE.COM',
true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
NULL, false,
false, NULL, false, 0,
'1988-05-12'),

(3, 'maria.ivanova', 'MARIA.IVANOVA', 'maria.ivanova@example.com', 'MARIA.IVANOVA@EXAMPLE.COM',
true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
NULL, false,
false, NULL, false, 0,
'1995-09-23'),

(4, 'sergey.kuznetsov', 'SERGEY.KUZNETSOV', 'sergey.kuznetsov@example.com', 'SERGEY.KUZNETСОВ@EXAMPLE.COM',
true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
NULL, false,
false, NULL, false, 0,
'1983-03-17'),

(5, 'olga.sidorova', 'OLGA.SIDOROVA', 'olga.sidorova@example.com', 'OLGA.SIDOROVA@EXAMPLE.COM',
true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
NULL, false,
false, NULL, false, 0,
'1992-11-30');
```

-- ============================
-- 3. ПРИВЯЗКА РОЛЕЙ К ПОЛЬЗОВАТЕЛЯМ
-- ============================
```sql
INSERT INTO "AspNetUserRoles" ("UserId", "RoleId") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
```