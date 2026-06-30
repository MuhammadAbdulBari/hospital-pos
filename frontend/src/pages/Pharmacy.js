import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Custom SVG Icons (Add medicine management icons)
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const ViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.42 12.71a.94.94 0 0 1 0-1.42C4.1 9.23 7.5 6 12 6s7.9 3.23 9.58 5.29a.94.94 0 0 1 0 1.42C19.9 14.77 16.5 18 12 18s-7.9-3.23-9.58-5.29Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const RemoveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const PrescriptionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DoctorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    <path d="M12 17v.01" />
    <path d="M12 7v4" />
    <path d="M10 9h4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const MedicineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h8" />
    <path d="M12 12v4" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

const Pharmacy = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedPrescriptions, setExpandedPrescriptions] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    prescription_text: '',
    discount_amount: 0,
    medicines: []
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPrescription, setDeletingPrescription] = useState(null);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    medicine_id: '',
    quantity: 1,
    dosage_instructions: '',
    duration_days: 0
  });
  
  // New state for medicine management
  const [showMedicineManagement, setShowMedicineManagement] = useState(false);
  const [newMedicineForm, setNewMedicineForm] = useState({
    generic_name: '',
    brand_name: '',
    company_name: '',
    dosage: '',
    form: 'Tablet',
    price: 0,
    stock_quantity: 0,
    category: 'Psychiatry',
    is_active: true
  });
  const [editMedicineId, setEditMedicineId] = useState(null);
  const [categories, setCategories] = useState(['Psychiatry', 'General', 'Cardiology', 'Neurology', 'Pediatrics', 'Other']);
  const [medicineForms] = useState(['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Inhaler', 'Other']);
  const [showDeleteMedicineConfirm, setShowDeleteMedicineConfirm] = useState(false);
  const [deletingMedicine, setDeletingMedicine] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php?pharmacy=true&with_medicines=true'
      );
      
      if (response.data.success) {
        setPrescriptions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/medicines.php'
      );
      
      if (response.data.success) {
        setAvailableMedicines(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchAvailableMedicines();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrescriptions, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(true);
    
    try {
      const response = await axios.put(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        {
          update_type: 'status',
          id,
          status: newStatus,
          updated_by: user?.id
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Update local state
        setPrescriptions(prescriptions.map(pres => 
          pres.id === id ? { ...pres, status: newStatus } : pres
        ));
        
        if (selectedPrescription && selectedPrescription.id === id) {
          setSelectedPrescription({ ...selectedPrescription, status: newStatus });
        }
        
        // Refresh the data
        fetchPrescriptions();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditPrescription = () => {
    if (!selectedPrescription) return;
    
    setEditMode(true);
    setEditForm({
      prescription_text: selectedPrescription.prescription_text || '',
      discount_amount: selectedPrescription.discount_amount || 0,
      medicines: selectedPrescription.medicines || []
    });
  };

  const handleSaveEdit = async () => {
    if (!selectedPrescription) return;
    
    setActionLoading(true);
    
    try {
      const response = await axios.put(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        {
          update_type: 'details',
          id: selectedPrescription.id,
          prescription_text: editForm.prescription_text,
          discount_amount: editForm.discount_amount,
          medicines: editForm.medicines,
          updated_by: user?.id
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Update local state
        const updatedPrescription = response.data.data;
        setPrescriptions(prescriptions.map(pres => 
          pres.id === updatedPrescription.id ? updatedPrescription : pres
        ));
        
        setSelectedPrescription(updatedPrescription);
        setEditMode(false);
        
        // Show success message
        alert('Prescription updated successfully!');
      }
    } catch (error) {
      console.error('Error updating prescription:', error);
      alert('Failed to update prescription. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    setActionLoading(true);
    
    try {
      const response = await axios.delete(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        {
          data: { id: prescriptionId },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      if (response.data.success) {
        // Remove from local state
        setPrescriptions(prescriptions.filter(pres => pres.id !== prescriptionId));
        
        // Clear selected if it's the deleted one
        if (selectedPrescription && selectedPrescription.id === prescriptionId) {
          setSelectedPrescription(null);
        }
        
        // Close delete confirmation
        setShowDeleteConfirm(false);
        setDeletingPrescription(null);
        
        // Show success message
        alert('Prescription deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting prescription:', error);
      alert('Failed to delete prescription. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddMedicine = async () => {
    if (!selectedPrescription || !newMedicine.medicine_id) return;
    
    setActionLoading(true);
    
    try {
      const response = await axios.post(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        {
          action: 'add_medicine',
          prescription_id: selectedPrescription.id,
          medicine_id: newMedicine.medicine_id,
          quantity: newMedicine.quantity,
          dosage_instructions: newMedicine.dosage_instructions,
          duration_days: newMedicine.duration_days
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Update local state
        const updatedPrescription = response.data.data;
        setPrescriptions(prescriptions.map(pres => 
          pres.id === updatedPrescription.id ? updatedPrescription : pres
        ));
        
        setSelectedPrescription(updatedPrescription);
        setShowAddMedicine(false);
        setNewMedicine({
          medicine_id: '',
          quantity: 1,
          dosage_instructions: '',
          duration_days: 0
        });
        
        // Show success message
        alert('Medicine added successfully!');
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Failed to add medicine. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveMedicine = async (prescriptionMedicineId) => {
    if (!selectedPrescription || !window.confirm('Are you sure you want to remove this medicine?')) return;
    
    setActionLoading(true);
    
    try {
      const response = await axios.post(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        {
          action: 'remove_medicine',
          prescription_medicine_id: prescriptionMedicineId
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Refresh prescription data
        const prescriptionResponse = await axios.get(
          `https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php?id=${selectedPrescription.id}&with_medicines=true`
        );
        
        if (prescriptionResponse.data.success) {
          const updatedPrescription = prescriptionResponse.data.data;
          setPrescriptions(prescriptions.map(pres => 
            pres.id === updatedPrescription.id ? updatedPrescription : pres
          ));
          
          setSelectedPrescription(updatedPrescription);
          alert('Medicine removed successfully!');
        }
      }
    } catch (error) {
      console.error('Error removing medicine:', error);
      alert('Failed to remove medicine. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // New Medicine Management Functions
  const handleAddNewMedicine = async () => {
    if (!newMedicineForm.generic_name || !newMedicineForm.brand_name || !newMedicineForm.dosage) {
      alert('Please fill in all required fields (Generic Name, Brand Name, and Dosage)');
      return;
    }

    setActionLoading(true);
    
    try {
      const response = await axios.post(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/medicines.php',
        newMedicineForm,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Refresh medicines list
        await fetchAvailableMedicines();
        
        // Reset form
        setNewMedicineForm({
          generic_name: '',
          brand_name: '',
          company_name: '',
          dosage: '',
          form: 'Tablet',
          price: 0,
          stock_quantity: 0,
          category: 'Psychiatry',
          is_active: true
        });
        
        alert('Medicine added successfully!');
      } else {
        alert(response.data.message || 'Failed to add medicine');
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Failed to add medicine. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateMedicine = async () => {
    if (!editMedicineId || !newMedicineForm.generic_name || !newMedicineForm.brand_name || !newMedicineForm.dosage) {
      alert('Please fill in all required fields');
      return;
    }

    setActionLoading(true);
    
    try {
      const response = await axios.put(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/medicines.php',
        { id: editMedicineId, ...newMedicineForm },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        // Refresh medicines list
        await fetchAvailableMedicines();
        
        // Reset form
        setEditMedicineId(null);
        setNewMedicineForm({
          generic_name: '',
          brand_name: '',
          company_name: '',
          dosage: '',
          form: 'Tablet',
          price: 0,
          stock_quantity: 0,
          category: 'Psychiatry',
          is_active: true
        });
        
        alert('Medicine updated successfully!');
      } else {
        alert(response.data.message || 'Failed to update medicine');
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
      alert('Failed to update medicine. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    setActionLoading(true);
    
    try {
      const response = await axios.delete(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/medicines.php',
        {
          data: { id: medicineId },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      if (response.data.success) {
        // Refresh medicines list
        await fetchAvailableMedicines();
        
        // Close confirmation
        setShowDeleteMedicineConfirm(false);
        setDeletingMedicine(null);
        
        alert('Medicine deleted successfully!');
      } else {
        alert(response.data.message || 'Failed to delete medicine');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('Failed to delete medicine. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditMedicineClick = (medicine) => {
    setEditMedicineId(medicine.id);
    setNewMedicineForm({
      generic_name: medicine.generic_name || '',
      brand_name: medicine.brand_name || '',
      company_name: medicine.company_name || '',
      dosage: medicine.dosage || '',
      form: medicine.form || 'Tablet',
      price: medicine.price || 0,
      stock_quantity: medicine.stock_quantity || 0,
      category: medicine.category || 'Psychiatry',
      is_active: medicine.is_active === undefined ? true : medicine.is_active
    });
    setShowMedicineManagement(true);
  };

  const confirmDelete = (prescription) => {
    setDeletingPrescription(prescription);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteMedicine = (medicine) => {
    setDeletingMedicine(medicine);
    setShowDeleteMedicineConfirm(true);
  };

  const getStatusConfig = (status) => {
    const config = {
      'pending': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.05)', label: 'Pending', nextStatus: 'pharmacy_received' },
      'pharmacy_received': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.1)', label: 'Received', nextStatus: 'ready' },
      'ready': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.2)', label: 'Ready', nextStatus: 'dispensed' },
      'dispensed': { color: '#666666', bgColor: 'rgba(102, 102, 102, 0.1)', label: 'Dispensed', nextStatus: null }
    };
    return config[status] || config.pending;
  };

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status);
    
    return (
      <div className="status-badge" style={{
        backgroundColor: config.bgColor,
        color: config.color
      }}>
        {config.label}
      </div>
    );
  };

  const filteredPrescriptions = prescriptions.filter(pres => {
    const matchesSearch = 
      pres.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pres.slip_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pres.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pres.medicines?.some(med => 
        med.brand_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.generic_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = filterStatus === 'all' || pres.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredMedicines = availableMedicines.filter(med =>
    med.brand_name?.toLowerCase().includes(medicineSearchTerm.toLowerCase()) ||
    med.generic_name?.toLowerCase().includes(medicineSearchTerm.toLowerCase()) ||
    med.company_name?.toLowerCase().includes(medicineSearchTerm.toLowerCase())
  );

  const togglePrescriptionExpansion = (id) => {
    setExpandedPrescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculatePrescriptionTotal = (prescription) => {
    if (prescription.total_price) {
      return prescription.total_price;
    }
    if (prescription.medicines) {
      return prescription.medicines.reduce((total, med) => total + (med.total_price || 0), 0);
    }
    return 0;
  };

  const getNextStatusAction = (status) => {
    const config = getStatusConfig(status);
    if (!config.nextStatus) return null;
    
    const actions = {
      'pending': 'Mark as Received',
      'pharmacy_received': 'Mark as Ready',
      'ready': 'Mark as Dispensed'
    };
    
    return {
      nextStatus: config.nextStatus,
      label: actions[status]
    };
  };

  return (
    <div className="pharmacy-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="pharmacy-wrapper">
          {/* Header */}
          <div className="pharmacy-header">
            <div className="header-content">
              <h1 className="page-title">Pharmacy Management</h1>
              <p className="page-subtitle">
                Manage prescriptions, prepare medications, and update dispensing status
              </p>
            </div>
            
            <div className="header-actions">
              <button 
                className="medicine-management-button"
                onClick={() => setShowMedicineManagement(!showMedicineManagement)}
              >
                <SettingsIcon />
                <span>{showMedicineManagement ? 'Hide Medicine Management' : 'Medicine Management'}</span>
              </button>
              
              <button 
                className="refresh-button"
                onClick={() => {
                  fetchPrescriptions();
                  fetchAvailableMedicines();
                }}
                disabled={loading}
              >
                <RefreshIcon />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Medicine Management Section */}
          {showMedicineManagement && (
            <div className="medicine-management-card">
              <div className="management-header">
                <h3>Medicine Management</h3>
                <div className="medicines-count">
                  <MedicineIcon />
                  <span>{availableMedicines.length} medicines in database</span>
                </div>
              </div>
              
              <div className="management-content">
                {/* Add/Edit Medicine Form */}
                <div className="add-medicine-form-section">
                  <h4>{editMedicineId ? 'Edit Medicine' : 'Add New Medicine'}</h4>
                  
                  <div className="medicine-form-grid">
                    <div className="form-group">
                      <label>Generic Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newMedicineForm.generic_name}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, generic_name: e.target.value})}
                        placeholder="e.g., Aripiprazole"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Brand Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newMedicineForm.brand_name}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, brand_name: e.target.value})}
                        placeholder="e.g., Adablizer"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newMedicineForm.company_name}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, company_name: e.target.value})}
                        placeholder="e.g., Adamjee Pharma"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Dosage *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newMedicineForm.dosage}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, dosage: e.target.value})}
                        placeholder="e.g., 10mg"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Form</label>
                      <select
                        className="form-input"
                        value={newMedicineForm.form}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, form: e.target.value})}
                      >
                        {medicineForms.map(form => (
                          <option key={form} value={form}>{form}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Price (Rs.)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newMedicineForm.price}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, price: parseFloat(e.target.value) || 0})}
                        step="0.01"
                        min="0"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Stock Quantity</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newMedicineForm.stock_quantity}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, stock_quantity: parseInt(e.target.value) || 0})}
                        min="0"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-input"
                        value={newMedicineForm.category}
                        onChange={(e) => setNewMedicineForm({...newMedicineForm, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={newMedicineForm.is_active}
                          onChange={(e) => setNewMedicineForm({...newMedicineForm, is_active: e.target.checked})}
                        />
                        <span>Active</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    {editMedicineId ? (
                      <>
                        <button 
                          className="save-medicine-button"
                          onClick={handleUpdateMedicine}
                          disabled={actionLoading}
                        >
                          <CheckIcon />
                          <span>{actionLoading ? 'Updating...' : 'Update Medicine'}</span>
                        </button>
                        <button 
                          className="cancel-medicine-button"
                          onClick={() => {
                            setEditMedicineId(null);
                            setNewMedicineForm({
                              generic_name: '',
                              brand_name: '',
                              company_name: '',
                              dosage: '',
                              form: 'Tablet',
                              price: 0,
                              stock_quantity: 0,
                              category: 'Psychiatry',
                              is_active: true
                            });
                          }}
                          disabled={actionLoading}
                        >
                          <CloseIcon />
                          <span>Cancel Edit</span>
                        </button>
                      </>
                    ) : (
                      <button 
                        className="add-medicine-button"
                        onClick={handleAddNewMedicine}
                        disabled={actionLoading}
                      >
                        <AddIcon />
                        <span>{actionLoading ? 'Adding...' : 'Add Medicine'}</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Medicines List */}
                <div className="medicines-list-section">
                  <div className="list-header">
                    <h4>All Medicines</h4>
                    <div className="search-container">
                      <SearchIcon />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search medicines..."
                        value={medicineSearchTerm}
                        onChange={(e) => setMedicineSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="medicines-table">
                    <div className="table-header">
                      <div className="table-cell">ID</div>
                      <div className="table-cell">Generic Name</div>
                      <div className="table-cell">Brand Name</div>
                      <div className="table-cell">Company</div>
                      <div className="table-cell">Dosage</div>
                      <div className="table-cell">Form</div>
                      <div className="table-cell">Price</div>
                      <div className="table-cell">Stock</div>
                      <div className="table-cell">Actions</div>
                    </div>
                    
                    {filteredMedicines.map((medicine) => (
                      <div key={medicine.id} className="medicine-row">
                        <div className="table-cell">{medicine.id}</div>
                        <div className="table-cell">
                          <strong>{medicine.generic_name}</strong>
                        </div>
                        <div className="table-cell">{medicine.brand_name}</div>
                        <div className="table-cell">{medicine.company_name}</div>
                        <div className="table-cell">{medicine.dosage}</div>
                        <div className="table-cell">
                          <span className="form-badge">{medicine.form}</span>
                        </div>
                        <div className="table-cell">Rs. {medicine.price}</div>
                        <div className="table-cell">
                          <span className={`stock-badge ${medicine.stock_quantity > 10 ? 'in-stock' : medicine.stock_quantity > 0 ? 'low-stock' : 'out-of-stock'}`}>
                            {medicine.stock_quantity}
                          </span>
                        </div>
                        <div className="table-cell">
                          <div className="medicine-actions">
                            <button 
                              className="edit-medicine-button"
                              onClick={() => handleEditMedicineClick(medicine)}
                              title="Edit Medicine"
                            >
                              <EditIcon />
                            </button>
                            <button 
                              className="delete-medicine-button"
                              onClick={() => confirmDeleteMedicine(medicine)}
                              title="Delete Medicine"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredMedicines.length === 0 && (
                      <div className="no-medicines">
                        <p>No medicines found. Add your first medicine above.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="filters-section">
            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                className="search-input"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button 
                className={`filter-button ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-button ${filterStatus === 'pharmacy_received' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pharmacy_received')}
              >
                Received
              </button>
              <button 
                className={`filter-button ${filterStatus === 'ready' ? 'active' : ''}`}
                onClick={() => setFilterStatus('ready')}
              >
                Ready
              </button>
              <button 
                className={`filter-button ${filterStatus === 'dispensed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('dispensed')}
              >
                Dispensed
              </button>
            </div>
          </div>

          <div className="pharmacy-layout">
            {/* Prescriptions List */}
            <div className="prescriptions-list">
              <div className="list-card">
                <div className="list-header">
                  <h3>Active Prescriptions</h3>
                  <span className="prescription-count">{filteredPrescriptions.length} prescriptions</span>
                </div>
                
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner">
                      <SpinnerIcon />
                    </div>
                    <p>Loading prescriptions...</p>
                  </div>
                ) : filteredPrescriptions.length === 0 ? (
                  <div className="empty-state">
                    <p>No prescriptions found</p>
                  </div>
                ) : (
                  <div className="prescriptions-table">
                    <div className="table-header">
                      <div className="table-cell">Slip No.</div>
                      <div className="table-cell">Patient</div>
                      <div className="table-cell">Medicines</div>
                      <div className="table-cell">Total</div>
                      <div className="table-cell">Status</div>
                      <div className="table-cell">Actions</div>
                    </div>
                    
                    {filteredPrescriptions.map((pres) => {
                      const isExpanded = expandedPrescriptions[pres.id];
                      const totalPrice = calculatePrescriptionTotal(pres);
                      
                      return (
                        <div 
                          key={pres.id}
                          className={`prescription-row ${selectedPrescription?.id === pres.id ? 'selected' : ''}`}
                        >
                          <div className="table-cell">
                            <div className="slip-number">{pres.slip_number}</div>
                          </div>
                          <div className="table-cell">
                            <div className="patient-info">
                              <div className="patient-name">{pres.patient_name}</div>
                              <div className="doctor-name">{pres.doctor_name}</div>
                            </div>
                          </div>
                          <div className="table-cell">
                            <div className="medicines-count">
                              <MedicineIcon />
                              <span>{pres.medicines?.length || 0} medicines</span>
                              {pres.medicines?.length > 0 && (
                                <button 
                                  className="expand-button"
                                  onClick={() => togglePrescriptionExpansion(pres.id)}
                                >
                                  {isExpanded ? 'Hide' : 'Show'}
                                </button>
                              )}
                            </div>
                            {isExpanded && pres.medicines?.length > 0 && (
                              <div className="medicines-preview">
                                {pres.medicines.slice(0, 3).map((med, idx) => (
                                  <div key={idx} className="medicine-preview">
                                    <span className="medicine-name">{med.brand_name}</span>
                                    <span className="medicine-quantity">×{med.quantity}</span>
                                  </div>
                                ))}
                                {pres.medicines.length > 3 && (
                                  <div className="more-medicines">
                                    +{pres.medicines.length - 3} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="table-cell">
                            <div className="total-price">
                              <span>Rs. {totalPrice}</span>
                            </div>
                          </div>
                          <div className="table-cell">
                            {getStatusBadge(pres.status)}
                          </div>
                          <div className="table-cell">
                            <div className="action-buttons-row">
                              <button 
                                className="view-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPrescription(pres);
                                  setEditMode(false);
                                  setShowAddMedicine(false);
                                }}
                              >
                                <ViewIcon />
                                <span>View</span>
                              </button>
                              <button 
                                className="edit-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPrescription(pres);
                                  handleEditPrescription();
                                  setShowAddMedicine(false);
                                }}
                              >
                                <EditIcon />
                              </button>
                              <button 
                                className="delete-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(pres);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Prescription Details */}
            <div className="prescription-details">
              {selectedPrescription ? (
                <div className="details-card">
                  <div className="details-header">
                    <div className="header-left">
                      <h3>Prescription Details</h3>
                      <div className="slip-badge">Slip: {selectedPrescription.slip_number}</div>
                    </div>
                    <div className="status-display">
                      {getStatusBadge(selectedPrescription.status)}
                    </div>
                  </div>
                  
                  <div className="details-content">
                    <div className="patient-grid">
                      <div className="info-card">
                        <UserIcon />
                        <div>
                          <div className="info-label">Patient</div>
                          <div className="info-value">{selectedPrescription.patient_name}</div>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <DoctorIcon />
                        <div>
                          <div className="info-label">Dispensed by</div>
                          <div className="info-value">{selectedPrescription.doctor_name}</div>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <ClockIcon />
                        <div>
                          <div className="info-label">Created</div>
                          <div className="info-value">
                            {new Date(selectedPrescription.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <label className="form-label">Prescribed Medicines</label>
                      <div className="medicines-list">
                        {selectedPrescription.medicines?.length > 0 ? (
                          <>
                            <div className="medicines-header-row">
                              <div>Medicine</div>
                              <div>Dosage</div>
                              <div>Qty</div>
                              <div>Instructions</div>
                              <div>Price</div>
                              <div>Actions</div>
                            </div>
                            {selectedPrescription.medicines.map((medicine, index) => (
                              <div key={index} className="medicine-item">
                                <div className="medicine-info">
                                  <div className="medicine-name">
                                    <strong>{medicine.brand_name}</strong>
                                    <span className="generic-name">({medicine.generic_name})</span>
                                    <span className="company-name">{medicine.company_name}</span>
                                  </div>
                                  <div className="medicine-form">{medicine.form}</div>
                                </div>
                                <div className="medicine-dosage">{medicine.dosage}</div>
                                <div className="medicine-quantity">{medicine.quantity}</div>
                                <div className="medicine-instructions">
                                  {medicine.dosage_instructions} {medicine.duration_days > 0 && `for ${medicine.duration_days} days`}
                                </div>
                                <div className="medicine-price">
                                  Rs. {medicine.total_price}
                                </div>
                                <div className="medicine-actions">
                                  <button 
                                    className="remove-medicine-button"
                                    onClick={() => handleRemoveMedicine(medicine.id)}
                                    disabled={actionLoading}
                                    title="Remove Medicine"
                                  >
                                    <RemoveIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="medicines-total">
                              <div className="total-label">Total Price:</div>
                              <div className="total-value">
                                Rs. {calculatePrescriptionTotal(selectedPrescription)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="no-medicines">
                            No medicines prescribed
                          </div>
                        )}
                      </div>
                      
                      {!editMode && (
                        <button 
                          className="add-medicine-button"
                          onClick={() => setShowAddMedicine(!showAddMedicine)}
                        >
                          <AddIcon />
                          <span>{showAddMedicine ? 'Cancel Add Medicine' : 'Add New Medicine'}</span>
                        </button>
                      )}
                      
                      {showAddMedicine && (
                        <div className="add-medicine-form">
                          <h4>Add New Medicine to Prescription</h4>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Search Medicine</label>
                              <div className="search-medicine-container">
                                <SearchIcon />
                                <input
                                  type="text"
                                  className="search-medicine-input"
                                  placeholder="Search by brand or generic name..."
                                  value={medicineSearchTerm}
                                  onChange={(e) => setMedicineSearchTerm(e.target.value)}
                                />
                              </div>
                              {medicineSearchTerm && (
                                <div className="medicine-search-results">
                                  {filteredMedicines.length > 0 ? (
                                    filteredMedicines.map(med => (
                                      <div 
                                        key={med.id}
                                        className="medicine-search-result"
                                        onClick={() => {
                                          setNewMedicine({
                                            ...newMedicine,
                                            medicine_id: med.id
                                          });
                                          setMedicineSearchTerm('');
                                        }}
                                      >
                                        <strong>{med.brand_name}</strong>
                                        <span>{med.generic_name}</span>
                                        <small>{med.company_name} - Rs. {med.price}</small>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="no-results">No medicines found</div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {newMedicine.medicine_id && (
                              <>
                                <div className="form-group">
                                  <label>Quantity</label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={newMedicine.quantity}
                                    onChange={(e) => setNewMedicine({...newMedicine, quantity: parseInt(e.target.value) || 1})}
                                    className="form-input"
                                  />
                                </div>
                                
                                <div className="form-group">
                                  <label>Dosage Instructions</label>
                                  <input
                                    type="text"
                                    placeholder="e.g., 1 tablet twice daily"
                                    value={newMedicine.dosage_instructions}
                                    onChange={(e) => setNewMedicine({...newMedicine, dosage_instructions: e.target.value})}
                                    className="form-input"
                                  />
                                </div>
                                
                                <div className="form-group">
                                  <label>Duration (Days)</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={newMedicine.duration_days}
                                    onChange={(e) => setNewMedicine({...newMedicine, duration_days: parseInt(e.target.value) || 0})}
                                    className="form-input"
                                  />
                                </div>
                                
                                <button 
                                  className="submit-medicine-button"
                                  onClick={handleAddMedicine}
                                  disabled={actionLoading}
                                >
                                  <CheckIcon />
                                  <span>{actionLoading ? 'Adding...' : 'Add Medicine'}</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-section">
                      <label className="form-label">Instructions & Notes</label>
                      {editMode ? (
                        <textarea
                          className="edit-textarea"
                          value={editForm.prescription_text}
                          onChange={(e) => setEditForm({...editForm, prescription_text: e.target.value})}
                          placeholder="Enter instructions and notes..."
                          rows="4"
                        />
                      ) : (
                        <div className="prescription-box">
                          {selectedPrescription.prescription_text || 'No instructions provided'}
                        </div>
                      )}
                    </div>

                    {editMode && (
                      <div className="form-section">
                        <label className="form-label">Discount Amount (Rs.)</label>
                        <input
                          type="number"
                          className="edit-input"
                          value={editForm.discount_amount}
                          onChange={(e) => setEditForm({...editForm, discount_amount: parseFloat(e.target.value) || 0})}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    )}

                    <div className="status-actions">
                      <h4>{editMode ? 'Edit Mode' : 'Update Status'}</h4>
                      <div className="action-buttons">
                        {editMode ? (
                          <>
                            <button 
                              className="save-button"
                              onClick={handleSaveEdit}
                              disabled={actionLoading}
                            >
                              <CheckIcon />
                              <span>{actionLoading ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                            <button 
                              className="cancel-button"
                              onClick={() => setEditMode(false)}
                              disabled={actionLoading}
                            >
                              <CloseIcon />
                              <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <>
                            {getNextStatusAction(selectedPrescription.status) && (
                              <button 
                                className="status-button"
                                onClick={() => handleStatusUpdate(
                                  selectedPrescription.id, 
                                  getNextStatusAction(selectedPrescription.status).nextStatus
                                )}
                                disabled={actionLoading}
                              >
                                <CheckIcon />
                                <span>{getNextStatusAction(selectedPrescription.status).label}</span>
                              </button>
                            )}
                            
                            <button 
                              className="edit-details-button"
                              onClick={handleEditPrescription}
                              disabled={actionLoading || showAddMedicine}
                            >
                              <EditIcon />
                              <span>Edit</span>
                            </button>
                            
                            <button 
                              className="close-button"
                              onClick={() => {
                                setSelectedPrescription(null);
                                setEditMode(false);
                                setShowAddMedicine(false);
                              }}
                            >
                              <CloseIcon />
                              <span>Close</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-details">
                  <div className="empty-content">
                    <div className="empty-icon">
                      <PrescriptionIcon />
                    </div>
                    <h3>Select a Prescription</h3>
                    <p>Click on any prescription from the list to view details and update status</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pharmacy Guidelines */}
          <div className="guidelines-card">
            <h3>Pharmacy Guidelines</h3>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <div className="guideline-number">01</div>
                <div>
                  <strong>Medicine Management</strong>
                  <p>Add or remove medicines from prescriptions as needed. Verify all changes.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">02</div>
                <div>
                  <strong>Prescription Accuracy</strong>
                  <p>Ensure medicine names, dosages, and quantities are accurate before dispensing.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">03</div>
                <div>
                  <strong>Status Updates</strong>
                  <p>Update prescription status promptly at each stage of processing.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">04</div>
                <div>
                  <strong>Patient Safety</strong>
                  <p>Verify patient identity and provide clear medication instructions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Prescription Confirmation Modal */}
      {showDeleteConfirm && deletingPrescription && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingPrescription(null);
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete prescription for patient 
                <strong> {deletingPrescription.patient_name}</strong> 
                (Slip: {deletingPrescription.slip_number})?
              </p>
              <p className="warning-text">
                <strong>Warning:</strong> This action cannot be undone. All medicine records associated with this prescription will also be deleted.
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-cancel"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingPrescription(null);
                }}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-delete"
                onClick={() => handleDeletePrescription(deletingPrescription.id)}
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete Prescription'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Medicine Confirmation Modal */}
      {showDeleteMedicineConfirm && deletingMedicine && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete Medicine</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowDeleteMedicineConfirm(false);
                  setDeletingMedicine(null);
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete medicine 
                <strong> {deletingMedicine.brand_name}</strong> ({deletingMedicine.generic_name})?
              </p>
              <p className="warning-text">
                <strong>Warning:</strong> This action cannot be undone. This medicine will be removed from the system permanently.
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-cancel"
                onClick={() => {
                  setShowDeleteMedicineConfirm(false);
                  setDeletingMedicine(null);
                }}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-delete"
                onClick={() => handleDeleteMedicine(deletingMedicine.id)}
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete Medicine'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pharmacy-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #000000;
        }

        .dashboard-container {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .pharmacy-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header */
        .pharmacy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e5e5;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-content {
          flex: 1;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666666;
          margin: 0;
          max-width: 600px;
        }

        .medicine-management-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #6f42c1;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .medicine-management-button:hover {
          background: #5a32a3;
          transform: translateY(-1px);
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .refresh-button:hover:not(:disabled) {
          background: #f5f5f5;
          border-color: #000000;
        }

        .refresh-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Medicine Management */
        .medicine-management-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
          background: #f8f9fa;
        }

        .management-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .medicines-count {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666666;
        }

        .management-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .add-medicine-form-section {
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 24px;
        }

        .add-medicine-form-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 20px 0;
        }

        .medicine-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .form-input {
          padding: 10px 12px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 14px;
          color: #000000;
          background: #ffffff;
        }

        .form-input:focus {
          outline: none;
          border-color: #000000;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-group input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .add-medicine-button, .save-medicine-button, .cancel-medicine-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-medicine-button, .save-medicine-button {
          background: #28a745;
          color: #ffffff;
        }

        .add-medicine-button:hover:not(:disabled),
        .save-medicine-button:hover:not(:disabled) {
          background: #218838;
        }

        .cancel-medicine-button {
          background: #6c757d;
          color: #ffffff;
        }

        .cancel-medicine-button:hover:not(:disabled) {
          background: #5a6268;
        }

        .add-medicine-button:disabled,
        .save-medicine-button:disabled,
        .cancel-medicine-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Medicines List Section */
        .medicines-list-section {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
        }

        .medicines-list-section .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e5e5;
        }

        .medicines-list-section .list-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .medicines-table {
          max-height: 400px;
          overflow-y: auto;
        }

        .medicines-table .table-header {
          display: grid;
          grid-template-columns: 0.5fr 1.5fr 1.5fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr;
          padding: 12px 24px;
          background: #f0f0f0;
          font-size: 11px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e5e5e5;
          position: sticky;
          top: 0;
        }

        .medicine-row {
          display: grid;
          grid-template-columns: 0.5fr 1.5fr 1.5fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr;
          padding: 12px 24px;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
          transition: all 0.2s ease;
        }

        .medicine-row:hover {
          background: #f8f9fa;
        }

        .medicine-row .table-cell {
          font-size: 13px;
          color: #000000;
        }

        .form-badge {
          background: rgba(0, 0, 0, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          color: #666666;
        }

        .stock-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .stock-badge.in-stock {
          background: #d4edda;
          color: #155724;
        }

        .stock-badge.low-stock {
          background: #fff3cd;
          color: #856404;
        }

        .stock-badge.out-of-stock {
          background: #f8d7da;
          color: #721c24;
        }

        .medicine-actions {
          display: flex;
          gap: 8px;
        }

        .edit-medicine-button, .delete-medicine-button {
          padding: 6px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-medicine-button {
          background: #fff3cd;
          color: #856404;
        }

        .edit-medicine-button:hover {
          background: #ffeaa7;
        }

        .delete-medicine-button {
          background: #f8d7da;
          color: #721c24;
        }

        .delete-medicine-button:hover {
          background: #f5c6cb;
        }

        .no-medicines {
          padding: 40px;
          text-align: center;
          color: #666666;
          font-style: italic;
        }

        /* Filters */
        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding: 24px 0;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #000000;
          background: transparent;
        }

        .search-input::placeholder {
          color: #999999;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-button {
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-button:hover {
          border-color: #000000;
          color: #000000;
        }

        .filter-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        /* Pharmacy Layout */
        .pharmacy-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 1024px) {
          .pharmacy-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Prescriptions List */
        .list-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .list-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .prescription-count {
          font-size: 12px;
          color: #666666;
          background: #f5f5f5;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .loading-state, .empty-state {
          padding: 60px 24px;
          text-align: center;
          color: #666666;
        }

        .spinner {
          display: inline-block;
          margin-bottom: 16px;
        }

        .spinner svg {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Prescriptions Table */
        .prescriptions-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr;
          padding: 16px 24px;
          background: #fafafa;
          border-bottom: 1px solid #e5e5e5;
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .prescription-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr;
          padding: 16px 24px;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }

        .prescription-row:hover {
          background: #fafafa;
        }

        .prescription-row.selected {
          background: rgba(0, 0, 0, 0.05);
        }

        .table-cell {
          display: flex;
          align-items: center;
        }

        .slip-number {
          font-family: 'Monaco', 'Courier New', monospace;
          font-weight: 600;
          color: #000000;
          font-size: 13px;
        }

        .patient-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .patient-name {
          font-weight: 500;
          color: #000000;
        }

        .doctor-name {
          font-size: 12px;
          color: #666666;
        }

        .medicines-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #000000;
        }

        .expand-button {
          background: none;
          border: none;
          color: #666666;
          font-size: 11px;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .expand-button:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #000000;
        }

        .medicines-preview {
          margin-top: 8px;
          padding: 8px;
          background: #fafafa;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
        }

        .medicine-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0;
          font-size: 11px;
        }

        .medicine-name {
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 150px;
        }

        .medicine-quantity {
          color: #666666;
          font-weight: 500;
        }

        .more-medicines {
          text-align: center;
          font-size: 10px;
          color: #999999;
          padding-top: 4px;
          border-top: 1px dashed #e5e5e5;
          margin-top: 4px;
        }

        .total-price {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          color: #000000;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          width: fit-content;
          white-space: nowrap;
        }

        .action-buttons-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .view-button, .edit-button, .delete-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #e5e5e5;
          background: #ffffff;
          color: #000000;
        }

        .view-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        .edit-button {
          padding: 6px;
          background: #fff3cd;
          border-color: #ffeaa7;
          color: #856404;
        }

        .edit-button:hover {
          background: #ffeaa7;
          border-color: #fdcb6e;
        }

        .delete-button {
          padding: 6px;
          background: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        .delete-button:hover {
          background: #f5c6cb;
          border-color: #f1b0b7;
        }

        /* Prescription Details */
        .details-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
          position: sticky;
          top: 100px;
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .details-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .slip-badge {
          font-size: 12px;
          color: #666666;
          background: #f5f5f5;
          padding: 4px 12px;
          border-radius: 12px;
          align-self: flex-start;
        }

        .status-display {
          display: flex;
          align-items: center;
        }

        .details-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .patient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
        }

        .info-label {
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .prescription-box {
          padding: 16px;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          color: #000000;
          line-height: 1.6;
          min-height: 80px;
          white-space: pre-wrap;
        }

        .edit-textarea {
          padding: 12px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          color: #000000;
          line-height: 1.6;
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
        }

        .edit-textarea:focus {
          outline: none;
          border-color: #000000;
        }

        .edit-input {
          padding: 12px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          color: #000000;
          width: 200px;
        }

        .edit-input:focus {
          outline: none;
          border-color: #000000;
        }

        /* Medicines List in Details */
        .medicines-list {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .medicines-header-row {
          display: grid;
          grid-template-columns: 2fr 1fr 0.5fr 2fr 1fr 0.5fr;
          padding: 12px 16px;
          background: #f0f0f0;
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e5e5e5;
        }

        .medicine-item {
          display: grid;
          grid-template-columns: 2fr 1fr 0.5fr 2fr 1fr 0.5fr;
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          align-items: start;
        }

        .medicine-item:last-child {
          border-bottom: none;
        }

        .medicine-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .medicine-name {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .medicine-name strong {
          font-size: 14px;
          color: #000000;
        }

        .generic-name {
          font-size: 11px;
          color: #666666;
        }

        .company-name {
          font-size: 11px;
          color: #999999;
        }

        .medicine-form {
          font-size: 11px;
          color: #666666;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 10px;
          align-self: flex-start;
        }

        .medicine-dosage {
          font-size: 13px;
          color: #000000;
          font-weight: 500;
        }

        .medicine-quantity {
          font-size: 14px;
          color: #000000;
          font-weight: 600;
        }

        .medicine-instructions {
          font-size: 12px;
          color: #000000;
          line-height: 1.4;
          font-style: italic;
        }

        .medicine-price {
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          text-align: right;
        }

        .medicine-actions {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .remove-medicine-button {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-medicine-button:hover:not(:disabled) {
          background: #f5c6cb;
          border-color: #f1b0b7;
        }

        .remove-medicine-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .medicines-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-top: 2px solid #000000;
          background: #ffffff;
        }

        .total-label {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
        }

        .total-value {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
        }

        .no-medicines {
          padding: 40px;
          text-align: center;
          color: #666666;
          font-style: italic;
        }

        .add-medicine-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #d4edda;
          border: 1px solid #c3e6cb;
          border-radius: 8px;
          color: #155724;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .add-medicine-button:hover {
          background: #c3e6cb;
          border-color: #b1dfbb;
        }

        .add-medicine-form {
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }

        .add-medicine-form h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 16px 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .search-medicine-container {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
        }

        .search-medicine-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #000000;
          background: transparent;
        }

        .medicine-search-results {
          margin-top: 8px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          max-height: 200px;
          overflow-y: auto;
          background: #ffffff;
        }

        .medicine-search-result {
          padding: 12px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .medicine-search-result:hover {
          background: #f8f9fa;
        }

        .medicine-search-result strong {
          font-size: 14px;
          color: #000000;
        }

        .medicine-search-result span {
          font-size: 12px;
          color: #666666;
        }

        .medicine-search-result small {
          font-size: 11px;
          color: #999999;
        }

        .no-results {
          padding: 20px;
          text-align: center;
          color: #666666;
          font-style: italic;
        }

        .submit-medicine-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #28a745;
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          justify-content: center;
        }

        .submit-medicine-button:hover:not(:disabled) {
          background: #218838;
        }

        .submit-medicine-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-actions {
          margin-top: 8px;
        }

        .status-actions h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 16px 0;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .status-button, .edit-details-button, .close-button,
        .save-button, .cancel-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          justify-content: center;
        }

        .status-button {
          background: #000000;
          color: #ffffff;
        }

        .status-button:hover:not(:disabled) {
          background: #333333;
          transform: translateY(-1px);
        }

        .edit-details-button {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .edit-details-button:hover:not(:disabled) {
          background: #ffeaa7;
        }

        .close-button {
          background: #ffffff;
          color: #000000;
          border: 1px solid #e5e5e5;
        }

        .close-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        .save-button {
          background: #28a745;
          color: #ffffff;
        }

        .save-button:hover:not(:disabled) {
          background: #218838;
        }

        .cancel-button {
          background: #6c757d;
          color: #ffffff;
        }

        .cancel-button:hover:not(:disabled) {
          background: #5a6268;
        }

        .status-button:disabled,
        .edit-details-button:disabled,
        .save-button:disabled,
        .cancel-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Empty Details */
        .empty-details {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .empty-content {
          text-align: center;
          color: #666666;
          padding: 40px;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .empty-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 12px 0;
        }

        .empty-content p {
          font-size: 14px;
          color: #666666;
          margin: 0;
          max-width: 300px;
        }

        /* Guidelines */
        .guidelines-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .guidelines-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 24px 0;
        }

        .guidelines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .guideline-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .guideline-number {
          font-size: 24px;
          font-weight: 700;
          color: #e5e5e5;
          line-height: 1;
          flex-shrink: 0;
        }

        .guideline-item strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }

        .guideline-item p {
          font-size: 13px;
          color: #666666;
          margin: 0;
          line-height: 1.5;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #666666;
        }

        .modal-close:hover {
          color: #000000;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-body p {
          margin: 0 0 16px 0;
          font-size: 14px;
          line-height: 1.6;
          color: #000000;
        }

        .warning-text {
          color: #721c24;
          background: #f8d7da;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #f5c6cb;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e5e5e5;
        }

        .modal-cancel, .modal-delete {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-cancel {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          color: #000000;
        }

        .modal-cancel:hover:not(:disabled) {
          background: #f5f5f5;
          border-color: #000000;
        }

        .modal-delete {
          background: #dc3545;
          border: 1px solid #dc3545;
          color: #ffffff;
        }

        .modal-delete:hover:not(:disabled) {
          background: #c82333;
          border-color: #bd2130;
        }

        .modal-cancel:disabled,
        .modal-delete:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .medicines-table .table-header,
          .medicine-row {
            grid-template-columns: 0.5fr 1.5fr 1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr;
            font-size: 10px;
          }
        }

        @media (max-width: 1024px) {
          .dashboard-container {
            padding: 20px;
          }

          .pharmacy-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .refresh-button,
          .medicine-management-button {
            width: 100%;
            justify-content: center;
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .filter-buttons {
            justify-content: center;
          }

          .guidelines-grid {
            grid-template-columns: 1fr 1fr;
          }

          .table-header,
          .prescription-row {
            grid-template-columns: 1fr 1fr 1fr;
            font-size: 11px;
          }

          .table-header .table-cell:nth-child(4),
          .prescription-row .table-cell:nth-child(4),
          .table-header .table-cell:nth-child(6),
          .prescription-row .table-cell:nth-child(6) {
            display: none;
          }

          .medicines-table .table-header,
          .medicine-row {
            grid-template-columns: 0.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr;
          }

          .medicine-form-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .header-actions {
            flex-direction: column;
            gap: 12px;
          }

          .medicine-form-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .prescription-row {
            grid-template-columns: 1fr 1fr;
            padding: 12px 16px;
          }

          .table-header .table-cell:nth-child(3),
          .prescription-row .table-cell:nth-child(3),
          .table-header .table-cell:nth-child(5),
          .prescription-row .table-cell:nth-child(5) {
            display: none;
          }

          .medicines-table .table-header,
          .medicine-row {
            grid-template-columns: 0.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr;
            font-size: 9px;
          }

          .patient-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }

          .status-button,
          .edit-details-button,
          .close-button,
          .save-button,
          .cancel-button {
            width: 100%;
            justify-content: center;
          }

          .guidelines-grid {
            grid-template-columns: 1fr;
          }

          .medicines-header-row,
          .medicine-item {
            grid-template-columns: 1fr;
          }

          .medicine-info {
            flex-direction: column;
          }

          .modal-actions {
            flex-direction: column;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 12px;
          }

          .page-title {
            font-size: 20px;
          }

          .list-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .prescription-count {
            align-self: flex-start;
          }

          .details-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .status-display {
            align-self: flex-start;
          }

          .info-card {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }

          .prescription-box {
            padding: 16px;
            font-size: 12px;
          }

          .guidelines-card {
            padding: 16px;
          }

          .guideline-item {
            flex-direction: column;
            gap: 8px;
          }

          .table-header,
          .prescription-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .prescription-row .table-cell:nth-child(2) {
            display: none;
          }

          .view-button span {
            display: none;
          }

          .patient-name {
            font-size: 14px;
          }

          .status-button span,
          .close-button span {
            font-size: 12px;
          }

          .medicine-item {
            padding: 12px;
          }

          .medicines-total {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .modal-content {
            padding: 0;
          }

          .add-medicine-form {
            padding: 16px;
          }

          .medicines-table .table-header,
          .medicine-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 8px 12px;
          }

          .medicines-table .table-header {
            display: none;
          }

          .medicine-row {
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 12px;
          }

          .medicine-row .table-cell {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .medicine-row .table-cell:last-child {
            border-bottom: none;
          }

          .medicine-row .table-cell::before {
            content: attr(data-label);
            font-weight: 600;
            color: #666666;
            font-size: 12px;
          }

          .medicine-row .table-cell:nth-child(1)::before { content: "ID: "; }
          .medicine-row .table-cell:nth-child(2)::before { content: "Generic Name: "; }
          .medicine-row .table-cell:nth-child(3)::before { content: "Brand Name: "; }
          .medicine-row .table-cell:nth-child(4)::before { content: "Company: "; }
          .medicine-row .table-cell:nth-child(5)::before { content: "Dosage: "; }
          .medicine-row .table-cell:nth-child(6)::before { content: "Form: "; }
          .medicine-row .table-cell:nth-child(7)::before { content: "Price: "; }
          .medicine-row .table-cell:nth-child(8)::before { content: "Stock: "; }
          .medicine-row .table-cell:nth-child(9)::before { content: "Actions: "; }
        }

        @media (max-width: 360px) {
          .dashboard-container {
            padding: 10px;
          }

          .table-header,
          .prescription-row {
            grid-template-columns: 1fr;
          }

          .prescription-row .table-cell:nth-child(2) {
            display: none;
          }

          .view-button span {
            display: none;
          }

          .patient-name {
            font-size: 14px;
          }

          .status-button span,
          .close-button span {
            font-size: 12px;
          }

          .medicines-header-row div,
          .medicine-item > div {
            font-size: 11px;
          }

          .total-value {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Pharmacy;