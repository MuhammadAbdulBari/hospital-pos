<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Check if activity_logs table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'activity_logs'");
    $activityTableExists = $tableCheck->rowCount() > 0;
    
    if ($activityTableExists) {
        // Get activities from activity_logs table
        $query = "SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT :limit";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // If activity_logs doesn't exist, get recent patients as fallback
        $query = "SELECT 
                    created_at as timestamp,
                    'patient_registration' as activity_type,
                    CONCAT('Patient Registered: ', full_name) as details,
                    slip_number,
                    registered_by as performed_by,
                    'completed' as status
                  FROM patients 
                  ORDER BY created_at DESC 
                  LIMIT :limit";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode([
        'success' => true,
        'data' => $activities
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage(),
        'data' => []
    ]);
}
?>