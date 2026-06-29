<?php

file_put_contents("php://stderr", "Auth endpoint reached\n", FILE_APPEND);
file_put_contents("php://stderr", "Method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include files
include_once __DIR__ . '/database.php';
include_once __DIR__ . '/../objects/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

// Try to get JSON data first
$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

// Fallback to $_POST if JSON is empty
if (!$data && !empty($_POST)) {
    $data = (object) $_POST;
}

// Debug logging
file_put_contents('debug.log', date('Y-m-d H:i:s') . " - Auth request received\n", FILE_APPEND);
file_put_contents('debug.log', "Raw data: " . $raw_data . "\n", FILE_APPEND);
file_put_contents('debug.log', "Decoded data: " . print_r($data, true) . "\n", FILE_APPEND);

if(!empty($data->email) && !empty($data->password)) {
    $user->email = $data->email;
    $user->password = $data->password;

    file_put_contents('debug.log', "Attempting login for: " . $user->email . "\n", FILE_APPEND);

    if($user->login()) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "user" => [
                "id" => $user->id,
                "email" => $user->email,
                "full_name" => $user->full_name,
                "role" => $user->role
            ]
        ]);
        file_put_contents('debug.log', "Login SUCCESS for: " . $user->email . "\n", FILE_APPEND);
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Invalid credentials."
        ]);
        file_put_contents('debug.log', "Login FAILED for: " . $user->email . "\n", FILE_APPEND);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Unable to login. Data is incomplete.",
        "received_data" => $data
    ]);
    file_put_contents('debug.log', "Incomplete data received\n", FILE_APPEND);
}
