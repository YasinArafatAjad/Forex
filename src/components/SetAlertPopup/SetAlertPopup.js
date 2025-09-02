import React, { useState } from 'react';
import './SetAlertPopup.css';

const SetAlertPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('SET_ALERT');
  const [isInstrumentDropdownOpen, setIsInstrumentDropdownOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({
    instrument: '',
    price: '',
    condition: 'ABOVE',
    notificationType: 'POPUP',
    description: ''
  });
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      instrument: 'EURUSD',
      price: '1.0850',
      condition: 'ABOVE',
      status: 'ACTIVE',
      createdAt: '2024-01-15 10:30'
    },
    {
      id: 2,
      instrument: 'GBPUSD',
      price: '1.2650',
      condition: 'BELOW',
      status: 'ACTIVE',
      createdAt: '2024-01-14 15:45'
    }
  ]);

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInstrumentSelect = (instrument) => {
    setAlertForm(prev => ({
      ...prev,
      instrument: instrument
    }));
    setIsInstrumentDropdownOpen(false);
  };

  const handleCreateAlert = () => {
    if (alertForm.instrument && alertForm.price) {
      const newAlert = {
        id: Date.now(),
        instrument: alertForm.instrument,
        price: alertForm.price,
        condition: alertForm.condition,
        status: 'ACTIVE',
        createdAt: new Date().toLocaleString('tr-TR')
      };
      
      setAlerts(prev => [newAlert, ...prev]);
      
      // Reset form
      setAlertForm({
        instrument: '',
        price: '',
        condition: 'ABOVE',
        notificationType: 'POPUP',
        description: ''
      });
    }
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleToggleAlertStatus = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: alert.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
        : alert
    ));
  };

  const instruments = [
    'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCHF',
    'EURGBP', 'EURJPY', 'GBPJPY', 'CADCHF', 'CADJPY',
    'CHFJPY', 'EURCAD', 'NZDUSD', 'USDCAD', 'AUDJPY'
  ];

  return (
    <div className="set-alert-overlay" onClick={handleClose}>
      <div className="set-alert-popup">
        {/* Header */}
        <div className="set-alert-header">
          <h2 className="set-alert-title">Set Alert</h2>
          <button className="set-alert-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="set-alert-tabs">
          <button 
            className={`set-alert-tab-button ${activeTab === 'SET_ALERT' ? 'active' : ''}`}
            onClick={() => setActiveTab('SET_ALERT')}
          >
            Set Alert
          </button>
          <button 
            className={`set-alert-tab-button ${activeTab === 'ADDED_ALERTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('ADDED_ALERTS')}
          >
            Added Alerts
          </button>
        </div>

        {/* Content */}
        <div className="set-alert-content">
          {activeTab === 'SET_ALERT' ? (
            <div className="set-alert-form-container">
              <div className="info-section">
                <h3>Create New Price Alert</h3>
                <p>Set price alerts for your favorite instruments to get notified when prices reach your target levels.</p>
              </div>
              
              <div className="set-alert-form">
                <div className="set-alert-form-group">
                  <label className="set-alert-form-label">Instrument</label>
                  <div className="instrument-selector-container">
                    <button
                      type="button"
                      className="instrument-selector-button"
                      onClick={() => setIsInstrumentDropdownOpen(!isInstrumentDropdownOpen)}
                    >
                      <span className="instrument-display">
                        {alertForm.instrument || 'Select Instrument'}
                      </span>
                      <svg 
                        className={`dropdown-arrow ${isInstrumentDropdownOpen ? 'rotated' : ''}`} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {isInstrumentDropdownOpen && (
                      <div className="instrument-dropdown">
                        {instruments.map((instrument) => (
                          <button
                            key={instrument}
                            className={`instrument-option ${alertForm.instrument === instrument ? 'selected' : ''}`}
                            onClick={() => handleInstrumentSelect(instrument)}
                          >
                            {instrument}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="set-alert-form-group">
                  <label className="set-alert-form-label">Price Level</label>
                  <input 
                    type="number" 
                    name="price"
                    className="set-alert-form-input" 
                    placeholder="1.0850"
                    step="0.0001"
                    value={alertForm.price}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="set-alert-form-group">
                  <label className="set-alert-form-label">Condition</label>
                  <div className="condition-buttons">
                    <button
                      type="button"
                      className={`condition-btn above ${alertForm.condition === 'ABOVE' ? 'active' : ''}`}
                      onClick={() => setAlertForm(prev => ({ ...prev, condition: 'ABOVE' }))}
                    >
                      Above
                    </button>
                    <button
                      type="button"
                      className={`condition-btn equal ${alertForm.condition === 'EQUAL' ? 'active' : ''}`}
                      onClick={() => setAlertForm(prev => ({ ...prev, condition: 'EQUAL' }))}
                    >
                      Equal
                    </button>
                    <button
                      type="button"
                      className={`condition-btn below ${alertForm.condition === 'BELOW' ? 'active' : ''}`}
                      onClick={() => setAlertForm(prev => ({ ...prev, condition: 'BELOW' }))}
                    >
                      Below
                    </button>
                  </div>
                </div>
                
                <div className="set-alert-form-group">
                  <label className="set-alert-form-label">Notification Type</label>
                  <div className="notification-buttons">
                    <button
                      type="button"
                      className={`notification-btn ${alertForm.notificationType === 'POPUP' ? 'active' : ''}`}
                      onClick={() => setAlertForm(prev => ({ ...prev, notificationType: 'POPUP' }))}
                    >
                      Popup
                    </button>
                    <button
                      type="button"
                      className={`notification-btn ${alertForm.notificationType === 'EMAIL' ? 'active' : ''}`}
                      onClick={() => setAlertForm(prev => ({ ...prev, notificationType: 'EMAIL' }))}
                    >
                      Email
                    </button>
                  </div>
                </div>
                
                <div className="set-alert-form-group">
                  <label className="set-alert-form-label">Description (Optional)</label>
                  <textarea 
                    name="description"
                    className="set-alert-form-textarea" 
                    placeholder="Add a description for this alert..."
                    rows="3"
                    value={alertForm.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="set-alert-action-buttons">
                <button 
                  className={`create-alert-button ${!alertForm.instrument || !alertForm.price ? 'disabled' : ''}`}
                  onClick={handleCreateAlert}
                  disabled={!alertForm.instrument || !alertForm.price}
                >
                  Create Alert
                </button>
              </div>
            </div>
          ) : (
            <div className="added-alerts-container">
              <div className="info-section">
                <h3>Your Active Alerts</h3>
                <p>Manage and monitor your price alerts. You can activate, deactivate, or delete alerts as needed.</p>
              </div>
              
              {alerts.length === 0 ? (
                <div className="no-alerts">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ color: '#ccc' }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                  <p>No alerts created yet</p>
                  <p className="no-alerts-subtitle">Create your first price alert to get started</p>
                </div>
              ) : (
                <div className="alerts-list">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="alert-item">
                      <div className="alert-info">
                        <div className="alert-header">
                          <span className="alert-instrument">{alert.instrument}</span>
                          <span className={`alert-status ${alert.status.toLowerCase()}`}>
                            {alert.status}
                          </span>
                        </div>
                        <div className="alert-details">
                          <span className="alert-condition">
                            {alert.condition === 'ABOVE' ? '>' : alert.condition === 'BELOW' ? '<' : '='} {alert.price}
                          </span>
                          <span className="alert-date">{alert.createdAt}</span>
                        </div>
                      </div>
                      <div className="alert-actions">
                        <button 
                          className={`toggle-status-button ${alert.status === 'ACTIVE' ? 'deactivate' : 'activate'}`}
                          onClick={() => handleToggleAlertStatus(alert.id)}
                          title={alert.status === 'ACTIVE' ? 'Deactivate Alert' : 'Activate Alert'}
                        >
                          {alert.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="delete-alert-button"
                          onClick={() => handleDeleteAlert(alert.id)}
                          title="Delete Alert"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetAlertPopup;
