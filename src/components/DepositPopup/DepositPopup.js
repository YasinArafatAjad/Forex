import React, { useState } from 'react';
import './DepositPopup.css';
import PaymentPopup from '../PaymentPopup';

const DepositPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('BANK_TRANSFER');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [depositAmount, setDepositAmount] = useState(100);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showCryptoDetails, setShowCryptoDetails] = useState(false);

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  const handleProceedPayment = () => {
    if (activeTab === 'BANK_TRANSFER') {
      setShowBankDetails(true);
    } else {
      setShowCryptoDetails(true);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentPopup(false);
  };

  const handleBankDetailsClose = () => {
    setShowBankDetails(false);
  };

  const handleCryptoDetailsClose = () => {
    setShowCryptoDetails(false);
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDepositAmount(value);
  };

  const handleQuickAmount = (amount) => {
    setDepositAmount(amount);
  };

  const quickAmounts = [100, 250, 500, 1000, 2500];

  return (
    <>
      <div className="deposit-overlay" onClick={handleClose}>
        <div className="deposit-popup">
          {/* Header */}
          <div className="deposit-header">
            <h2 className="deposit-title">Deposit</h2>
            <button className="deposit-close-button" onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="deposit-tabs">
            <button 
              className={`deposit-tab-button ${activeTab === 'BANK_TRANSFER' ? 'active' : ''}`}
              onClick={() => setActiveTab('BANK_TRANSFER')}
            >
              Bank Transfer
            </button>
            <button 
              className={`deposit-tab-button ${activeTab === 'CRYPTOCURRENCIES' ? 'active' : ''}`}
              onClick={() => setActiveTab('CRYPTOCURRENCIES')}
            >
              Cryptocurrency
            </button>
          </div>

          {/* Content */}
          <div className="deposit-content">
            <div className="info-section">
              <h3>Para Yatırma Bilgileri</h3>
              <p>Lütfen yatırmak istediğiniz miktarı girin:</p>
            </div>
            
            <div className="deposit-form">
              <div className="deposit-form-group">
                <label className="deposit-form-label">Yatırılacak Miktar (USD)</label>
                <input 
                  type="number" 
                  className="deposit-form-input" 
                  placeholder="100.00"
                  min="100"
                  step="0.01"
                  value={depositAmount}
                  onChange={handleAmountChange}
                />
              </div>
              
              <div className="quick-amounts">
                <label className="deposit-form-label">Hızlı Miktar Seçimi</label>
                <div className="amount-buttons">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`quick-amount-btn ${depositAmount === amount ? 'active' : ''}`}
                      onClick={() => handleQuickAmount(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="deposit-summary">
              <div className="summary-row">
                <span>Yatırılacak Miktar:</span>
                <span className="amount">${depositAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>İşlem Ücreti:</span>
                <span className="fee">$0.00</span>
              </div>
              <div className="summary-row">
                <span>Komisyon:</span>
                <span className="commission">$0.00</span>
              </div>
              <div className="summary-row total">
                <span>Toplam:</span>
                <span className="total-amount">${depositAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="deposit-action-buttons">
              <button 
                className={`proceed-button ${depositAmount < 100 ? 'disabled' : ''}`}
                onClick={handleProceedPayment}
                disabled={depositAmount < 100}
              >
                İlerle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details Popup */}
      {showBankDetails && (
        <div className="bank-details-overlay">
          <div className="bank-details-popup">
            <div className="bank-details-header">
              <h3>Banka Transfer Bilgileri</h3>
              <button 
                className="bank-details-close-button" 
                onClick={handleBankDetailsClose}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="bank-details-content">
              <div className="info-section">
                <p>Lütfen aşağıdaki banka bilgilerini kullanarak transfer yapın:</p>
              </div>
              
              <div className="bank-details">
                <div className="detail-row">
                  <span className="detail-label">Banka Adı:</span>
                  <span className="detail-value">Forex Bank Ltd.</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Hesap Adı:</span>
                  <div className="detail-value-with-copy">
                    <span className="detail-value">Forex Trading Platform</span>
                    <button 
                      className="copy-icon-button" 
                      onClick={() => navigator.clipboard.writeText('Forex Trading Platform')}
                      title="Hesap adını kopyala"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H10C10.55 14 11 13.55 11 13V11H13C13.55 11 14 10.55 14 10V2C14 1.45 13.55 1 13 1H6C5.45 1 5 1.45 5 2V4H4V2ZM6 2H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                        <path d="M6 4H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Hesap Numarası:</span>
                  <div className="detail-value-with-copy">
                    <span className="detail-value">1234567890</span>
                    <button 
                      className="copy-icon-button" 
                      onClick={() => navigator.clipboard.writeText('1234567890')}
                      title="Hesap numarasını kopyala"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H10C10.55 14 11 13.55 11 13V11H13C13.55 11 14 10.55 14 10V2C14 1.45 13.55 1 13 1H6C5.45 1 5 1.45 5 2V4H4V2ZM6 2H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                        <path d="M6 4H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">IBAN:</span>
                  <div className="detail-value-with-copy">
                    <span className="detail-value">TR12 3456 7890 1234 5678 9012 3456 78</span>
                    <button 
                      className="copy-icon-button" 
                      onClick={() => navigator.clipboard.writeText('TR12 3456 7890 1234 5678 9012 3456 78')}
                      title="IBAN'ı kopyala"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H10C10.55 14 11 13.55 11 13V11H13C13.55 11 14 10.55 14 10V2C14 1.45 13.55 1 13 1H6C5.45 1 5 1.45 5 2V4H4V2ZM6 2H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                        <path d="M6 4H13V10H4V8H2V3H4V2H6V4Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">SWIFT Kodu:</span>
                  <span className="detail-value">FRXBTRIX</span>
                </div>
              </div>

              <div className="important-note">
                <h4>Önemli Notlar:</h4>
                <ul>
                  <li>Minimum yatırım: $100</li>
                  <li>İşlem süresi: 1-3 iş günü</li>
                  <li>Yatırım ücreti yoktur</li>
                </ul>
              </div>

              <div className="deposit-action-buttons">
                <button className="confirm-deposit-button" onClick={handleBankDetailsClose}>
                  Yatırım Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crypto Details Popup */}
      {showCryptoDetails && (
        <div className="crypto-details-overlay">
          <div className="crypto-details-popup">
            <div className="crypto-details-header">
              <h3>Kripto Para Yatırma</h3>
              <button 
                className="crypto-details-close-button" 
                onClick={handleCryptoDetailsClose}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="crypto-details-content">
              <div className="info-section">
                <p>Desteklenen kripto para birimlerinden birini seçin:</p>
              </div>

              <div className="crypto-options">
                <div className="crypto-option">
                  <div className="crypto-info">
                    <span className="crypto-name">Bitcoin (BTC)</span>
                    <span className="crypto-network">Bitcoin Network</span>
                  </div>
                  <button className="copy-button">Adresi Kopyala</button>
                </div>
                
                <div className="crypto-option">
                  <div className="crypto-info">
                    <span className="crypto-name">Ethereum (ETH)</span>
                    <span className="crypto-network">Ethereum Network</span>
                  </div>
                  <button className="copy-button">Adresi Kopyala</button>
                </div>
                
                <div className="crypto-option">
                  <div className="crypto-info">
                    <span className="crypto-name">USDT</span>
                    <span className="crypto-network">Tron Network (TRC20)</span>
                  </div>
                  <button className="copy-button">Adresi Kopyala</button>
                </div>
                
                <div className="crypto-option">
                  <div className="crypto-info">
                    <span className="crypto-name">USDC</span>
                    <span className="crypto-network">Ethereum Network (ERC20)</span>
                  </div>
                  <button className="copy-button">Adresi Kopyala</button>
                </div>
              </div>

              <div className="important-note">
                <h4>Önemli Notlar:</h4>
                <ul>
                  <li>Sadece desteklenen kripto para birimlerini gönderin</li>
                  <li>Minimum yatırım: $50</li>
                  <li>İşlem süresi: 10-30 dakika</li>
                  <li>Ağ ücretleri uygulanabilir</li>
                </ul>
              </div>

              <div className="deposit-action-buttons">
                <button className="confirm-deposit-button" onClick={handleCryptoDetailsClose}>
                  Yatırım Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      <PaymentPopup 
        isOpen={showPaymentPopup}
        onClose={handlePaymentClose}
        depositAmount={depositAmount}
      />
    </>
  );
};

export default DepositPopup;
