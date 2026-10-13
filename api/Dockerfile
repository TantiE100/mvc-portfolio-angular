FROM php:8.2-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_pgsql \
    && a2enmod rewrite

COPY apache-vhost.conf /etc/apache2/sites-available/000-default.conf
COPY docker-entrypoint.sh /usr/local/bin/portfolio-entrypoint
RUN chmod +x /usr/local/bin/portfolio-entrypoint

COPY . /var/www/html

ENTRYPOINT ["portfolio-entrypoint"]
CMD ["apache2-foreground"]
