import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import CreateOrderPopup from '../CreateOrderPopup';
import DepositPopup from '../DepositPopup';
import AccountStatsPopup from '../AccountStatsPopup';
import SetAlertPopup from '../SetAlertPopup';
import SettingsPopup from '../SettingsPopup';
import HelpDeskPopup from '../HelpDeskPopup';
import { useWorkspace } from '../../contexts/WorkspaceContext';

const Sidebar = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);
  const [showChartsSubmenu, setShowChartsSubmenu] = useState(false);
  const [showWatchlistSubmenu, setShowWatchlistSubmenu] = useState(false);
  const [searchInstruments, setSearchInstruments] = useState('');
  const [activeWatchlistTab, setActiveWatchlistTab] = useState('popular');
  const [showCreateOrderPopup, setShowCreateOrderPopup] = useState(false);
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [showAccountStatsPopup, setShowAccountStatsPopup] = useState(false);
  const [showSetAlertPopup, setShowSetAlertPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showHelpDeskPopup, setShowHelpDeskPopup] = useState(false);
  const widgetMenuRef = useRef(null);
  const chartsSubmenuRef = useRef(null);
  const chartsTimeoutRef = useRef(null);
  const watchlistSubmenuRef = useRef(null);
  const watchlistTimeoutRef = useRef(null);
  
  // Workspace context for adding widgets
  const { addWidget } = useWorkspace();

  const showTooltip = (tooltipId) => {
    setActiveTooltip(tooltipId);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const toggleWidgetMenu = () => {
    setShowWidgetMenu(!showWidgetMenu);
  };

  const openChartsSubmenu = () => {
    // Clear any existing timeout
    if (chartsTimeoutRef.current) {
      clearTimeout(chartsTimeoutRef.current);
    }
    setShowChartsSubmenu(true);
  };

  const closeChartsSubmenu = () => {
    // Set a timeout to close the submenu
    chartsTimeoutRef.current = setTimeout(() => {
      setShowChartsSubmenu(false);
    }, 100); // Small delay to allow moving to submenu
  };

  const keepChartsSubmenuOpen = () => {
    // Clear the timeout when hovering over the submenu
    if (chartsTimeoutRef.current) {
      clearTimeout(chartsTimeoutRef.current);
    }
    setShowChartsSubmenu(true);
  };

  const handleChartsSubmenuLeave = () => {
    // Close immediately when leaving the submenu area
    setShowChartsSubmenu(false);
  };

  // Watchlist submenu functions
  const openWatchlistSubmenu = () => {
    if (watchlistTimeoutRef.current) {
      clearTimeout(watchlistTimeoutRef.current);
    }
    setShowWatchlistSubmenu(true);
  };

  const closeWatchlistSubmenu = () => {
    watchlistTimeoutRef.current = setTimeout(() => {
      setShowWatchlistSubmenu(false);
    }, 100);
  };

  const keepWatchlistSubmenuOpen = () => {
    if (watchlistTimeoutRef.current) {
      clearTimeout(watchlistTimeoutRef.current);
    }
    setShowWatchlistSubmenu(true);
  };

  const handleWatchlistSubmenuLeave = () => {
    setShowWatchlistSubmenu(false);
  };

  // Sample financial instruments data
  const instruments = [
    { name: 'CADCHF', category: 'Major' },
    { name: 'CADJPY', category: 'Major' },
    { name: 'CHFJPY', category: 'Major' },
    { name: 'EURCAD', category: 'Major' },
    { name: 'EURCHF', category: 'Major' },
    { name: 'EURGBP', category: 'Major' },
    { name: 'EURJPY', category: 'Major' },
    { name: 'EURUSD', category: 'Major' },
    { name: 'GBPCHF', category: 'Major' },
    { name: 'GBPJPY', category: 'Major' },
    { name: 'GBPUSD', category: 'Major' },
    { name: 'USDCHF', category: 'Major' },
    { name: 'USDJPY', category: 'Major' },
    { name: 'AUDUSD', category: 'Major' },
    { name: 'NZDUSD', category: 'Major' },
  ];

  const filteredInstruments = instruments.filter(instrument =>
    instrument.name.toLowerCase().includes(searchInstruments.toLowerCase())
  );

  // Sample watchlist data
  const watchlistData = {
    popular: [
      { name: 'EURUSD', price: '1.0850', change: '+0.12%' },
      { name: 'GBPUSD', price: '1.2650', change: '-0.08%' },
      { name: 'USDJPY', price: '148.50', change: '+0.25%' },
      { name: 'AUDUSD', price: '0.6580', change: '+0.15%' },
      { name: 'USDCHF', price: '0.8750', change: '-0.05%' },
    ],
    favorites: [
      { name: 'EURGBP', price: '0.8580', change: '+0.18%' },
      { name: 'CADJPY', price: '110.25', change: '-0.12%' },
      { name: 'NZDUSD', price: '0.6120', change: '+0.22%' },
      { name: 'CHFJPY', price: '169.80', change: '+0.08%' },
    ],
    bist: [
      { name: 'THYAO', price: '45.80', change: '+2.15%' },
      { name: 'GARAN', price: '32.45', change: '+1.25%' },
      { name: 'AKBNK', price: '28.90', change: '-0.85%' },
      { name: 'KRDMD', price: '15.60', change: '+3.45%' },
      { name: 'SASA', price: '12.80', change: '+1.80%' },
    ]
  };

  // Close widget menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetMenuRef.current && !widgetMenuRef.current.contains(event.target)) {
        setShowWidgetMenu(false);
      }
    };

    if (showWidgetMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWidgetMenu]);

  // Close charts submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chartsSubmenuRef.current && !chartsSubmenuRef.current.contains(event.target)) {
        setShowChartsSubmenu(false);
      }
    };

    if (showChartsSubmenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChartsSubmenu]);

  // Close watchlist submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (watchlistSubmenuRef.current && !watchlistSubmenuRef.current.contains(event.target)) {
        setShowWatchlistSubmenu(false);
      }
    };

    if (showWatchlistSubmenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWatchlistSubmenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (chartsTimeoutRef.current) {
        clearTimeout(chartsTimeoutRef.current);
      }
      if (watchlistTimeoutRef.current) {
        clearTimeout(watchlistTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {/* Logo */}
        <div className="tooltip-container">
          <div 
            className="logo" 
            onMouseEnter={() => showTooltip('logo')}
            onMouseLeave={hideTooltip}
          >
            T
          </div>
          <div className={`tooltip ${activeTooltip === 'logo' ? 'show' : ''}`}>
            Trading Platform
          </div>
        </div>
        
        {/* Grid Icon (Add Widget) */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('plus')}
            onMouseLeave={hideTooltip}
            onClick={toggleWidgetMenu}
            style={{ cursor: 'pointer' }}
          >
            <path d="M5.125 0.28125H1.375C1.08492 0.28125 0.80672 0.396484 0.601602 0.601602C0.396484 0.80672 0.28125 1.08492 0.28125 1.375V5.125C0.28125 5.26863 0.309541 5.41086 0.364507 5.54356C0.419473 5.67626 0.500038 5.79683 0.601602 5.8984C0.703166 5.99996 0.82374 6.08053 0.95644 6.13549C1.08914 6.19046 1.23137 6.21875 1.375 6.21875H5.125C5.26863 6.21875 5.41086 6.19046 5.54356 6.13549C5.67626 6.08053 5.79683 5.99996 5.8984 5.8984C5.99996 5.79683 6.08053 5.67626 6.13549 5.54356C6.19046 5.41086 6.21875 5.26863 6.21875 5.125V1.375C6.21875 1.23137 6.19046 1.08914 6.13549 0.95644C6.08053 0.82374 5.99996 0.703166 5.8984 0.601602C5.79683 0.500038 5.67626 0.419473 5.54356 0.364507C5.41086 0.309541 5.26863 0.28125 5.125 0.28125ZM5.28125 5.125C5.28125 5.16644 5.26479 5.20618 5.23549 5.23549C5.20618 5.26479 5.16644 5.28125 5.125 5.28125H1.375C1.33356 5.28125 1.29382 5.26479 1.26451 5.23549C1.23521 5.20618 1.21875 5.16644 1.21875 5.125V1.375C1.21875 1.33356 1.23521 1.29382 1.26451 1.26451C1.29382 1.23521 1.33356 1.21875 1.375 1.21875H5.125C5.16644 1.21875 5.20618 1.23521 5.23549 1.26451C5.26479 1.29382 5.28125 1.33356 5.28125 1.375V5.125ZM12.625 0.28125H8.875C8.58492 0.28125 8.30672 0.396484 8.1016 0.601602C7.89648 0.80672 7.78125 1.08492 7.78125 1.375V5.125C7.78125 5.26863 7.80954 5.41086 7.86451 5.54356C7.91947 5.67626 8.00004 5.79683 8.1016 5.8984C8.20317 5.99996 8.32374 6.08053 8.45644 6.13549C8.58914 6.19046 8.73137 6.21875 8.875 6.21875H12.625C12.7686 6.21875 12.9109 6.19046 13.0436 6.13549C13.1763 6.08053 13.2968 5.99996 13.3984 5.8984C13.5 5.79683 13.5805 5.67626 13.6355 5.54356C13.6905 5.41086 13.7188 5.26863 13.7188 5.125V1.375C13.7188 1.08492 13.6035 0.80672 13.3984 0.601602C13.1933 0.396484 12.9151 0.28125 12.625 0.28125ZM12.7812 5.125C12.7812 5.16644 12.7648 5.20618 12.7355 5.23549C12.7062 5.26479 12.6664 5.28125 12.625 5.28125H8.875C8.83356 5.28125 8.79382 5.26479 8.76451 5.23549C8.73521 5.20618 8.71875 5.16644 8.71875 5.125V1.375C8.71875 1.33356 8.73521 1.29382 8.76451 1.26451C8.79382 1.23521 8.83356 1.21875 8.875 1.21875H12.625C12.6664 1.21875 12.7062 1.23521 12.7355 1.26451C12.7648 1.29382 12.7812 1.33356 12.7812 1.375V5.125ZM5.125 7.78125H1.375C1.08492 7.78125 0.80672 7.89648 0.601602 8.1016C0.396484 8.30672 0.28125 8.58492 0.28125 8.875V12.625C0.28125 12.9151 0.396484 13.1933 0.601602 13.3984C0.80672 13.6035 1.08492 13.7188 1.375 13.7188H5.125C5.26863 13.7188 5.41086 13.6905 5.54356 13.6355C5.67626 13.5805 5.79683 13.5 5.8984 13.3984C5.99996 13.2968 6.08053 13.1763 6.13549 13.0436C6.19046 12.9109 6.21875 12.7686 6.21875 12.625V8.875C6.21875 8.73137 6.19046 8.58914 6.13549 8.45644C6.08053 8.32374 5.99996 8.20317 5.8984 8.1016C5.79683 8.00004 5.67626 7.91947 5.54356 7.86451C5.41086 7.80954 5.26863 7.78125 5.125 7.78125ZM5.28125 12.625C5.28125 12.6664 5.26479 12.7062 5.23549 12.7355C5.20618 12.7648 5.16644 12.7812 5.125 12.7812H1.375C1.33356 12.7812 1.29382 12.7648 1.26451 12.7355C1.23521 12.7062 1.21875 12.6664 1.21875 12.625V8.875C1.21875 8.83356 1.23521 8.79382 1.26451 8.76451C1.29382 8.73521 1.33356 8.71875 1.375 8.71875H5.125C5.16644 8.71875 5.20618 8.73521 5.23549 8.76451C5.26479 8.79382 5.28125 8.83356 5.28125 8.875V12.625ZM12.625 7.78125H8.875C8.58492 7.78125 8.30672 7.89648 8.1016 8.1016C7.89648 8.30672 7.78125 8.58492 7.78125 8.875V12.625C7.78125 12.9151 7.89648 13.1933 8.1016 13.3984C8.30672 13.6035 8.58492 13.7188 8.875 13.7188H12.625C12.9151 13.7188 13.1933 13.6035 13.3984 13.3984C13.6035 13.1933 13.7188 12.9151 13.7188 12.625V8.875C13.7188 8.58492 13.6035 8.30672 13.3984 8.1016C13.1933 7.89648 12.9151 7.78125 12.625 7.78125ZM12.7812 12.625C12.7812 12.6664 12.7648 12.7062 12.7355 12.7355C12.7062 12.7648 12.6664 12.7812 12.625 12.7812H8.875C8.83356 12.7812 8.79382 12.7648 8.76451 12.7355C8.73521 12.7062 8.71875 12.6664 8.71875 12.625V8.875C8.71875 8.83356 8.73521 8.79382 8.76451 8.76451C8.79382 8.73521 8.83356 8.71875 8.875 8.71875H12.625C12.6664 8.71875 12.7062 8.73521 12.7355 8.76451C12.7648 8.79382 12.7812 8.83356 12.7812 8.875V12.625Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'plus' ? 'show' : ''}`}>
            Add Widget
          </div>
          
          {/* Widget Menu Dropdown */}
          {showWidgetMenu && (
            <div className="widget-menu" ref={widgetMenuRef}>
              <div 
                className="widget-menu-item charts-item"
                onMouseEnter={openChartsSubmenu}
                onMouseLeave={closeChartsSubmenu}
              >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <path d="M14.875 2.28125H8.46875V0.875C8.46875 0.75068 8.41936 0.631451 8.33146 0.543544C8.24355 0.455636 8.12432 0.40625 8 0.40625C7.87568 0.40625 7.75645 0.455636 7.66854 0.543544C7.58064 0.631451 7.53125 0.75068 7.53125 0.875V2.28125H1.125C0.834919 2.28125 0.55672 2.39648 0.351602 2.6016C0.146484 2.80672 0.03125 3.08492 0.03125 3.375V12.75C0.03125 13.0401 0.146484 13.3183 0.351602 13.5234C0.55672 13.7285 0.834919 13.8438 1.125 13.8438H4.525L2.63359 16.207C2.59512 16.2551 2.5665 16.3104 2.54937 16.3696C2.53224 16.4287 2.52693 16.4907 2.53375 16.5519C2.54752 16.6756 2.60985 16.7887 2.70703 16.8664C2.80421 16.9441 2.92827 16.98 3.05193 16.9663C3.17559 16.9525 3.28871 16.8901 3.36641 16.793L5.725 13.8438H10.275L12.6336 16.793C12.6721 16.8411 12.7196 16.8812 12.7736 16.9109C12.8276 16.9406 12.8868 16.9594 12.9481 16.9663C13.0093 16.9731 13.0713 16.9678 13.1305 16.9506C13.1896 16.9335 13.2449 16.9049 13.293 16.8664C13.3411 16.8279 13.3812 16.7804 13.4109 16.7264C13.4406 16.6724 13.4594 16.6132 13.4662 16.5519C13.4731 16.4907 13.4678 16.4287 13.4506 16.3696C13.4335 16.3104 13.4049 16.2551 13.3664 16.207L11.475 13.8438H14.875C15.1651 13.8438 15.4433 13.7285 15.6484 13.5234C15.8535 13.3183 15.9688 13.0401 15.9688 12.75V3.375C15.9688 3.08492 15.8535 2.80672 15.6484 2.6016C15.4433 2.39648 15.1651 2.28125 14.875 2.28125ZM15.0312 12.75C15.0312 12.7914 15.0148 12.8312 14.9855 12.8605C14.9562 12.8898 14.9164 12.9063 14.875 12.9063H1.125C1.08356 12.9063 1.04382 12.8898 1.01451 12.8605C0.985212 12.8312 0.96875 12.7914 0.96875 12.75V3.375C0.96875 3.33356 0.985212 3.29382 1.01451 3.26451C1.04382 3.23521 1.08356 3.21875 1.125 3.21875H14.875C14.9164 3.21875 14.9562 3.23521 14.9855 3.26451C15.0148 3.29382 15.0312 3.33356 15.0312 3.375V12.75ZM5.96875 8.375V10.25C5.96875 10.3743 5.91936 10.4936 5.83146 10.5815C5.74355 10.6694 5.62432 10.7188 5.5 10.7188C5.37568 10.7188 5.25645 10.6694 5.16854 10.5815C5.08064 10.4936 5.03125 10.3743 5.03125 10.25V8.375C5.03125 8.25068 5.08064 8.13145 5.16854 8.04354C5.25645 7.95564 5.37568 7.90625 5.5 7.90625C5.62432 7.90625 5.74355 7.95564 5.83146 8.04354C5.91936 8.13145 5.96875 8.25068 5.96875 8.375ZM8.46875 7.125V10.25C8.46875 10.3743 8.41936 10.4936 8.33146 10.5815C8.24355 10.6694 8.12432 10.7188 8 10.7188C7.87568 10.7188 7.75645 10.6694 7.66854 10.5815C7.58064 10.4936 7.53125 10.3743 7.53125 10.25V7.125C7.53125 7.00068 7.58064 6.88145 7.66854 6.79354C7.75645 6.70564 7.87568 6.65625 8 6.65625C8.12432 6.65625 8.24355 6.70564 8.33146 6.79354C8.41936 6.88145 8.46875 7.00068 8.46875 7.125ZM10.9688 5.875V10.25C10.9688 10.3743 10.9194 10.4936 10.8315 10.5815C10.7435 10.6694 10.6243 10.7188 10.5 10.7188C10.3757 10.7188 10.2565 10.6694 10.1685 10.5815C10.0806 10.4936 10.0312 10.3743 10.0312 10.25V5.875C10.0312 5.75068 10.0806 5.63145 10.1685 5.54354C10.2565 5.45564 10.3757 5.40625 10.5 5.40625C10.6243 5.40625 10.7435 5.45564 10.8315 5.54354C10.9194 5.63145 10.9688 5.75068 10.9688 5.875Z" fill="currentColor"/>
                </svg>
                Charts
                <svg 
                  className="arrow-right" 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: 'auto' }}
                >
                  <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                {/* Charts Submenu */}
                {showChartsSubmenu && (
                  <div className="charts-submenu" ref={chartsSubmenuRef} onMouseEnter={keepChartsSubmenuOpen} onMouseLeave={handleChartsSubmenuLeave}>
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder="Search instruments..."
                        value={searchInstruments}
                        onChange={(e) => setSearchInstruments(e.target.value)}
                        className="instrument-search"
                      />
                    </div>
                    <div className="instruments-list">
                      {filteredInstruments.map((instrument, index) => (
                        <div 
                          key={index} 
                          className="instrument-item" 
                          onClick={() => {
                            addWidget('charts', { symbol: instrument.name });
                            setShowChartsSubmenu(false);
                            setShowWidgetMenu(false);
                          }}
                        >
                          <span className="instrument-name">{instrument.name}</span>
                          <span className="instrument-category">{instrument.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="widget-menu-item"
                onClick={() => {
                  addWidget('positions');
                  setShowWidgetMenu(false);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <g clip-path="url(#clip0_575_3)">
                    <path d="M3.51259 17.0038C2.83099 17.0098 2.1748 16.7465 1.68787 16.2717C1.20094 15.7968 0.923005 15.1491 0.915001 14.4706L0.915001 2.55584C0.922009 1.87629 1.19938 1.22723 1.68631 0.750954C2.17324 0.27468 2.82999 0.0100524 3.51259 0.0150851H15.325C16.0076 0.0100524 16.6643 0.27468 17.1513 0.750954C17.6382 1.22723 17.9156 1.87629 17.9226 2.55584V7.71662H16.785V2.55584C16.778 2.17666 16.6205 1.81567 16.3469 1.55179C16.0733 1.28791 15.7059 1.14261 15.325 1.14766H3.51259C3.1317 1.14261 2.76429 1.28791 2.49071 1.55179C2.21712 1.81567 2.05962 2.17666 2.05263 2.55584V14.4706C2.0606 14.8487 2.21867 15.2084 2.49225 15.4708C2.76584 15.7333 3.1327 15.8773 3.51259 15.8712V17.0038Z" fill="currentColor"/>
                    <path d="M14.5059 3.37122H4.16862V4.48869H14.5059V3.37122Z" fill="currentColor"/>
                    <path d="M14.5059 5.70435H4.16862V6.82182H14.5059V5.70435Z" fill="currentColor"/>
                    <path d="M5.3328 17.0037H4.19517V9.16248H7.16438C7.58749 9.16347 7.99298 9.33125 8.29216 9.6291C8.59134 9.92695 8.75986 10.3306 8.76086 10.7519V11.9297C8.7589 12.3717 8.58243 12.7953 8.26956 13.1089C7.95669 13.4225 7.53249 13.601 7.08854 13.606H5.3328V17.0037ZM5.3328 10.2837V12.4734H7.08096C7.22513 12.4724 7.36305 12.4147 7.46463 12.3128C7.56622 12.211 7.62323 12.0733 7.62323 11.9297V10.7519C7.62323 10.6307 7.57489 10.5145 7.48884 10.4288C7.40279 10.3432 7.28608 10.2951 7.16438 10.2951L5.3328 10.2837Z" fill="currentColor"/>
                    <path d="M12.2003 8.90576L9.93262 17.015H8.75328L11.021 8.90576H12.2003Z" fill="currentColor"/>
                    <path d="M16.7698 17.0037H14.5666C14.2649 17.0037 13.9755 16.8844 13.7621 16.672C13.5488 16.4596 13.4289 16.1715 13.4289 15.8711V10.3026C13.4289 10.0022 13.5488 9.71414 13.7621 9.50174C13.9755 9.28934 14.2649 9.17001 14.5666 9.17001H16.785C17.0867 9.17001 17.376 9.28934 17.5894 9.50174C17.8027 9.71414 17.9226 10.0022 17.9226 10.3026V15.8711C17.9226 16.0211 17.8927 16.1696 17.8346 16.308C17.7764 16.4464 17.6913 16.572 17.584 16.6773C17.4768 16.7827 17.3496 16.8658 17.2098 16.9218C17.07 16.9779 16.9205 17.0057 16.7698 17.0037ZM14.5666 10.295V15.8711H16.7925V10.2988L14.5666 10.295Z" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_575_3">
                      <rect width="17" height="17" fill="white" transform="translate(0.915001 0.0150146)"/>
                    </clipPath>
                  </defs>
                </svg>
                Positions
              </div>
              <div 
                className="widget-menu-item watchlist-menu-item"
                onMouseEnter={openWatchlistSubmenu}
                onMouseLeave={closeWatchlistSubmenu}
              >
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <path d="M15.9902 12C16.0839 12 16.1755 12.0254 16.2549 12.0723C16.3344 12.1192 16.3986 12.1861 16.4395 12.2656L17.7129 14.6973L20.5537 15.0879C20.65 15.0956 20.7421 15.1296 20.8184 15.1855C20.8943 15.2414 20.9519 15.3166 20.9834 15.4023C21.0076 15.4882 21.0057 15.5793 20.9775 15.6641C20.9493 15.749 20.8953 15.8253 20.8232 15.8828L18.7617 17.7637L19.2607 20.4355C19.2786 20.5237 19.2688 20.6149 19.2334 20.6982C19.198 20.7816 19.138 20.854 19.0605 20.9062C18.975 20.9645 18.8721 20.9954 18.7666 20.9951C18.6861 20.9954 18.6062 20.9767 18.5361 20.9395L15.9902 19.6836L13.4434 20.9395C13.3597 20.984 13.2639 21.0044 13.168 20.999C13.0719 20.9936 12.9799 20.9619 12.9023 20.9082C12.8248 20.8545 12.7646 20.781 12.7305 20.6963C12.6965 20.6117 12.6898 20.5191 12.71 20.4307L13.209 17.7598L11.1465 15.8779C11.0823 15.8176 11.0367 15.742 11.0146 15.6592C10.9927 15.5763 10.995 15.4889 11.0215 15.4072C11.0504 15.3237 11.1043 15.2499 11.1758 15.1934C11.2471 15.1369 11.3336 15.1003 11.4258 15.0879L14.2676 14.6924L15.541 12.2656C15.5818 12.1862 15.6453 12.1192 15.7246 12.0723C15.8041 12.0253 15.8964 12 15.9902 12ZM9.0498 0C9.16603 0.0143442 9.2783 0.0520929 9.37988 0.110352C9.40966 0.106122 9.43995 0.106143 9.46973 0.110352C9.57251 0.158414 9.66736 0.222062 9.75 0.299805L15.75 6.2998C15.8278 6.38247 15.8923 6.47726 15.9404 6.58008V6.66992C15.9699 6.75753 15.9896 6.84859 16 6.94043V10C16 10.2652 15.8946 10.5195 15.707 10.707C15.5195 10.8946 15.2652 11 15 11C14.7348 11 14.4805 10.8946 14.293 10.707C14.1054 10.5195 14 10.2652 14 10V8H11C10.2044 8 9.44151 7.6837 8.87891 7.12109C8.3163 6.55848 8 5.79565 8 5V2H3C2.73478 2 2.48051 2.10543 2.29297 2.29297C2.10543 2.48051 2 2.73478 2 3V17C2 17.2652 2.10543 17.5195 2.29297 17.707C2.48051 17.8946 2.73478 18 3 18H10C10.2652 18 10.5195 18.1054 10.707 18.293C10.8946 18.4805 11 18.7348 11 19C11 19.2652 10.8946 19.5195 10.707 19.707C10.5195 19.8946 10.2652 20 10 20H3C2.20435 20 1.44152 19.6837 0.878906 19.1211C0.316297 18.5585 0 17.7956 0 17V3C0 2.20435 0.316297 1.44152 0.878906 0.878906C1.44152 0.316297 2.20435 0 3 0H9.0498ZM15.1016 15.3271C15.0656 15.3962 15.0115 15.4559 14.9453 15.501C14.8792 15.5461 14.8025 15.5753 14.7217 15.5859L12.6191 15.873L14.1172 17.2842C14.175 17.3371 14.2189 17.4025 14.2441 17.4746C14.2693 17.5466 14.2758 17.6234 14.2627 17.6982L13.9033 19.6738L15.7803 18.7334C15.8531 18.6994 15.9334 18.6817 16.0146 18.6816C16.0961 18.6816 16.177 18.6994 16.25 18.7334L18.127 19.6738L17.7676 17.6982C17.7545 17.6234 17.7609 17.5467 17.7861 17.4746C17.8113 17.4026 17.8544 17.337 17.9121 17.2842L19.4102 15.8779L17.3086 15.5908C17.2277 15.5802 17.1501 15.551 17.084 15.5059C17.018 15.4608 16.9646 15.401 16.9287 15.332L15.9902 13.5352L15.1016 15.3271ZM9 14C9.26522 14 9.5195 14.1054 9.70703 14.293C9.89457 14.4805 10 14.7348 10 15C10 15.2652 9.89457 15.5195 9.70703 15.707C9.5195 15.8946 9.26522 16 9 16H5C4.73478 16 4.4805 15.8946 4.29297 15.707C4.10543 15.5195 4 15.2652 4 15C4 14.7348 4.10543 14.4805 4.29297 14.293C4.4805 14.1054 4.73478 14 5 14H9ZM11 10C11.2652 10 11.5195 10.1054 11.707 10.293C11.8946 10.4805 12 10.7348 12 11C12 11.2652 11.8946 11.5195 11.707 11.707C11.5195 11.8946 11.2652 12 11 12H5C4.73478 12 4.4805 11.8946 4.29297 11.707C4.10543 11.5195 4 11.2652 4 11C4 10.7348 4.10543 10.4805 4.29297 10.293C4.4805 10.1054 4.73478 10 5 10H11ZM6 6C6.26522 6 6.5195 6.10543 6.70703 6.29297C6.89457 6.48043 7 6.73478 7 7C7 7.26522 6.89457 7.5195 6.70703 7.70703C6.5195 7.89457 6.26522 8 6 8H5C4.73478 8 4.4805 7.89457 4.29297 7.70703C4.10543 7.5195 4 7.26522 4 7C4 6.73478 4.10543 6.4805 4.29297 6.29297C4.4805 6.10543 4.73478 6 5 6H6ZM10 5C10 5.26522 10.1054 5.5195 10.293 5.70703C10.4805 5.89457 10.7348 6 11 6H12.5898L10 3.41016V5Z" fill="currentColor"/>
                </svg>
                Watchlist
                <svg 
                  className="arrow-right" 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: 'auto' }}
                >
                  <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                {/* Watchlist Submenu */}
                {showWatchlistSubmenu && (
                  <div className="watchlist-submenu" ref={watchlistSubmenuRef} onMouseEnter={keepWatchlistSubmenuOpen} onMouseLeave={handleWatchlistSubmenuLeave}>
                    {/* Tabs */}
                    <div className="watchlist-tabs">
                                  <button
              className={`sidebar-tab-button ${activeWatchlistTab === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveWatchlistTab('popular')}
            >
              Popüler
            </button>
            <button
              className={`sidebar-tab-button ${activeWatchlistTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveWatchlistTab('favorites')}
            >
              Favoriler
            </button>
            <button
              className={`sidebar-tab-button ${activeWatchlistTab === 'bist' ? 'active' : ''}`}
              onClick={() => setActiveWatchlistTab('bist')}
            >
              BIST
            </button>
                    </div>
                    
                    {/* Content based on active tab */}
                    <div className="watchlist-content">
                      {watchlistData[activeWatchlistTab].map((item, index) => (
                        <div 
                          key={index} 
                          className="watchlist-list-item"
                          onClick={() => {
                            addWidget('watchlist', { activeTab: activeWatchlistTab });
                            setShowWatchlistSubmenu(false);
                            setShowWidgetMenu(false);
                          }}
                        >
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">{item.price}</span>
                          </div>
                          <span className={`item-change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            {item.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="widget-menu-item"
                onClick={() => {
                  addWidget('trades');
                  setShowWidgetMenu(false);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <path d="M9.44006 0C6.87644 0.00731219 4.41355 0.998914 2.56006 2.77V1C2.56006 0.734784 2.4547 0.48043 2.26717 0.292893C2.07963 0.105357 1.82528 0 1.56006 0C1.29484 0 1.04049 0.105357 0.852952 0.292893C0.665415 0.48043 0.560059 0.734784 0.560059 1V5.5C0.560059 5.76522 0.665415 6.01957 0.852952 6.20711C1.04049 6.39464 1.29484 6.5 1.56006 6.5H6.06006C6.32528 6.5 6.57963 6.39464 6.76717 6.20711C6.9547 6.01957 7.06006 5.76522 7.06006 5.5C7.06006 5.23478 6.9547 4.98043 6.76717 4.79289C6.57963 4.60536 6.32528 4.5 6.06006 4.5H3.66006C4.57177 3.53701 5.70856 2.81576 6.96819 2.40114C8.22781 1.98651 9.57075 1.89152 10.8762 2.1247C12.1816 2.35788 13.4086 2.91193 14.4468 3.73699C15.485 4.56205 16.3018 5.63226 16.8238 6.85133C17.3457 8.0704 17.5564 9.4001 17.4369 10.7208C17.3175 12.0415 16.8716 13.3118 16.1393 14.4174C15.4071 15.5231 14.4115 16.4293 13.2421 17.0547C12.0727 17.68 10.7662 18.0049 9.44006 18C9.17484 18 8.92049 18.1054 8.73295 18.2929C8.54542 18.4804 8.44006 18.7348 8.44006 19C8.44006 19.2652 8.54542 19.5196 8.73295 19.7071C8.92049 19.8946 9.17484 20 9.44006 20C12.0922 20 14.6358 18.9464 16.5111 17.0711C18.3865 15.1957 19.4401 12.6522 19.4401 10C19.4401 7.34784 18.3865 4.8043 16.5111 2.92893C14.6358 1.05357 12.0922 0 9.44006 0ZM9.44006 6C9.17484 6 8.92049 6.10536 8.73295 6.29289C8.54542 6.48043 8.44006 6.73478 8.44006 7V10C8.44006 10.2652 8.54542 10.5196 8.73295 10.7071C8.92049 10.8946 9.17484 11 9.44006 11H11.4401C11.7053 11 11.9596 10.8946 12.1472 10.7071C12.3347 10.5196 12.4401 10.2652 12.4401 10C12.4401 9.73478 12.3347 9.48043 12.1472 9.29289C11.9596 9.10536 11.7053 9 11.4401 9H10.4401V7C10.4401 6.73478 10.3347 6.48043 10.1472 6.29289C9.95963 6.10536 9.70527 6 9.44006 6Z" fill="currentColor"/>
                </svg>
                Trades / Transactions
              </div>
            </div>
          )}
        </div>
        
        {/* Create Order Icon */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('create-order')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowCreateOrderPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M15.3438 1.75V9.875C15.3438 10.1651 15.2285 10.4433 15.0234 10.6484C14.8183 10.8535 14.5401 10.9688 14.25 10.9688H5.38203L6.45625 12.0437C6.5023 12.0867 6.53924 12.1384 6.56486 12.1959C6.59048 12.2534 6.60426 12.3155 6.60537 12.3784C6.60648 12.4414 6.5949 12.5039 6.57133 12.5622C6.54775 12.6206 6.51266 12.6736 6.46815 12.7181C6.42364 12.7627 6.37062 12.7978 6.31225 12.8213C6.25388 12.8449 6.19136 12.8565 6.12842 12.8554C6.06548 12.8543 6.00341 12.8405 5.94591 12.8149C5.88841 12.7892 5.83666 12.7523 5.79375 12.7063L3.91875 10.8313C3.83097 10.7434 3.78166 10.6242 3.78166 10.5C3.78166 10.3758 3.83097 10.2566 3.91875 10.1687L5.79375 8.29375C5.88261 8.21095 6.00014 8.16587 6.12158 8.16802C6.24301 8.17016 6.35888 8.21935 6.44476 8.30524C6.53065 8.39112 6.57984 8.50699 6.58198 8.62842C6.58413 8.74986 6.53905 8.86739 6.45625 8.95625L5.38203 10.0312H14.25C14.2914 10.0312 14.3312 10.0148 14.3605 9.98549C14.3898 9.95618 14.4062 9.91644 14.4062 9.875V1.75C14.4062 1.70856 14.3898 1.66882 14.3605 1.63951C14.3312 1.61021 14.2914 1.59375 14.25 1.59375H5.5C5.45856 1.59375 5.41882 1.61021 5.38951 1.63951C5.36021 1.66882 5.34375 1.70856 5.34375 1.75V2.375C5.34375 2.49932 5.29436 2.61855 5.20646 2.70646C5.11855 2.79436 4.99932 2.84375 4.875 2.84375C4.75068 2.84375 4.63145 2.79436 4.54354 2.70646C4.45564 2.61855 4.40625 2.49932 4.40625 2.375V1.75C4.40625 1.45992 4.52148 1.18172 4.7266 0.976602C4.93172 0.771484 5.20992 0.65625 5.5 0.65625H14.25C14.5401 0.65625 14.8183 0.771484 15.0234 0.976602C15.2285 1.18172 15.3438 1.45992 15.3438 1.75ZM11.125 13.1562C11.0007 13.1562 10.8815 13.2056 10.7935 13.2935C10.7056 13.3815 10.6562 13.5007 10.6562 13.625V14.25C10.6562 14.2914 10.6398 14.3312 10.6105 14.3605C10.5812 14.3898 10.5414 14.4062 10.5 14.4062H1.75C1.70856 14.4062 1.66882 14.3898 1.63951 14.3605C1.61021 14.3312 1.59375 14.2914 1.59375 14.25V6.125C1.59375 6.08356 1.61021 6.04382 1.63951 6.01451C1.66882 5.98521 1.70856 5.96875 1.75 5.96875H10.618L9.54375 7.04375C9.49769 7.08666 9.46076 7.13841 9.43514 7.19591C9.40952 7.25341 9.39574 7.31548 9.39463 7.37842C9.39352 7.44136 9.4051 7.50388 9.42867 7.56225C9.45225 7.62062 9.48734 7.67364 9.53185 7.71815C9.57636 7.76266 9.62938 7.79775 9.68775 7.82133C9.74612 7.8449 9.80864 7.85648 9.87158 7.85537C9.93452 7.85426 9.99659 7.84048 10.0541 7.81486C10.1116 7.78924 10.1633 7.7523 10.2063 7.70625L12.0813 5.83125C12.169 5.74336 12.2183 5.62422 12.2183 5.5C12.2183 5.37578 12.169 5.25664 12.0813 5.16875L10.2063 3.29375C10.1174 3.21095 9.99986 3.16587 9.87842 3.16802C9.75699 3.17016 9.64112 3.21935 9.55524 3.30524C9.46935 3.39112 9.42016 3.50699 9.41802 3.62842C9.41587 3.74986 9.46095 3.86739 9.54375 3.95625L10.618 5.03125H1.75C1.45992 5.03125 1.18172 5.14648 0.976602 5.3516C0.771484 5.55672 0.65625 5.83492 0.65625 6.125V14.25C0.65625 14.5401 0.771484 14.8183 0.976602 15.0234C1.18172 15.2285 1.45992 15.3438 1.75 15.3438H10.5C10.7901 15.3438 11.0683 15.2285 11.2734 15.0234C11.4785 14.8183 11.5938 14.5401 11.5938 14.25V13.625C11.5938 13.5007 11.5444 13.3815 11.4565 13.2935C11.3685 13.2056 11.2493 13.1562 11.125 13.1562Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'create-order' ? 'show' : ''}`}>
            Create a new order
          </div>
        </div>
        
        {/* Account Statistics Icon */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('stats')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowAccountStatsPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M8 0.03125C7.87568 0.03125 7.75645 0.080636 7.66854 0.168544C7.58063 0.256451 7.53125 0.37568 7.53125 0.5V4.875C7.53125 4.99932 7.58063 5.11855 7.66854 5.20646C7.75645 5.29436 7.87568 5.34375 8 5.34375C8.58471 5.34384 9.15306 5.53686 9.6169 5.89287C10.0807 6.24888 10.4141 6.74799 10.5654 7.3128C10.7167 7.87761 10.6774 8.47655 10.4536 9.01674C10.2297 9.55692 9.83395 10.0082 9.32755 10.3005C8.82115 10.5928 8.23245 10.7099 7.65274 10.6335C7.07303 10.5572 6.53471 10.2917 6.12127 9.87818C5.70783 9.46471 5.44237 8.92637 5.36607 8.34666C5.28976 7.76695 5.40686 7.17825 5.69922 6.67188C5.73003 6.61853 5.75003 6.55964 5.75807 6.49857C5.7661 6.43749 5.76202 6.37543 5.74606 6.31594C5.7301 6.25644 5.70257 6.20067 5.66504 6.15182C5.62751 6.10298 5.58072 6.062 5.52734 6.03125L1.73828 3.84375C1.68494 3.81294 1.62605 3.79294 1.56497 3.7849C1.5039 3.77686 1.44184 3.78094 1.38234 3.79691C1.32285 3.81287 1.26708 3.8404 1.21823 3.87793C1.16938 3.91546 1.12841 3.96225 1.09765 4.01562C0.220583 5.53476 -0.13073 7.30084 0.0981985 9.03998C0.327127 10.7791 1.1235 12.3941 2.36382 13.6345C3.60414 14.875 5.21909 15.6715 6.95822 15.9005C8.69734 16.1296 10.4634 15.7784 11.9826 14.9014C13.5018 14.0245 14.6892 12.6708 15.3607 11.0502C16.0321 9.42965 16.1501 7.63283 15.6962 5.93841C15.2424 4.24398 14.2422 2.74665 12.8507 1.67861C11.4592 0.610568 9.75414 0.031515 8 0.03125ZM1.68828 4.89766L4.67969 6.62422C4.49906 7.0604 4.40614 7.5279 4.40625 8C4.40678 8.15675 4.41722 8.31331 4.4375 8.46875L1.10156 9.36328C0.803768 7.85062 1.00986 6.28205 1.68828 4.89766ZM1.34453 10.2656L4.68047 9.37187C4.92268 9.95406 5.31345 10.4625 5.81371 10.8464C6.31397 11.2302 6.90621 11.4761 7.53125 11.5594V15.0125C6.1473 14.918 4.82201 14.4172 3.72146 13.5728C2.62091 12.7284 1.79406 11.5779 1.34453 10.2656ZM8.46875 15.0156V11.5625C9.33299 11.4485 10.1263 11.0243 10.701 10.3688C11.2757 9.71334 11.5926 8.87133 11.5926 7.99961C11.5926 7.12789 11.2757 6.28588 10.701 5.63041C10.1263 4.97495 9.33299 4.55071 8.46875 4.43672V0.984375C10.2485 1.10322 11.9165 1.89404 13.1351 3.19665C14.3536 4.49926 15.0315 6.2163 15.0315 8C15.0315 9.7837 14.3536 11.5007 13.1351 12.8034C11.9165 14.106 10.2485 14.8968 8.46875 15.0156Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'stats' ? 'show' : ''}`}>
            Account Statistics
          </div>
        </div>
        
        {/* Deposit Icon */}
        <div className="tooltip-container deposit-separator">
          <svg 
            className="sidebar-icon" 
            width="16" 
            height="15" 
            viewBox="0 0 16 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('deposit')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowDepositPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M14.875 3.15625H2.375C2.1678 3.15625 1.96909 3.07394 1.82257 2.92743C1.67606 2.78091 1.59375 2.5822 1.59375 2.375C1.59375 2.1678 1.67606 1.96909 1.82257 1.82257C1.96909 1.67606 2.1678 1.59375 2.375 1.59375H13C13.1243 1.59375 13.2435 1.54436 13.3315 1.45646C13.4194 1.36855 13.4688 1.24932 13.4688 1.125C13.4688 1.00068 13.4194 0.881451 13.3315 0.793544C13.2435 0.705636 13.1243 0.65625 13 0.65625H2.375C1.91916 0.65625 1.48199 0.837332 1.15966 1.15966C0.837332 1.48199 0.65625 1.91916 0.65625 2.375V12.375C0.65625 12.8308 0.837332 13.268 1.15966 13.5903C1.48199 13.9127 1.91916 14.0938 2.375 14.0938H14.875C15.1651 14.0938 15.4433 13.9785 15.6484 13.7734C15.8535 13.5683 15.9688 13.2901 15.9688 13V4.25C15.9688 3.95992 15.8535 3.68172 15.6484 3.4766C15.4433 3.27148 15.1651 3.15625 14.875 3.15625ZM15.0312 13C15.0312 13.0414 15.0148 13.0812 14.9855 13.1105C14.9562 13.1398 14.9164 13.1562 14.875 13.1562H2.375C2.1678 13.1562 1.96909 13.0739 1.82257 12.9274C1.67606 12.7809 1.59375 12.5822 1.59375 12.375V3.90547C1.83546 4.02953 2.10331 4.09409 2.375 4.09375H14.875C14.9164 4.09375 14.9562 4.11021 14.9855 4.13951C15.0148 4.16882 15.0312 4.20856 15.0312 4.25V13ZM12.8438 8.3125C12.8438 8.46702 12.7979 8.61806 12.7121 8.74654C12.6262 8.87502 12.5042 8.97515 12.3615 9.03428C12.2187 9.09341 12.0616 9.10888 11.9101 9.07874C11.7585 9.04859 11.6193 8.97419 11.5101 8.86493C11.4008 8.75567 11.3264 8.61646 11.2963 8.46491C11.2661 8.31337 11.2816 8.15628 11.3407 8.01353C11.3998 7.87077 11.5 7.74876 11.6285 7.66291C11.7569 7.57707 11.908 7.53125 12.0625 7.53125C12.2697 7.53125 12.4684 7.61356 12.6149 7.76007C12.7614 7.90659 12.8438 8.1053 12.8438 8.3125Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'deposit' ? 'show' : ''}`}>
            Deposit
          </div>
        </div>
        
        {/* Set Alarm Icon */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="18" 
            height="21" 
            viewBox="0 0 18 21" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('alarm')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowSetAlertPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M17.6315 15.0881C17.1009 14.175 16.3125 11.5997 16.3125 8.25C16.3125 6.3106 15.542 4.45064 14.1707 3.07928C12.7993 1.70792 10.9394 0.9375 8.99996 0.9375C7.06057 0.9375 5.2006 1.70792 3.82924 3.07928C2.45788 4.45064 1.68746 6.3106 1.68746 8.25C1.68746 11.6006 0.898087 14.175 0.367462 15.0881C0.251039 15.2875 0.189262 15.514 0.188364 15.7449C0.187467 15.9758 0.247481 16.2028 0.362351 16.403C0.477221 16.6033 0.642883 16.7697 0.842618 16.8855C1.04235 17.0013 1.26909 17.0623 1.49996 17.0625H5.48246C5.61909 17.8964 6.04766 18.6545 6.69164 19.2016C7.33563 19.7486 8.1531 20.049 8.99809 20.049C9.84307 20.049 10.6605 19.7486 11.3045 19.2016C11.9485 18.6545 12.3771 17.8964 12.5137 17.0625H16.5C16.7307 17.062 16.9572 17.0007 17.1567 16.8848C17.3561 16.7689 17.5215 16.6024 17.6362 16.4022C17.7508 16.202 17.8107 15.9751 17.8097 15.7444C17.8087 15.5137 17.7469 15.2874 17.6306 15.0881H17.6315ZM8.99996 18.9375C8.45144 18.9373 7.919 18.7521 7.48876 18.4119C7.05851 18.0716 6.75561 17.5962 6.62902 17.0625H11.3709C11.2443 17.5962 10.9414 18.0716 10.5112 18.4119C10.0809 18.7521 9.54849 18.9373 8.99996 18.9375ZM16.6603 15.8438C16.6448 15.8725 16.6218 15.8964 16.5937 15.9129C16.5656 15.9295 16.5335 15.938 16.5009 15.9375H1.49996C1.46736 15.938 1.43526 15.9295 1.40716 15.9129C1.37905 15.8964 1.35603 15.8725 1.34059 15.8438C1.32413 15.8152 1.31547 15.7829 1.31547 15.75C1.31547 15.7171 1.32413 15.6848 1.34059 15.6562C2.05027 14.4375 2.81246 11.5959 2.81246 8.25C2.81246 6.60897 3.46436 5.03516 4.62474 3.87478C5.78512 2.7144 7.35894 2.0625 8.99996 2.0625C10.641 2.0625 12.2148 2.7144 13.3752 3.87478C14.5356 5.03516 15.1875 6.60897 15.1875 8.25C15.1875 11.595 15.9506 14.4328 16.6603 15.6562C16.6767 15.6848 16.6854 15.7171 16.6854 15.75C16.6854 15.7829 16.6767 15.8152 16.6603 15.8438Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'alarm' ? 'show' : ''}`}>
            Set Price Alert
          </div>
        </div>
      </div>
      
      <div className="sidebar-bottom">
        {/* Settings Icon */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="22" 
            height="20" 
            viewBox="0 0 22 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('settings')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowSettingsPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M11 5.68752C10.1471 5.68752 9.31329 5.94044 8.6041 6.4143C7.89492 6.88817 7.34217 7.56169 7.01577 8.3497C6.68937 9.1377 6.60397 10.0048 6.77036 10.8413C6.93676 11.6779 7.34749 12.4463 7.9506 13.0494C8.55372 13.6525 9.32213 14.0633 10.1587 14.2297C10.9952 14.3961 11.8623 14.3107 12.6503 13.9842C13.4383 13.6578 14.1118 13.1051 14.5857 12.3959C15.0596 11.6867 15.3125 10.8529 15.3125 10C15.311 8.85673 14.8562 7.76069 14.0478 6.95226C13.2393 6.14384 12.1433 5.68901 11 5.68752ZM11 13.1875C10.3696 13.1875 9.7533 13.0006 9.22912 12.6503C8.70494 12.3001 8.29639 11.8023 8.05513 11.2198C7.81388 10.6374 7.75076 9.99648 7.87375 9.37817C7.99674 8.75985 8.30032 8.19189 8.7461 7.74611C9.19188 7.30033 9.75984 6.99675 10.3781 6.87376C10.9965 6.75077 11.6374 6.8139 12.2198 7.05515C12.8022 7.29641 13.3001 7.70496 13.6503 8.22914C14.0006 8.75332 14.1875 9.36959 14.1875 10C14.1875 10.8454 13.8517 11.6561 13.2539 12.2539C12.6561 12.8517 11.8454 13.1875 11 13.1875ZM21.125 8.08752C21.1087 8.00913 21.0758 7.93513 21.0286 7.87046C20.9814 7.80579 20.9209 7.75194 20.8512 7.71252L17.9975 6.08314L17.9581 6.01658L17.9469 2.80002C17.9469 2.71877 17.9293 2.63849 17.8953 2.56469C17.8613 2.49089 17.8117 2.42533 17.75 2.37252C16.7533 1.52977 15.6059 0.883672 14.3684 0.468455C14.294 0.443443 14.2152 0.434275 14.1371 0.441541C14.059 0.448807 13.9832 0.472345 13.9147 0.510643L11.0431 2.11189H10.9494L8.08531 0.508768C8.0165 0.470357 7.94037 0.446836 7.86188 0.43973C7.78339 0.432624 7.70429 0.442091 7.62969 0.467518C6.39239 0.883945 5.24549 1.53168 4.25 2.37627C4.18804 2.4288 4.13818 2.49413 4.10387 2.56777C4.06956 2.6414 4.05161 2.72159 4.05125 2.80283L4.03625 6.02221C4.02313 6.04377 4.01 6.06627 3.99781 6.08877L1.14781 7.70971C1.07777 7.74973 1.01716 7.80435 0.97009 7.86986C0.923019 7.93537 0.890589 8.01024 0.875001 8.08939C0.624689 9.35148 0.624689 10.6504 0.875001 11.9125C0.891313 11.9909 0.924171 12.0649 0.97138 12.1296C1.01859 12.1943 1.07906 12.2481 1.14875 12.2875L4.00063 13.9122L4.04 13.9788L4.05125 17.1953C4.0508 17.2775 4.06835 17.3588 4.10269 17.4335C4.13703 17.5081 4.18731 17.5744 4.25 17.6275C5.24669 18.4703 6.39415 19.1164 7.63156 19.5316C7.70595 19.5566 7.78476 19.5658 7.8629 19.5585C7.94105 19.5512 8.01681 19.5277 8.08531 19.4894L10.955 17.8881H11.0488L13.9138 19.4913C13.9976 19.5376 14.0917 19.5621 14.1875 19.5625C14.2491 19.5628 14.3102 19.5526 14.3684 19.5325C15.6041 19.1156 16.7493 18.4678 17.7434 17.6238C17.8054 17.5712 17.8553 17.5059 17.8896 17.4323C17.9239 17.3586 17.9418 17.2784 17.9422 17.1972L17.9572 13.9778C17.9703 13.9563 17.9834 13.9338 17.9956 13.9113L20.8475 12.2903C20.9177 12.2504 20.9785 12.1958 21.0257 12.1303C21.073 12.0648 21.1056 11.9899 21.1213 11.9106C21.3728 10.6488 21.3741 9.34985 21.125 8.08752ZM20.0703 11.4428L17.3113 13.0094C17.2218 13.0606 17.1479 13.1351 17.0975 13.225C17.0422 13.3188 16.9841 13.4228 16.9231 13.5194C16.8677 13.6083 16.8381 13.7109 16.8378 13.8156L16.8228 16.9291C16.0471 17.5506 15.1758 18.0422 14.2428 18.385L11.4688 16.8325C11.3849 16.7854 11.2903 16.7605 11.1941 16.7603H11.1809C11.0647 16.7603 10.9466 16.7603 10.8303 16.7603C10.7297 16.7579 10.6303 16.7825 10.5425 16.8316L7.76094 18.3841C6.82677 18.043 5.95417 17.5526 5.17719 16.9319L5.16594 13.8222C5.16564 13.7174 5.1361 13.6148 5.08063 13.526C5.02063 13.4322 4.96156 13.331 4.90625 13.2316C4.85637 13.1416 4.78276 13.067 4.69344 13.016L1.93438 11.4438C1.77399 10.4883 1.77399 9.51271 1.93438 8.55721L4.68875 6.99064C4.77959 6.93999 4.85482 6.86542 4.90625 6.77502C4.96156 6.68127 5.01969 6.57721 5.08063 6.48064C5.1361 6.39176 5.16564 6.28916 5.16594 6.18439L5.18094 3.07096C5.95552 2.44983 6.82551 1.95816 7.75719 1.61502L10.5312 3.16752C10.6188 3.21742 10.7184 3.24209 10.8191 3.23877C10.9353 3.23877 11.0534 3.23877 11.1697 3.23877C11.2703 3.24119 11.3697 3.21658 11.4575 3.16752L14.2372 1.61502C15.1714 1.95606 16.044 2.4465 16.8209 3.06721L16.8322 6.17689C16.8325 6.28166 16.862 6.38426 16.9175 6.47314C16.9775 6.56689 17.0366 6.66814 17.0919 6.76752C17.1418 6.8575 17.2154 6.93208 17.3047 6.98314L20.0656 8.55627C20.2269 9.51161 20.2279 10.4872 20.0684 11.4428H20.0703Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'settings' ? 'show' : ''}`}>
            Settings
          </div>
        </div>
        
        {/* Help Desk Icon */}
        <div className="tooltip-container">
          <svg 
            className="sidebar-icon" 
            width="16" 
            height="18" 
            viewBox="0 0 16 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => showTooltip('help')}
            onMouseLeave={hideTooltip}
            onClick={() => setShowHelpDeskPopup(true)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M13.6617 2.38047C12.9286 1.63952 12.0564 1.0506 11.0951 0.647467C10.1339 0.244334 9.10251 0.0349256 8.06016 0.03125H8C5.88656 0.03125 3.85967 0.870812 2.36524 2.36524C0.870812 3.85967 0.03125 5.88656 0.03125 8V12.375C0.03125 12.8308 0.212332 13.268 0.53466 13.5903C0.856988 13.9127 1.29416 14.0938 1.75 14.0938H3C3.45584 14.0938 3.89301 13.9127 4.21534 13.5903C4.53767 13.268 4.71875 12.8308 4.71875 12.375V9.25C4.71875 8.79416 4.53767 8.35699 4.21534 8.03466C3.89301 7.71233 3.45584 7.53125 3 7.53125H0.984375C1.10329 5.75156 1.89413 4.08357 3.19673 2.8651C4.49934 1.64662 6.21634 0.968746 8 0.96875H8.05312C9.82932 0.976633 11.5363 1.65862 12.8289 2.87684C14.1215 4.09506 14.9034 5.75864 15.0164 7.53125H13C12.5442 7.53125 12.107 7.71233 11.7847 8.03466C11.4623 8.35699 11.2812 8.79416 11.2812 9.25V12.375C11.2812 12.8308 11.4623 13.268 11.7847 13.5903C12.107 13.9127 12.5442 14.0938 13 14.0938H15.0312V14.25C15.0312 14.7887 14.8172 15.3054 14.4363 15.6863C14.0554 16.0672 13.5387 16.2812 13 16.2812H8.625C8.50068 16.2812 8.38145 16.3306 8.29354 16.4185C8.20564 16.5065 8.15625 16.6257 8.15625 16.75C8.15625 16.8743 8.20564 16.9935 8.29354 17.0815C8.38145 17.1694 8.50068 17.2188 8.625 17.2188H13C13.7874 17.2188 14.5425 16.906 15.0992 16.3492C15.656 15.7925 15.9688 15.0374 15.9688 14.25V8C15.9727 6.95762 15.7709 5.9247 15.375 4.96041C14.9792 3.99612 14.3969 3.1194 13.6617 2.38047ZM3 8.46875C3.2072 8.46875 3.40591 8.55106 3.55243 8.69757C3.69894 8.84408 3.78125 9.0428 3.78125 9.25V12.375C3.78125 12.5822 3.69894 12.7809 3.55243 12.9274C3.40591 13.0739 3.2072 13.1562 3 13.1562H1.75C1.5428 13.1562 1.34409 13.0739 1.19757 12.9274C1.05106 12.7809 0.96875 12.5822 0.96875 12.375V8.46875H3ZM12.2188 12.375V9.25C12.2188 9.0428 12.3011 8.84408 12.4476 8.69757C12.5941 8.55106 12.7928 8.46875 13 8.46875H15.0312V13.1562H13C12.7928 13.1562 12.5941 13.0739 12.4476 12.9274C12.3011 12.7809 12.2188 12.5822 12.2188 12.375Z" fill="currentColor"/>
          </svg>
          <div className={`tooltip ${activeTooltip === 'help' ? 'show' : ''}`}>
            Help Desk
          </div>
        </div>
      </div>
      
      {/* Create Order Popup */}
      <CreateOrderPopup 
        isOpen={showCreateOrderPopup}
        onClose={() => setShowCreateOrderPopup(false)}
      />
      
      {/* Deposit Popup */}
      <DepositPopup 
        isOpen={showDepositPopup}
        onClose={() => setShowDepositPopup(false)}
      />
      
      {/* Account Statistics Popup */}
      <AccountStatsPopup 
        isOpen={showAccountStatsPopup}
        onClose={() => setShowAccountStatsPopup(false)}
      />
      
      {/* Set Alert Popup */}
      <SetAlertPopup 
        isOpen={showSetAlertPopup}
        onClose={() => setShowSetAlertPopup(false)}
      />
      
      {/* Settings Popup */}
      <SettingsPopup 
        isOpen={showSettingsPopup}
        onClose={() => setShowSettingsPopup(false)}
      />
      
      {/* Help Desk Popup */}
      <HelpDeskPopup 
        isOpen={showHelpDeskPopup}
        onClose={() => setShowHelpDeskPopup(false)}
      />
    </div>
  );
};

export default Sidebar;
