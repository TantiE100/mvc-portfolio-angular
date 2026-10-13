<?php

require __DIR__ . '/../src/bootstrap.php';

use App\Config\Database;

$pdo = Database::connection();

$pdo->exec('
    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
');

$applied = $pdo->query('SELECT filename FROM migrations')->fetchAll(PDO::FETCH_COLUMN);

$dir = __DIR__ . '/../db/migrations';
$files = glob($dir . '/*.sql');
sort($files);

foreach ($files as $file) {
    $name = basename($file);
    if (in_array($name, $applied, true)) {
        continue;
    }

    $sql = file_get_contents($file);
    $pdo->beginTransaction();
    try {
        $pdo->exec($sql);
        $stmt = $pdo->prepare('INSERT INTO migrations (filename) VALUES (?)');
        $stmt->execute([$name]);
        $pdo->commit();
        echo "Aplicada: {$name}\n";
    } catch (Throwable $e) {
        $pdo->rollBack();
        echo "Error en {$name}: {$e->getMessage()}\n";
        exit(1);
    }
}

echo "Migraciones al día.\n";
