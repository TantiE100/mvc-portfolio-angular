<?php

require __DIR__ . '/../src/bootstrap.php';

use App\Core\Router;
use App\Controllers\Api\ContactController;
use App\Controllers\Api\ProfileController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    return;
}

$router = new Router();
$router->get('/api/profile', [ProfileController::class, 'index']);
$router->post('/api/contact', [ContactController::class, 'store']);

try {
    $router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
} catch (Throwable $e) {
    error_log((string) $e);
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error interno del servidor. Revisa que la base de datos esté levantada y migrada.']);
}
