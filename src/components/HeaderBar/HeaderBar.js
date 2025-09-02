import React, { useState, useEffect, useRef } from 'react';
import './HeaderBar.css';

const HeaderBar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Update current time
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Get UTC offset
    const utcOffset = now.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(utcOffset / 60));
    const offsetSign = utcOffset <= 0 ? '+' : '-';
    const offsetString = `(${offsetSign}${offsetHours.toString().padStart(2, '0')})`;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      timeElement.textContent = `${timeString} ${offsetString}`;
    }
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // Update time every second
  useEffect(() => {
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-bar-container">
      <div className="header-metrics-container">
        <div className="metric-item balance-metric">
          <div className="metric-label">Balance</div>
          <div className="metric-value">€ 9,868.97</div>
        </div>
        
        <div className="metric-item credit-metric">
          <div className="metric-label">Credit</div>
          <div className="metric-value">€ 0.00</div>
        </div>
        
        <div className="metric-item equity-metric">
          <div className="metric-label">Equity</div>
          <div className="metric-value">€ 9,911.05</div>
        </div>
        
        <div className="metric-item margin-metric">
          <div className="metric-label">Margin Used / Free</div>
          <div className="metric-value">
            <span className="margin-used">€ 9,625.22</span>
            <span className="margin-separator"> / </span>
            <span className="margin-free">€ 9,625.22</span>
          </div>
        </div>
        
        <div className="metric-item margin-level-metric">
          <div className="metric-label">Margin Level</div>
          <div className="metric-value">+3467.46%</div>
        </div>
        
        <div className="metric-item unrealized-pl-metric">
          <div className="metric-label">Total Unrealized P/L</div>
          <div className="metric-value positive">+€ 42.08</div>
        </div>
        
        <div className="metric-item time-zone-metric">
          <div className="metric-label">Time Zone</div>
          <div className="metric-value" id="current-time">Loading...</div>
        </div>
      </div>

      <div className="profile-section header-profile-section" ref={profileMenuRef}>
        <div className="profile-menu-trigger header-profile-trigger" onClick={toggleProfileMenu}>
          <div className="profile-info header-profile-info">
            <div className="profile-title header-profile-title">John Doe 12345 - <span className="usd-part header-usd-part">USD</span></div>
          </div>
          <div className="profile-arrow header-profile-arrow">▼</div>
        </div>
        
        {isProfileMenuOpen && (
          <div className="profile-dropdown-menu header-profile-dropdown">
            <div className="menu-item header-menu-item header-withdrawal-item">
              <span className="menu-icon header-menu-icon">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon-svg">
                  <path d="M10.9258 0.46875L10.9258 8.59375C10.9258 8.71807 10.8764 8.8373 10.7885 8.92521C10.7006 9.01311 10.5814 9.0625 10.4571 9.0625C10.3327 9.0625 10.2135 9.01311 10.1256 8.92521C10.0377 8.8373 9.98831 8.71807 9.98831 8.59375L9.98831 1.6L0.788307 10.8C0.699448 10.8828 0.581919 10.9279 0.460481 10.9257C0.339043 10.9236 0.223177 10.8744 0.137294 10.7885C0.0514105 10.7026 0.00221566 10.5868 7.30296e-05 10.4653C-0.00206961 10.3439 0.0430072 10.2264 0.125807 10.1375L9.32581 0.9375L2.33206 0.9375C2.20774 0.9375 2.08851 0.888114 2.0006 0.800206C1.91269 0.712298 1.86331 0.59307 1.86331 0.46875C1.86331 0.34443 1.91269 0.225201 2.0006 0.137294C2.08851 0.049386 2.20774 0 2.33206 0L10.4571 0C10.5814 0 10.7006 0.049386 10.7885 0.137294C10.8764 0.225201 10.9258 0.34443 10.9258 0.46875Z"/>
                </svg>
              </span>
              <span className="menu-text header-menu-text">Withdrawal</span>
            </div>
            <div className="menu-item header-menu-item header-deposit-item">
              <span className="menu-icon header-menu-icon">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon-svg">
                <path d="M-2.66619e-05 10.4571L-2.59516e-05 2.33206C-2.59407e-05 2.20774 0.0493601 2.08851 0.137267 2.0006C0.225175 1.9127 0.344404 1.86331 0.468724 1.86331C0.593044 1.86331 0.712273 1.9127 0.800181 2.0006C0.888088 2.08851 0.937475 2.20774 0.937475 2.33206L0.937475 9.32581L10.1375 0.125812C10.2263 0.0430126 10.3439 -0.0020638 10.4653 7.91147e-05C10.5867 0.00222108 10.7026 0.0514164 10.7885 0.1373C10.8744 0.223183 10.9236 0.339048 10.9257 0.460486C10.9279 0.581924 10.8828 0.699453 10.8 0.788313L1.59997 9.98831L8.59372 9.98831C8.71804 9.98831 8.83727 10.0377 8.92518 10.1256C9.01309 10.2135 9.06247 10.3327 9.06247 10.4571C9.06247 10.5814 9.01309 10.7006 8.92518 10.7885C8.83727 10.8764 8.71804 10.9258 8.59372 10.9258L0.468723 10.9258C0.344403 10.9258 0.225174 10.8764 0.137266 10.7885C0.0493593 10.7006 -2.66728e-05 10.5814 -2.66619e-05 10.4571Z"/>
                </svg>
              </span>
              <span className="menu-text header-menu-text">Deposit</span>
            </div>
            <div className="menu-item header-menu-item header-stats-item">
              <span className="menu-icon header-menu-icon">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon-svg">
                  <path d="M15.9688 13.25C15.9688 13.3743 15.9194 13.4935 15.8315 13.5815C15.7435 13.6694 15.6243 13.7188 15.5 13.7188H0.5C0.37568 13.7188 0.256451 13.6694 0.168544 13.5815C0.080636 13.4935 0.03125 13.3743 0.03125 13.25V0.75C0.03125 0.62568 0.080636 0.506451 0.168544 0.418544C0.256451 0.330636 0.37568 0.28125 0.5 0.28125C0.62432 0.28125 0.743549 0.330636 0.831456 0.418544C0.919364 0.506451 0.96875 0.62568 0.96875 0.75V9.61875L5.16875 5.41875C5.25664 5.33097 5.37578 5.28166 5.5 5.28166C5.62422 5.28166 5.74336 5.33097 5.83125 5.41875L8 7.58672L12.4938 3.09375H10.5C10.3757 3.09375 10.2565 3.04436 10.1685 2.95646C10.0806 2.86855 10.0312 2.74932 10.0312 2.625C10.0312 2.50068 10.0806 2.38145 10.1685 2.29354C10.2565 2.20564 10.3757 2.15625 10.5 2.15625H13.625C13.7493 2.15625 13.8685 2.20564 13.9565 2.29354C14.0444 2.38145 14.0938 2.50068 14.0938 2.625V5.75C14.0938 5.87432 14.0444 5.99355 13.9565 6.08146C13.8685 6.16936 13.7493 6.21875 13.625 6.21875C13.5007 6.21875 13.3815 6.16936 13.2935 6.08146C13.2056 5.99355 13.1562 5.87432 13.1562 5.75V3.75625L8.33125 8.58125C8.24336 8.66903 8.12422 8.71834 8 8.71834C7.87578 8.71834 7.75664 8.66903 7.66875 8.58125L5.5 6.41328L0.96875 10.9445V12.7812H15.5C15.6243 12.7812 15.7435 12.8306 15.8315 12.9185C15.9194 13.0065 15.9688 13.1257 15.9688 13.25Z"/>
                </svg>
              </span>
              <span className="menu-text header-menu-text">Account Statistics</span>
            </div>
            <div className="menu-item header-menu-item header-signout-item">
              <span className="menu-icon header-menu-icon">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon-svg">
                  <path d="M8.0625 17.25C8.0625 17.3992 8.00324 17.5423 7.89775 17.6477C7.79226 17.7532 7.64918 17.8125 7.5 17.8125H1.5C1.35082 17.8125 1.20774 17.7532 1.10225 17.6477C0.996763 17.5423 0.9375 17.3992 0.9375 17.25V0.75C0.9375 0.600816 0.996763 0.457742 1.10225 0.352252C1.20774 0.246763 1.35082 0.1875 1.5 0.1875H7.5C7.64918 0.1875 7.79226 0.246763 7.89775 0.352252C8.00324 0.457742 8.0625 0.600816 8.0625 0.75C8.0625 0.899184 8.00324 1.04226 7.89775 1.14775C7.79226 1.25324 7.64918 1.3125 7.5 1.3125H2.0625V16.6875H7.5C7.64918 16.6875 7.79226 16.7468 7.89775 16.8523C8.00324 16.9577 8.0625 17.1008 8.0625 17.25ZM18.3975 8.6025L14.6475 4.8525C14.5409 4.75314 14.3998 4.69905 14.2541 4.70162C14.1084 4.70419 13.9693 4.76322 13.8663 4.86628C13.7632 4.96934 13.7042 5.10838 13.7016 5.25411C13.699 5.39983 13.7531 5.54087 13.8525 5.6475L16.6416 8.4375H7.5C7.35082 8.4375 7.20774 8.49676 7.10225 8.60225C6.99676 8.70774 6.9375 8.85082 6.9375 9C6.9375 9.14918 6.99676 9.29226 7.10225 9.39775C7.20774 9.50324 7.35082 9.5625 7.5 9.5625H16.6416L13.8525 12.3525C13.7972 12.404 13.7529 12.4661 13.7222 12.5351C13.6914 12.6041 13.6749 12.6786 13.6736 12.7541C13.6722 12.8296 13.6861 12.9047 13.7144 12.9747C13.7427 13.0447 13.7848 13.1084 13.8382 13.1618C13.8916 13.2152 13.9553 13.2573 14.0253 13.2856C14.0953 13.3139 14.1704 13.3278 14.2459 13.3264C14.3214 13.3251 14.3959 13.3086 14.4649 13.2778C14.5339 13.2471 14.596 13.2028 14.6475 13.1475L18.3975 9.3975C18.5028 9.29203 18.562 9.14906 18.562 9C18.562 8.85094 18.5028 8.70797 18.3975 8.6025Z"/>
                </svg>
              </span>
              <span className="menu-text header-menu-text">Sign out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
