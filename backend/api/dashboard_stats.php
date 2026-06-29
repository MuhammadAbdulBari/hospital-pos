<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Get today's date
    $today = date('Y-m-d');
    
    // 1. Total Patients
    $query1 = "SELECT COUNT(*) as total FROM patients";
    $stmt1 = $conn->prepare($query1);
    $stmt1->execute();
    $totalPatients = $stmt1->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
    
    // 2. Today's Patients
    $query2 = "SELECT COUNT(*) as today FROM patients WHERE DATE(created_at) = :today";
    $stmt2 = $conn->prepare($query2);
    $stmt2->execute([':today' => $today]);
    $todayPatients = $stmt2->fetch(PDO::FETCH_ASSOC)['today'] ?? 0;
    
    // 3. Pending Prescriptions (from prescriptions table)
    $query3 = "SELECT COUNT(*) as pending FROM prescriptions WHERE status = 'pending'";
    $stmt3 = $conn->prepare($query3);
    $stmt3->execute();
    $pendingPrescriptions = $stmt3->fetch(PDO::FETCH_ASSOC)['pending'] ?? 0;
    
    // 4. Ready Prescriptions
    $query4 = "SELECT COUNT(*) as ready FROM prescriptions WHERE status = 'ready'";
    $stmt4 = $conn->prepare($query4);
    $stmt4->execute();
    $readyPrescriptions = $stmt4->fetch(PDO::FETCH_ASSOC)['ready'] ?? 0;
    
    echo json_encode([
        'success' => true,
        'data' => [
            'totalPatients' => (int)$totalPatients,
            'todayPatients' => (int)$todayPatients,
            'pendingPrescriptions' => (int)$pendingPrescriptions,
            'readyPrescriptions' => (int)$readyPrescriptions
        ]
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage(),
        'data' => [
            'totalPatients' => 0,
            'todayPatients' => 0,
            'pendingPrescriptions' => 0,
            'readyPrescriptions' => 0
        ]
    ]);
}
?>