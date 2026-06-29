<?php
class Prescription {
    private $conn;
    private $table_name = "prescriptions";

    public $id;
    public $slip_number;
    public $doctor_id;
    public $diagnosis;
    public $prescription_text;
    public $total_price;
    public $status;
    public $created_at;
    public $updated_by;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET slip_number = :slip_number,
                      doctor_id = :doctor_id,
                      diagnosis = :diagnosis,
                      prescription_text = :prescription_text,
                      status = 'pending',
                      total_price = 0";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':slip_number', $this->slip_number);
        $stmt->bindParam(':doctor_id', $this->doctor_id);
        $stmt->bindParam(':diagnosis', $this->diagnosis);
        $stmt->bindParam(':prescription_text', $this->prescription_text);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function getBySlipNumber($slip_number) {
        $query = "SELECT p.*, 
                         pat.full_name as patient_name,
                         u.full_name as doctor_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN patients pat ON p.slip_number = pat.slip_number
                  LEFT JOIN users u ON p.doctor_id = u.id
                  WHERE p.slip_number = ?
                  ORDER BY p.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $slip_number);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT p.*, 
                         pat.full_name as patient_name,
                         u.full_name as doctor_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN patients pat ON p.slip_number = pat.slip_number
                  LEFT JOIN users u ON p.doctor_id = u.id
                  WHERE p.id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function readAll() {
        $query = "SELECT p.*, 
                         pat.full_name as patient_name,
                         u.full_name as doctor_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN patients pat ON p.slip_number = pat.slip_number
                  LEFT JOIN users u ON p.doctor_id = u.id
                  ORDER BY p.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    public function readAllForPharmacy() {
        $query = "SELECT p.*, 
                         pat.full_name as patient_name,
                         u.full_name as doctor_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN patients pat ON p.slip_number = pat.slip_number
                  LEFT JOIN users u ON p.doctor_id = u.id
                  WHERE p.status IN ('pending', 'pharmacy_received', 'ready', 'dispensed')
                  ORDER BY 
                    CASE p.status
                        WHEN 'pending' THEN 1
                        WHEN 'pharmacy_received' THEN 2
                        WHEN 'ready' THEN 3
                        WHEN 'dispensed' THEN 4
                        ELSE 5
                    END,
                    p.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
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
        $query = "SELECT pm.*, 
                         m.generic_name, 
                         m.brand_name, 
                         m.company_name, 
                         m.dosage, 
                         m.form, 
                         m.price
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
        $query = "UPDATE " . $this->table_name . " p
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

    public function updateStatus() {
        $query = "UPDATE " . $this->table_name . "
                  SET status = :status,
                      updated_by = :updated_by,
                      updated_at = NOW()
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':updated_by', $this->updated_by);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }

    public function getTotalPrice($prescription_id) {
        $query = "SELECT COALESCE(SUM(pm.total_price), 0) as total_price
                  FROM prescription_medicines pm
                  WHERE pm.prescription_id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $prescription_id);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total_price'];
    }
}
?>