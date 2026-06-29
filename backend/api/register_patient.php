<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Read raw input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Debug: Show raw JSON if empty
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON received",
        "raw" => $raw
    ]);
    exit;
}

// FIXED PATHS
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../objects/Patient.php';

$db = (new Database())->getConnection();
$patient = new Patient($db);

// Validate required fields
$required = ["fullName", "contactNumber", "gender", "dateOfBirth", "age", "registeredBy"];

foreach ($required as $field) {
    if (!isset($data[$field]) || $data[$field] === "") {
        echo json_encode([
            "success" => false,
            "message" => "Missing field: $field",
            "data_received" => $data
        ]);
        exit;
    }
}

// Map values
$patient->full_name      = $data['fullName'];
$patient->contact_number = $data['contactNumber'];
$patient->gender         = $data['gender'];
$patient->date_of_birth  = $data['dateOfBirth'];
$patient->age            = $data['age'];
$patient->registered_by  = $data['registeredBy'];

// Call create()
$slip_number = $patient->create();

// Debug response
if ($slip_number) {
    echo json_encode([
        "success" => true,
        "message" => "Patient created",
        "slipNumber" => $slip_number
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Create() failed. Check SQL!"
    ]);
}
