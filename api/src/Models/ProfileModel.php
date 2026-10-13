<?php

namespace App\Models;

use App\Config\Database;

class ProfileModel
{
    public function getProfile(): ?array
    {
        $row = Database::connection()
            ->query('SELECT * FROM profile ORDER BY id ASC LIMIT 1')
            ->fetch();

        if ($row === false) {
            return null;
        }

        $row['age'] = self::ageFrom($row['birth_date'] ?? null);
        foreach (['latitude', 'longitude', 'map_span'] as $key) {
            $row[$key] = $row[$key] === null ? null : (float) $row[$key];
        }

        return $row;
    }

    public function getSocialLinks(): array
    {
        return Database::connection()
            ->query('SELECT css_class, icon, url FROM social_links ORDER BY sort_order ASC')
            ->fetchAll();
    }

    public function getStats(): array
    {
        return Database::connection()
            ->query('SELECT icon, value, label, caption FROM stats ORDER BY sort_order ASC')
            ->fetchAll();
    }

    public function getSkills(): array
    {
        return Database::connection()
            ->query('SELECT name, percent, logo_path FROM skills ORDER BY sort_order ASC')
            ->fetchAll();
    }

    public function getResumeItems(string $kind): array
    {
        $stmt = Database::connection()->prepare(
            'SELECT title, period, place, body, bullets, image_path
             FROM resume_items
             WHERE kind = ?
             ORDER BY sort_order ASC'
        );
        $stmt->execute([$kind]);

        return array_map(
            fn (array $row) => ['bullets' => self::parseArray($row['bullets'])] + $row,
            $stmt->fetchAll()
        );
    }

    public function getPortfolioItems(): array
    {
        return Database::connection()
            ->query('SELECT category, title, description, image_path, details_url
                     FROM portfolio_items
                     ORDER BY sort_order ASC')
            ->fetchAll();
    }

    public function getPortfolioCategories(): array
    {
        return Database::connection()
            ->query('SELECT DISTINCT category FROM portfolio_items ORDER BY category ASC')
            ->fetchAll(\PDO::FETCH_COLUMN);
    }

    public function getServices(): array
    {
        return Database::connection()
            ->query('SELECT icon, title, description, logo_path FROM services ORDER BY sort_order ASC')
            ->fetchAll();
    }

    private static function ageFrom(?string $birthDate): ?int
    {
        if ($birthDate === null || $birthDate === '') {
            return null;
        }

        $birth = new \DateTimeImmutable($birthDate);

        return (int) $birth->diff(new \DateTimeImmutable('today'))->y;
    }

    private static function parseArray(?string $literal): array
    {
        if ($literal === null || $literal === '' || $literal === '{}') {
            return [];
        }

        $inner = substr($literal, 1, -1);
        $items = str_getcsv($inner, ',', '"', '\\');

        return array_values(array_filter(array_map('trim', $items), fn ($v) => $v !== ''));
    }
}
