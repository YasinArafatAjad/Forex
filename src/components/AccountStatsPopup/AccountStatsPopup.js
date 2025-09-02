import React, { useState } from 'react';
import './AccountStatsPopup.css';

const AccountStatsPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('TODAY');

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  // Sample data for different time periods
  const timeData = {
    TODAY: {
      balance: 15420.50,
      equity: 15890.75,
      profit: 470.25,
      trades: 8,
      winRate: 75.0,
      volume: 0.85
    },
    WEEK: {
      balance: 15420.50,
      equity: 15890.75,
      profit: 1250.80,
      trades: 45,
      winRate: 68.5,
      volume: 4.2
    },
    ALL_TIME: {
      balance: 15420.50,
      equity: 15890.75,
      profit: 8900.25,
      trades: 156,
      winRate: 72.3,
      volume: 18.5
    }
  };

  const currentData = timeData[activeTab];

  return (
    <div className="account-stats-overlay" onClick={handleClose}>
      <div className="account-stats-popup">
        {/* Header */}
        <div className="account-stats-header">
          <h2 className="account-stats-title">Account Statistics</h2>
          <button className="account-stats-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="account-stats-tabs">
          <button 
            className={`account-stats-tab-button ${activeTab === 'TODAY' ? 'active' : ''}`}
            onClick={() => setActiveTab('TODAY')}
          >
            TODAY
          </button>
          <button 
            className={`account-stats-tab-button ${activeTab === 'WEEK' ? 'active' : ''}`}
            onClick={() => setActiveTab('WEEK')}
          >
            WEEK
          </button>
          <button 
            className={`account-stats-tab-button ${activeTab === 'ALL_TIME' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL_TIME')}
          >
            ALL TIME
          </button>
        </div>

        {/* Content */}
        <div className="account-stats-content">
          {/* Performance Chart */}
          <div className="performance-chart-section">
            <h3 className="section-title">Performance Chart</h3>
            <div className="chart-placeholder">
              <div className="chart-info">
                <span className="chart-text">Chart for {activeTab.toLowerCase()} period</span>
              </div>
            </div>
          </div>

          {/* Trading Analysis Charts */}
          <div className="trading-charts-section">
            <div className="charts-grid">
              {/* Left Column */}
              <div className="charts-left-column">
                                                  {/* Total Trades Chart */}
                 <div className="chart-item">
                   <h4 className="chart-title">Total trades {currentData.trades}</h4>
                   <div className="chart-info">
                     <span className="info-left">{((currentData.winRate / 100) * 100).toFixed(2)}% ({Math.round(currentData.trades * currentData.winRate / 100)})</span>
                     <span className="info-right">{((100 - currentData.winRate) / 100 * 100).toFixed(2)}% ({Math.round(currentData.trades * (100 - currentData.winRate) / 100)})</span>
                   </div>
                   <div className="horizontal-bar-chart">
                     <div className="bar-container">
                       <div className="bar-segment profit" style={{ flex: `${currentData.winRate}%` }}>
                         <span className="bar-label">Profit {currentData.winRate}% ({Math.round(currentData.trades * currentData.winRate / 100)})</span>
                       </div>
                       <div className="bar-segment loss" style={{ flex: `${100 - currentData.winRate}%` }}>
                         <span className="bar-label">Loss {100 - currentData.winRate}% ({Math.round(currentData.trades * (100 - currentData.winRate) / 100)})</span>
                       </div>
                     </div>
                     <div className="bar-labels">
                       <span className="profit-label">Profit</span>
                       <span className="loss-label">Loss</span>
                     </div>
                   </div>
                </div>

                                                  {/* Sum of Trades Chart */}
                 <div className="chart-item">
                   <h4 className="chart-title">Sum of trades</h4>
                   <div className="chart-info">
                     <span className="info-left">{currentData.profit > 0 ? currentData.profit.toFixed(2) : '0.00'} EUR</span>
                     <span className="info-right">-{currentData.profit < 0 ? Math.abs(currentData.profit).toFixed(2) : '0.00'} EUR</span>
                   </div>
                   <div className="horizontal-bar-chart">
                     <div className="bar-container">
                       <div className="bar-segment profit" style={{ flex: `${currentData.profit > 0 ? (currentData.profit / (Math.abs(currentData.profit) + 0.01)) * 100 : 0}%` }}>
                         <span className="bar-label">Profit ${currentData.profit > 0 ? currentData.profit.toFixed(2) : '0.00'}</span>
                       </div>
                       <div className="bar-segment loss" style={{ flex: `${currentData.profit < 0 ? (Math.abs(currentData.profit) / (Math.abs(currentData.profit) + 0.01)) * 100 : 0}%` }}>
                         <span className="bar-label">Loss ${currentData.profit < 0 ? Math.abs(currentData.profit).toFixed(2) : '0.00'}</span>
                       </div>
                     </div>
                     <div className="bar-labels">
                       <span className="profit-label">Profit</span>
                       <span className="loss-label">Loss</span>
                     </div>
                   </div>
                </div>

                                                  {/* Average Profit/Loss Chart */}
                 <div className="chart-item">
                   <h4 className="chart-title">Average profit/loss per trade</h4>
                   <div className="chart-info">
                     <span className="info-left">{(currentData.profit / currentData.trades).toFixed(2)} EUR</span>
                     <span className="info-right">-{(Math.abs(currentData.profit) / currentData.trades).toFixed(2)} EUR</span>
                   </div>
                   <div className="horizontal-bar-chart">
                     <div className="bar-container">
                       <div className="bar-segment profit" style={{ flex: `${(currentData.profit / currentData.trades) > 0 ? ((currentData.profit / currentData.trades) / (Math.abs(currentData.profit / currentData.trades) + 0.01)) * 100 : 0}%` }}>
                         <span className="bar-label">Profit ${(currentData.profit / currentData.trades).toFixed(2)}</span>
                       </div>
                       <div className="bar-segment loss" style={{ flex: `${(currentData.profit / currentData.trades) < 0 ? (Math.abs(currentData.profit / currentData.trades) / (Math.abs(currentData.profit / currentData.trades) + 0.01)) * 100 : 0}%` }}>
                         <span className="bar-label">Loss ${(Math.abs(currentData.profit) / currentData.trades).toFixed(2)}</span>
                       </div>
                     </div>
                     <div className="bar-labels">
                       <span className="profit-label">Profit</span>
                       <span className="loss-label">Loss</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="charts-right-column">
                                                  {/* Profitable Trades Rate */}
                 <div className="chart-item">
                   <h4 className="chart-title">Profitable trades rate</h4>
                   <div className="chart-info">
                     <span className="info-left">{((currentData.winRate / 100) * 100).toFixed(2)}% ({Math.round(currentData.trades * currentData.winRate / 100)})</span>
                     <span className="info-right">{((100 - currentData.winRate) / 100 * 100).toFixed(2)}% ({Math.round(currentData.trades * (100 - currentData.winRate) / 100)})</span>
                   </div>
                   <div className="horizontal-bar-chart">
                     <div className="bar-container">
                       <div className="bar-segment buy" style={{ flex: `${currentData.winRate}%` }}>
                         <span className="bar-label">Buy {currentData.winRate}% ({Math.round(currentData.trades * currentData.winRate / 100)})</span>
                       </div>
                       <div className="bar-segment sell" style={{ flex: `${100 - currentData.winRate}%` }}>
                         <span className="bar-label">Sell {100 - currentData.winRate}% ({Math.round(currentData.trades * (100 - currentData.winRate) / 100)})</span>
                       </div>
                     </div>
                     <div className="bar-labels">
                       <span className="buy-label">Buy</span>
                       <span className="bar-label">Sell</span>
                     </div>
                   </div>
                </div>

                                 {/* Profit by Instrument */}
                 <div className="chart-item">
                   <h4 className="chart-title">Profit by Instrument</h4>
                   <div className="chart-header">
                     <span className="chart-amount">100%</span>
                     <span className="chart-count">USDCAD</span>
                   </div>
                   <div className="pie-chart-container">
                    <div className="pie-chart">
                      <div className="pie-segment" style={{ transform: 'rotate(0deg)' }}>
                        <span className="pie-label">100% USDCAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatsPopup;
