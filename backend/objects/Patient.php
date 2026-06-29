<?php
class Patient {
    private $conn;
    private $table_name = "patients";

    public $id;
    public $slip_number;
    public $full_name;
    public $contact_number;
    public $gender;
    public $date_of_birth;
    public $age;
    public $registered_by;
    public $registration_date;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $this->slip_number = $this->generateSlipNumber();
        
        $query = "INSERT INTO " . $this->table_name . "
                  SET slip_number = :slip_number,
                      full_name = :full_name,
                      contact_number = :contact_number,
                      gender = :gender,
                      date_of_birth = :date_of_birth,
                      age = :age,
                      registered_by = :registered_by";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':slip_number', $this->slip_number);
        $stmt->bindParam(':full_name', $this->full_name);
        $stmt->bindParam(':contact_number', $this->contact_number);
        $stmt->bindParam(':gender', $this->gender);
        $stmt->bindParam(':date_of_birth', $this->date_of_birth);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':registered_by', $this->registered_by);
        
        if($stmt->execute()) {
            return $this->slip_number;
        }
        return false;
    }

    private function generateSlipNumber() {
        $prefix = "SLIP-";
        $date = date("Ymd");
        $random = mt_rand(1000, 9999);
        return $prefix . $date . "-" . $random;
    }
    public function addMedicine($prescription_id, $medicine_id, $quantity, $dosage_instructions, $duration_days) {
    // Get medicine price
    $medicine_query = "SELECT price FROM medicines WHERE id = ?";
    $medicine_stmt = $this->conn->prepare($medicine_query);
    $medicine_stmt->bindParam(1, $medicine_id);
    $medicine_stmt->execute();
    $medicine = $medicine_stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$medicine) {
        return false;
    }
    
    $total_price = $medicine['price'] * $quantity;
    
    $query = "INSERT INTO prescription_medicines 
              (prescription_id, medicine_id, quantity, dosage_instructions, duration_days, total_price) 
              VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $prescription_id);
    $stmt->bindParam(2, $medicine_id);
    $stmt->bindParam(3, $quantity);
    $stmt->bindParam(4, $dosage_instructions);
    $stmt->bindParam(5, $duration_days);
    $stmt->bindParam(6, $total_price);
    
    if($stmt->execute()) {
        $this->updateTotalPrice($prescription_id);
        return true;
    }
    return false;
}

public function getMedicines($prescription_id) {
    $query = "SELECT pm.*, m.generic_name, m.brand_name, m.company_name, m.dosage, m.form, m.price
              FROM prescription_medicines pm
              JOIN medicines m ON pm.medicine_id = m.id
              WHERE pm.prescription_id = ?
              ORDER BY pm.id ASC";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $prescription_id);
    $stmt->execute();
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

private function updateTotalPrice($prescription_id) {
    $query = "UPDATE prescriptions p
              SET total_price = (
                  SELECT COALESCE(SUM(pm.total_price), 0)
                  FROM prescription_medicines pm
                  WHERE pm.prescription_id = p.id
              )
              WHERE p.id = ?";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $prescription_id);
    $stmt->execute();
}
    public function getBySlipNumber($slip_number) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE slip_number = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $slip_number);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function readAll() {
        $query = "SELECT p.*, u.full_name as registered_by_name 
                  FROM " . $this->table_name . " p
                  LEFT JOIN users u ON p.registered_by = u.id
                  ORDER BY p.registration_date DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    public function getTodayCount() {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . " 
                  WHERE DATE(registration_date) = CURDATE()";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }

    public function getTotalCount() {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name;
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'];
    }
}
?>