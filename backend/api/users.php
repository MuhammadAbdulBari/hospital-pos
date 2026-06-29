<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';
require_once '../objects/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $user->readAll();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => $users]);
        break;

    case 'POST':
        if (!empty($data->email) && !empty($data->password) && !empty($data->full_name) && !empty($data->role)) {
            $user->email = strtolower(trim($data->email));

$user->email = $data->email;
if ($user->emailExists()) {
    http_response_code(409);
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    exit();
}



            $user->full_name = trim($data->full_name);
            $user->password = trim($data->password);
            $user->role = trim($data->role);
            $user->status = 'active';

            if ($user->create()) {
                http_response_code(201);
                echo json_encode(["success" => true, "message" => "User created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Failed to create user"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Data incomplete"]);
        }
        break;

    case 'DELETE':
        if (!empty($data->id)) {
            $user->id = $data->id;
            if ($user->delete()) {
                echo json_encode(["success" => true, "message" => "User deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Failed to delete user"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "User ID missing"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>
