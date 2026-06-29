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
require_once __DIR__ . '/../objects/Medicine.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    $medicine = new Medicine($db);
    
    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET') {
        if(isset($_GET['search'])) {
            $search_term = trim($_GET['search']);
            $stmt = $medicine->search($search_term);
            $medicines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                "success" => true,
                "data" => $medicines
            ]);
        } elseif(isset($_GET['generic_name'])) {
            $generic_name = trim($_GET['generic_name']);
            $stmt = $medicine->getByGenericName($generic_name);
            $medicines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                "success" => true,
                "data" => $medicines
            ]);
        } elseif(isset($_GET['categories'])) {
            $stmt = $medicine->getCategories();
            $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            echo json_encode([
                "success" => true,
                "data" => $categories
            ]);
        } elseif(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $medicine_data = $medicine->getById($id);
            
            if($medicine_data) {
                echo json_encode([
                    "success" => true,
                    "data" => $medicine_data
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Medicine not found"
                ]);
            }
        } else {
            // Get all medicines
            $stmt = $medicine->getAll();
            $medicines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                "success" => true,
                "data" => $medicines
            ]);
        }
    } else {
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