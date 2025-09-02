import React, { useState } from 'react';
import './PaymentPopup.css';

const PaymentPopup = ({ isOpen, onClose, depositAmount = 100 }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment submitted:', {
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      depositAmount
    });
    onClose();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="payment-overlay" onClick={handleClose}>
      <div className="payment-popup">
        {/* Header */}
        <div className="payment-header">
          <h2 className="payment-title">Ödeme Bilgileri</h2>
          <button className="payment-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <div className="summary-header">
            <h3>Ödeme Özeti</h3>
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Yatırılacak Miktar:</span>
              <span className="amount">${depositAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>İşlem Ücreti:</span>
              <span className="fee">$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Toplam:</span>
              <span className="total-amount">${depositAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-form-group">
            <label className="payment-form-label">Ödeme Yöntemi</label>
            <select 
              className="payment-form-select" 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Ödeme yöntemi seçin</option>
              <option value="credit_card">Kredi Kartı</option>
              <option value="debit_card">Banka Kartı</option>
            </select>
          </div>

          <div className="payment-form-group">
            <label className="payment-form-label">Kart Üzerindeki İsim</label>
            <input 
              type="text" 
              className="payment-form-input" 
              placeholder="Kart üzerinde yazan isim"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <div className="payment-form-group">
            <label className="payment-form-label">Kart Numarası</label>
            <input 
              type="text" 
              className="payment-form-input" 
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength="19"
              required
            />
          </div>

          <div className="payment-form-row">
            <div className="payment-form-group">
              <label className="payment-form-label">Son Kullanma Tarihi</label>
              <input 
                type="text" 
                className="payment-form-input" 
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength="5"
                required
              />
            </div>
            
            <div className="payment-form-group">
              <label className="payment-form-label">CVV</label>
              <input 
                type="text" 
                className="payment-form-input" 
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                maxLength="4"
                required
              />
            </div>
          </div>

          <div className="security-note">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4V7C14 10.866 11.866 13 8 13C4.134 13 2 10.866 2 7V4L8 1Z" stroke="#b21515" strokeWidth="1.5"/>
              <path d="M6 7L7.5 8.5L10 6" stroke="#b21515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Ödeme bilgileriniz SSL ile şifrelenerek güvenli şekilde işlenir</span>
          </div>

          <div className="payment-action-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              İptal
            </button>
            <button type="submit" className="confirm-button">
              Ödemeyi Onayla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPopup;
