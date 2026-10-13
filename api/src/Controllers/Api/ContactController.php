<?php

namespace App\Controllers\Api;

use App\Models\ContactMessageModel;

class ContactController
{
    public function store(): void
    {
        header('Content-Type: application/json');

        $input = json_decode((string) file_get_contents('php://input'), true);
        if (!is_array($input)) {
            $input = $_POST;
        }

        $name = trim((string) ($input['name'] ?? ''));
        $email = trim((string) ($input['email'] ?? ''));
        $subject = trim((string) ($input['subject'] ?? ''));
        $message = trim((string) ($input['message'] ?? ''));

        if ($name === '' || $subject === '' || $message === '') {
            http_response_code(422);
            echo json_encode(['error' => 'Faltan campos obligatorios.']);
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(422);
            echo json_encode(['error' => 'El correo electrónico no es válido.']);
            return;
        }

        (new ContactMessageModel())->create($name, $email, $subject, $message);

        http_response_code(201);
        echo json_encode(['ok' => true]);
    }
}
