<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $full_name;
    public $email;
    public $password;
    public $role;
    public $status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Check if email already exists
public function emailExists() {
    $query = "SELECT id FROM users WHERE LOWER(email) = LOWER(:email)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}



public function login() {
    $query = "SELECT id, full_name, email, password, role 
              FROM users 
              WHERE email = :email LIMIT 1";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Plain-text comparison for now
        if ($this->password === $row['password']) {
            $this->id = $row['id'];
            $this->full_name = $row['full_name'];
            $this->email = $row['email'];
            $this->role = $row['role'];
            return true;
        }
    }

    return false;
}

    // Create a new user
// Create a new user
public function create() {
    $query = "INSERT INTO " . $this->table_name . "
              SET full_name=:full_name, email=:email, password=:password, role=:role, status=:status";
    $stmt = $this->conn->prepare($query);

    // Store password as plain text (not secure for production)
    $stmt->bindParam(':full_name', $this->full_name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password); // no hashing
    $stmt->bindParam(':role', $this->role);
    $stmt->bindParam(':status', $this->status);

    return $stmt->execute();
}

    // Read all users
    public function readAll() {
        $query = "SELECT id, full_name, email, role, status, created_at FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Delete a user
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }
}
?>
