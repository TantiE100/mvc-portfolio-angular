<?php

namespace App\Models;

use App\Config\Database;

class ContactMessageModel
{
    public function create(string $name, string $email, string $subject, string $message): void
    {
        $stmt = Database::connection()->prepare(
            'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$name, $email, $subject, $message]);
    }

    public function latest(int $limit = 20): array
    {
        $stmt = Database::connection()->prepare(
            'SELECT id, name, email, subject, message, created_at
             FROM contact_messages
             ORDER BY created_at DESC
             LIMIT ?'
        );
        $stmt->bindValue(1, $limit, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }
}
