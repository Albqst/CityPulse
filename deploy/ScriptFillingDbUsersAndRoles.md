-- ============================================
-- 0. ОЧИСТКА ТАБЛИЦ (в правильном порядке)
-- ============================================
```sql
TRUNCATE "AspNetUserRoles" RESTART IDENTITY CASCADE;
TRUNCATE "AspNetUsers" RESTART IDENTITY CASCADE;
TRUNCATE "AspNetRoles" RESTART IDENTITY CASCADE;
```

-- ============================
-- 1. РОЛИ
-- ============================

```sql
INSERT INTO "AspNetRoles" ("Name", "NormalizedName", "ConcurrencyStamp") VALUES
                                                                             ('Админ', 'АДМИН', gen_random_uuid()),
                                                                             ('Пользователь', 'ПОЛЬЗОВАТЕЛЬ', gen_random_uuid()),
                                                                             ('Исполнитель', 'ИСПОЛНИТЕЛЬ', gen_random_uuid()),
                                                                             ('ТехПоддержка', 'ТЕХПОДДЕРЖКА', gen_random_uuid()),
                                                                             ('КураторПроекта', 'КУРАТОРПРОЕКТА', gen_random_uuid()),
                                                                             ('БригадирКомандыСтроителей', 'БРИГАДИРКОМАНДЫСТРОИТЕЛЕЙ', gen_random_uuid()),
                                                                             ('ФиксаторЗаявки', 'ФИКСАТОРЗАЯВКИ', gen_random_uuid());
```
-- ============================
-- 2. ПОЛЬЗОВАТЕЛИ (рандомные)
-- ============================

-- Пароль для всех пользователей: 123456
-- Хэш сгенерирован через ASP.NET Core PasswordHasher<User>

```sql
INSERT INTO "AspNetUsers"
("UserName", "NormalizedUserName", "Email", "NormalizedEmail",
 "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp",
 "PhoneNumber", "PhoneNumberConfirmed",
 "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount",
 "DateOfBirth")
VALUES
    ('ivan.petrov', 'IVAN.PETROV', 'ivan.petrov@example.com', 'IVAN.PETROV@EXAMPLE.COM',
     true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
     NULL, false, false, NULL, false, 0, '1990-01-01'),

    ('alex.smirnov', 'ALEX.SMIRNOV', 'alex.smirnov@example.com', 'ALEX.SMIRNOV@EXAMPLE.COM',
     true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
     NULL, false, false, NULL, false, 0, '1988-05-12'),

    ('maria.ivanova', 'MARIA.IVANOVA', 'maria.ivanova@example.com', 'MARIA.IVANOVA@EXAMPLE.COM',
     true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
     NULL, false, false, NULL, false, 0, '1995-09-23'),

    ('sergey.kuznetsov', 'SERGEY.KUZNETSОВ', 'sergey.kuznetsov@example.com', 'SERGEY.KUZNETСОВ@EXAMPLE.COM',
     true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
     NULL, false, false, NULL, false, 0, '1983-03-17'),

    ('olga.sidorova', 'OLGA.SIDOROVA', 'olga.sidorova@example.com', 'OLGA.SIDOROVA@EXAMPLE.COM',
     true, 'AQAAAAEAACcQAAAAEJt7pVYt9gJm8ZbXo0p8mFJ7xJm5p2uQ==', gen_random_uuid(), gen_random_uuid(),
     NULL, false, false, NULL, false, 0, '1992-11-30');

```

-- ============================
-- 3. ПРИВЯЗКА РОЛЕЙ К ПОЛЬЗОВАТЕЛЯМ
-- ============================
```sql
INSERT INTO "AspNetUserRoles" ("UserId", "RoleId")
SELECT u."Id", r."Id"
FROM "AspNetUsers" u
         JOIN "AspNetRoles" r ON
    (u."UserName" = 'ivan.petrov' AND r."Name" = 'Админ') OR
    (u."UserName" = 'alex.smirnov' AND r."Name" = 'Пользователь') OR
    (u."UserName" = 'maria.ivanova' AND r."Name" = 'Исполнитель') OR
    (u."UserName" = 'sergey.kuznetsov' AND r."Name" = 'ТехПоддержка') OR
    (u."UserName" = 'olga.sidorova' AND r."Name" = 'КураторПроекта');
```