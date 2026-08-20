## Использование скрипта по сбросу контейнера с базой PostgreSQL
### 1) Сохрани файл:
reset-db.sh

### 2) Дай права на выполнение:
chmod +x reset-db.sh

### 3) Запусти:
./reset-db.sh

### 4) Накатить миграции
dotnet ef database update