<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../objects/Prescription.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    $prescription = new Prescription($db);
    
    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET') {
        if(isset($_GET['pharmacy'])) {
            // Get all prescriptions for pharmacy with medicines
            $stmt = $prescription->readAllForPharmacy();
            $prescriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Include medicines for each prescription
            foreach ($prescriptions as &$pres) {
                $pres['medicines'] = $prescription->getMedicines($pres['id']);
            }
            
            echo json_encode([
                "success" => true,
                "data" => $prescriptions
            ]);
        }
        elseif(isset($_GET['slip_number'])) {
            $slip_number = trim($_GET['slip_number']);
            $with_medicines = isset($_GET['with_medicines']);
            
            if(empty($slip_number)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "message" => "Slip number is required"
                ]);
                exit();
            }
            
            $prescriptions = $prescription->getBySlipNumber($slip_number);
            
            // Include medicines if requested
            if ($with_medicines) {
                foreach ($prescriptions as &$pres) {
                    $pres['medicines'] = $prescription->getMedicines($pres['id']);
                }
            }
            
            echo json_encode([
                "success" => true,
                "data" => $prescriptions
            ]);
        } 
        elseif(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $with_medicines = isset($_GET['with_medicines']);
            
            $prescription_data = $prescription->getById($id);
            
            if($prescription_data) {
                if ($with_medicines) {
                    $prescription_data['medicines'] = $prescription->getMedicines($id);
                }
                
                echo json_encode([
                    "success" => true,
                    "data" => $prescription_data
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Prescription not found"
                ]);
            }
        } else {
            // Get all prescriptions
            $stmt = $prescription->readAll();
            $prescriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                "success" => true,
                "data" => $prescriptions
            ]);
        }
    } 
    elseif($method === 'POST') {
        // Handle POST request for saving prescription
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->slip_number) && !empty($data->doctor_id)) {
            $prescription->slip_number = $data->slip_number;
            $prescription->doctor_id = $data->doctor_id;
            $prescription->diagnosis = $data->diagnosis ?? '';
            $prescription->prescription_text = $data->prescription_text ?? '';
            
            // Start transaction
            $db->beginTransaction();
            
            try {
                if($prescription->create()) {
                    $prescription_id = $prescription->id;
                    
                    // Save medicines if provided
                    if(isset($data->medicines) && is_array($data->medicines)) {
                        foreach($data->medicines as $medicine) {
                            $success = $prescription->addMedicine(
                                $prescription_id,
                                $medicine->id,
                                $medicine->quantity,
                                $medicine->dosage_instructions,
                                $medicine->duration_days
                            );
                            
                            if (!$success) {
                                throw new Exception("Failed to add medicine: " . $medicine->brand_name);
                            }
                        }
                    }
                    
                    $db->commit();
                    
                    // Get the complete prescription with medicines
                    $complete_prescription = $prescription->getById($prescription_id);
                    $complete_prescription['medicines'] = $prescription->getMedicines($prescription_id);
                    
                    echo json_encode([
                        "success" => true,
                        "message" => "Prescription saved successfully",
                        "data" => $complete_prescription
                    ]);
                } else {
                    $db->rollBack();
                    http_response_code(500);
                    echo json_encode([
                        "success" => false,
                        "message" => "Failed to save prescription"
                    ]);
                }
            } catch (Exception $e) {
                $db->rollBack();
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Error saving prescription: " . $e->getMessage()
                ]);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Missing required fields"
            ]);
        }
    }
    elseif($method === 'PUT') {
        // Handle PUT request for updating prescription status
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id) && !empty($data->status)) {
            $prescription->id = $data->id;
            $prescription->status = $data->status;
            
            if(isset($data->updated_by)) {
                $prescription->updated_by = $data->updated_by;
            }
            
            if($prescription->updateStatus()) {
                // Get updated prescription with medicines
                $updated_prescription = $prescription->getById($data->id);
                $updated_prescription['medicines'] = $prescription->getMedicines($data->id);
                
                echo json_encode([
                    "success" => true,
                    "message" => "Prescription status updated successfully",
                    "data" => $updated_prescription
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Failed to update prescription status"
                ]);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Missing required fields: id and status"
            ]);
        }
    } 
    else {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Method not allowed"
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error: " . $e->getMessage()
    ]);
}
?>