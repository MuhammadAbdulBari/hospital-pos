<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../objects/Patient.php';

$database = new Database();
$db = $database->getConnection();

$patient = new Patient($db);
$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET') {
    if(isset($_GET['slip_number'])) {
        $slip_number = trim($_GET['slip_number']);
        $patient_data = $patient->getBySlipNumber($slip_number);

        if($patient_data) {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "data" => $patient_data
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Patient not found with this slip number"
            ]);
        }
    } else {
        // Optionally return all patients
        $stmt = $patient->readAll();
        $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => $patients
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
}
?>
