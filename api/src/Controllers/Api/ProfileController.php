<?php

namespace App\Controllers\Api;

use App\Models\ProfileModel;

class ProfileController
{
    public function index(): void
    {
        header('Content-Type: application/json');

        $model = new ProfileModel();
        $profile = $model->getProfile();

        if ($profile === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Todavía no hay datos del perfil. Ejecuta php bin/migrate.php y php bin/seed.php.']);
            return;
        }

        echo json_encode([
            'profile' => $profile,
            'socials' => $model->getSocialLinks(),
            'stats' => $model->getStats(),
            'skills' => $model->getSkills(),
            'education' => $model->getResumeItems('education'),
            'experience' => $model->getResumeItems('experience'),
            'portfolio' => $model->getPortfolioItems(),
            'portfolioCategories' => $model->getPortfolioCategories(),
            'services' => $model->getServices(),
        ], JSON_UNESCAPED_UNICODE);
    }
}
