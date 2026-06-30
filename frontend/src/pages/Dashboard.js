import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Custom SVG Icons
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

const DoctorPrescription = () => {
  const { user } = useAuth();
  const [slipNumber, setSlipNumber] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    prescription_text: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
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
          params: { slip_number: slipNumber },
          cancelToken: cancelToken.current.token
        }
      );

      if (response.data.success) {
        setPatientData(response.data.data);

        const prescriptionResponse = await axios.get(
          `https://localhost/backend/api/prescriptions.php`,
          {
            params: { slip_number: slipNumber },
            cancelToken: cancelToken.current.token
          }
        );

        if (prescriptionResponse.data.success) {
          const presArr = prescriptionResponse.data.data;
          setPrescriptionHistory(presArr);

          if (Array.isArray(presArr) && presArr.length > 0) {
            const latest = presArr[0];
            setPrescriptionData({
              diagnosis: latest.diagnosis || '',
              prescription_text: latest.prescription_text || ''
            });
            setSelectedPrescription(latest);
          } else {
            setPrescriptionData({ diagnosis: '', prescription_text: '' });
          }
        } else {
          setPrescriptionData({ diagnosis: '', prescription_text: '' });
          setPrescriptionHistory([]);
        }
      } else {
        setPatientData(null);
        setPrescriptionHistory([]);
        setError('Patient not found with this slip number');
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Previous request canceled');
      } else {
        console.error('Fetch error:', err);
        setPatientData(null);
        setPrescriptionHistory([]);
        setError('Error fetching patient data');
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
      diagnosis: prescriptionData.diagnosis,
      prescription_text: prescriptionData.prescription_text
    };

    try {
      const response = await axios.post(
        'https://localhost/backend/api/prescriptions.php',
        payload,
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );

      if (response && response.data && response.data.success) {
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
      diagnosis: prescription.diagnosis || '',
      prescription_text: prescription.prescription_text || ''
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
    setPrescriptionData({ diagnosis: '', prescription_text: '' });
    setPrescriptionHistory([]);
    setSelectedPrescription(null);
    setError('');
  };

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
        background: white;
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
                Access patient details and write prescriptions using slip number
              </p>
            </div>
            
            {patientData && (
              <div className="header-actions">
                <button
                  className="action-button"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <HistoryIcon />
                  <span>{showHistory ? 'Hide History' : 'View History'}</span>
                </button>
                {selectedPrescription && (
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

          {/* Search Section */}
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

          {/* Prescription History */}
          {showHistory && prescriptionHistory.length > 0 && (
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
                      <th>Diagnosis</th>
                      <th>Doctor</th>
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
                          <div className="history-diagnosis">
                            {prescription.diagnosis?.substring(0, 60) || 'No diagnosis'}
                            {prescription.diagnosis?.length > 60 && '...'}
                          </div>
                        </td>
                        <td>
                          <div className="history-doctor">
                            {prescription.doctor_name || 'Unknown'}
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

          {patientData && (
            <>
              {/* Print Preview */}
              {showPrintPreview && selectedPrescription && (
                <div className="print-preview">
                  <div className="prescription-print">
                    <div className="print-header">
                      <h1>Yasin Psychiatric Hospital</h1>
                      <p className="hospital-address">123 Medical Street, Karachi, Pakistan</p>
                      <p className="hospital-contact">Phone: (021) 123-4567 | Email: info@yasinpsychiatric.com</p>
                    </div>
                    
                    <div className="print-meta">
                      <div>
                        <div className="print-title">PRESCRIPTION</div>
                        <div className="print-serial">Serial No: {slipNumber}</div>
                      </div>
                      <div className="print-date">
                        <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                        <div><strong>Time:</strong> {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </div>
                    </div>

                    <div className="print-section">
                      <h3>PATIENT INFORMATION</h3>
                      <div className="patient-info-grid">
                        <div><strong>Patient Name:</strong> {patientData.full_name}</div>
                        <div><strong>Age/Gender:</strong> {patientData.age} years, {patientData.gender}</div>
                        <div><strong>Contact:</strong> {patientData.contact_number}</div>
                        <div><strong>Slip Number:</strong> {slipNumber}</div>
                      </div>
                    </div>

                    <div className="print-section">
                      <h3>DIAGNOSIS</h3>
                      <div className="diagnosis-box">
                        {selectedPrescription.diagnosis || 'No diagnosis provided'}
                      </div>
                    </div>

                    <div className="print-section">
                      <h3>PRESCRIPTION</h3>
                      <div className="prescription-box">
                        {selectedPrescription.prescription_text}
                      </div>
                    </div>

                    <div className="print-section">
                      <h3>INSTRUCTIONS</h3>
                      <div className="instructions-box">
                        • Take medications as directed<br/>
                        • Follow up if symptoms persist<br/>
                        • Store medications properly<br/>
                        • Avoid alcohol while on medication
                      </div>
                    </div>

                    <div className="signature-section">
                      <div className="signature-box">
                        <div className="signature-line" />
                        <div className="signature-label">Doctor's Signature</div>
                        <div className="signature-name">{user?.name || 'Dr. Unknown'}</div>
                        <div className="signature-title">Consultant Psychiatrist</div>
                        <div className="signature-license">License No: PK-MC-12345</div>
                      </div>
                      
                      <div className="signature-box">
                        <div className="signature-line" />
                        <div className="signature-label">Patient's Signature</div>
                        <div className="signature-placeholder">......................................</div>
                      </div>
                    </div>

                    <div className="print-footer">
                      This is a computer-generated prescription. Valid only with hospital stamp and doctor's signature.
                    </div>
                  </div>
                </div>
              )}

              {/* Main Form */}
              <div className="form-card no-print">
                <div className="form-header">
                  <h3>Patient Information</h3>
                  <div className="slip-number">Slip: {slipNumber}</div>
                </div>
                
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

                <form onSubmit={handleSubmit} className="prescription-form">
                  <div className="form-group">
                    <label className="form-label">Diagnosis</label>
                    <textarea
                      className="form-input diagnosis-input"
                      value={prescriptionData.diagnosis}
                      onChange={(e) => setPrescriptionData({
                        ...prescriptionData,
                        diagnosis: e.target.value
                      })}
                      placeholder="Enter medical diagnosis..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prescription Details *</label>
                    <textarea
                      className="form-input prescription-input"
                      value={prescriptionData.prescription_text}
                      onChange={(e) => setPrescriptionData({
                        ...prescriptionData,
                        prescription_text: e.target.value
                      })}
                      placeholder="Enter prescription details including medicines, dosage, frequency, and instructions..."
                      rows="8"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <SpinnerIcon />
                          <span>Saving...</span>
                        </>
                      ) : 'Save Prescription'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* Guidelines */}
          <div className="guidelines-card no-print">
            <h3>Prescription Guidelines</h3>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <div className="guideline-number">01</div>
                <div>
                  <strong>Verify Patient Identity</strong>
                  <p>Always confirm patient identity using slip number and personal details.</p>
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

        .history-diagnosis {
          font-size: 14px;
          color: #000000;
          max-width: 300px;
        }

        .history-doctor {
          font-size: 14px;
          color: #000000;
          font-weight: 500;
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

        .prescription-print {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
          color: #000000;
        }

        .print-header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #000000;
        }

        .print-header h1 {
          font-size: 32px;
          margin: 0 0 10px 0;
          color: #000000;
        }

        .hospital-address {
          font-size: 14px;
          color: #666666;
          margin: 0 0 5px 0;
        }

        .hospital-contact {
          font-size: 12px;
          color: #999999;
          margin: 0;
        }

        .print-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #000000;
        }

        .print-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .print-serial {
          font-size: 12px;
          color: #666666;
        }

        .print-date {
          text-align: right;
          font-size: 14px;
        }

        .print-date div {
          margin-bottom: 4px;
        }

        .print-section {
          margin-bottom: 25px;
        }

        .print-section h3 {
          font-size: 16px;
          margin: 0 0 15px 0;
          color: #000000;
          padding-bottom: 5px;
          border-bottom: 1px solid #000000;
        }

        .patient-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          font-size: 14px;
        }

        .diagnosis-box, .prescription-box {
          border: 1px solid #000000;
          padding: 15px;
          min-height: 80px;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-line;
        }

        .prescription-box {
          min-height: 250px;
        }

        .instructions-box {
          padding: 10px 15px;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.8;
        }

        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
          padding-top: 20px;
        }

        .signature-box {
          width: 250px;
          text-align: center;
        }

        .signature-line {
          border-top: 1px solid #000000;
          margin: 0 auto 10px;
          width: 200px;
        }

        .signature-label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .signature-name {
          font-size: 16px;
          margin-bottom: 2px;
        }

        .signature-title {
          font-size: 12px;
          color: #666666;
          margin-bottom: 2px;
        }

        .signature-license {
          font-size: 11px;
          color: #999999;
        }

        .signature-placeholder {
          margin-top: 30px;
          color: #666666;
          font-style: italic;
        }

        .print-footer {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 1px solid #eeeeee;
          text-align: center;
          font-size: 11px;
          color: #999999;
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
          padding: 14px 16px;
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

        .diagnosis-input {
          min-height: 100px;
        }

        .prescription-input {
          min-height: 250px;
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
          .search-card {
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

          .signature-section {
            flex-direction: column;
            gap: 30px;
          }

          .signature-box {
            width: 100%;
          }

          .patient-info-grid {
            grid-template-columns: 1fr;
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
          }

          .guideline-item {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          .dashboard-container {
            padding: 12px;
          }

          .form-card,
          .guidelines-card,
          .search-card {
            padding: 16px;
          }

          .search-input {
            font-size: 14px;
          }

          .info-value {
            font-size: 14px;
          }

          .submit-button {
            padding: 14px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorPrescription;
