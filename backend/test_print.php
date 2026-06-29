<?php
require __DIR__ . '/vendor/autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

try {
    $connector = new WindowsPrintConnector("BIXOLON SRP-350plusIII"); // Exact printer name
    $printer = new Printer($connector);

    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("YASIN PSYCHIATRIC HOSPITAL\n");
    $printer->text("Patient Registration Slip\n");
    $printer->text("-----------------------------\n");

    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text("Slip Number: TEST123\n");
    $printer->text("Name: John Doe\n");
    $printer->text("Contact: 03001234567\n");
    $printer->text("Gender: MALE\n");
    $printer->text("DOB: 2000-01-01\n");
    $printer->text("Age: 25 years\n");
    $printer->text("Registered By: Admin\n");
    $printer->text("Date & Time: " . date('Y-m-d H:i:s') . "\n");
    $printer->text("-----------------------------\n");

    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("Thank You for Choosing Us\n");

    $printer->cut();
    $printer->close();

    echo "Printed successfully!\n";

} catch (Exception $e) {
    echo "Printer error: " . $e->getMessage() . "\n";
}
