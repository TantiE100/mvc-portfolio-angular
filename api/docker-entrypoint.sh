#!/bin/sh
set -e

php /var/www/html/bin/migrate.php
php /var/www/html/bin/seed.php

exec docker-php-entrypoint "$@"
