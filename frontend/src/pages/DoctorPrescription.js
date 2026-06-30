import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Custom SVG Icons (keep all existing icons)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
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

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const RemoveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
  </svg>
);

const PriceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const DiscountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m19 5-7 7-7-7" />
    <path d="M12 13v8" />
    <path d="M5 12H3" />
    <path d="M21 12h-2" />
    <path d="M12 3v2" />
    <path d="M12 19v2" />
  </svg>
);

const WalkInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22v-7" />
    <path d="M9 8h6" />
    <path d="M6 15h12" />
    <path d="M15 5v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" />
  </svg>
);

const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 4-4 4 4" />
    <path d="M7 5v14" />
    <path d="m21 15-4 4-4-4" />
    <path d="M17 19V5" />
  </svg>
);

const DoctorPrescription = () => {
  const { user } = useAuth();
  const [slipNumber, setSlipNumber] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    prescription_text: '',
    medicines: [],
    discount_amount: 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  
  // Medicine search states
  const [medicineSearch, setMedicineSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicineForm, setMedicineForm] = useState({
    dosage_pattern: '1+0+0',
    dosage_instructions: '',
    quantity: 1,
    duration_days: 7
  });
  const [showMedicineSearch, setShowMedicineSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState('alphabetical');

  // Walk-in patient states
  const [isWalkInMode, setIsWalkInMode] = useState(false);
  const [walkInPatient, setWalkInPatient] = useState({
    full_name: '',
    age: '',
    gender: 'male',
    contact_number: ''
  });
  const [walkInSlipNumber, setWalkInSlipNumber] = useState('');

  // Medicine cache to avoid repeated API calls
  const [medicineCache, setMedicineCache] = useState({});
  const [allMedicinesCache, setAllMedicinesCache] = useState([]);

  // Complete dosage patterns
  const dosagePatterns = [
    { value: '', label: 'Select Dosage', timesPerDay: 0 },
    { value: '1+0+0', label: '1+0+0 (Morning only)', timesPerDay: 1 },
    { value: '0+1+0', label: '0+1+0 (Afternoon only)', timesPerDay: 1 },
    { value: '0+0+1', label: '0+0+1 (Night only)', timesPerDay: 1 },
    { value: '1+0+1', label: '1+0+1 (Morning & Night)', timesPerDay: 2 },
    { value: '1+1+0', label: '1+1+0 (Morning & Afternoon)', timesPerDay: 2 },
    { value: '0+1+1', label: '0+1+1 (Afternoon & Night)', timesPerDay: 2 },
    { value: '1+1+1', label: '1+1+1 (Three times daily)', timesPerDay: 3 },
    { value: '2+0+0', label: '2+0+0 (2 tablets Morning)', timesPerDay: 1 },
    { value: '0+2+0', label: '0+2+0 (2 tablets Afternoon)', timesPerDay: 1 },
    { value: '0+0+2', label: '0+0+2 (2 tablets Night)', timesPerDay: 1 },
    { value: '2+0+2', label: '2+0+2 (2 tablets Morning & Night)', timesPerDay: 2 },
    { value: '2+2+0', label: '2+2+0 (2 tablets Morning & Afternoon)', timesPerDay: 2 },
    { value: '0+2+2', label: '0+2+2 (2 tablets Afternoon & Night)', timesPerDay: 2 },
    { value: '2+2+2', label: '2+2+2 (2 tablets Three times daily)', timesPerDay: 3 },
    { value: '0.5+0+0', label: '0.5+0+0 (½ tablet Morning)', timesPerDay: 1 },
    { value: '0+0.5+0', label: '0+0.5+0 (½ tablet Afternoon)', timesPerDay: 1 },
    { value: '0+0+0.5', label: '0+0+0.5 (½ tablet Night)', timesPerDay: 1 },
    { value: '0.5+0+0.5', label: '0.5+0+0.5 (½ tablet Morning & Night)', timesPerDay: 2 },
    { value: '0.5+0.5+0', label: '0.5+0.5+0 (½ tablet Morning & Afternoon)', timesPerDay: 2 },
    { value: '0+0.5+0.5', label: '0+0.5+0.5 (½ tablet Afternoon & Night)', timesPerDay: 2 },
    { value: '0.5+0.5+0.5', label: '0.5+0.5+0.5 (½ tablet Three times daily)', timesPerDay: 3 },
    { value: '1.5+0+0', label: '1.5+0+0 (1½ tablets Morning)', timesPerDay: 1 },
    { value: '0+1.5+0', label: '0+1.5+0 (1½ tablets Afternoon)', timesPerDay: 1 },
    { value: '0+0+1.5', label: '0+0+1.5 (1½ tablets Night)', timesPerDay: 1 },
    { value: 'PRN', label: 'PRN (As needed)', timesPerDay: 0 },
    { value: 'SOS', label: 'SOS (When required)', timesPerDay: 0 },
    { value: 'BD', label: 'BD (Twice daily)', timesPerDay: 2 },
    { value: 'TDS', label: 'TDS (Three times daily)', timesPerDay: 3 },
    { value: 'QID', label: 'QID (Four times daily)', timesPerDay: 4 },
    { value: 'OD', label: 'OD (Once daily)', timesPerDay: 1 },
    { value: 'HS', label: 'HS (At bedtime)', timesPerDay: 1 },
  ];

  const getDosageInstructionsFromPattern = (pattern) => {
    if (!pattern) return '';
    const [morning, afternoon, night] = pattern.split('+').map(num => parseFloat(num));
    
    const parts = [];
    
    if (morning > 0) {
      const morningText = morning === 0.5 ? '½ tablet' : 
                         morning === 1.5 ? '1½ tablets' : 
                         morning === 1 ? '1 tablet' : 
                         `${morning} tablets`;
      parts.push(`${morningText} in the morning`);
    }
    
    if (afternoon > 0) {
      const afternoonText = afternoon === 0.5 ? '½ tablet' : 
                           afternoon === 1.5 ? '1½ tablets' : 
                           afternoon === 1 ? '1 tablet' : 
                           `${afternoon} tablets`;
      parts.push(`${afternoonText} in the afternoon`);
    }
    
    if (night > 0) {
      const nightText = night === 0.5 ? '½ tablet' : 
                       night === 1.5 ? '1½ tablets' : 
                       night === 1 ? '1 tablet' : 
                       `${night} tablets`;
      parts.push(`${nightText} at night`);
    }
    
    const timesCount = [morning, afternoon, night].filter(dose => dose > 0).length;
    
    let instruction = parts.join(' and ');
    
    if (timesCount === 3) {
      instruction += ' (three times daily)';
    } else if (timesCount === 2) {
      instruction += ' (twice daily)';
    } else if (timesCount === 1) {
      instruction += ' (once daily)';
    }
    
    return instruction;
  };

  const cancelToken = useRef(null);

  const fetchPatientData = async () => {
    if (!slipNumber.trim()) return;

    setLoading(true);
    setError('');
    setPrescriptionHistory([]);
    setSelectedPrescription(null);

    if (cancelToken.current) {
      cancelToken.current.cancel('Operation canceled due to new request.');
    }
    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        `https://localhost/backend/api/patients.php`,
        {
          params: { slip_number: slipNumber.trim() },
          cancelToken: cancelToken.current.token,
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const patient = response.data.data;
        setPatientData(patient);

        try {
          const prescriptionResponse = await axios.get(
            `https://localhost/backend/api/prescriptions.php`,
            {
              params: { 
                slip_number: slipNumber.trim(), 
                with_medicines: true 
              },
              cancelToken: cancelToken.current.token,
              timeout: 10000,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );

          if (prescriptionResponse.data.success) {
            const presArr = Array.isArray(prescriptionResponse.data.data) 
              ? prescriptionResponse.data.data 
              : [prescriptionResponse.data.data];
            
            setPrescriptionHistory(presArr);

            if (presArr.length > 0) {
              const latest = presArr[0];
              setPrescriptionData({
                prescription_text: latest.prescription_text || '',
                medicines: latest.medicines || [],
                discount_amount: latest.discount_amount || 0
              });
              setSelectedPrescription(latest);
            } else {
              setPrescriptionData({ 
                prescription_text: '',
                medicines: [],
                discount_amount: 0
              });
            }
          } else {
            setPrescriptionData({ 
              prescription_text: '',
              medicines: [],
              discount_amount: 0
            });
            setPrescriptionHistory([]);
          }
        } catch (presError) {
          console.error('Error fetching prescriptions:', presError);
          if (presError.response?.status === 404) {
            setPrescriptionHistory([]);
            setPrescriptionData({ 
              prescription_text: '',
              medicines: [],
              discount_amount: 0
            });
          } else {
            setError('Error loading prescription history');
          }
        }
      } else {
        setPatientData(null);
        setPrescriptionHistory([]);
        setError(response.data.message || 'Patient not found');
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      } else {
        console.error('Fetch error:', err);
        
        if (err.response) {
          if (err.response.status === 404) {
            setError('Patient not found');
          } else {
            setError(`Server error: ${err.response.status}`);
          }
        } else if (err.request) {
          setError('Network error: Cannot connect to server. Check if backend is running.');
        } else {
          setError('Request error: ' + err.message);
        }
        
        setPatientData(null);
        setPrescriptionHistory([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // NEW: Fetch all medicines once on component mount
  const fetchAllMedicines = async () => {
    try {
      const response = await axios.get(
        `https://localhost/backend/api/medicines.php`,
        {
          params: { all: true },
          timeout: 15000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const medicines = response.data.data || [];
        setAllMedicinesCache(medicines);
        
        // Also cache by first letter for faster prefix searches
        const cacheByLetter = {};
        medicines.forEach(medicine => {
          const firstLetter = medicine.brand_name?.charAt(0).toUpperCase() || '';
          if (firstLetter) {
            if (!cacheByLetter[firstLetter]) {
              cacheByLetter[firstLetter] = [];
            }
            cacheByLetter[firstLetter].push(medicine);
          }
        });
        setMedicineCache(cacheByLetter);
        
        console.log(`Loaded ${medicines.length} medicines into cache`);
      }
    } catch (err) {
      console.error('Error fetching all medicines:', err);
    }
  };

  // Enhanced medicine search function with smart matching
  const searchMedicines = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    
    const searchText = searchTerm.trim().toLowerCase();
    
    console.log('Searching for:', searchText);
    
    try {
      let medicines = [];
      
      // If we have all medicines cached, use that
      if (allMedicinesCache.length > 0) {
        medicines = allMedicinesCache;
        console.log('Using cached all medicines:', medicines.length);
      } else {
        // Fetch all medicines if not cached
        await fetchAllMedicines();
        medicines = allMedicinesCache;
      }
      
      if (medicines.length === 0) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      
      // Apply smart search logic
      const filteredResults = medicines.filter(medicine => {
        const brandName = medicine.brand_name?.toLowerCase() || '';
        const genericName = medicine.generic_name?.toLowerCase() || '';
        
        // Clean the search term
        const cleanSearch = searchText.trim();
        
        // Case 1: If search is a single letter (like "a", "b", "c")
        if (cleanSearch.length === 1) {
          // Show all medicines starting with that letter
          return brandName.startsWith(cleanSearch) || 
                 genericName.startsWith(cleanSearch);
        }
        
        // Case 2: If search is 2-3 characters (like "ar", "cip")
        if (cleanSearch.length <= 3) {
          // Show medicines starting with these characters
          return brandName.startsWith(cleanSearch) || 
                 genericName.startsWith(cleanSearch);
        }
        
        // Case 3: If search is 4+ characters
        if (cleanSearch.length >= 4) {
          // Check for exact match first
          if (brandName === cleanSearch || genericName === cleanSearch) {
            return true;
          }
          
          // Check if it's a complete word (looks like a medicine name)
          // This could be "Aripiprazole", "Ciprofloxacin", etc.
          const words = cleanSearch.split(' ');
          
          // If it's a single word and looks like a medicine name (no spaces, proper casing expected)
          if (words.length === 1) {
            // Check if it matches the beginning of any medicine name
            return brandName.startsWith(cleanSearch) || 
                   genericName.startsWith(cleanSearch);
          }
          
          // For multi-word searches, use contains
          return brandName.includes(cleanSearch) || 
                 genericName.includes(cleanSearch);
        }
        
        // Default: use contains for everything else
        return brandName.includes(cleanSearch) || 
               genericName.includes(cleanSearch);
      });

      console.log(`Filtered to ${filteredResults.length} results for search: "${searchText}"`);

      // Sort the filtered results
      const sortedResults = sortMedicines(filteredResults, sortOrder);
      
      setSearchResults(sortedResults);
      
    } catch (err) {
      console.error('Medicine search error:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Sort medicines based on selected order
  const sortMedicines = (medicines, order) => {
    if (!medicines || medicines.length === 0) return [];
    
    const sorted = [...medicines];
    
    switch (order) {
      case 'alphabetical':
        sorted.sort((a, b) => {
          const brandA = a.brand_name?.toLowerCase() || '';
          const brandB = b.brand_name?.toLowerCase() || '';
          return brandA.localeCompare(brandB);
        });
        break;
        
      case 'price_low':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceA - priceB;
        });
        break;
        
      case 'price_high':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceB - priceA;
        });
        break;
    }
    
    return sorted;
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    if (searchResults.length > 0) {
      const sorted = sortMedicines(searchResults, order);
      setSearchResults(sorted);
    }
  };

  const handleAddMedicine = () => {
    if (!selectedMedicine) return;

    const dosageInstructions = medicineForm.dosage_instructions || getDosageInstructionsFromPattern(medicineForm.dosage_pattern);
    
    const unitPrice = parseFloat(selectedMedicine.price);
    const quantity = parseInt(medicineForm.quantity);
    
    const totalPrice = unitPrice * quantity;
    
    const newMedicine = {
      id: selectedMedicine.id,
      generic_name: selectedMedicine.generic_name,
      brand_name: selectedMedicine.brand_name,
      company_name: selectedMedicine.company_name,
      dosage: selectedMedicine.dosage,
      form: selectedMedicine.form,
      price: unitPrice,
      dosage_pattern: medicineForm.dosage_pattern,
      dosage_instructions: dosageInstructions,
      quantity: quantity,
      duration_days: parseInt(medicineForm.duration_days),
      total_price: totalPrice
    };

    setPrescriptionData(prev => ({
      ...prev,
      medicines: [...prev.medicines, newMedicine]
    }));

    // Reset medicine selection and close dropdown
    setSelectedMedicine(null);
    setMedicineForm({
      dosage_pattern: '1+0+0',
      dosage_instructions: '',
      quantity: 1,
      duration_days: 7
    });
    setMedicineSearch('');
    setSearchResults([]);
    setShowMedicineSearch(false);
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setPrescriptionData(prev => ({
      ...prev,
      discount_amount: Math.max(0, discount)
    }));
  };

  const generateWalkInSlipNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    return `WALKIN-${year}${month}${day}-${random}`;
  };

  const handleWalkInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!walkInPatient.full_name.trim()) {
      setError('Patient name is required');
      setLoading(false);
      return;
    }

    const generatedSlip = generateWalkInSlipNumber();
    setWalkInSlipNumber(generatedSlip);

    const payload = {
      slip_number: generatedSlip,
      doctor_id: user?.id ?? null,
      prescription_text: prescriptionData.prescription_text,
      discount_amount: prescriptionData.discount_amount,
      is_walk_in: true,
      patient_info: walkInPatient,
      medicines: prescriptionData.medicines.map(medicine => ({
        id: medicine.id,
        quantity: medicine.quantity,
        dosage_instructions: medicine.dosage_instructions,
        duration_days: medicine.duration_days
      }))
    };

    try {
      const response = await axios.post(
        'https://localhost/backend/api/prescriptions.php',
        payload,
        { 
          headers: { 'Content-Type': 'application/json' }, 
          timeout: 10000 
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setPatientData({
          ...walkInPatient,
          slip_number: generatedSlip
        });
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setError(response.data?.message || 'Failed to save walk-in prescription');
      }
    } catch (err) {
      console.error('Submit error:', err);
      if (err.response) {
        setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError('Request error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      slip_number: slipNumber,
      doctor_id: user?.id ?? null,
      prescription_text: prescriptionData.prescription_text,
      discount_amount: prescriptionData.discount_amount,
      medicines: prescriptionData.medicines.map(medicine => ({
        id: medicine.id,
        quantity: medicine.quantity,
        dosage_instructions: medicine.dosage_instructions,
        duration_days: medicine.duration_days
      }))
    };

    try {
      const response = await axios.post(
        'https://localhost/backend/api/prescriptions.php',
        payload,
        { 
          headers: { 'Content-Type': 'application/json' }, 
          timeout: 10000 
        }
      );

      if (response.data.success) {
        setSuccess(true);
        fetchPatientData();
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setError(response.data?.message || 'Failed to save prescription');
      }
    } catch (err) {
      console.error('Submit error:', err);
      if (err.response) {
        setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError('Request error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setPrescriptionData({
      prescription_text: prescription.prescription_text || '',
      medicines: prescription.medicines || [],
      discount_amount: prescription.discount_amount || 0
    });
  };

  const handlePrint = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
      setShowPrintPreview(false);
    }, 100);
  };

  const handleReset = () => {
    setSlipNumber('');
    setPatientData(null);
    setPrescriptionData({ prescription_text: '', medicines: [], discount_amount: 0 });
    setPrescriptionHistory([]);
    setSelectedPrescription(null);
    setError('');
    setMedicineSearch('');
    setSearchResults([]);
    setSelectedMedicine(null);
    setShowMedicineSearch(false);
    setIsWalkInMode(false);
    setWalkInPatient({
      full_name: '',
      age: '',
      gender: 'male',
      contact_number: ''
    });
    setWalkInSlipNumber('');
  };

  const calculateSubtotal = () => {
    return prescriptionData.medicines.reduce((total, medicine) => {
      return total + (medicine.price * medicine.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = Number(prescriptionData.discount_amount) || 0;
    return Math.max(0, subtotal - discount);
  };

  const getDiscountAmount = () => {
    const discount = Number(prescriptionData.discount_amount);
    return isNaN(discount) ? 0 : discount;
  };

  const canShowPrintButton = () => {
    if (isWalkInMode) {
      return walkInPatient.full_name.trim() && prescriptionData.medicines.length > 0;
    } else {
      return patientData && prescriptionData.medicines.length > 0;
    }
  };

  const getPatientName = () => {
    if (isWalkInMode) {
      return walkInPatient.full_name;
    } else if (patientData) {
      return patientData.full_name;
    }
    return '';
  };

  const getCurrentSlipNumber = () => {
    if (isWalkInMode) {
      return walkInSlipNumber;
    } else {
      return slipNumber;
    }
  };

  const handleMedicineSearchChange = (e) => {
    const value = e.target.value;
    setMedicineSearch(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      setSelectedMedicine(null);
    }
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleCancelMedicineSelection = () => {
    setSelectedMedicine(null);
  };

  // NEW: Smart search helper function
  const smartSearch = (searchText, medicines) => {
    const cleanSearch = searchText.trim().toLowerCase();
    
    return medicines.filter(medicine => {
      const brandName = medicine.brand_name?.toLowerCase() || '';
      const genericName = medicine.generic_name?.toLowerCase() || '';
      
      // For single character searches: show all medicines starting with that letter
      if (cleanSearch.length === 1) {
        return brandName.startsWith(cleanSearch) || 
               genericName.startsWith(cleanSearch);
      }
      
      // For 2-3 character searches: show medicines starting with these characters
      if (cleanSearch.length <= 3) {
        return brandName.startsWith(cleanSearch) || 
               genericName.startsWith(cleanSearch);
      }
      
      // For 4+ character searches: check for exact match or starts with
      if (cleanSearch.length >= 4) {
        // First check for exact match
        if (brandName === cleanSearch || genericName === cleanSearch) {
          return true;
        }
        
        // Then check if it starts with the search term
        if (brandName.startsWith(cleanSearch) || genericName.startsWith(cleanSearch)) {
          return true;
        }
        
        // If it's a complete word that looks like a medicine name, don't show partial matches
        // This prevents "Aripiprazole" from showing when searching "Arip"
        // Only show if it's the exact beginning
        return false;
      }
      
      // Default fallback
      return brandName.includes(cleanSearch) || genericName.includes(cleanSearch);
    });
  };

  useEffect(() => {
    if (medicineForm.dosage_pattern) {
      const instructions = getDosageInstructionsFromPattern(medicineForm.dosage_pattern);
      setMedicineForm(prev => ({
        ...prev,
        dosage_instructions: instructions
      }));
    }
  }, [medicineForm.dosage_pattern]);

  // Fetch all medicines on component mount
  useEffect(() => {
    fetchAllMedicines();
  }, []);

  // Enhanced search with smart matching
  useEffect(() => {
    if (!medicineSearch.trim()) {
      setSearchResults([]);
      setSelectedMedicine(null);
      return;
    }

    const timer = setTimeout(() => {
      searchMedicines(medicineSearch);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cancelToken.current) {
        cancelToken.current.cancel('Search cancelled');
      }
    };
  }, [medicineSearch]);

  useEffect(() => {
    if (!slipNumber.trim()) return;

    const timer = setTimeout(() => {
      fetchPatientData();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (cancelToken.current) cancelToken.current.cancel();
    };
  }, [slipNumber]);

  const printStyles = `
    @media print {
      body * {
        visibility: hidden;
      }
      .print-preview, .print-preview * {
        visibility: visible;
      }
      .print-preview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 20px;
        background: white !important;
        font-family: 'Courier New', monospace !important;
      }
      .no-print {
        display: none !important;
      }
    }
  `;

  return (
    <div className="prescription-page">
      <style>{printStyles}</style>
      <Navbar />
      
      <div className="dashboard-container">
        <div className="prescription-wrapper">
          {/* Header */}
          <div className="prescription-header">
            <div className="header-content">
              <h1 className="page-title">Medical Prescription</h1>
              <p className="page-subtitle">
                Access patient details and write prescriptions using slip number or create walk-in prescriptions
              </p>
            </div>
            
            {canShowPrintButton() && (
              <div className="total-price-display">
                <PriceIcon />
                <div className="price-content">
                  <span className="price-label">Subtotal:</span>
                  <span className="price-value">Rs. {calculateSubtotal().toFixed(2)}</span>
                  <span className="price-label discount-label">
                    Discount: -Rs. {getDiscountAmount().toFixed(2)}
                  </span>
                  <span className="price-label total-label">Total:</span>
                  <span className="price-value total-value">Rs. {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
            
            {(patientData || (isWalkInMode && walkInPatient.full_name)) && (
              <div className="header-actions">
                {!isWalkInMode && patientData && (
                  <button
                    className="action-button"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <HistoryIcon />
                    <span>{showHistory ? 'Hide History' : 'View History'}</span>
                  </button>
                )}
                {canShowPrintButton() && (
                  <button className="action-button" onClick={handlePrint}>
                    <PrintIcon />
                    <span>Print</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="success-card no-print">
              <div className="success-icon">
                <CheckIcon />
              </div>
              <div>
                <h3>Prescription Saved Successfully!</h3>
                <p>Prescription has been sent to pharmacy for processing.</p>
              </div>
            </div>
          )}

          {/* Mode Selection */}
          <div className="mode-selection no-print">
            <div className="mode-options">
              <button
                className={`mode-button ${!isWalkInMode ? 'active' : ''}`}
                onClick={() => setIsWalkInMode(false)}
              >
                <UserIcon />
                <span>Regular Patient</span>
              </button>
              <button
                className={`mode-button ${isWalkInMode ? 'active' : ''}`}
                onClick={() => setIsWalkInMode(true)}
              >
                <WalkInIcon />
                <span>Walk-in Patient</span>
              </button>
            </div>
          </div>

          {!isWalkInMode ? (
            /* Regular Patient Search Section */
            <div className="search-card no-print">
              <div className="search-header">
                <h3>Patient Lookup</h3>
                <p>Enter slip number to retrieve patient information</p>
              </div>
              
              <div className="search-container">
                <div className="search-input-group">
                  <SearchIcon />
                  <input
                    type="text"
                    className="search-input"
                    value={slipNumber}
                    onChange={(e) => setSlipNumber(e.target.value)}
                    placeholder="Enter patient slip number"
                  />
                </div>
                
                {patientData && (
                  <button className="clear-button" onClick={handleReset}>
                    <CloseIcon />
                    <span>Clear</span>
                  </button>
                )}
              </div>
              
              {loading && (
                <div className="loading-state">
                  <div className="spinner">
                    <SpinnerIcon />
                  </div>
                  <p>Searching patient...</p>
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          ) : (
            /* Walk-in Patient Form */
            <div className="walkin-form-card no-print">
              <div className="walkin-header">
                <h3>Walk-in Patient Details</h3>
                <p>Enter patient information for walk-in medicine purchase</p>
              </div>
              
              <div className="walkin-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={walkInPatient.full_name}
                      onChange={(e) => setWalkInPatient({
                        ...walkInPatient,
                        full_name: e.target.value
                      })}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-input"
                      value={walkInPatient.age}
                      onChange={(e) => setWalkInPatient({
                        ...walkInPatient,
                        age: e.target.value
                      })}
                      placeholder="Age in years"
                      min="0"
                      max="120"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-input"
                      value={walkInPatient.gender}
                      onChange={(e) => setWalkInPatient({
                        ...walkInPatient,
                        gender: e.target.value
                      })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={walkInPatient.contact_number}
                      onChange={(e) => setWalkInPatient({
                        ...walkInPatient,
                        contact_number: e.target.value
                      })}
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                </div>
                
                {walkInSlipNumber && (
                  <div className="generated-slip">
                    <div className="slip-info">
                      <strong>Generated Slip Number:</strong>
                      <span className="slip-number-badge">{walkInSlipNumber}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prescription History */}
          {!isWalkInMode && showHistory && prescriptionHistory.length > 0 && (
            <div className="history-card no-print">
              <div className="history-header">
                <h3>Prescription History</h3>
                <span className="history-count">{prescriptionHistory.length} records</span>
              </div>
              
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Instructions</th>
                      <th>Medicines</th>
                      <th>Total Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionHistory.map((prescription, index) => (
                      <tr key={index}>
                        <td>
                          <div className="history-date">
                            <CalendarIcon />
                            <span>{new Date(prescription.created_at).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td>
                          <div className="history-instructions">
                            {prescription.prescription_text?.substring(0, 60) || 'No instructions'}
                            {prescription.prescription_text?.length > 60 && '...'}
                          </div>
                        </td>
                        <td>
                          <div className="history-medicines">
                            {prescription.medicines?.length || 0} medicines
                          </div>
                        </td>
                        <td>
                          <div className="history-price">
                            Rs. {prescription.total_price || 0}
                          </div>
                        </td>
                        <td>
                          <div className="history-actions">
                            <button
                              className="view-button"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              View
                            </button>
                            <button
                              className="print-button"
                              onClick={() => {
                                setSelectedPrescription(prescription);
                                handlePrint();
                              }}
                            >
                              Print
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Print Preview */}
          {showPrintPreview && canShowPrintButton() && (
            <div className="print-preview">
              <div className="thermal-print" style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                lineHeight: "1.1",
                maxWidth: "280px",
                margin: "0 auto"
              }}>
                
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <div style={{ fontWeight: "bold" }}>YASIN PSYCHIATRIC HOSPITAL</div>
                  <div>Karachi</div>
                  <div>Ph: 0330-7997999</div>
                  <div>--------------------------------</div>
                </div>

                <div style={{ textAlign: "center", fontWeight: "bold", margin: "4px 0" }}>
                  PRESCRIPTION
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                  <div><strong>Slip:</strong> {getCurrentSlipNumber()}</div>
                </div>

                <div>--------------------------------</div>

                <div><strong>Patient:</strong> {getPatientName()}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>Age/G:</strong> {isWalkInMode ? (walkInPatient.age ? `${walkInPatient.age}y` : 'N/A') : `${patientData.age}y`} / {isWalkInMode ? walkInPatient.gender : patientData.gender}</div>
                  <div><strong>Ph:</strong> {isWalkInMode ? (walkInPatient.contact_number || 'N/A') : (patientData.contact_number || 'N/A')}</div>
                </div>

                {isWalkInMode && (
                  <div><strong>Type:</strong> Walk-in Patient</div>
                )}

                <div>--------------------------------</div>

                <div><strong>Dr:</strong> {user?.full_name || 'Dr. Unknown'}</div>

                <div>--------------------------------</div>

                <div style={{ fontWeight: "bold", textAlign: "center", margin: "2px 0" }}>
                  MEDICINES
                </div>
                
                {prescriptionData.medicines?.map((m, i) => (
                  <div key={i} style={{ marginBottom: "6px" }}>
                    <div><strong>{i+1}. {m.brand_name}</strong></div>
                    <div style={{ marginLeft: "8px" }}>({m.generic_name})</div>
                    <div style={{ marginLeft: "8px" }}>
                      Dose: {m.dosage} | Qty: {m.quantity}
                    </div>
                    <div style={{ marginLeft: "8px" }}>
                      {m.dosage_instructions || getDosageInstructionsFromPattern(m.dosage_pattern || '1+0+0')}
                    </div>
                    <div style={{ marginLeft: "8px", fontSize: "10px" }}>
                      Price: Rs. {m.price} × {m.quantity} = Rs. {m.total_price?.toFixed(2)}
                    </div>
                  </div>
                ))}

                <div>--------------------------------</div>

                <div style={{ fontSize: "11px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal:</span>
                    <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#dc3545" }}>
                      <span>Discount:</span>
                      <span>-Rs. {getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                    <span>GRAND TOTAL:</span>
                    <span>Rs. {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div>--------------------------------</div>

                {prescriptionData.prescription_text && (
                  <>
                    <div><strong>Notes:</strong></div>
                    <div style={{ marginLeft: "8px" }}>{prescriptionData.prescription_text}</div>
                    <div>--------------------------------</div>
                  </>
                )}

                <div style={{ textAlign: "center", fontSize: "10px", marginTop: "8px" }}>
                  <div>Follow instructions carefully.</div>
                  <div>Complete prescribed course.</div>
                  <div>No refunds available.</div>
                  <div>Exchange within 7 days.</div>

                  <div>Computer Generated Prescription</div>
                  <div style={{ marginTop: "2px" }}>
                    Yasin Hospital {new Date().getFullYear()}
                  </div>
                  <div style={{ fontWeight: "bold", marginTop: "4px" }}>
                    Powered by Ondule Agency
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Form */}
          {(patientData || isWalkInMode) && (
            <div className="form-card no-print">
              <div className="form-header">
                <h3>{isWalkInMode ? 'Walk-in Patient Information' : 'Patient Information'}</h3>
                <div className="slip-number">
                  {isWalkInMode ? 
                    (walkInSlipNumber || 'Will be generated on save') : 
                    `Slip: ${slipNumber}`
                  }
                </div>
              </div>
              
              {!isWalkInMode ? (
                <div className="patient-grid">
                  <div className="patient-info-card">
                    <UserIcon />
                    <div>
                      <div className="info-label">Patient Name</div>
                      <div className="info-value">{patientData.full_name}</div>
                    </div>
                  </div>
                  
                  <div className="patient-info-card">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <div className="info-label">Age & Gender</div>
                      <div className="info-value">{patientData.age} years, {patientData.gender}</div>
                    </div>
                  </div>
                  
                  <div className="patient-info-card">
                    <PhoneIcon />
                    <div>
                      <div className="info-label">Contact Number</div>
                      <div className="info-value">{patientData.contact_number}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="walkin-patient-display">
                  <div className="patient-grid">
                    <div className="patient-info-card">
                      <UserIcon />
                      <div>
                        <div className="info-label">Patient Name</div>
                        <div className="info-value">{walkInPatient.full_name || 'Not provided'}</div>
                      </div>
                    </div>
                    
                    <div className="patient-info-card">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div>
                        <div className="info-label">Age & Gender</div>
                        <div className="info-value">
                          {walkInPatient.age ? `${walkInPatient.age} years` : 'Not specified'}, {walkInPatient.gender}
                        </div>
                      </div>
                    </div>
                    
                    <div className="patient-info-card">
                      <PhoneIcon />
                      <div>
                        <div className="info-label">Contact Number</div>
                        <div className="info-value">{walkInPatient.contact_number || 'Not provided'}</div>
                      </div>
                    </div>
                    
                    <div className="patient-info-card">
                      <WalkInIcon />
                      <div>
                        <div className="info-label">Patient Type</div>
                        <div className="info-value">Walk-in Patient</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Medicine Search Section */}
              <div className="medicine-search-section">
                <div className="section-header">
                  <h4>Prescribe Medicines</h4>
                  <button
                    type="button"
                    className="add-medicine-button"
                    onClick={() => setShowMedicineSearch(!showMedicineSearch)}
                  >
                    <AddIcon />
                    <span>Add Medicine</span>
                  </button>
                </div>

                {/* Medicine Search Modal */}
                {showMedicineSearch && (
                  <div className="medicine-search-modal">
                    <div className="search-header">
                      <div className="search-input-group">
                        <SearchIcon />
                        <input
                          type="text"
                          className="search-input"
                          value={medicineSearch}
                          onChange={handleMedicineSearchChange}
                          placeholder="Search medicine (e.g., A, Ar, Aripiprazole)..."
                          autoFocus
                        />
                        {searchLoading && (
                          <div className="search-loading">
                            <SpinnerIcon />
                          </div>
                        )}
                      </div>
                      <button
                        className="close-search"
                        onClick={() => {
                          setShowMedicineSearch(false);
                          setMedicineSearch('');
                          setSearchResults([]);
                          setSelectedMedicine(null);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    {/* Search Info and Sort Options */}
                    <div className="search-controls">
                      <div className="search-info">
                        <small>Smart search: Shows medicines starting with letters</small>
                        {searchResults.length > 0 && (
                          <small className="results-count">
                            Found {searchResults.length} medicine(s)
                          </small>
                        )}
                      </div>
                      
                      {searchResults.length > 0 && (
                        <div className="sort-options">
                          <small>Sort by:</small>
                          <button
                            className={`sort-button ${sortOrder === 'alphabetical' ? 'active' : ''}`}
                            onClick={() => handleSortChange('alphabetical')}
                          >
                            <SortIcon />
                            <span>A-Z</span>
                          </button>
                          <button
                            className={`sort-button ${sortOrder === 'price_low' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price_low')}
                          >
                            <span>Price ↑</span>
                          </button>
                          <button
                            className={`sort-button ${sortOrder === 'price_high' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price_high')}
                          >
                            <span>Price ↓</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Search Results */}
                    {!selectedMedicine && searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((medicine) => (
                          <div
                            key={medicine.id}
                            className={`medicine-result ${selectedMedicine?.id === medicine.id ? 'selected' : ''}`}
                            onClick={() => handleMedicineSelect(medicine)}
                          >
                            <div className="medicine-info">
                              <div className="medicine-name-row">
                                <div className="medicine-name-container">
                                  <strong className="medicine-brand">{medicine.brand_name}</strong>
                                  <span className="medicine-generic">{medicine.generic_name}</span>
                                </div>
                                <span className="medicine-price">Rs. {medicine.price}</span>
                              </div>
                              <div className="medicine-details">
                                <span className="company-name">{medicine.company_name}</span>
                                <span className="dosage">{medicine.dosage}</span>
                                <span className="form">{medicine.form}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* No Results Message */}
                    {!selectedMedicine && medicineSearch.trim() && !searchLoading && searchResults.length === 0 && (
                      <div className="no-results">
                        <p>No medicines found for "{medicineSearch}"</p>
                        <p className="no-results-hint">Try searching with a different letter or check spelling</p>
                      </div>
                    )}

                    {/* Medicine Form */}
                    {selectedMedicine && (
                      <div className="medicine-form">
                        <h5>Add Dosage Instructions</h5>
                        
                        <div className="selected-medicine-preview">
                          <div className="preview-header">
                            <strong>{selectedMedicine.brand_name}</strong>
                            <span className="preview-price">Rs. {selectedMedicine.price}</span>
                          </div>
                          <div className="preview-details">
                            <span>{selectedMedicine.generic_name}</span>
                            <span>{selectedMedicine.company_name}</span>
                            <span>{selectedMedicine.dosage}</span>
                            <span>{selectedMedicine.form}</span>
                          </div>
                        </div>
                        
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Dosage Pattern *</label>
                            <select
                              className="form-input dosage-pattern-select"
                              value={medicineForm.dosage_pattern}
                              onChange={(e) => setMedicineForm({
                                ...medicineForm,
                                dosage_pattern: e.target.value
                              })}
                            >
                              {dosagePatterns.map((pattern) => (
                                <option key={pattern.value} value={pattern.value}>
                                  {pattern.label}
                                </option>
                              ))}
                            </select>
                            <div className="dosage-preview">
                              {getDosageInstructionsFromPattern(medicineForm.dosage_pattern)}
                            </div>
                          </div>
                          
                          <div className="form-group">
                            <label>Dosage Instructions</label>
                            <input
                              type="text"
                              className="form-input"
                              value={medicineForm.dosage_instructions}
                              onChange={(e) => setMedicineForm({
                                ...medicineForm,
                                dosage_instructions: e.target.value
                              })}
                              placeholder="e.g., 1 tablet twice daily after meals"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label>Quantity</label>
                            <input
                              type="number"
                              className="form-input"
                              value={medicineForm.quantity}
                              onChange={(e) => {
                                const qty = parseInt(e.target.value) || 1;
                                setMedicineForm({
                                  ...medicineForm,
                                  quantity: qty
                                });
                              }}
                              min="1"
                              max="100"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label>Duration (days)</label>
                            <input
                              type="number"
                              className="form-input"
                              value={medicineForm.duration_days}
                              onChange={(e) => setMedicineForm({
                                ...medicineForm,
                                duration_days: parseInt(e.target.value) || 7
                              })}
                              min="1"
                              max="365"
                            />
                          </div>
                          
                          {/* Price Preview */}
                          <div className="form-group price-preview-container">
                            <label>Price Calculation</label>
                            <div className="price-preview">
                              <div className="price-row">
                                <span>Unit Price:</span>
                                <span>Rs. {selectedMedicine.price}</span>
                              </div>
                              <div className="price-row">
                                <span>Quantity:</span>
                                <span>{medicineForm.quantity}</span>
                              </div>
                              <div className="price-row total-row">
                                <span>Total:</span>
                                <strong>Rs. {(selectedMedicine.price * medicineForm.quantity).toFixed(2)}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-actions">
                          <button
                            className="add-button"
                            onClick={handleAddMedicine}
                          >
                            Add to Prescription
                          </button>
                          <button
                            className="cancel-button"
                            onClick={handleCancelMedicineSelection}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Selected Medicines List */}
                {prescriptionData.medicines.length > 0 && (
                  <div className="selected-medicines">
                    <div className="medicines-header">
                      <h5>Selected Medicines ({prescriptionData.medicines.length})</h5>
                      <div className="total-small">
                        Subtotal: Rs. {calculateSubtotal().toFixed(2)} | 
                        Total: Rs. {calculateTotal().toFixed(2)}
                      </div>
                    </div>
                    <div className="medicines-list">
                      {prescriptionData.medicines.map((medicine, index) => (
                        <div key={index} className="medicine-item">
                          <div className="medicine-details">
                            <div className="medicine-main">
                              <strong>{medicine.brand_name}</strong>
                              <span className="medicine-quantity">×{medicine.quantity}</span>
                              <span className="dosage-pattern-badge">
                                {medicine.dosage_pattern || '1+0+0'}
                              </span>
                            </div>
                            <div className="medicine-secondary">
                              <span>{medicine.generic_name}</span>
                              <span>{medicine.company_name}</span>
                              <span>{medicine.dosage}</span>
                              <span>{medicine.form}</span>
                            </div>
                            <div className="medicine-instructions">
                              {medicine.dosage_instructions || getDosageInstructionsFromPattern(medicine.dosage_pattern || '1+0+0')} for {medicine.duration_days} days
                            </div>
                            <div className="medicine-price-breakdown">
                              <span className="price-unit">Rs. {medicine.price} × {medicine.quantity} = Rs. {medicine.total_price?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="medicine-price-section">
                            <div className="medicine-total">
                              Rs. {medicine.total_price?.toFixed(2)}
                            </div>
                            <button
                              className="remove-button"
                              onClick={() => handleRemoveMedicine(index)}
                            >
                              <RemoveIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Section */}
              {prescriptionData.medicines.length > 0 && (
                <div className="discount-section">
                  <div className="section-header">
                    <h4>Apply Discount</h4>
                  </div>
                  <div className="discount-form">
                    <div className="form-group">
                      <label>Discount Amount (Rs.)</label>
                      <div className="discount-input-group">
                        <input
                          type="number"
                          className="form-input"
                          value={prescriptionData.discount_amount}
                          onChange={handleDiscountChange}
                          min="0"
                          max={calculateSubtotal()}
                          step="1"
                          placeholder="Enter discount amount"
                        />
                        <span className="currency-symbol">Rs.</span>
                      </div>
                      <div className="discount-summary">
                        <div className="summary-row">
                          <span>Subtotal:</span>
                          <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Discount:</span>
                          <span className="discount-amount">- Rs. {getDiscountAmount().toFixed(2)}</span>
                        </div>
                        <div className="summary-row total-row">
                          <span>Total:</span>
                          <strong>Rs. {calculateTotal().toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={isWalkInMode ? handleWalkInSubmit : handleSubmit} className="prescription-form">
                <div className="form-group">
                  <label className="form-label">Additional Instructions</label>
                  <textarea
                    className="form-input prescription-input"
                    value={prescriptionData.prescription_text}
                    onChange={(e) => setPrescriptionData({
                      ...prescriptionData,
                      prescription_text: e.target.value
                    })}
                    placeholder="Enter additional instructions for the patient..."
                    rows="5"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || prescriptionData.medicines.length === 0 || (isWalkInMode && !walkInPatient.full_name.trim())}
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        <span>Saving...</span>
                      </>
                    ) : `${isWalkInMode ? 'Save Walk-in' : 'Save'} Prescription (${prescriptionData.medicines.length} medicines) - Rs. ${calculateTotal().toFixed(2)}`}
                  </button>
                  <button
                    type="button"
                    className="clear-button"
                    onClick={handleReset}
                  >
                    <CloseIcon />
                    <span>Clear All</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Guidelines */}
          <div className="guidelines-card no-print">
            <h3>Prescription Guidelines</h3>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <div className="guideline-number">01</div>
                <div>
                  <strong>Verify Patient Identity</strong>
                  <p>Always confirm patient identity using slip number or personal details.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">02</div>
                <div>
                  <strong>Complete Information</strong>
                  <p>Include medicine names, dosage, frequency, and duration clearly.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">03</div>
                <div>
                  <strong>Safety Checks</strong>
                  <p>Verify for drug allergies and potential interactions before prescribing.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">04</div>
                <div>
                  <strong>Clear Instructions</strong>
                  <p>Provide specific instructions for administration and follow-up.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .prescription-page {
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

        .prescription-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header */
        .prescription-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e5e5;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-content {
          flex: 1;
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

        .total-price-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          min-width: 250px;
        }
        
        .price-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
        }
        
        .price-label {
          font-size: 12px;
          color: #666666;
        }
        
        .price-value {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
        }
        
        .discount-label {
          color: #dc3545;
          font-size: 11px;
        }
        
        .total-label {
          font-weight: 600;
          margin-top: 4px;
        }
        
        .total-value {
          color: #000;
          font-size: 18px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-button {
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

        .action-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        /* Success Card */
        .success-card {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          width: 40px;
          height: 40px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 4px 0;
        }

        .success-card p {
          font-size: 14px;
          color: #666666;
          margin: 0;
        }

        /* Mode Selection */
        .mode-selection {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .mode-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .mode-button {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: #f8f9fa;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-button:hover {
          border-color: #000000;
          color: #000000;
        }

        .mode-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .mode-button.active:hover {
          background: #333333;
        }

        /* Search Card */
        .search-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .search-header {
          margin-bottom: 24px;
        }

        .search-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 8px 0;
        }

        .search-header p {
          color: #666666;
          margin: 0;
          font-size: 14px;
        }

        .search-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .search-input-group {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .search-input-group:focus-within {
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          color: #000000;
          background: transparent;
        }

        .search-input::placeholder {
          color: #999999;
        }

        .clear-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .clear-button:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        /* Walk-in Form Card */
        .walkin-form-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
          border-left: 4px solid #000000;
        }

        .walkin-header {
          margin-bottom: 24px;
        }

        .walkin-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 8px 0;
        }

        .walkin-header p {
          color: #666666;
          margin: 0;
          font-size: 14px;
        }

        .walkin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .walkin-form .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .generated-slip {
          margin-top: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 8px;
          border: 1px dashed #e5e5e5;
        }

        .slip-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .slip-number-badge {
          background: #000000;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #666666;
          font-size: 14px;
          margin: 0;
        }

        .error-message {
          padding: 12px 16px;
          background: rgba(220, 53, 69, 0.05);
          border: 1px solid rgba(220, 53, 69, 0.2);
          border-radius: 8px;
          color: #dc3545;
          font-size: 14px;
          margin-top: 20px;
        }

        /* History Card */
        .history-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .history-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .history-count {
          font-size: 12px;
          color: #666666;
          background: #f5f5f5;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .history-table-container {
          overflow-x: auto;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table th {
          text-align: left;
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e5e5e5;
          background: #fafafa;
        }

        .history-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f0f0f0;
        }

        .history-table tr:last-child td {
          border-bottom: none;
        }

        .history-table tr:hover {
          background: #fafafa;
        }

        .history-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #000000;
        }

        .history-instructions {
          font-size: 14px;
          color: #000000;
          max-width: 300px;
        }

        .history-medicines {
          font-size: 14px;
          color: #000000;
          font-weight: 500;
        }

        .history-price {
          font-size: 14px;
          color: #000000;
          font-weight: 600;
        }

        .history-actions {
          display: flex;
          gap: 8px;
        }

        .view-button, .print-button {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
          background: #ffffff;
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        .print-button {
          background: #000000;
          color: #ffffff;
          border-color: #000000;
        }

        .print-button:hover {
          background: #333333;
        }

        /* Print Preview */
        .print-preview {
          display: none;
        }

        @media print {
          .print-preview {
            display: block;
          }
        }

        /* Main Form */
        .form-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .form-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .slip-number {
          font-size: 14px;
          color: #666666;
          background: #f5f5f5;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .patient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .patient-info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .patient-info-card:hover {
          border-color: #000000;
          background: #f5f5f5;
        }

        .info-label {
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }

        .walkin-patient-display {
          margin-bottom: 40px;
        }

        /* Medicine Search Section */
        .medicine-search-section {
          margin-bottom: 32px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .section-header h4 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }
        
        .add-medicine-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .add-medicine-button:hover {
          background: #333333;
        }
        
        /* Medicine Search Modal */
        .medicine-search-modal {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          margin-bottom: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        .search-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid #e5e5e5;
          background: #fafafa;
        }
        
        .search-input-group {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          position: relative;
        }
        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #000000;
          background: transparent;
        }
        
        .search-loading {
          animation: spin 1s linear infinite;
          position: absolute;
          right: 40px;
          color: #666;
        }
        
        .close-search {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          color: #666666;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-search:hover {
          background: #f5f5f5;
        }
        
        /* Search Controls */
        .search-controls {
          padding: 12px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .search-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .search-info small {
          color: #666;
          font-size: 11px;
        }
        
        .results-count {
          color: #000;
          font-weight: 500;
        }
        
        /* Sort Options */
        .sort-options {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .sort-options small {
          font-size: 11px;
          color: #666;
        }
        
        .sort-button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          font-size: 11px;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .sort-button:hover {
          border-color: #000000;
          color: #000000;
        }
        
        .sort-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }
        
        /* Search Results */
        .search-results {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .medicine-result {
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .medicine-result:hover {
          background: #fafafa;
        }
        
        .medicine-result.selected {
          background: rgba(0, 0, 0, 0.05);
          border-left: 3px solid #000000;
        }
        
        .medicine-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .medicine-name-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .medicine-name-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .medicine-brand {
          font-size: 14px;
          color: #000;
        }
        
        .medicine-generic {
          font-size: 12px;
          color: #666;
          font-style: italic;
        }
        
        .medicine-price {
          font-weight: 600;
          color: #000000;
          font-size: 14px;
          white-space: nowrap;
        }
        
        .medicine-details {
          display: flex;
          gap: 12px;
          font-size: 11px;
          color: #666666;
          flex-wrap: wrap;
        }
        
        .company-name, .dosage, .form {
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        
        /* Selected Medicine Preview */
        .selected-medicine-preview {
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .preview-price {
          font-weight: 600;
          color: #000;
        }
        
        .preview-details {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #666;
          flex-wrap: wrap;
        }
        
        /* No Results */
        .no-results {
          padding: 32px;
          text-align: center;
          color: #666666;
        }
        
        .no-results p {
          margin: 0;
          font-size: 14px;
        }
        
        .no-results-hint {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
        
        /* Medicine Form */
        .medicine-form {
          padding: 20px;
          border-top: 1px solid #e5e5e5;
          background: #fafafa;
        }
        
        .medicine-form h5 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #000000;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 12px;
          font-weight: 500;
          color: #666666;
        }
        
        .dosage-pattern-select {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
        }
        
        .dosage-preview {
          font-size: 11px;
          color: #666666;
          background: #f5f5f5;
          padding: 6px 10px;
          border-radius: 4px;
          margin-top: 4px;
          font-style: italic;
          border-left: 3px solid #000000;
        }
        
        /* Price Preview */
        .price-preview-container {
          grid-column: span 2;
        }
        
        .price-preview {
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          padding: 12px;
          margin-top: 4px;
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 4px;
        }
        
        .price-row.total-row {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px dashed #e5e5e5;
          font-size: 14px;
        }
        
        .form-actions {
          display: flex;
          gap: 12px;
        }
        
        .add-button, .cancel-button {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        
        .add-button {
          background: #000000;
          color: #ffffff;
        }
        
        .add-button:hover {
          background: #333333;
        }
        
        .cancel-button {
          background: #ffffff;
          color: #000000;
          border: 1px solid #e5e5e5;
        }
        
        .cancel-button:hover {
          background: #f5f5f5;
        }
        
        /* Selected Medicines */
        .selected-medicines {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .medicines-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e5e5;
          background: #ffffff;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .medicines-header h5 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #000000;
        }
        
        .total-small {
          font-weight: 600;
          color: #000000;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.05);
          padding: 6px 12px;
          border-radius: 6px;
        }
        
        .medicines-list {
          max-height: 400px;
          overflow-y: auto;
        }
        
        .medicine-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px;
          border-bottom: 1px solid #f0f0f0;
          background: #ffffff;
        }
        
        .medicine-item:last-child {
          border-bottom: none;
        }
        
        .medicine-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .medicine-main {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .medicine-quantity {
          background: rgba(0, 0, 0, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .dosage-pattern-badge {
          background: #000000;
          color: #ffffff;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          font-family: 'Courier New', monospace;
        }
        
        .medicine-secondary {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #666666;
          flex-wrap: wrap;
        }
        
        .medicine-instructions {
          font-size: 13px;
          color: #000000;
          font-style: italic;
          background: rgba(0, 0, 0, 0.03);
          padding: 8px 12px;
          border-radius: 6px;
          margin-top: 4px;
        }
        
        .medicine-price-breakdown {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #666666;
          margin-top: 4px;
        }
        
        .price-unit {
          background: rgba(0, 0, 0, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .medicine-price-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .medicine-total {
          font-weight: 600;
          color: #000000;
          min-width: 80px;
          text-align: right;
          font-size: 16px;
        }
        
        .remove-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          color: #dc3545;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-button:hover {
          background: rgba(220, 53, 69, 0.1);
        }

        /* Discount Section */
        .discount-section {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }
        
        .discount-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .discount-input-group {
          position: relative;
          width: 100%;
          max-width: 300px;
        }
        
        .discount-input-group input {
          padding-left: 50px;
          padding-right: 12px;
          width: 100%;
        }
        
        .currency-symbol {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-weight: 500;
          pointer-events: none;
        }
        
        .discount-summary {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
          max-width: 300px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .summary-row.total-row {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          font-weight: 600;
        }
        
        .discount-amount {
          color: #dc3545;
          font-weight: 500;
        }

        /* Prescription Form */
        .prescription-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .form-input {
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background: #ffffff;
          color: #000000;
          font-family: inherit;
          transition: all 0.2s ease;
          resize: vertical;
        }

        .form-input:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
        }

        .prescription-input {
          min-height: 150px;
        }

        .prescription-form .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }

        .submit-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 40px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 200px;
        }

        .submit-button:hover:not(:disabled) {
          background: #333333;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .prescription-form .clear-button {
          flex: 0.5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 24px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prescription-form .clear-button:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-container {
            padding: 20px;
          }

          .prescription-header {
            flex-direction: column;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .patient-grid {
            grid-template-columns: 1fr;
          }

          .guidelines-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .price-preview-container {
            grid-column: span 1;
          }
          
          .walkin-form .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .search-container {
            flex-direction: column;
            align-items: stretch;
          }

          .clear-button {
            width: 100%;
            justify-content: center;
          }

          .mode-options {
            flex-direction: column;
          }

          .mode-button {
            min-width: 100%;
          }

          .history-table th,
          .history-table td {
            padding: 12px 16px;
          }

          .history-actions {
            flex-direction: column;
            gap: 4px;
          }

          .view-button,
          .print-button {
            width: 100%;
          }

          .form-card,
          .guidelines-card,
          .search-card,
          .walkin-form-card {
            padding: 20px;
          }

          .page-title {
            font-size: 24px;
          }

          .patient-info-card {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .add-medicine-button {
            width: 100%;
            justify-content: center;
          }

          .medicines-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .medicine-item {
            flex-direction: column;
            gap: 16px;
          }
          
          .medicine-price-section {
            width: 100%;
            justify-content: space-between;
          }
          
          .medicine-main {
            flex-wrap: wrap;
          }
          
          .prescription-form .form-actions {
            flex-direction: column;
          }
          
          .submit-button,
          .prescription-form .clear-button {
            width: 100%;
          }
          
          .search-header {
            flex-direction: column;
            gap: 12px;
          }
          
          .close-search {
            align-self: flex-end;
          }
          
          .search-controls {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .sort-options {
            width: 100%;
            justify-content: flex-start;
          }
          
          .medicine-name-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .medicine-price {
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 16px;
          }

          .page-title {
            font-size: 20px;
          }

          .header-actions {
            flex-direction: column;
          }

          .action-button {
            width: 100%;
            justify-content: center;
          }

          .history-table {
            font-size: 12px;
          }

          .history-table th,
          .history-table td {
            padding: 8px 12px;
          }

          .history-date span {
            display: none;
          }

          .form-input {
            padding: 12px 14px;
            font-size: 13px;
          }

          .submit-button {
            width: 100%;
            min-width: auto;
            font-size: 14px;
            padding: 14px 20px;
          }

          .guideline-item {
            flex-direction: column;
            gap: 8px;
          }

          .price-value {
            font-size: 14px;
          }
          
          .total-value {
            font-size: 16px;
          }

          .medicine-details {
            flex-direction: column;
            gap: 4px;
          }
          
          .medicine-secondary {
            flex-direction: column;
            gap: 4px;
          }
          
          .medicine-price-breakdown {
            flex-direction: column;
            gap: 4px;
          }
          
          .discount-summary {
            max-width: 100%;
          }
          
          .slip-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .form-actions {
            flex-direction: column;
          }

          .add-button,
          .cancel-button {
            width: 100%;
          }
          
          .preview-details {
            flex-direction: column;
            gap: 4px;
          }
          
          .sort-options {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 360px) {
          .dashboard-container {
            padding: 12px;
          }

          .form-card,
          .guidelines-card,
          .search-card,
          .walkin-form-card {
            padding: 16px;
          }

          .search-input {
            font-size: 14px;
          }

          .info-value {
            font-size: 14px;
          }

          .submit-button {
            padding: 14px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorPrescription;
