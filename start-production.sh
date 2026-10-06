#!/bin/bash

set -e

echo "Starting SweetStore production..."

MYSQL_DATA="$HOME/mysql-data"
MYSQL_SOCKET="/tmp/mysql.sock"
MYSQL_PORT=3306
SQL_FILE="$HOME/workspace/attached_assets/0_sweetstore_1791211126436.sql"

mkdir -p "$MYSQL_DATA"

if [ ! -d "$MYSQL_DATA/mysql" ]; then
    echo "Initializing MySQL..."

    mysqld \
      --initialize-insecure \
      --datadir="$MYSQL_DATA" \
      --innodb-use-native-aio=0
fi

echo "Starting MySQL..."

mysqld \
  --datadir="$MYSQL_DATA" \
  --socket="$MYSQL_SOCKET" \
  --port="$MYSQL_PORT" \
  --bind-address=127.0.0.1 \
  --innodb-use-native-aio=0 \
  --mysqlx=0 \
  > "$HOME/mysql-production.log" 2>&1 &

echo "Waiting for MySQL..."

for i in {1..30}; do
    if mysqladmin --socket="$MYSQL_SOCKET" ping --silent 2>/dev/null; then
        echo "MySQL is ready."
        break
    fi

    sleep 1
done

if ! mysqladmin --socket="$MYSQL_SOCKET" ping --silent 2>/dev/null; then
    echo "MySQL failed to start."
    cat "$HOME/mysql-production.log"
    exit 1
fi

echo "Creating database..."

mysql \
  --socket="$MYSQL_SOCKET" \
  -u root \
  -e "CREATE DATABASE IF NOT EXISTS sweetstore;"

echo "Checking database..."

TABLE_COUNT=$(mysql \
  --socket="$MYSQL_SOCKET" \
  -u root \
  -N \
  -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='sweetstore';")

if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "Importing SweetStore database..."

    mysql \
      --socket="$MYSQL_SOCKET" \
      -u root \
      sweetstore < "$SQL_FILE"

    echo "Database imported."
else
    echo "Database already contains $TABLE_COUNT tables."
fi

export DB_SOCKET_PATH="$MYSQL_SOCKET"
export DB_HOST="127.0.0.1"
export DB_USER="root"
export DB_PASSWORD=""
export DB_NAME="sweetstore"

echo "Starting SweetStore backend..."

cd "$HOME/workspace/backend"

exec npm start
