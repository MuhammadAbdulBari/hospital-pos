<?php
// test_api.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/database.php';
include_once 'objects/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Test data
$test_email = "admin@hospital.com";
$test_password = "admin123";

echo "<h3>Testing API Login</h3>";
echo "Email: $test_email<br>";
echo "Password: $test_password<br><br>";

// Test the User object login
$user->email = $test_email;
$user->password = $test_password;

if($user->login()) {
    echo "✅ User object login SUCCESS!<br>";
    echo "User ID: " . $user->id . "<br>";
    echo "Full Name: " . $user->full_name . "<br>";
    echo "Role: " . $user->role . "<br>";
    
    // Return JSON like the actual API
    http_response_code(200);
    echo "<br><br>JSON Response would be:<br>";
    echo json_encode(array(
        "success" => true,
        "message" => "Login successful.",
        "user" => array(
            "id" => $user->id,
            "email" => $user->email,
            "full_name" => $user->full_name,
            "role" => $user->role
        )
    ), JSON_PRETTY_PRINT);
} else {
    echo "❌ User object login FAILED!<br>";
    
    // Debug: Check what's in database
    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$test_email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "<br>Database record:<br>";
    echo "Email in DB: " . $row['email'] . "<br>";
    echo "Password in DB: '" . $row['password'] . "'<br>";
    echo "Password length: " . strlen($row['password']) . "<br>";
    echo "Status: " . $row['status'] . "<br>";
    
    // Check comparison
    echo "<br>Comparison test:<br>";
    echo "Input password: '$test_password'<br>";
    echo "DB password: '" . $row['password'] . "'<br>";
    echo "Are they equal? " . ($test_password === $row['password'] ? 'YES' : 'NO') . "<br>";
    
    // Check for whitespace
    echo "<br>Checking for whitespace issues:<br>";
    echo "Input password length: " . strlen($test_password) . "<br>";
    echo "DB password length: " . strlen($row['password']) . "<br>";
    echo "Trimmed DB password: '" . trim($row['password']) . "'<br>";
}
?>