import React, { useState } from 'react';
import './CreateOrderPopup.css';

const CreateOrderPopup = ({ isOpen, onClose, selectedInstrument = "1INCH ( 1INCH - 1inch Network )" }) => {
  const [activeTab, setActiveTab] = useState('MARKET');
  const [volume, setVolume] = useState('0.01');
  const [price, setPrice] = useState('0.2666');
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(selectedInstrument);
  const [showStopLoss, setShowStopLoss] = useState(false);
  const [showTakeProfit, setShowTakeProfit] = useState(false);

  // Sample symbols for the dropdown
  const symbols = [
    "1INCH ( 1INCH - 1inch Network )",
    "BTC ( Bitcoin )",
    "ETH ( Ethereum )",
    "ADA ( Cardano )",
    "DOT ( Polkadot )",
    "LINK ( Chainlink )",
    "LTC ( Litecoin )",
    "XRP ( Ripple )"
  ];

  if (!isOpen) return null;

  const handleVolumeChange = (increment) => {
    const currentVolume = parseFloat(volume);
    const newVolume = Math.max(0.01, currentVolume + increment);
    setVolume(newVolume.toFixed(2));
  };

  const handlePriceChange = (increment) => {
    const currentPrice = parseFloat(price);
    const newPrice = Math.max(0, currentPrice + increment);
    setPrice(newPrice.toFixed(4));
  };

  // Removed click-outside behavior
  const handleClose = () => {};

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
    setShowSymbolDropdown(false);
  };

  const toggleSymbolDropdown = () => {
    setShowSymbolDropdown(!showSymbolDropdown);
  };

  return (
    <div className="create-order-overlay" onClick={handleClose}>
      <div className="create-order-popup">
        {/* New Header with Symbol Title and Close Icon */}
        <div className="popup-main-header">
          <div className="symbol-title-container">
            <button 
              className="symbol-title-button"
              onClick={toggleSymbolDropdown}
            >
              <span className="symbol-title">{selectedSymbol}</span>
              <svg 
                className={`dropdown-arrow ${showSymbolDropdown ? 'rotated' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Symbol Dropdown */}
            {showSymbolDropdown && (
              <div className="symbol-dropdown">
                {symbols.map((symbol, index) => (
                  <button
                    key={index}
                    className={`symbol-option ${symbol === selectedSymbol ? 'selected' : ''}`}
                    onClick={() => handleSymbolSelect(symbol)}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="create-order-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Header with tabs */}
        <div className="create-order-popup-header">
          <div className="create-order-tab-container">
            <button 
              className={`create-order-tab-button ${activeTab === 'MARKET' ? 'active' : ''}`}
              onClick={() => setActiveTab('MARKET')}
            >
              MARKET
            </button>
            <button 
              className={`create-order-tab-button ${activeTab === 'EMİR' ? 'active' : ''}`}
              onClick={() => setActiveTab('EMİR')}
            >
              EMİR
            </button>
          </div>
        </div>

        {/* Volume and Price Input Row - Only show price in EMİR tab */}
        <div className="input-group">
          <div className="input-row">
            <div className="input-column">
              <label className="input-label">Hacim</label>
              <div className="input-container">
                <div className="input-with-arrows">
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        handleVolumeChange(0.01);
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        handleVolumeChange(-0.01);
                      }
                    }}
                    className="volume-input"
                    placeholder="0.01"
                  />
                  <div className="arrow-buttons">
                    <button 
                      className="arrow-button up"
                      onClick={() => handleVolumeChange(0.01)}
                      type="button"
                    >
                      ▲
                    </button>
                    <button 
                      className="arrow-button down"
                      onClick={() => handleVolumeChange(-0.01)}
                      type="button"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {activeTab === 'EMİR' && (
              <div className="input-column">
                <label className="input-label">Fiyat</label>
                <div className="input-container">
                  <div className="input-with-arrows">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          handlePriceChange(0.0001);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          handlePriceChange(-0.0001);
                        }
                      }}
                      className="price-input"
                      placeholder="0.0000"
                    />
                    <div className="arrow-buttons">
                      <button 
                        className="arrow-button up"
                        onClick={() => handlePriceChange(0.0001)}
                        type="button"
                      >
                        ▲
                      </button>
                      <button 
                        className="arrow-button down"
                        onClick={() => handlePriceChange(-0.0001)}
                        type="button"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="required-margin">
            Gerekli Teminat: 0.00 USD
          </div>
        </div>

        {/* Stop Loss / Take Profit */}
        <div className="sl-tp-container">
          <div className="sl-tp-group">
            <div className="checkbox-label">
              <input
                type="checkbox"
                id="stopLoss"
                checked={showStopLoss}
                onChange={(e) => setShowStopLoss(e.target.checked)}
                className="sl-tp-checkbox"
              />
              <label htmlFor="stopLoss" className="input-label">Stop Loss</label>
            </div>
            {showStopLoss && (
              <div className="input-container">
                <div className="pips-option">
                  <label className="pips-label">Pips:</label>
                  <div className="input-with-arrows">
                    <input
                      type="text"
                      placeholder="0"
                      className="pips-input"
                    />
                    <div className="arrow-buttons">
                      <button 
                        className="arrow-button up"
                        type="button"
                      >
                        ▲
                      </button>
                      <button 
                        className="arrow-button down"
                        type="button"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price-option">
                  <label className="price-label">Estimated Price:</label>
                  <input
                    type="text"
                    placeholder="0.0000"
                    className="sl-input"
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>

          <div className="tp-group">
            <div className="checkbox-label">
              <input
                type="checkbox"
                id="takeProfit"
                checked={showTakeProfit}
                onChange={(e) => setShowTakeProfit(e.target.checked)}
                className="sl-tp-checkbox"
              />
              <label htmlFor="takeProfit" className="input-label">Take Profit</label>
            </div>
            {showTakeProfit && (
              <div className="input-container">
                <div className="pips-option">
                  <label className="pips-label">Pips:</label>
                  <div className="input-with-arrows">
                    <input
                      type="text"
                      placeholder="0"
                      className="pips-input"
                    />
                    <div className="arrow-buttons">
                      <button 
                        className="arrow-button up"
                        type="button"
                      >
                        ▲
                      </button>
                      <button 
                        className="arrow-button down"
                        type="button"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price-option">
                  <label className="price-label">Estimated Price:</label>
                  <input
                    type="text"
                    placeholder="0.0000"
                    className="tp-input"
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Summary */}
        <div className="account-summary">
          <div className="summary-item">
            <span>Serbest Teminat</span>
            <span>0.00 USD</span>
          </div>
          <div className="summary-item">
            <span>Komisyon</span>
            <span>0.00 USD</span>
          </div>
          <div className="summary-item">
            <span>Min. Lot</span>
            <span>0.01</span>
          </div>
          <div className="summary-item">
            <span>Swap Long</span>
            <span>-0.00</span>
          </div>
          <div className="summary-item">
            <span>Swap Short</span>
            <span>-0.00</span>
          </div>
        </div>

        {/* Simple Action Buttons */}
        <div className="create-order-simple-action-buttons">
          <button className="create-order-simple-sell-button">
            <span className="create-order-simple-button-text">
              {activeTab === 'EMİR' ? 'SELL STOP' : 'SELL'}
            </span>
            <span className="create-order-simple-button-price">0.26668</span>
          </button>
          <button className="create-order-simple-buy-button">
            <span className="create-order-simple-button-text">
              {activeTab === 'EMİR' ? 'BUY LIMIT' : 'BUY'}
            </span>
            <span className="create-order-simple-button-price">0.26688</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPopup;
