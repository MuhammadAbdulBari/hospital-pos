import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Custom SVG Icons (keep all existing icons and add new ones)
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

const GenderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="5" />
    <path d="M12 13v9" />
    <path d="M15 20H9" />
  </svg>
);

const AgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
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

const ViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.42 12.71a.94.94 0 0 1 0-1.42C4.1 9.23 7.5 6 12 6s7.9 3.23 9.58 5.29a.94.94 0 0 1 0 1.42C19.9 14.77 16.5 18 12 18s-7.9-3.23-9.58-5.29Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3 3" />
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

// const PriceIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <line x1="12" y1="1" x2="12" y2="23" />
//     <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//   </svg>
// );

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const MoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const DiscountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 9 6 6" />
    <path d="M15 9H9v6" />
  </svg>
);

const TotalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    <line x1="12" y1="1" x2="12" y2="23" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

// NEW ICONS FOR DATE FILTERING
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

const ExportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const StatsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 20V10" />
    <path d="M12 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

const DateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// NEW ICONS FOR EDIT/DELETE
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

const SaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const CancelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const PatientRegistration = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    gender: '',
    age: '',
    doctor: '',
    appointmentFee: '0',
    discountAmount: '0',
    totalPayable: '0'
  });

  // Doctor options with their fees
// Doctor options with their fees - FIXED: Each option has unique value
const doctorOptions = [
  { value: '', label: 'Select Doctor', fee: 0 },
  { value: 'Dr Shafiq Yasin-10000', label: 'Dr Shafiq Yasin  : 10000', fee: 10000 },
  { value: 'Dr Shafiq Yasin-5000', label: 'Dr Shafiq Yasin online consultation: 5000', fee: 5000 },
  { value: 'Dr Falak Wasim Psychologist-1000', label: 'Dr Falak Wasim Psychologist : 1000', fee: 1000 },
  { value: 'Dr Falak Wasim Psychologist-10500', label: 'Dr Falak Wasim Psychologist 15 sessions = 10500', fee: 10500 },
  { value: 'Dr Falak Wasim Psychologist-8000', label: 'Dr Falak Wasim Psychologist 10 sessions = 8000', fee: 8000 },
  { value: 'Dr Munazza Physiotherapist-1500', label: 'Dr Munazza Physiotherapist : 1500', fee: 1500 },
  { value: 'Dr Munazza Physiotherapist-6500', label: 'Dr Munazza Physiotherapist 10 sessions : 6500', fee: 6500 },
  { value: 'Dr Farah Psychiatrist-2000', label: 'Dr Farah Psychiatrist : 2000', fee: 2000 },
  { value: 'Dr Rija Kamal Psychologist-2000', label: 'Dr Rija Kamal Psychologist : 2000', fee: 2000 },
  { value: 'Dr Rija Kamal Psychologist-21000', label: 'Dr Rija Kamal Psychologist 15 sessions : 21000', fee: 21000 },
  { value: 'Dr Rija Kamal Psychologist-16000', label: 'Dr Rija Kamal Psychologist 10 sessions : 16000', fee: 16000 },
  { value: 'Dr Sehrish Psychologist-3000', label: 'Dr Sehrish Psychologist : 3000', fee: 3000 },
  { value: 'Dr Sehrish Psychologist-33500', label: 'Dr Sehrish Psychologist 15 sessions : 33500', fee: 33500 },
  { value: 'Dr Sehrish Psychologist-24000', label: 'Dr Sehrish Psychologist 10 sessions : 24000', fee: 24000 },
  { value: 'Dr Aisha Speech Therapist-2000', label: 'Dr Aisha Speech Therapist : 2000', fee: 2000 },
  { value: 'Dr Bushra Psychiatrist-2000', label: 'Dr Bushra Psychiatrist : 2000', fee: 2000 }
];

  const [slipNumber, setSlipNumber] = useState('');
  const [tokenNumber, setTokenNumber] = useState(() => {
    const savedToken = localStorage.getItem('patientTokenNumber');
    const savedDate = localStorage.getItem('patientTokenDate');
    const today = new Date().toDateString();

    // Check if we need to reset the token (new day or after 12 PM)
    if (!savedToken || !savedDate || savedDate !== today) {
      // Check if it's after 12 PM
      const now = new Date();
      const resetTime = new Date();
      resetTime.setHours(12, 0, 0, 0); // Set to 12:00 PM

      // If saved date is today but it's after 12 PM, reset token
      if (savedDate === today && now >= resetTime) {
        return 1;
      }

      // If it's a new day, check if it's after 12 PM
      if (savedDate !== today) {
        if (now >= resetTime) {
          return 1;
        } else {
          // If it's a new day but before 12 PM, check if we should continue from yesterday
          // or reset. We'll reset for consistency.
          return 1;
        }
      }
    }

    return savedToken ? parseInt(savedToken) : 1;
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // State for patients table
  const [patients, setPatients] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllPatients, setShowAllPatients] = useState(false);
  const [patientsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);

  // NEW STATES FOR DATE FILTERING
  const [dateFilters, setDateFilters] = useState({
    fromDate: '',
    toDate: ''
  });
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [dateStats, setDateStats] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // Prescription search state
  const [prescriptionSearch, setPrescriptionSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPrescriptionPrint, setShowPrescriptionPrint] = useState(false);

  // Prescriptions table state
  const [prescriptionsTable, setPrescriptionsTable] = useState([]);
  const [prescriptionsTableLoading, setPrescriptionsTableLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [prescriptionSearchTerm, setPrescriptionSearchTerm] = useState('');

  // NEW STATES FOR VIEW/EDIT/DELETE
  const [viewPatient, setViewPatient] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Function to calculate fees without percentage
  const calculateFees = (fee, discount) => {
    const appointmentFee = parseFloat(fee) || 0;
    const discountAmount = parseFloat(discount) || 0;

    // Ensure discount doesn't exceed appointment fee
    const finalDiscount = Math.min(discountAmount, appointmentFee);
    const totalPayable = appointmentFee - finalDiscount;

    return {
      appointmentFee: appointmentFee,
      discountAmount: finalDiscount,
      totalPayable: totalPayable
    };
  };

  // Function to check and reset token if needed
// Function to check and reset token if needed
const checkAndResetToken = useCallback(() => {
  const now = new Date();
  const currentDate = now.toDateString();
  const savedDate = localStorage.getItem('patientTokenDate');
  const savedToken = localStorage.getItem('patientTokenNumber');

  // Set reset time to 12:00 AM (MIDNIGHT) - changed from 12:00 PM
  const resetTime = new Date();
  resetTime.setHours(0, 0, 0, 0); // Midnight

  // Check if we need to reset
  let shouldReset = false;

  if (!savedDate || savedDate !== currentDate) {
    // It's a new day, so we should reset
    shouldReset = true;
  } else {
    // Same day, check if we're after midnight
    const lastResetTime = localStorage.getItem('patientTokenResetTime');
    if (lastResetTime) {
      const lastReset = new Date(parseInt(lastResetTime));
      // If now is after midnight AND last reset was before midnight
      if (now >= resetTime && lastReset < resetTime) {
        shouldReset = true;
      }
    } else if (now >= resetTime) {
      shouldReset = true;
    }
  }

  if (shouldReset) {
    setTokenNumber(1);
    localStorage.setItem('patientTokenNumber', '1');
    localStorage.setItem('patientTokenDate', currentDate);
    localStorage.setItem('patientTokenResetTime', now.getTime().toString());
    return 1;
  }

  return savedToken ? parseInt(savedToken) : 1;
}, []);

  // Function to save token with date
  const saveTokenNumber = useCallback((number) => {
    const today = new Date().toDateString();
    localStorage.setItem('patientTokenNumber', number.toString());
    localStorage.setItem('patientTokenDate', today);
  }, []);

  // Handle doctor change - update appointment fee
  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;
    const doctor = doctorOptions.find(doc => doc.value === selectedDoctor);
    const fee = doctor ? doctor.fee : 0;

    // Recalculate fees with new appointment fee
    const calculated = calculateFees(fee, formData.discountAmount);

    setFormData({
      ...formData,
      doctor: selectedDoctor,
      appointmentFee: fee.toString(),
      discountAmount: calculated.discountAmount.toString(),
      totalPayable: calculated.totalPayable.toString()
    });
  };

  // Handle discount amount change
  const handleDiscountAmountChange = (e) => {
    const discountAmount = e.target.value;
    const fee = formData.appointmentFee;
    const calculated = calculateFees(fee, discountAmount);

    setFormData({
      ...formData,
      discountAmount: discountAmount,
      totalPayable: calculated.totalPayable.toString()
    });
  };

  // Handle appointment fee change (manual override)
  const handleAppointmentFeeChange = (e) => {
    const fee = e.target.value;
    const discount = formData.discountAmount;
    const calculated = calculateFees(fee, discount);

    setFormData({
      ...formData,
      appointmentFee: fee,
      totalPayable: calculated.totalPayable.toString()
    });
  };

  // Function to reset token number manually
  const handleResetTokenNumber = () => {
    const confirmReset = window.confirm('Are you sure you want to reset token number to 1? This will reset the counter for new patients.');
    if (confirmReset) {
      setTokenNumber(1);
      saveTokenNumber(1);
    }
  };

  // Function to increment and save token number
  const incrementTokenNumber = useCallback(() => {
    // First check if we need to reset based on time
    checkAndResetToken();

    const newTokenNumber = tokenNumber + 1;
    setTokenNumber(newTokenNumber);
    saveTokenNumber(newTokenNumber);
    return newTokenNumber;
  }, [tokenNumber, checkAndResetToken, saveTokenNumber]);

  // Fetch patients WITH DATE FILTERS
  const fetchPatients = async (page = 1, search = '', showAll = false, fromDate = '', toDate = '') => {
    setTableLoading(true);
    try {
      const limit = showAll ? 1000 : patientsPerPage;
      const params = {
        page: page,
        limit: limit,
        search: search
      };

      // Add date filters if provided
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;

      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        { params }
      );

      if (response.data.success) {
        setPatients(response.data.data);
        setTotalPatients(response.data.total || response.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setTableLoading(false);
    }
  };

  // NEW: Fetch date range statistics
  const fetchDateStats = async (fromDate, toDate) => {
    try {
      const params = {
        stats: true
      };

      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;

      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        { params }
      );

      if (response.data.success) {
        setDateStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // NEW: Handle date filter changes
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // NEW: Apply date filters
  const applyDateFilters = () => {
    setCurrentPage(1);
    fetchPatients(1, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
    if (showStats) {
      fetchDateStats(dateFilters.fromDate, dateFilters.toDate);
    }
  };

  // NEW: Reset date filters
  const resetDateFilters = () => {
    setDateFilters({
      fromDate: '',
      toDate: ''
    });
    setCurrentPage(1);
    fetchPatients(1, searchTerm, showAllPatients);
    if (showStats) {
      fetchDateStats('', '');
    }
  };

  // NEW: Export patients data to CSV
  const exportPatientsData = async () => {
    setExporting(true);
    try {
      const params = {
        export: true,
        search: searchTerm
      };

      if (dateFilters.fromDate) params.from_date = dateFilters.fromDate;
      if (dateFilters.toDate) params.to_date = dateFilters.toDate;

      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        { params }
      );

      if (response.data.success) {
        const patientsData = response.data.data;

        // Convert to CSV
        const headers = ['Slip No.', 'Patient Name', 'Contact', 'Age', 'Gender', 'Doctor', 'Appointment Fee', 'Discount Amount', 'Total Payable', 'Registered By', 'Registration Date'];

        const csvRows = [
          headers.join(','),
          ...patientsData.map(patient => [
            patient.slip_number,
            `"${patient.full_name}"`,
            patient.contact_number,
            patient.age,
            patient.gender,
            patient.doctor || 'N/A',
            patient.appointment_fee,
            patient.discount_amount,
            patient.total_payable,
            patient.registered_by,
            new Date(patient.registration_date).toLocaleDateString()
          ].join(','))
        ];

        const csvString = csvRows.join('\n');

        // Create and download CSV file
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // Handle view all patients
  const handleViewAllPatients = () => {
    setShowAllPatients(true);
    fetchPatients(1, searchTerm, true, dateFilters.fromDate, dateFilters.toDate);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    fetchPatients(1, e.target.value, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
  };

  // Pagination
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPatients(pageNumber, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) errors.fullName = 'Name must be at least 3 characters';

    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    else if (!/^[0-9+\-\s]{10,15}$/.test(formData.contactNumber)) errors.contactNumber = 'Enter a valid phone number';

    if (!formData.gender) errors.gender = 'Gender is required';

    if (!formData.age.trim()) errors.age = 'Age is required';
    else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 0 || age > 150) errors.age = 'Enter a valid age (0-150)';
    }

    if (!formData.doctor) errors.doctor = 'Please select a doctor';

    if (!formData.appointmentFee || parseFloat(formData.appointmentFee) <= 0) {
      errors.appointmentFee = 'Appointment fee is required';
    }

    const discount = parseFloat(formData.discountAmount) || 0;
    const fee = parseFloat(formData.appointmentFee) || 0;
    if (discount < 0) {
      errors.discountAmount = 'Discount cannot be negative';
    } else if (discount > fee) {
      errors.discountAmount = 'Discount cannot exceed appointment fee';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setFormErrors({});

    // Check token before incrementing
    checkAndResetToken();
    const currentTokenNumber = incrementTokenNumber();

    const payload = {
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      gender: formData.gender,
      date_of_birth: '2000-01-01',
      age: formData.age,
      doctor: formData.doctor,
      appointment_fee: formData.appointmentFee,
      discount_amount: formData.discountAmount,
      total_payable: formData.totalPayable,
      registered_by: user?.email || 'admin'
    };

    try {
      const response = await axios.post(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000
        }
      );

      if (response.data.success) {
        setSlipNumber(response.data.data.slip_number);
        setRegisteredPatient({
          ...formData,
          tokenNumber: currentTokenNumber,
          slipNumber: response.data.data.slip_number,
          doctorName: formData.doctor
        });
        setSuccess(true);

        // Reset form
        setFormData({
          fullName: '',
          contactNumber: '',
          gender: '',
          age: '',
          doctor: '',
          appointmentFee: '0',
          discountAmount: '0',
          totalPayable: '0'
        });

        // Refresh patients table
        fetchPatients(currentPage, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
      } else {
        setFormErrors({
          submit: response.data.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        setFormErrors({
          submit: error.response.data?.message || `Server error: ${error.response.status}`
        });
      } else if (error.request) {
        setFormErrors({
          submit: 'No response from server. Please check your connection.'
        });
      } else {
        setFormErrors({
          submit: error.message || 'Registration failed. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to search for patient prescriptions
  const searchPatientPrescriptions = async () => {
    if (!prescriptionSearch.trim()) {
      setSearchError('Please enter a slip number');
      return;
    }

    setSearching(true);
    setSearchError('');
    setPatientData(null);
    setPrescriptionHistory([]);
    setSelectedPrescription(null);

    try {
      const patientResponse = await axios.get(
        `https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php`,
        {
          params: { slip_number: prescriptionSearch.trim() },
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (patientResponse.data.success) {
        const patient = patientResponse.data.data;
        setPatientData(patient);

        try {
          const prescriptionResponse = await axios.get(
            `https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php`,
            {
              params: {
                slip_number: prescriptionSearch.trim(),
                with_medicines: true
              },
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
              : [];

            setPrescriptionHistory(presArr);
            setShowHistory(presArr.length > 0);
          }
        } catch (presError) {
          console.log('No prescriptions found for this patient');
          setPrescriptionHistory([]);
        }
      } else {
        setSearchError('Patient not found with this slip number');
      }
    } catch (err) {
      console.error('Search error:', err);
      if (err.response?.status === 404) {
        setSearchError('Patient not found');
      } else {
        setSearchError('Error searching patient');
      }
    } finally {
      setSearching(false);
    }
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
  };

  // Function to fetch patient data by slip number
  const fetchPatientBySlipNumber = async (slipNumber) => {
    try {
      const response = await axios.get(
        `https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php`,
        {
          params: { slip_number: slipNumber },
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching patient:', error);
      return null;
    }
  };

  // Updated handlePrintPrescription function
  const handlePrintPrescription = async (prescription) => {
    setSelectedPrescription(prescription);

    let patient = null;

    if (patientData && patientData.slip_number === prescription.slip_number) {
      patient = patientData;
    } else {
      try {
        patient = await fetchPatientBySlipNumber(prescription.slip_number);
      } catch (error) {
        console.error('Error fetching patient for printing:', error);
      }
    }

    if (!patient) {
      patient = {
        slip_number: prescription.slip_number,
        full_name: prescription.patient_name || 'Patient',
        age: 'N/A',
        gender: 'N/A',
        contact_number: 'N/A'
      };
    }

    setPatientData(patient);
    setShowPrescriptionPrint(true);

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrescriptionPrint(false);
      }, 500);
    }, 100);
  };

  // New function specifically for printing from the table
  const handlePrintFromTable = async (prescription) => {
    setSelectedPrescription(prescription);

    try {
      const patient = await fetchPatientBySlipNumber(prescription.slip_number);

      if (patient) {
        setPatientData(patient);
      } else {
        setPatientData({
          slip_number: prescription.slip_number,
          full_name: prescription.patient_name || 'Patient',
          age: 'N/A',
          gender: 'N/A',
          contact_number: 'N/A'
        });
      }
    } catch (error) {
      console.error('Error fetching patient for table print:', error);
      setPatientData({
        slip_number: prescription.slip_number,
        full_name: prescription.patient_name || 'Patient',
        age: 'N/A',
        gender: 'N/A',
        contact_number: 'N/A'
      });
    }

    setShowPrescriptionPrint(true);

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrescriptionPrint(false);
      }, 500);
    }, 100);
  };

  const handleResetSearch = () => {
    setPrescriptionSearch('');
    setPatientData(null);
    setPrescriptionHistory([]);
    setSelectedPrescription(null);
    setShowHistory(false);
    setSearchError('');
  };

  const calculatePrescriptionTotal = (prescription) => {
    if (prescription.total_price) return prescription.total_price;
    if (prescription.medicines) {
      return prescription.medicines.reduce((total, med) => total + (med.total_price || 0), 0);
    }
    return 0;
  };

  // Function to fetch all prescriptions for the table
  const fetchAllPrescriptions = async () => {
    setPrescriptionsTableLoading(true);
    try {
      const response = await axios.get(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php',
        { params: { all_prescriptions: true } }
      );

      if (response.data.success) {
        const prescriptions = response.data.data || [];

        const prescriptionsWithMedicines = await Promise.all(
          prescriptions.map(async (prescription) => {
            try {
              const medResponse = await axios.get(
                `https://yasin-psychiatric-hospital-pos.site/backend/api/prescriptions.php`,
                { params: { slip_number: prescription.slip_number, with_medicines: true } }
              );

              if (medResponse.data.success) {
                const medData = Array.isArray(medResponse.data.data)
                  ? medResponse.data.data
                  : medResponse.data.data;

                const foundPres = Array.isArray(medData)
                  ? medData.find(p => p.id === prescription.id)
                  : medData;

                return {
                  ...prescription,
                  medicines: foundPres?.medicines || []
                };
              }
            } catch (error) {
              console.error(`Failed to fetch medicines for ${prescription.slip_number}:`, error);
            }
            return prescription;
          })
        );

        setPrescriptionsTable(prescriptionsWithMedicines);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setPrescriptionsTableLoading(false);
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      'pending': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.05)', label: 'Pending' },
      'pharmacy_received': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.1)', label: 'Received' },
      'ready': { color: '#000000', bgColor: 'rgba(0, 0, 0, 0.2)', label: 'Ready' },
      'dispensed': { color: '#666666', bgColor: 'rgba(102, 102, 102, 0.1)', label: 'Dispensed' }
    };

    const statusConfig = config[status] || config.pending;

    return (
      <div className="status-badge" style={{
        backgroundColor: statusConfig.bgColor,
        color: statusConfig.color
      }}>
        {statusConfig.label}
      </div>
    );
  };

  // Filter prescriptions based on search and status
  const filteredPrescriptions = prescriptionsTable.filter(pres => {
    const matchesSearch =
      (pres.patient_name?.toLowerCase().includes(prescriptionSearchTerm.toLowerCase())) ||
      (pres.slip_number?.toLowerCase().includes(prescriptionSearchTerm.toLowerCase())) ||
      (pres.doctor_name?.toLowerCase().includes(prescriptionSearchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || pres.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // NEW: Toggle statistics display
  const toggleStats = () => {
    setShowStats(!showStats);
    if (!showStats && (dateFilters.fromDate || dateFilters.toDate)) {
      fetchDateStats(dateFilters.fromDate, dateFilters.toDate);
    } else if (!showStats) {
      fetchDateStats('', '');
    }
  };

  // NEW: Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // NEW: Get first day of current month
  const getFirstDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  };

  // NEW: Quick filter functions
  const filterToday = () => {
    const today = getTodayDate();
    setDateFilters({
      fromDate: today,
      toDate: today
    });
    setTimeout(() => {
      applyDateFilters();
    }, 100);
  };

  const filterThisMonth = () => {
    setDateFilters({
      fromDate: getFirstDayOfMonth(),
      toDate: getTodayDate()
    });
    setTimeout(() => {
      applyDateFilters();
    }, 100);
  };

  const filterThisWeek = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    setDateFilters({
      fromDate: firstDay.toISOString().split('T')[0],
      toDate: lastDay.toISOString().split('T')[0]
    });
    setTimeout(() => {
      applyDateFilters();
    }, 100);
  };

  // NEW: View Patient Details
  const handleViewPatient = (patient) => {
    setViewPatient(patient);
    setEditPatient(null);
  };

  // NEW: Edit Patient
  // NEW: Edit Patient
  const handleEditPatient = (patient) => {
    setEditPatient(patient);
    setViewPatient(null);
    setEditFormData({
      full_name: patient.full_name,
      contact_number: patient.contact_number,
      gender: patient.gender,
      age: patient.age,
      doctor: patient.doctor,
      appointment_fee: patient.appointment_fee,
      discount_amount: patient.discount_amount,
      total_payable: patient.total_payable
    });
  };

  // NEW: Calculate edit total
  // NEW: Calculate edit total
  const calculateEditTotal = (fee, discount) => {
    const appointmentFee = parseFloat(fee) || 0;
    const discountAmount = parseFloat(discount) || 0;
    const finalDiscount = Math.min(discountAmount, appointmentFee);
    const totalPayable = appointmentFee - finalDiscount;

    return {
      appointment_fee: appointmentFee.toString(),
      discount_amount: finalDiscount.toString(),
      total_payable: totalPayable.toString()
    };
  };

  // NEW: Handle edit form changes

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctor') {
      const doctor = doctorOptions.find(doc => doc.value === value);
      const fee = doctor ? doctor.fee : 0;
      const calculated = calculateEditTotal(fee, editFormData.discount_amount);

      setEditFormData({
        ...editFormData,
        doctor: value,
        appointment_fee: calculated.appointment_fee,
        discount_amount: calculated.discount_amount,
        total_payable: calculated.total_payable
      });
    } else if (name === 'appointment_fee') {
      const calculated = calculateEditTotal(value, editFormData.discount_amount);
      setEditFormData({
        ...editFormData,
        appointment_fee: value,
        discount_amount: calculated.discount_amount,
        total_payable: calculated.total_payable
      });
    } else if (name === 'discount_amount') {
      const calculated = calculateEditTotal(editFormData.appointment_fee, value);
      setEditFormData({
        ...editFormData,
        discount_amount: value,
        total_payable: calculated.total_payable
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };

  // NEW: Save edited patient
  const handleSaveEdit = async (patientId) => {
    setEditLoading(true);
    try {
      const payload = {
        id: patientId,
        slip_number: editPatient.slip_number,
        full_name: editFormData.full_name,
        contact_number: editFormData.contact_number,
        gender: editFormData.gender,
        date_of_birth: editPatient.date_of_birth || '2000-01-01',
        age: editFormData.age,
        doctor: editFormData.doctor,
        appointment_fee: editFormData.appointment_fee,
        discount_amount: editFormData.discount_amount
      };

      const response = await axios.put(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000
        }
      );

      if (response.data.success) {
        setEditPatient(null);
        setEditFormData({});
        // Refresh patients after edit
        fetchPatients(currentPage, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
      } else {
        alert(response.data.message || 'Failed to update patient');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      if (error.response) {
        alert(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert(error.message || 'Failed to update patient. Please try again.');
      }
    } finally {
      setEditLoading(false);
    }
  };

  // NEW: Cancel edit
  const handleCancelEdit = () => {
    setEditPatient(null);
    setEditFormData({});
  };

  // NEW: Delete Patient
  const handleDeletePatient = async (patientId, slipNumber) => {
    setDeleteLoading(patientId);
    try {
      const payload = {
        id: patientId,
        slip_number: slipNumber
      };

      const response = await axios.delete(
        'https://yasin-psychiatric-hospital-pos.site/backend/api/patients.php',
        {
          data: payload,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000
        }
      );

      if (response.data.success) {
        setShowDeleteConfirm(null);
        // Refresh patients after delete
        fetchPatients(currentPage, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate);
      } else {
        alert(response.data.message || 'Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      if (error.response) {
        alert(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert(error.message || 'Failed to delete patient. Please try again.');
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  // NEW: Confirm delete
  const confirmDelete = (patientId, slipNumber) => {
    setShowDeleteConfirm({ id: patientId, slip: slipNumber });
  };

  // NEW: Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  // Set up interval to check for token reset
  useEffect(() => {
    // Check token on component mount
    checkAndResetToken();

    // Set up interval to check every minute
    const intervalId = setInterval(() => {
      checkAndResetToken();
    }, 60000); // Check every minute

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [checkAndResetToken]);

  // Initial data fetch
  useEffect(() => {
    fetchPatients(currentPage, searchTerm, showAllPatients);
    fetchAllPrescriptions();
  }, []);

  const handlePrint = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
      setShowPrintPreview(false);
    }, 100);
  };

  const handleReset = () => {
    setSuccess(false);
    setSlipNumber('');
    setRegisteredPatient(null);
    setFormErrors({});
  };

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
      }
      .no-print {
        display: none !important;
      }
    }
  `;

  return (
    <div className="registration-page">
      <style>{printStyles}</style>
      <Navbar />

      <div className="dashboard-container">
        <div className="registration-wrapper">
          {/* Header */}
          <div className="registration-header">
            <div className="header-content">
              <h1 className="page-title">Patient Management System</h1>
              <p className="page-subtitle">
                View all registered patients and register new patients
              </p>
            </div>

            <div className="header-actions">
              <div className="token-counter">
                <span className="token-label">Next Token: </span>
                <span className="token-number">{tokenNumber}</span>
                <button
                  className="reset-token-button"
                  onClick={handleResetTokenNumber}
                  title="Reset token counter to 1"
                >
                  <ResetIcon />
                </button>
              </div>

              {success && (
                <button className="action-button" onClick={handlePrint}>
                  <PrintIcon />
                  <span>Print Slip</span>
                </button>
              )}
            </div>
          </div>

          {/* Registration Form - AT THE TOP */}
          {!success && (
            <div className="form-card no-print">
              <div className="form-header">
                <h3>Register New Patient</h3>
                <p>Fill in all required details to register a new patient</p>
               <div className="token-display">
  <span className="token-label">Token will be: </span>
  <span className="token-value">{tokenNumber}</span>
  <span className="token-auto-reset">(Auto-resets daily at 12 AM)</span>
</div>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                {/* Personal Information */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <UserIcon />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input ${formErrors.fullName ? 'error' : ''}`}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter patient's full name"
                    />
                    {formErrors.fullName && (
                      <div className="error-text">{formErrors.fullName}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <PhoneIcon />
                      <span>Contact Number *</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-input ${formErrors.contactNumber ? 'error' : ''}`}
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="Enter phone number"
                    />
                    {formErrors.contactNumber && (
                      <div className="error-text">{formErrors.contactNumber}</div>
                    )}
                  </div>
                </div>

                <div className="form-grid triple">
                  <div className="form-group">
                    <label className="form-label">
                      <GenderIcon />
                      <span>Gender *</span>
                    </label>
                    <select
                      className={`form-input ${formErrors.gender ? 'error' : ''}`}
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.gender && (
                      <div className="error-text">{formErrors.gender}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <AgeIcon />
                      <span>Age (Years) *</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="150"
                      className={`form-input ${formErrors.age ? 'error' : ''}`}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter age"
                    />
                    {formErrors.age && (
                      <div className="error-text">{formErrors.age}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <DoctorIcon />
                      <span>Doctor *</span>
                    </label>
                    <select
                      className={`form-input ${formErrors.doctor ? 'error' : ''}`}
                      value={formData.doctor}
                      onChange={handleDoctorChange}
                    >
                      {doctorOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.doctor && (
                      <div className="error-text">{formErrors.doctor}</div>
                    )}
                  </div>
                </div>

                {/* Appointment Fee Section */}
                <div className="form-section-header">
                  <h4>Appointment Fee Details</h4>
                </div>

                <div className="form-grid triple">
                  <div className="form-group">
                    <label className="form-label">
                      <MoneyIcon />
                      <span>Appointment Fee (Rs) *</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className={`form-input ${formErrors.appointmentFee ? 'error' : ''}`}
                      value={formData.appointmentFee}
                      onChange={handleAppointmentFeeChange}
                      placeholder="Appointment fee"
                      readOnly={formData.doctor !== ''}
                    />
                    {formErrors.appointmentFee && (
                      <div className="error-text">{formErrors.appointmentFee}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <DiscountIcon />
                      <span>Discount (Rs)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className={`form-input ${formErrors.discountAmount ? 'error' : ''}`}
                      value={formData.discountAmount}
                      onChange={handleDiscountAmountChange}
                      placeholder="Discount amount"
                    />
                    {formErrors.discountAmount && (
                      <div className="error-text">{formErrors.discountAmount}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <TotalIcon /> */}
                      <span>Total Payable (Rs)</span>
                    </label>
                    <input
                      type="text"
                      className="form-input readonly"
                      value={formData.totalPayable}
                      readOnly
                    />
                  </div>
                </div>

                {/* Fee Summary */}
                <div className="fee-summary">
                  <div className="summary-row">
                    <span className="summary-label">Appointment Fee:</span>
                    <span className="summary-value">Rs. {formData.appointmentFee}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Discount:</span>
                    <span className="summary-value discount">- Rs. {formData.discountAmount}</span>
                  </div>
                  <div className="summary-row total">
                    <span className="summary-label">Total Payable:</span>
                    <span className="summary-value total">Rs. {formData.totalPayable}</span>
                  </div>
                </div>

                {formErrors.submit && (
                  <div className="form-error">
                    {formErrors.submit}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        <span>Registering...</span>
                      </>
                    ) : `Register Patient (Token ${tokenNumber})`}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success Card */}
          {success && (
            <div className="success-card no-print">
              <div className="success-content">
                <div className="success-icon">
                  <CheckIcon />
                </div>
                <div>
                  <h3>Registration Successful!</h3>
                  <p>Patient has been registered and slip number generated.</p>
                </div>
              </div>

              <div className="slip-display">
                <div className="slip-label">Slip Number</div>
                <div className="slip-number">{slipNumber}</div>
                <div className="slip-instructions">
                  Please provide this slip number to the patient for reference
                </div>
              </div>

              <div className="success-actions">
                <button className="primary-button" onClick={handlePrint}>
                  <PrintIcon />
                  <span>Print Slip</span>
                </button>
                <button className="secondary-button" onClick={handleReset}>
                  Register Another Patient
                </button>
              </div>
            </div>
          )}

          {/* Patients Table Section - BELOW THE FORM */}
          <div className="patients-table-section no-print">
            <div className="section-header">
              <div className="header-left">
                <h3>Registered Patients</h3>
                <p>View all registered patients</p>
              </div>

              <div className="header-right">
                <div className="search-container">
                  <SearchIcon />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                {/* NEW: Date Filter Toggle Button */}
                <button
                  className={`filter-date-button ${showDateFilters ? 'active' : ''}`}
                  onClick={() => setShowDateFilters(!showDateFilters)}
                >
                  <FilterIcon />
                  <span>Date Filter</span>
                </button>

                <button
                  className="view-all-button"
                  onClick={handleViewAllPatients}
                  disabled={tableLoading || showAllPatients}
                >
                  <ListIcon />
                  <span>View All</span>
                </button>

                {/* NEW: Export Button */}
                <button
                  className="export-button"
                  onClick={exportPatientsData}
                  disabled={exporting || tableLoading}
                >
                  {exporting ? (
                    <>
                      <SpinnerIcon />
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <ExportIcon />
                      <span>Export</span>
                    </>
                  )}
                </button>

                {/* NEW: Stats Toggle Button */}
                <button
                  className={`stats-button ${showStats ? 'active' : ''}`}
                  onClick={toggleStats}
                >
                  <StatsIcon />
                  <span>Stats</span>
                </button>

                <button
                  className="refresh-button"
                  onClick={() => fetchPatients(currentPage, searchTerm, showAllPatients, dateFilters.fromDate, dateFilters.toDate)}
                  disabled={tableLoading}
                >
                  <RefreshIcon />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* NEW: Date Filter Section */}
            {showDateFilters && (
              <div className="date-filter-section">
                <div className="filter-header">
                  <h4>
                    <DateIcon />
                    <span>Filter by Registration Date</span>
                  </h4>
                  <div className="quick-filters">
                    <button className="quick-filter-btn" onClick={filterToday}>
                      Today
                    </button>
                    <button className="quick-filter-btn" onClick={filterThisWeek}>
                      This Week
                    </button>
                    <button className="quick-filter-btn" onClick={filterThisMonth}>
                      This Month
                    </button>
                  </div>
                </div>

                <div className="date-inputs">
                  <div className="date-input-group">
                    <label>
                      <CalendarIcon />
                      <span>From Date:</span>
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      value={dateFilters.fromDate}
                      onChange={handleDateFilterChange}
                      max={dateFilters.toDate || getTodayDate()}
                    />
                  </div>

                  <div className="date-input-group">
                    <label>
                      <CalendarIcon />
                      <span>To Date:</span>
                    </label>
                    <input
                      type="date"
                      name="toDate"
                      value={dateFilters.toDate}
                      onChange={handleDateFilterChange}
                      min={dateFilters.fromDate}
                      max={getTodayDate()}
                    />
                  </div>

                  <div className="date-filter-actions">
                    <button className="apply-filter-btn" onClick={applyDateFilters}>
                      Apply Filter
                    </button>
                    <button className="reset-filter-btn" onClick={resetDateFilters}>
                      Clear Filter
                    </button>
                  </div>
                </div>

                {(dateFilters.fromDate || dateFilters.toDate) && (
                  <div className="active-filter-info">
                    <span>Active Filter: </span>
                    {dateFilters.fromDate && <span>From {dateFilters.fromDate} </span>}
                    {dateFilters.toDate && <span>To {dateFilters.toDate}</span>}
                    {!dateFilters.fromDate && !dateFilters.toDate && <span>All dates</span>}
                  </div>
                )}
              </div>
            )}

            {/* NEW: Statistics Section */}
            {showStats && dateStats && (
              <div className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Total Patients</div>
                    <div className="stat-value">{dateStats.total_patients || 0}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Fees</div>
                    <div className="stat-value">Rs. {parseFloat(dateStats.total_fees || 0).toFixed(2)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Discount</div>
                    <div className="stat-value">Rs. {parseFloat(dateStats.total_discount || 0).toFixed(2)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Payable</div>
                    <div className="stat-value">Rs. {parseFloat(dateStats.total_payable || 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="patients-table-container">
              {tableLoading ? (
                <div className="loading-state">
                  <div className="spinner">
                    <SpinnerIcon />
                  </div>
                  <p>Loading patients...</p>
                </div>
              ) : patients.length === 0 ? (
                <div className="empty-state">
                  <p>No patients found</p>
                  {(searchTerm || dateFilters.fromDate || dateFilters.toDate) && (
                    <button className="clear-filters-btn" onClick={() => {
                      setSearchTerm('');
                      resetDateFilters();
                    }}>
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="patients-table">
                  <div className="table-header">
                    <div className="table-cell">Slip No.</div>
                    <div className="table-cell">Patient Name</div>
                    <div className="table-cell">Contact</div>
                    <div className="table-cell">Age/Gender</div>
                    <div className="table-cell">Doctor</div>
                    <div className="table-cell">Fee</div>
                    <div className="table-cell">Discount</div>
                    <div className="table-cell">Total</div>
                    <div className="table-cell">Date</div>
                    <div className="table-cell">Actions</div>
                  </div>

                  {patients.map((patient) => (
                    <React.Fragment key={patient.id}>
                      {/* Edit Mode */}
                      {editPatient?.id === patient.id ? (
                        <div className="patient-row edit-mode">
                          <div className="table-cell">
                            <div className="slip-number">{patient.slip_number}</div>
                          </div>

                          <div className="table-cell">
                            <input
                              type="text"
                              className="edit-input"
                              name="full_name"
                              value={editFormData.full_name}
                              onChange={handleEditChange}
                              placeholder="Full Name"
                            />
                          </div>

                          <div className="table-cell">
                            <input
                              type="tel"
                              className="edit-input"
                              name="contact_number"
                              value={editFormData.contact_number}
                              onChange={handleEditChange}
                              placeholder="Contact"
                            />
                          </div>

                          <div className="table-cell">
                            <select
                              className="edit-select"
                              name="gender"
                              value={editFormData.gender}
                              onChange={handleEditChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <input
                              type="number"
                              className="edit-input age-input"
                              name="age"
                              value={editFormData.age}
                              onChange={handleEditChange}
                              min="0"
                              max="150"
                              placeholder="Age"
                            />
                          </div>

                          <div className="table-cell">
                            <select
                              className="edit-select"
                              name="doctor"
                              value={editFormData.doctor}
                              onChange={handleEditChange}
                            >
                              {doctorOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="table-cell">
                            <input
                              type="number"
                              className="edit-input"
                              name="appointment_fee"
                              value={editFormData.appointment_fee}
                              onChange={handleEditChange}
                              min="0"
                              step="1"
                              placeholder="Fee"
                            />
                          </div>

                          <div className="table-cell">
                            <input
                              type="number"
                              className="edit-input"
                              name="discount_amount"
                              value={editFormData.discount_amount}
                              onChange={handleEditChange}
                              min="0"
                              step="1"
                              placeholder="Discount"
                            />
                          </div>

                          <div className="table-cell">
                            <div className="total-info">
                              Rs. {editFormData.total_payable}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="date-info">
                              {new Date(patient.registration_date).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="action-buttons">
                              <button
                                className="save-button"
                                onClick={() => handleSaveEdit(patient.id)}
                                disabled={editLoading}
                                title="Save Changes"
                              >
                                {editLoading ? <SpinnerIcon /> : <SaveIcon />}
                              </button>
                              <button
                                className="cancel-button"
                                onClick={handleCancelEdit}
                                title="Cancel Edit"
                              >
                                <CancelIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* View Mode */
                        <div className="patient-row">
                          <div className="table-cell">
                            <div className="slip-number">{patient.slip_number}</div>
                          </div>

                          <div className="table-cell">
                            <div className="patient-name">
                              {patient.full_name}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="contact-info">
                              {patient.contact_number}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="age-gender">
                              {patient.age}y / {patient.gender}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="doctor-info">
                              {patient.doctor || 'N/A'}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="fee-info">
                              Rs. {patient.appointment_fee}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="discount-info">
                              Rs. {patient.discount_amount}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="total-info">
                              Rs. {patient.total_payable}
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="date-info">
                              {new Date(patient.registration_date).toLocaleDateString()}
                              <div className="time-info">
                                {new Date(patient.registration_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>

                          <div className="table-cell">
                            <div className="action-buttons">
                              <button
                                className="view-button"
                                onClick={() => handleViewPatient(patient)}
                                title="View Details"
                              >
                                <ViewIcon />
                              </button>
                              <button
                                className="edit-button"
                                onClick={() => handleEditPatient(patient)}
                                title="Edit Patient"
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="delete-button"
                                onClick={() => confirmDelete(patient.id, patient.slip_number)}
                                title="Delete Patient"
                                disabled={deleteLoading === patient.id}
                              >
                                {deleteLoading === patient.id ? <SpinnerIcon /> : <DeleteIcon />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="delete-confirm-modal">
                  <div className="delete-confirm-content">
                    <h4>Confirm Delete</h4>
                    <p>Are you sure you want to delete patient with slip number: <strong>{showDeleteConfirm.slip}</strong>?</p>
                    <p className="warning-text">This action cannot be undone.</p>
                    <div className="delete-confirm-actions">
                      <button
                        className="confirm-delete-btn"
                        onClick={() => handleDeletePatient(showDeleteConfirm.id, showDeleteConfirm.slip)}
                        disabled={deleteLoading === showDeleteConfirm.id}
                      >
                        {deleteLoading === showDeleteConfirm.id ? 'Deleting...' : 'Delete'}
                      </button>
                      <button
                        className="cancel-delete-btn"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* View Patient Details Modal */}
              {viewPatient && (
                <div className="view-patient-modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3>Patient Details</h3>
                      <button className="close-modal" onClick={() => setViewPatient(null)}>
                        <CloseIcon />
                      </button>
                    </div>

                    <div className="modal-body">
                      <div className="patient-details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Slip Number:</span>
                          <span className="detail-value">{viewPatient.slip_number}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Full Name:</span>
                          <span className="detail-value">{viewPatient.full_name}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Contact Number:</span>
                          <span className="detail-value">{viewPatient.contact_number}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Age:</span>
                          <span className="detail-value">{viewPatient.age} years</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Gender:</span>
                          <span className="detail-value">{viewPatient.gender}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Doctor:</span>
                          <span className="detail-value">{viewPatient.doctor || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Appointment Fee:</span>
                          <span className="detail-value">Rs. {viewPatient.appointment_fee}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Discount:</span>
                          <span className="detail-value">Rs. {viewPatient.discount_amount}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Total Payable:</span>
                          <span className="detail-value">Rs. {viewPatient.total_payable}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Registered By:</span>
                          <span className="detail-value">{viewPatient.registered_by}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Registration Date:</span>
                          <span className="detail-value">
                            {new Date(viewPatient.registration_date).toLocaleDateString()} at {new Date(viewPatient.registration_date).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button className="print-button" onClick={() => {
                        // You can implement print functionality here
                        alert('Print functionality for individual patient');
                      }}>
                        <PrintIcon />
                        <span>Print Details</span>
                      </button>
                      <button className="close-button" onClick={() => setViewPatient(null)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination - Only show when not viewing all */}
              {!showAllPatients && totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}

              {showAllPatients && patients.length > 0 && (
                <div className="view-all-info">
                  <p>Showing all {patients.length} patients</p>
                  <button
                    className="show-less-button"
                    onClick={() => {
                      setShowAllPatients(false);
                      fetchPatients(1, searchTerm, false, dateFilters.fromDate, dateFilters.toDate);
                    }}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Print Preview - Updated for Thermal Printer */}
          {showPrintPreview && registeredPatient && (
            <div className="print-preview">
              <div className="thermal-print" style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                lineHeight: "1.1",
                maxWidth: "280px",
                margin: "0 auto"
              }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <div style={{ fontWeight: "bold" }}>YASIN PSYCHIATRIC HOSPITAL</div>
                  <div>Karachi</div>
                  <div>Ph: 0330-7997999</div>
                  <div>--------------------------------</div>
                </div>

                {/* Title */}
                <div style={{ textAlign: "center", fontWeight: "bold", margin: "4px 0" }}>
                  PATIENT REGISTRATION SLIP
                </div>

                <div>--------------------------------</div>

                {/* Token and Slip Info */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>Token No:</strong> {registeredPatient.tokenNumber}</div>
                  <div><strong>Slip:</strong> {registeredPatient.slipNumber}</div>
                </div>

                <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                <div><strong>Time:</strong> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>

                <div>--------------------------------</div>

                {/* Doctor Appointment */}
                <div style={{ textAlign: "center", margin: "4px 0" }}>
                  <div style={{ fontWeight: "bold" }}>{registeredPatient.doctorName}</div>
                  <div>Consultation</div>
                </div>

                <div>--------------------------------</div>

                {/* Patient Info - Updated: No DOB field */}
                <div><strong>Patient:</strong> {registeredPatient.fullName}</div>
                <div><strong>Age/Gender:</strong> {registeredPatient.age}y / {registeredPatient.gender?.toUpperCase()}</div>
                <div><strong>Contact:</strong> {registeredPatient.contactNumber}</div>

                <div>--------------------------------</div>

                {/* Payment Information - NOW DYNAMIC */}
                <div style={{ fontWeight: "bold", textAlign: "center", margin: "4px 0" }}>
                  APPOINTMENT PAYMENT
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Consultation Fee:</div>
                  <div>Rs. {registeredPatient.appointmentFee}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Discount:</div>
                  <div>- Rs. {registeredPatient.discountAmount}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px dashed #000", marginTop: "2px", paddingTop: "2px" }}>
                  <div>TOTAL PAYABLE:</div>
                  <div>Rs. {registeredPatient.totalPayable}</div>
                </div>

                <div>--------------------------------</div>

                {/* Registration Info */}
                <div><strong>Registered By:</strong> {user?.email || 'Administrator'}</div>

                <div>--------------------------------</div>

                {/* Instructions - Updated with dynamic amount */}
                <div style={{ fontWeight: "bold", textAlign: "center", margin: "2px 0" }}>
                  IMPORTANT INSTRUCTIONS
                </div>
                <div>1. Present this token at reception</div>
                <div>2. Consultation with {registeredPatient.doctorName}</div>
                <div>3. Pay Rs. {registeredPatient.totalPayable} at counter</div>
                <div>4. Valid for today only</div>
                <div>5. Keep slip for reference</div>

                <div>--------------------------------</div>

                {/* Footer */}
                <div style={{ textAlign: "center", fontSize: "10px", marginTop: "8px" }}>
                  <div>Computer Generated Slip</div>
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

          {/* Prescription Search Section */}
          <div className="search-card no-print">
            <div className="search-header">
              <h3>Patient Prescriptions</h3>
              <p>Search for patient prescriptions using slip number</p>
            </div>

            <div className="search-container">
              <div className="search-input-group">
                <SearchIcon />
                <input
                  type="text"
                  className="search-input"
                  value={prescriptionSearch}
                  onChange={(e) => setPrescriptionSearch(e.target.value)}
                  placeholder="Enter patient slip number"
                />
              </div>

              <div className="search-buttons">
                <button
                  className="search-button"
                  onClick={searchPatientPrescriptions}
                  disabled={searching}
                >
                  {searching ? (
                    <>
                      <SpinnerIcon />
                      <span>Searching...</span>
                    </>
                  ) : 'Search'}
                </button>

                {patientData && (
                  <button className="clear-button" onClick={handleResetSearch}>
                    <CloseIcon />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {searching && (
              <div className="loading-state">
                <div className="spinner">
                  <SpinnerIcon />
                </div>
                <p>Searching patient...</p>
              </div>
            )}

            {searchError && (
              <div className="error-message">
                {searchError}
              </div>
            )}
          </div>

          {/* Patient Information */}
          {patientData && (
            <div className="patient-info-card no-print">
              <div className="patient-header">
                <h3>Patient Information</h3>
                <div className="slip-badge">Slip: {patientData.slip_number}</div>
              </div>

              <div className="patient-grid">
                <div className="info-card">
                  <UserIcon />
                  <div>
                    <div className="info-label">Patient Name</div>
                    <div className="info-value">{patientData.full_name}</div>
                  </div>
                </div>

                <div className="info-card">
                  <AgeIcon />
                  <div>
                    <div className="info-label">Age & Gender</div>
                    <div className="info-value">{patientData.age} years, {patientData.gender}</div>
                  </div>
                </div>

                <div className="info-card">
                  <PhoneIcon />
                  <div>
                    <div className="info-label">Contact Number</div>
                    <div className="info-value">{patientData.contact_number}</div>
                  </div>
                </div>

                <div className="info-card">
                  <DoctorIcon />
                  <div>
                    <div className="info-label">Doctor</div>
                    <div className="info-value">{patientData.doctor || 'N/A'}</div>
                  </div>
                </div>

                <div className="info-card">
                  <MoneyIcon />
                  <div>
                    <div className="info-label">Appointment Fee</div>
                    <div className="info-value">Rs. {patientData.appointment_fee || '0'}</div>
                  </div>
                </div>

                <div className="info-card">
                  <DiscountIcon />
                  <div>
                    <div className="info-label">Discount</div>
                    <div className="info-value">Rs. {patientData.discount_amount || '0'}</div>
                  </div>
                </div>

                <div className="info-card">
                  <TotalIcon />
                  <div>
                    <div className="info-label">Total Payable</div>
                    <div className="info-value">Rs. {patientData.total_payable || '0'}</div>
                  </div>
                </div>
              </div>

              {prescriptionHistory.length > 0 && (
                <div className="history-toggle">
                  <button
                    className="history-button"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <HistoryIcon />
                    <span>{showHistory ? 'Hide' : 'View'} Prescription History ({prescriptionHistory.length})</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Prescription History */}
          {showHistory && prescriptionHistory.length > 0 && (
            <div className="history-card no-print">
              <div className="history-header">
                <h3>Prescription History</h3>
                <span className="history-count">{prescriptionHistory.length} prescriptions</span>
              </div>

              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor</th>
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
                          <div className="history-doctor">
                            <DoctorIcon />
                            <span>{prescription.doctor_name}</span>
                          </div>
                        </td>
                        <td>
                          <div className="history-medicines">
                            <MedicineIcon />
                            <span>{prescription.medicines?.length || 0} medicines</span>
                          </div>
                        </td>
                        <td>
                          <div className="history-price">
                            <span>Rs. {prescription.total_price || calculatePrescriptionTotal(prescription)}</span>
                          </div>
                        </td>
                        <td>
                          <div className="history-actions">
                            <button
                              className="view-button"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              <ViewIcon />
                              <span>View</span>
                            </button>
                            <button
                              className="print-button"
                              onClick={() => handlePrintPrescription(prescription)}
                            >
                              <PrintIcon />
                              <span>Print</span>
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

          {/* Prescriptions Table Section */}
          <div className="prescriptions-table-section no-print">
            <div className="section-header">
              <div className="header-left">
                <h3>All Prescriptions</h3>
                <p>View and manage all patient prescriptions</p>
              </div>

              <div className="header-right">
                <div className="search-container">
                  <SearchIcon />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search prescriptions..."
                    value={prescriptionSearchTerm}
                    onChange={(e) => setPrescriptionSearchTerm(e.target.value)}
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

                <button
                  className="refresh-button"
                  onClick={fetchAllPrescriptions}
                  disabled={prescriptionsTableLoading}
                >
                  <RefreshIcon />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="prescriptions-table-container">
              {prescriptionsTableLoading ? (
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
                    <div className="table-cell">Doctor</div>
                    <div className="table-cell">Medicines</div>
                    <div className="table-cell">Total</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Actions</div>
                  </div>

                  {filteredPrescriptions.map((prescription) => {
                    const isExpanded = expandedRows[prescription.id];
                    const totalPrice = calculatePrescriptionTotal(prescription);

                    return (
                      <div key={prescription.id} className="prescription-row">
                        <div className="table-cell">
                          <div className="slip-number">{prescription.slip_number}</div>
                        </div>

                        <div className="table-cell">
                          <div className="patient-info">
                            <div className="patient-name">{prescription.patient_name}</div>
                          </div>
                        </div>

                        <div className="table-cell">
                          <div className="doctor-info">
                            <DoctorIcon />
                            <span>{prescription.doctor_name}</span>
                          </div>
                        </div>

                        <div className="table-cell">
                          <div className="medicines-count">
                            <MedicineIcon />
                            <span>{prescription.medicines?.length || 0} medicines</span>
                            {prescription.medicines?.length > 0 && (
                              <button
                                className="expand-button"
                                onClick={() => toggleRowExpansion(prescription.id)}
                              >
                                {isExpanded ? 'Hide' : 'Show'}
                              </button>
                            )}
                          </div>

                          {isExpanded && prescription.medicines?.length > 0 && (
                            <div className="medicines-preview">
                              {prescription.medicines.slice(0, 3).map((med, idx) => (
                                <div key={idx} className="medicine-preview">
                                  <span className="medicine-name">{med.brand_name}</span>
                                  <span className="medicine-quantity">×{med.quantity}</span>
                                </div>
                              ))}
                              {prescription.medicines.length > 3 && (
                                <div className="more-medicines">
                                  +{prescription.medicines.length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="table-cell">
                          <div className="total-price">
                            {/* <PriceIcon /> */}
                            <span>Rs. {totalPrice}</span>
                          </div>
                        </div>

                        <div className="table-cell">
                          {getStatusBadge(prescription.status)}
                        </div>

                        <div className="table-cell">
                          <div className="action-buttons">
                            <button
                              className="view-button"
                              onClick={() => handleViewPrescription(prescription)}
                            >
                              <ViewIcon />
                              <span>View</span>
                            </button>

                            <button
                              className="print-button"
                              onClick={() => handlePrintFromTable(prescription)}
                            >
                              <PrintIcon />
                              <span>Print</span>
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

          {/* Prescription Details Modal */}
          {selectedPrescription && (
            <div className="prescription-modal no-print">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Prescription Details</h3>
                  <button className="close-modal" onClick={() => setSelectedPrescription(null)}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="modal-body">
                  <div className="prescription-info">
                    <div className="info-row">
                      <span className="label">Date:</span>
                      <span className="value">
                        {new Date(selectedPrescription.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Dispensed by:</span>
                      <span className="value">{selectedPrescription.doctor_name}</span>
                    </div>
                    {/* <div className="info-row">
                      <span className="label">Diagnosis:</span>
                      <span className="value">{selectedPrescription.diagnosis || 'No diagnosis'}</span>
                    </div> */}
                  </div>

                  <div className="medicines-section">
                    <h4>Prescribed Medicines</h4>
                    {selectedPrescription.medicines?.length > 0 ? (
                      <div className="medicines-list">
                        {selectedPrescription.medicines.map((medicine, index) => (
                          <div key={index} className="medicine-item">
                            <div className="medicine-name">
                              <strong>{medicine.brand_name}</strong>
                              <span className="generic">({medicine.generic_name})</span>
                            </div>
                            <div className="medicine-details">
                              <span>{medicine.dosage}</span>
                              <span>×{medicine.quantity}</span>
                              <span>{medicine.form}</span>
                            </div>
                            <div className="medicine-instructions">
                              {medicine.dosage_instructions} for {medicine.duration_days} days
                            </div>
                            <div className="medicine-price">
                              Rs. {medicine.total_price}
                            </div>
                          </div>
                        ))}
                        <div className="total-price">
                          <strong>Total Price:</strong>
                          <span>Rs. {calculatePrescriptionTotal(selectedPrescription)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="no-medicines">No medicines prescribed</p>
                    )}
                  </div>

                  {selectedPrescription.prescription_text && (
                    <div className="additional-instructions">
                      <h4>Additional Instructions</h4>
                      <p>{selectedPrescription.prescription_text}</p>
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button className="print-prescription-button" onClick={() => handlePrintPrescription(selectedPrescription)}>
                    <PrintIcon />
                    <span>Print Prescription</span>
                  </button>
                  <button className="close-button" onClick={() => setSelectedPrescription(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Print Preview for Prescription */}
          {showPrescriptionPrint && selectedPrescription && (
            <div className="print-preview">
              <div className="thermal-print" style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                lineHeight: "1.1",
                maxWidth: "280px",
                margin: "0 auto"
              }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <div style={{ fontWeight: "bold" }}>YASIN PSYCHIATRIC HOSPITAL</div>
                  <div>Karachi</div>
                  <div>Ph: 0330-7997999</div>
                  <div>--------------------------------</div>
                </div>

                {/* Title */}
                <div style={{ textAlign: "center", fontWeight: "bold", margin: "4px 0" }}>
                  PRESCRIPTION
                </div>

                {/* Info */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>Date:</strong> {new Date(selectedPrescription.created_at).toLocaleDateString()}</div>
                  <div><strong>Slip:</strong> {selectedPrescription.slip_number}</div>
                </div>

                <div>--------------------------------</div>

                {/* Patient */}
                <div><strong>Patient:</strong> {patientData?.full_name || selectedPrescription.patient_name || 'Patient'}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>Age/G:</strong> {patientData?.age || 'N/A'}y / {patientData?.gender || 'N/A'}</div>
                  <div><strong>Ph:</strong> {patientData?.contact_number || 'N/A'}</div>
                </div>

                <div>--------------------------------</div>

                {/* Doctor */}
                <div><strong>Dispensod by:</strong> {selectedPrescription.doctor_name}</div>

                {/* Medicines */}
                <div style={{ fontWeight: "bold", textAlign: "center", margin: "2px 0" }}>
                  MEDICINES
                </div>

                {selectedPrescription.medicines?.map((m, i) => (
                  <div key={i} style={{ marginBottom: "6px" }}>
                    <div><strong>{i + 1}. {m.brand_name}</strong></div>
                    <div style={{ marginLeft: "8px" }}>({m.generic_name})</div>
                    <div style={{ marginLeft: "8px" }}>
                      Dose: {m.dosage} | Qty: {m.quantity}
                    </div>
                    <div style={{ marginLeft: "8px" }}>
                      {m.dosage_instructions}
                    </div>
                  </div>
                ))}

                <div>--------------------------------</div>

                {/* Total */}
                <div style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total: Rs. {calculatePrescriptionTotal(selectedPrescription)}
                </div>

                {/* Additional Instructions */}
                {selectedPrescription.prescription_text && (
                  <>
                    <div>--------------------------------</div>
                    <div><strong>Notes:</strong></div>
                    <div style={{ marginLeft: "8px" }}>{selectedPrescription.prescription_text}</div>
                  </>
                )}

                <div>--------------------------------</div>

                {/* Footer */}
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

          {/* Guidelines */}
          <div className="guidelines-card no-print">
            <h3>Registration Guidelines</h3>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <div className="guideline-number">01</div>
                <div>
                  <strong>Complete Information</strong>
                  <p>Ensure all required fields are filled accurately and completely.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">02</div>
                <div>
                  <strong>Doctor Selection</strong>
                  <p>Select a doctor from the dropdown. Appointment fee will be set automatically.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">03</div>
                <div>
                  <strong>Discount Entry</strong>
                  <p>Enter discount amount in Rs (not percentage). Discount cannot exceed appointment fee.</p>
                </div>
              </div>
<div className="guideline-item">
  <div className="guideline-number">04</div>
  <div>
    <strong>Token System</strong>
    <p>Token numbers automatically reset to 1 daily at 12:00 AM (midnight).</p>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .registration-page {
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

        .registration-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header */
        .registration-header {
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

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
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

        /* Token Counter */
        .token-counter {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #000000;
          color: #ffffff;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .token-label {
          color: rgba(255, 255, 255, 0.9);
        }

        .token-number {
          font-weight: 700;
          font-size: 16px;
        }

        .reset-token-button {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .reset-token-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(45deg);
        }

        /* Token Display in Form */
        .token-display {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 6px;
          font-size: 14px;
          flex-wrap: wrap;
        }

        .token-value {
          font-weight: 600;
          color: #000000;
        }

        .token-auto-reset {
          font-size: 12px;
          color: #666;
          margin-left: 4px;
          font-style: italic;
        }

        /* Success Card */
        .success-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-content {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .success-icon {
          width: 48px;
          height: 48px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 4px 0;
        }

        .success-content p {
          font-size: 14px;
          color: #666666;
          margin: 0;
        }

        .slip-display {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          margin-bottom: 32px;
        }

        .slip-label {
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .slip-number {
          font-size: 36px;
          font-weight: 800;
          color: #000000;
          letter-spacing: 3px;
          margin: 8px 0;
          font-family: 'Monaco', 'Courier New', monospace;
        }

        .slip-instructions {
          font-size: 12px;
          color: #999999;
          margin-top: 8px;
        }

        .success-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .primary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button:hover {
          background: #333333;
          transform: translateY(-1px);
        }

        .secondary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: #ffffff;
          color: #000000;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .secondary-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        /* Form Section Header */
        .form-section-header {
          margin: 24px 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #e5e5e5;
        }

        .form-section-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        /* Fee Summary */
        .fee-summary {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-row.total {
          border-top: 2px solid #000;
          margin-top: 8px;
          padding-top: 12px;
        }

        .summary-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .summary-value {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }

        .summary-value.discount {
          color: #dc3545;
        }

        .summary-value.total {
          color: #000;
          font-size: 18px;
        }

        /* Patients Table Section */
        .patients-table-section {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-left h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 4px 0;
        }

        .header-left p {
          color: #666666;
          margin: 0;
          font-size: 14px;
        }

        .header-right {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          min-width: 200px;
        }

        .search-input {
          border: none;
          outline: none;
          font-size: 14px;
          color: #000000;
          background: transparent;
          flex: 1;
        }

        /* NEW: Date Filter Button */
        .filter-date-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-date-button:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        .filter-date-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        /* NEW: Export Button */
        .export-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #28a745;
          color: #ffffff;
          border: 1px solid #28a745;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .export-button:hover:not(:disabled) {
          background: #218838;
          border-color: #1e7e34;
        }

        .export-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* NEW: Stats Button */
        .stats-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .stats-button:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        .stats-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .view-all-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #000000;
          color: #ffffff;
          border: 1px solid #000000;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-all-button:hover:not(:disabled) {
          background: #333333;
          border-color: #333333;
        }

        .view-all-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #666666;
          border-color: #666666;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 13px;
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

        /* NEW: Date Filter Section */
        .date-filter-section {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .filter-header h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .quick-filters {
          display: flex;
          gap: 8px;
        }

        .quick-filter-btn {
          padding: 6px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 12px;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-filter-btn:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        .date-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px;
          align-items: end;
        }

        .date-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .date-input-group label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
        }

        .date-input-group input {
          padding: 10px 12px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 14px;
          color: #000000;
          background: #ffffff;
        }

        .date-input-group input:focus {
          outline: none;
          border-color: #000000;
        }

        .date-filter-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .apply-filter-btn {
          padding: 10px 16px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-filter-btn:hover {
          background: #333333;
        }

        .reset-filter-btn {
          padding: 10px 16px;
          background: #ffffff;
          color: #666666;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-filter-btn:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        .active-filter-info {
          margin-top: 16px;
          padding: 12px;
          background: #e9f7fe;
          border: 1px solid #b8e2fb;
          border-radius: 6px;
          font-size: 13px;
          color: #0c5460;
        }

        /* NEW: Statistics Section */
        .stats-section {
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }

        .stat-label {
          font-size: 13px;
          color: #666666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
        }

        /* Updated table grid for doctor column */
        .table-header {
          display: grid;
          grid-template-columns: 1fr 2fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1.5fr 0.8fr;
          padding: 12px 16px;
          background: #fafafa;
          border-bottom: 1px solid #e5e5e5;
          font-size: 11px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .patient-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1.5fr 0.8fr;
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          align-items: center;
        }

        .patient-row:hover {
          background: #fafafa;
        }

        .patient-row.edit-mode {
          background: #f0f9ff;
        }

        .table-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 0;
        }

        .slip-number {
          font-family: 'Monaco', 'Courier New', monospace;
          font-weight: 600;
          color: #000000;
          font-size: 13px;
        }

        .patient-name {
          font-weight: 500;
          color: #000000;
          font-size: 13px;
        }

        .contact-info {
          font-size: 13px;
          color: #000000;
        }

        .age-gender {
          font-size: 13px;
          color: #000000;
        }

        .doctor-info {
          font-size: 13px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }

        .fee-info {
          font-weight: 600;
          color: #000000;
          font-size: 13px;
        }

        .discount-info {
          font-size: 13px;
          color: #666666;
        }

        .total-info {
          font-weight: 600;
          color: #000000;
          font-size: 13px;
        }

        .date-info {
          font-size: 12px;
          color: #666666;
        }

        .time-info {
          font-size: 11px;
          color: #999999;
          margin-top: 2px;
        }

        /* Edit Mode Styles */
        .edit-input {
          padding: 8px 12px;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          font-size: 13px;
          width: 100%;
          background: #ffffff;
        }

        .edit-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .edit-select {
          padding: 8px 12px;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          font-size: 13px;
          width: 100%;
          background: #ffffff;
          margin-bottom: 4px;
        }

        .edit-select:focus {
          outline: none;
          border-color: #007bff;
        }

        .age-input {
          margin-top: 4px;
          width: 100%;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .view-button, .edit-button, .delete-button, .save-button, .cancel-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .view-button {
          background: #f8f9fa;
          color: #6c757d;
          border: 1px solid #dee2e6;
        }

        .view-button:hover {
          background: #e9ecef;
          color: #495057;
        }

        .edit-button {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .edit-button:hover {
          background: #ffeaa7;
          color: #856404;
        }

        .delete-button {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .delete-button:hover:not(:disabled) {
          background: #f5c6cb;
          color: #721c24;
        }

        .delete-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .save-button {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .save-button:hover:not(:disabled) {
          background: #c3e6cb;
          color: #155724;
        }

        .save-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cancel-button {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .cancel-button:hover {
          background: #f5c6cb;
          color: #721c24;
        }

        /* Delete Confirmation Modal */
        .delete-confirm-modal {
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

        .delete-confirm-content {
          background: #ffffff;
          border-radius: 8px;
          padding: 24px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .delete-confirm-content h4 {
          margin: 0 0 16px 0;
          color: #000000;
          font-size: 18px;
          font-weight: 600;
        }

        .delete-confirm-content p {
          margin: 0 0 12px 0;
          color: #666666;
          font-size: 14px;
        }

        .warning-text {
          color: #dc3545 !important;
          font-weight: 500;
          margin-bottom: 20px !important;
        }

        .delete-confirm-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .confirm-delete-btn {
          padding: 10px 20px;
          background: #dc3545;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .confirm-delete-btn:hover:not(:disabled) {
          background: #c82333;
        }

        .confirm-delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-delete-btn {
          padding: 10px 20px;
          background: #6c757d;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-delete-btn:hover {
          background: #5a6268;
        }

        /* View Patient Modal */
        .view-patient-modal {
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

        .patient-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
        }

        .detail-label {
          font-size: 12px;
          color: #666666;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 14px;
          color: #000000;
          font-weight: 500;
        }

        /* Clear Filters Button */
        .clear-filters-btn {
          margin-top: 12px;
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 13px;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-filters-btn:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
        }

        .pagination-button {
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 36px;
        }

        .pagination-button:hover:not(:disabled) {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
        }

        .pagination-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .view-all-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
        }

        .view-all-info p {
          color: #666666;
          font-size: 14px;
          margin: 0;
        }

        .show-less-button {
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .show-less-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        /* Loading State */
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

        .empty-state {
          padding: 60px 24px;
          text-align: center;
          color: #666666;
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

        .search-buttons {
          display: flex;
          gap: 8px;
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-button:hover:not(:disabled) {
          background: #333333;
        }

        .search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
        }

        .clear-button:hover {
          background: #f5f5f5;
          border-color: #000000;
          color: #000000;
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

        /* Patient Info Card */
        .patient-info-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .patient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .patient-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .slip-badge {
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
          margin-bottom: 24px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
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
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }

        .history-toggle {
          display: flex;
          justify-content: center;
        }

        .history-button {
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

        .history-button:hover {
          background: #333333;
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

        .history-date, .history-doctor, .history-medicines, .history-price {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #000000;
        }

        .history-actions {
          display: flex;
          gap: 8px;
        }

        .view-button, .print-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-button {
          background: #ffffff;
          color: #000000;
          border: 1px solid #e5e5e5;
        }

        .view-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        .print-button {
          background: #000000;
          color: #ffffff;
          border: 1px solid #000000;
        }

        .print-button:hover {
          background: #333333;
          border-color: #333333;
        }

        /* Prescriptions Table Section */
        .prescriptions-table-section {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
          margin-top: 32px;
        }

        .filter-buttons {
          display: flex;
          gap: 4px;
        }

        .filter-button {
          padding: 6px 12px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          font-size: 11px;
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

        .prescriptions-table-container {
          overflow-x: auto;
        }

        .prescriptions-table {
          display: flex;
          flex-direction: column;
          min-width: 800px;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr;
          padding: 12px 16px;
          background: #fafafa;
          border-bottom: 1px solid #e5e5e5;
          font-size: 11px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .prescription-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr;
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }

        .prescription-row:hover {
          background: #fafafa;
        }

        .patient-info {
          display: flex;
          flex-direction: column;
        }

        .patient-name {
          font-weight: 500;
          color: #000000;
          font-size: 13px;
        }

        .doctor-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #000000;
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
          grid-column: 1 / -1;
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
          font-size: 13px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          width: fit-content;
          white-space: nowrap;
        }

        .action-buttons {
          display: flex;
          gap: 4px;
        }

        .view-button, .print-button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        /* Prescription Details Modal */
        .prescription-modal {
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
          max-width: 800px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .modal-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .close-modal {
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

        .close-modal:hover {
          background: #f5f5f5;
        }

        .modal-body {
          padding: 24px;
        }

        .prescription-info {
          display: grid;
          gap: 16px;
          margin-bottom: 32px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row .label {
          font-weight: 500;
          color: #666666;
        }

        .info-row .value {
          color: #000000;
          text-align: right;
        }

        .medicines-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 16px 0;
        }

        .medicines-list {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
        }

        .medicine-item {
          padding: 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .medicine-item:last-child {
          border-bottom: none;
        }

        .medicine-name {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .medicine-name strong {
          font-size: 15px;
          color: #000000;
        }

        .generic {
          font-size: 12px;
          color: #666666;
        }

        .medicine-details {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #666666;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .medicine-instructions {
          font-size: 13px;
          color: #000000;
          font-style: italic;
          background: rgba(0, 0, 0, 0.03);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .medicine-price {
          font-weight: 600;
          color: #000000;
          text-align: right;
          font-size: 14px;
        }

        .total-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-top: 2px solid #000000;
          background: #ffffff;
          font-size: 16px;
        }

        .no-medicines {
          padding: 32px;
          text-align: center;
          color: #666666;
          font-style: italic;
        }

        .additional-instructions {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e5e5;
        }

        .additional-instructions h4 {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 12px 0;
        }

        .additional-instructions p {
          font-size: 14px;
          color: #000000;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e5e5e5;
        }

        .print-prescription-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
        }

        .print-prescription-button:hover {
          background: #333333;
        }

        .close-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #ffffff;
          color: #000000;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
        }

        .close-button:hover {
          background: #f5f5f5;
          border-color: #000000;
        }

        /* Form Card */
        .form-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 8px 0;
        }

        .form-header p {
          color: #666666;
          margin: 0;
          font-size: 14px;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-grid.triple {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
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
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }

        .form-input.error {
          border-color: #dc3545;
        }

        .form-input.readonly {
          background: #f5f5f5;
          color: #666666;
          cursor: not-allowed;
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
        }

        .error-text {
          color: #dc3545;
          font-size: 12px;
          margin-top: 4px;
        }

        .form-error {
          padding: 12px 16px;
          background: rgba(220, 53, 69, 0.05);
          border: 1px solid rgba(220, 53, 69, 0.2);
          border-radius: 8px;
          color: #dc3545;
          font-size: 14px;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .submit-button {
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

        .submit-button svg {
          animation: spin 1s linear infinite;
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

        /* Print Preview Styles */
        .print-preview {
          display: none;
        }

        @media print {
          .print-preview {
            display: block;
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .date-inputs {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          
          .date-filter-actions {
            grid-column: 1 / -1;
            justify-content: center;
          }
          
          .table-header, .patient-row {
            grid-template-columns: 1fr 2fr 1.5fr 1fr 1.5fr 1fr 1fr 1fr 1.5fr 0.8fr;
          }
          
          .patient-row.edit-mode {
            grid-template-columns: 1fr 2fr 1.5fr 1fr 1.5fr 1fr 1fr 1fr 1.5fr 0.8fr;
          }
        }

        @media (max-width: 1024px) {
          .dashboard-container {
            padding: 20px;
          }

          .registration-header {
            flex-direction: column;
            gap: 16px;
          }

          .search-container {
            flex-direction: column;
            align-items: stretch;
          }

          .search-buttons {
            width: 100%;
          }

          .search-button, .clear-button {
            width: 100%;
            justify-content: center;
          }

          .patient-grid {
            grid-template-columns: 1fr 1fr;
          }

          .form-grid.triple {
            grid-template-columns: 1fr 1fr;
          }

          .history-actions {
            flex-direction: column;
            gap: 4px;
          }

          .view-button, .print-button {
            width: 100%;
            justify-content: center;
          }

          .modal-actions {
            flex-direction: column;
          }

          .print-prescription-button, .close-button {
            width: 100%;
          }

          .guidelines-grid {
            grid-template-columns: 1fr 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .header-right {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-container {
            width: 100%;
          }
          
          .filter-buttons {
            justify-content: center;
          }
          
          .table-header, .patient-row {
            grid-template-columns: 1fr 1.5fr 1fr 1fr 1.5fr 1fr 1fr 1fr 1.5fr 0.8fr;
          }
          
          .table-header, .prescription-row {
            grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr;
          }
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .header-right {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .table-header, .patient-row {
            grid-template-columns: 1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1.5fr 0.8fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .success-content {
            flex-direction: column;
            text-align: center;
          }

          .slip-number {
            font-size: 28px;
          }

          .success-actions {
            flex-direction: column;
          }

          .primary-button, .secondary-button {
            width: 100%;
          }

          .search-card, .patient-info-card, .form-card, .guidelines-card, .patients-table-section {
            padding: 20px;
          }

          .form-grid, .form-grid.triple {
            grid-template-columns: 1fr;
          }

          .history-table th, .history-table td {
            padding: 12px 16px;
          }

          .modal-content {
            margin: 10px;
            max-height: 90vh;
          }

          .submit-button {
            width: 100%;
            min-width: auto;
          }

          .header-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .token-counter {
            justify-content: center;
          }

          .patient-grid {
            grid-template-columns: 1fr;
          }

          .prescriptions-table-section {
            padding: 20px;
          }
          
          .table-header, .patient-row {
            grid-template-columns: 1fr 1fr 1fr;
            font-size: 10px;
          }
          
          /* Hide some columns on small screens for better mobile view */
          .table-header .table-cell:nth-child(4),
          .patient-row .table-cell:nth-child(4),
          .table-header .table-cell:nth-child(5),
          .patient-row .table-cell:nth-child(5),
          .table-header .table-cell:nth-child(6),
          .patient-row .table-cell:nth-child(6),
          .table-header .table-cell:nth-child(7),
          .patient-row .table-cell:nth-child(7),
          .table-header .table-cell:nth-child(8),
          .patient-row .table-cell:nth-child(8) {
            display: none;
          }
          
          /* Show only essential columns: Slip, Name, Actions */
          .table-header {
            grid-template-columns: 1fr 2fr 0.8fr;
          }
          
          .patient-row {
            grid-template-columns: 1fr 2fr 0.8fr;
          }
          
          .table-header, .prescription-row {
            grid-template-columns: 1fr 1fr 1fr;
            font-size: 10px;
          }
          
          .table-header .table-cell:nth-child(3),
          .prescription-row .table-cell:nth-child(3),
          .table-header .table-cell:nth-child(4),
          .prescription-row .table-cell:nth-child(4),
          .table-header .table-cell:nth-child(5),
          .prescription-row .table-cell:nth-child(5),
          .table-header .table-cell:nth-child(6),
          .prescription-row .table-cell:nth-child(6) {
            display: none;
          }
          
          .pagination {
            flex-wrap: wrap;
          }
          
          .date-inputs {
            grid-template-columns: 1fr;
          }
          
          .quick-filters {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          /* Mobile action buttons */
          .action-buttons {
            flex-direction: column;
            gap: 2px;
          }
          
          .view-button, .edit-button, .delete-button, .save-button, .cancel-button {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }
          
          .edit-input, .edit-select {
            padding: 6px 8px;
            font-size: 12px;
          }
          
          /* Mobile table cell adjustments */
          .table-cell {
            padding: 8px 0;
          }
          
          .patient-name {
            font-size: 12px;
          }
          
          .slip-number {
            font-size: 11px;
          }
          
          .view-all-info {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          
          .show-less-button {
            width: 100%;
          }
          
          .filter-header {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          
          .date-filter-actions {
            flex-direction: column;
            gap: 8px;
          }
          
          .apply-filter-btn, .reset-filter-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 12px;
          }

          .page-title {
            font-size: 20px;
          }

          .slip-number {
            font-size: 24px;
            letter-spacing: 2px;
          }

          .history-table {
            font-size: 12px;
          }

          .history-table th, .history-table td {
            padding: 8px 12px;
          }

          .info-card {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .modal-header {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .close-modal {
            align-self: flex-end;
          }

          .guidelines-grid {
            grid-template-columns: 1fr;
          }

          .form-input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .token-counter {
            padding: 8px 12px;
            font-size: 12px;
          }

          .token-number {
            font-size: 14px;
          }

          .fee-summary {
            padding: 16px;
          }

          .summary-label {
            font-size: 13px;
          }

          .summary-value {
            font-size: 14px;
          }

          .summary-value.total {
            font-size: 16px;
          }

          .prescriptions-table-section, .patients-table-section {
            padding: 16px;
          }
          
          .filter-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .filter-button {
            padding: 4px 8px;
            font-size: 10px;
          }
          
          .action-buttons {
            flex-direction: row;
            gap: 2px;
          }
          
          .view-button, .edit-button, .delete-button, .save-button, .cancel-button {
            width: 26px;
            height: 26px;
            font-size: 11px;
          }
          
          .view-button span, .print-button span {
            display: none;
          }
          
          .view-all-info {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          
          .show-less-button {
            width: 100%;
          }
          
          .filter-header {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }
          
          .date-filter-actions {
            flex-direction: column;
            gap: 8px;
          }
          
          .apply-filter-btn, .reset-filter-btn {
            width: 100%;
          }
          
          /* Extra small screens - show minimal columns */
          .table-header {
            grid-template-columns: 1fr 1fr 0.6fr;
            font-size: 9px;
          }
          
          .patient-row {
            grid-template-columns: 1fr 1fr 0.6fr;
            font-size: 9px;
          }
          
          /* Hide time info on mobile */
          .time-info {
            display: none;
          }
          
          .date-info {
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .dashboard-container {
            padding: 10px;
          }

          .form-card, .guidelines-card, .success-card, .search-card, .patient-info-card, .patients-table-section {
            padding: 16px;
          }

          .slip-number {
            font-size: 20px;
          }

          .submit-button {
            padding: 14px 20px;
            font-size: 14px;
          }

          .table-header, .patient-row, .prescription-row {
            grid-template-columns: 1fr;
          }

          /* Hide all but essential columns on extra small screens */
          .patient-row .table-cell:nth-child(2),
          .prescription-row .table-cell:nth-child(2) {
            display: none;
          }

          .view-button span {
            display: none;
          }

          .patient-name {
            font-size: 14px;
          }

          .medicine-item {
            padding: 12px;
          }

          .medicines-total {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientRegistration;