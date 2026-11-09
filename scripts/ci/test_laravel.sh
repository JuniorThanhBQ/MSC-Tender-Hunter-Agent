#!/usr/bin/env bash
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

apt-get update -qq
apt-get install -y --no-install-recommends ca-certificates curl unzip
curl --fail --silent --show-error --location https://getcomposer.org/download/2.11.1/composer.phar --output /usr/local/bin/composer
printf '%s  %s\n' 6f1b891e1d4927d62740276c540fb490e47689e19e102c49e8da849794882f8c /usr/local/bin/composer | sha256sum --check
chmod +x /usr/local/bin/composer

cd laravel
mkdir -p storage/framework/views "$CI_PROJECT_DIR/reports"
if [ -f "$CI_PROJECT_DIR/.env.test" ]; then
    cp "$CI_PROJECT_DIR/.env.test" .env.testing
else
    cp "$CI_PROJECT_DIR/.env.example" .env.testing
fi
composer validate
composer install --no-interaction --prefer-dist --optimize-autoloader

vendor/bin/pint --test
php artisan test --log-junit "$CI_PROJECT_DIR/reports/laravel-phpunit.xml"
php artisan migrate --force
