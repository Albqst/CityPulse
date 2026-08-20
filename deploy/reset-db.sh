#!/bin/bash
set -e

CONTAINER_NAME="pg-identity"
DB_NAME="identitydb"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_PORT=5432

echo "=== 1. Остановка и удаление контейнера ==="
docker rm -f $CONTAINER_NAME || true

echo "=== 2. Удаление старых данных (volume) ==="
rm -rf ./pgdata || true

echo "=== 3. Поднятие нового контейнера PostgreSQL ==="
docker run --name $CONTAINER_NAME \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -v ./pgdata:/var/lib/postgresql/data \
  -p $DB_PORT:5432 \
  -d postgres:16

echo "=== 4. Ожидание готовности PostgreSQL ==="
until docker exec $CONTAINER_NAME pg_isready -U $DB_USER; do
  echo "PostgreSQL ещё не готов, жду..."
  sleep 2
done

echo "PostgreSQL готов!"

echo "=== 5. Накатывание EF Core миграций ==="
dotnet ef database update

echo "=== Готово! База пересоздана и миграции применены ==="
