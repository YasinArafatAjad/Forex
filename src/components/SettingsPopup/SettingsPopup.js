import React, { useState, useEffect } from 'react';
import './SettingsPopup.css';

const SettingsPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [timezone, setTimezone] = useState('UTC');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // Add effect to handle clicks outside dropdowns
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if click is outside any dropdown container
      const isOutsideLanguage = !e.target.closest('.settings-dropdown-container');
      const isOutsideTimezone = !e.target.closest('.settings-dropdown-container');
      
      if (isLanguageDropdownOpen && isOutsideLanguage) {
        setIsLanguageDropdownOpen(false);
      }
      
      if (isTimezoneDropdownOpen && isOutsideTimezone) {
        setIsTimezoneDropdownOpen(false);
      }
    };

    // Only add listener when dropdowns are open
    if (isLanguageDropdownOpen || isTimezoneDropdownOpen) {
      document.addEventListener('click', handleDocumentClick);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isLanguageDropdownOpen, isTimezoneDropdownOpen]);

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  const handleOutsideClick = (e) => {
    // Close dropdowns when clicking outside
    if (isLanguageDropdownOpen || isTimezoneDropdownOpen) {
      setIsLanguageDropdownOpen(false);
      setIsTimezoneDropdownOpen(false);
    }
  };

  const handleLanguageSelect = (selectedLanguage, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setLanguage(selectedLanguage);
    setIsLanguageDropdownOpen(false);
  };

  const handleTimezoneSelect = (selectedTimezone, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setTimezone(selectedTimezone);
    setIsTimezoneDropdownOpen(false);
  };

  const handleLanguageDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    if (isTimezoneDropdownOpen) {
      setIsTimezoneDropdownOpen(false);
    }
  };

  const handleTimezoneDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsTimezoneDropdownOpen(!isTimezoneDropdownOpen);
    if (isLanguageDropdownOpen) {
      setIsLanguageDropdownOpen(false);
    }
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', {
      language,
      theme,
      timezone,
      notifications,
      soundEnabled,
      autoSave
    });
    onClose();
  };

  const handleResetSettings = () => {
    setLanguage('en');
    setTheme('light');
    setTimezone('UTC');
    setNotifications(true);
    setSoundEnabled(true);
    setAutoSave(true);
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' }
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
    { value: 'JST', label: 'JST (Japan Standard Time)' },
    { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' },
    { value: 'IST', label: 'IST (Indian Standard Time)' }
  ];

  return (
    <div className="settings-overlay" onClick={handleClose}>
      <div className="settings-popup">
        {/* Header */}
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button className="settings-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          <button 
            className={`settings-tab-button ${activeTab === 'GENERAL' ? 'active' : ''}`}
            onClick={() => setActiveTab('GENERAL')}
          >
            General
          </button>
          <button 
            className={`settings-tab-button ${activeTab === 'NOTIFICATIONS' ? 'active' : ''}`}
            onClick={() => setActiveTab('NOTIFICATIONS')}
          >
            Notifications
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
                     {activeTab === 'GENERAL' && (
             <div className="settings-section">
               <h3 className="settings-section-title">General Settings</h3>
               
               <div className="settings-form-group">
                 <label className="settings-form-label">Time Zone</label>
                 <div className="settings-dropdown-container">
                                        <button
                       type="button"
                       className="settings-dropdown-button"
                       onClick={handleTimezoneDropdownToggle}
                     >
                     <span className="settings-dropdown-display">
                       {timezones.find(tz => tz.value === timezone)?.label || 'Select Time Zone'}
                     </span>
                     <svg 
                       className={`settings-dropdown-arrow ${isTimezoneDropdownOpen ? 'rotated' : ''}`} 
                       width="16" 
                       height="16" 
                       viewBox="0 0 16 16" 
                       fill="none"
                     >
                       <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </button>
                   
                   {isTimezoneDropdownOpen && (
                     <div className="settings-dropdown">
                       {timezones.map((timezoneOption) => (
                                                   <button
                            key={timezoneOption.value}
                            className={`settings-dropdown-option ${timezone === timezoneOption.value ? 'selected' : ''}`}
                            onClick={(e) => handleTimezoneSelect(timezoneOption.value, e)}
                          >
                           {timezoneOption.label}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>

               <div className="settings-form-group">
                 <label className="settings-form-label">Language</label>
                 <div className="settings-dropdown-container">
                                        <button
                       type="button"
                       className="settings-dropdown-button"
                       onClick={handleLanguageDropdownToggle}
                     >
                     <span className="settings-dropdown-display">
                       {languages.find(lang => lang.value === language)?.label || 'Select Language'}
                     </span>
                     <svg 
                       className={`settings-dropdown-arrow ${isLanguageDropdownOpen ? 'rotated' : ''}`} 
                       width="16" 
                       height="16" 
                       viewBox="0 0 16 16" 
                       fill="none"
                     >
                       <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </button>
                   
                   {isLanguageDropdownOpen && (
                     <div className="settings-dropdown">
                       {languages.map((languageOption) => (
                                                   <button
                            key={languageOption.value}
                            className={`settings-dropdown-option ${language === languageOption.value ? 'selected' : ''}`}
                            onClick={(e) => handleLanguageSelect(languageOption.value, e)}
                          >
                           {languageOption.label}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>

               <div className="settings-form-group">
                 <label className="settings-form-label">Theme</label>
                 <div className="theme-options">
                   <label className="theme-option">
                     <input 
                       type="radio" 
                       name="theme" 
                       value="light"
                       checked={theme === 'light'}
                       onChange={(e) => setTheme(e.target.value)}
                     />
                     <span className="theme-option-text">Light</span>
                   </label>
                   <label className="theme-option">
                     <input 
                       type="radio" 
                       name="theme" 
                       value="dark"
                       checked={theme === 'dark'}
                       onChange={(e) => setTheme(e.target.value)}
                     />
                     <span className="theme-option-text">Dark</span>
                   </label>
                   <label className="theme-option">
                     <input 
                       type="radio" 
                       name="theme" 
                       value="auto"
                       checked={theme === 'auto'}
                       onChange={(e) => setTheme(e.target.value)}
                     />
                     <span className="theme-option-text">Auto</span>
                   </label>
                 </div>
               </div>

               <div className="settings-form-group">
                 <label className="settings-form-label">Auto Save</label>
                 <div className="toggle-switch">
                   <input 
                     type="checkbox" 
                     id="autoSave"
                     checked={autoSave}
                     onChange={(e) => setAutoSave(e.target.checked)}
                   />
                   <label htmlFor="autoSave" className="toggle-label"></label>
                 </div>
               </div>
             </div>
           )}



          {activeTab === 'NOTIFICATIONS' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Notification Settings</h3>
              
              <div className="settings-form-group">
                <label className="settings-form-label">Enable Notifications</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="notifications"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <label htmlFor="notifications" className="toggle-label"></label>
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Sound Alerts</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="soundEnabled"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                  />
                  <label htmlFor="soundEnabled" className="toggle-label"></label>
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-form-label">Notification Types</label>
                <div className="notification-options">
                  <label className="notification-option">
                    <input type="checkbox" defaultChecked />
                    <span className="notification-option-text">Trade execution</span>
                  </label>
                  <label className="notification-option">
                    <input type="checkbox" defaultChecked />
                    <span className="notification-option-text">Price alerts</span>
                  </label>
                  <label className="notification-option">
                    <input type="checkbox" defaultChecked />
                    <span className="notification-option-text">Account updates</span>
                  </label>
                  <label className="notification-option">
                    <input type="checkbox" />
                    <span className="notification-option-text">News updates</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="settings-action-buttons">
          <button className="settings-reset-button" onClick={handleResetSettings}>
            Reset to Default
          </button>
          <button className="settings-save-button" onClick={handleSaveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
