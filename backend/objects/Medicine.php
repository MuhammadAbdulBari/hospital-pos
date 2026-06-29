<?php
class Medicine {
    private $conn;
    private $table_name = "medicines";

    public $id;
    public $generic_name;
    public $brand_name;
    public $company_name;
    public $dosage;
    public $form;
    public $price;
    public $stock_quantity;
    public $category;
    public $is_active;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function search($search_term) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE (generic_name LIKE :search_term 
                  OR brand_name LIKE :search_term 
                  OR company_name LIKE :search_term)
                  AND is_active = 1
                  ORDER BY generic_name ASC";
        
        $stmt = $this->conn->prepare($query);
        $search_term = "%" . $search_term . "%";
        $stmt->bindParam(':search_term', $search_term);
        $stmt->execute();
        
        return $stmt;
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE is_active = 1 
                  ORDER BY generic_name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    public function getByGenericName($generic_name) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE generic_name LIKE ? AND is_active = 1 
                  ORDER BY price ASC";
        $stmt = $this->conn->prepare($query);
        $generic_name = "%" . $generic_name . "%";
        $stmt->bindParam(1, $generic_name);
        $stmt->execute();
        
        return $stmt;
    }

    public function getCategories() {
        $query = "SELECT DISTINCT category FROM " . $this->table_name . " 
                  WHERE category IS NOT NULL AND category != '' 
                  AND is_active = 1 
                  ORDER BY category ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    public function updateStock($id, $quantity_change) {
        $query = "UPDATE " . $this->table_name . " 
                  SET stock_quantity = stock_quantity - ? 
                  WHERE id = ? AND stock_quantity >= ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $quantity_change);
        $stmt->bindParam(2, $id);
        $stmt->bindParam(3, $quantity_change);
        
        return $stmt->execute();
    }
}
?>