<?php
$request = $_SERVER['REQUEST_URI'];
$request = strtok($request, '?');

// Remove project folder name from request
$basePath = '/yasin-psychiatric-hospital-pos/backend';
$request = str_replace($basePath, '', $request);

switch ($request) {
    case '/api/auth':
        require 'api/auth.php';
        break;

    case '/api/dashboard':
        require 'api/dashboard.php';
        break;

    case '/api/register_patient':
        require 'api/register_patient.php';
        break;

    case '/api/patients':
        require 'api/patients.php';
        break;

    case '/api/prescriptions':
        require 'api/prescriptions.php';
        break;

    case '/api/users':
        require 'api/users.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found."]);
        break;
}

?>