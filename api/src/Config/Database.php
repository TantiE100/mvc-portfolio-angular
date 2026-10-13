<?php

namespace App\Config;

use PDO;

class Database
{
    private static ?PDO $instance = null;

    public static function connection(): PDO
    {
        if (self::$instance === null) {
            $host = getenv('DB_HOST');
            $port = getenv('DB_PORT');
            $dbname = getenv('POSTGRES_DB');
            $user = getenv('POSTGRES_USER');
            $password = getenv('POSTGRES_PASSWORD');

            $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";

            self::$instance = new PDO($dsn, $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }

        return self::$instance;
    }
}
