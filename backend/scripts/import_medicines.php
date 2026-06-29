<?php
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../objects/Medicine.php';

// Use a PHP Excel library or convert Excel to CSV first
// This is a simplified example

function importMedicinesFromCSV($file_path) {
    $database = new Database();
    $db = $database->getConnection();
    $medicine = new Medicine($db);
    
    if (($handle = fopen($file_path, "r")) !== FALSE) {
        // Skip headers if needed
        fgetcsv($handle);
        
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            // Assuming CSV columns: generic_name,brand_name,company_name,dosage,price
            $medicine->generic_name = $data[0];
            $medicine->brand_name = $data[1];
            $medicine->company_name = $data[2];
            $medicine->dosage = $data[3];
            
            // Clean price - remove "Rs" and convert to decimal
            $price = preg_replace('/[^0-9.]/', '', $data[4]);
            $medicine->price = floatval($price);
            
            $medicine->stock_quantity = 100; // Default stock
            $medicine->is_active = true;
            
            // You'll need to create a save method in Medicine class
            // $medicine->save();
        }
        fclose($handle);
    }
}
?>