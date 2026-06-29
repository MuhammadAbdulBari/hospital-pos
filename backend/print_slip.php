<?php
// print_slip.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['patient']) || !isset($data['slipNumber'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request. Missing patient or slip number."
    ]);
    exit();
}

$patient = $data['patient'];
$slipNumber = $data['slipNumber'];
$registeredBy = $data['registeredBy'] ?? 'Administrator';
$dateTime = date('Y-m-d H:i:s');

require __DIR__ . '/vendor/autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

try {
    // Replace this with your printer name exactly as in Windows
    $connector = new WindowsPrintConnector("BIXOLON SRP-350plusIII"); 
    $printer = new Printer($connector);

    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("YASIN PSYCHIATRIC HOSPITAL\n");
    $printer->text("Patient Registration Slip\n");
    $printer->text("-----------------------------\n");

    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text("Slip Number: $slipNumber\n");
    $printer->text("Name: ".$patient['fullName']."\n");
    $printer->text("Contact: ".$patient['contactNumber']."\n");
    $printer->text("Gender: ".strtoupper($patient['gender'])."\n");
    $printer->text("DOB: ".$patient['dateOfBirth']."\n");
    $printer->text("Age: ".$patient['age']." years\n");
    $printer->text("Registered By: $registeredBy\n");
    $printer->text("Date & Time: $dateTime\n");
    $printer->text("-----------------------------\n");
    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("Thank You for Choosing Us\n");

    $printer->cut();
    $printer->close();

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
