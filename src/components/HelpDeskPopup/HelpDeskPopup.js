import React, { useState } from 'react';
import './HelpDeskPopup.css';

const HelpDeskPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('FAQ');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  if (!isOpen) return null;

  // Removed click-outside behavior - only X button closes
  const handleClose = () => {};

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Submit contact form logic here
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqData = [
    {
      question: "How do I start trading?",
      answer: "Create an account, complete verification, deposit funds, and choose your trading instruments. We provide educational resources and demo accounts."
    },
    {
      question: "What are the minimum deposits?",
      answer: "Standard accounts start at $100. Premium accounts may require higher minimums. Check our account types page for details."
    },
    {
      question: "How do I withdraw profits?",
      answer: "Use your account dashboard to select withdrawal method, enter amount, and follow verification. Processed within 1-3 business days."
    },
    {
      question: "What instruments are available?",
      answer: "Major/minor currency pairs, commodities, indices, and cryptocurrencies. New instruments added regularly."
    }
  ];

  return (
    <div className="helpdesk-overlay" onClick={handleClose}>
      <div className="helpdesk-popup">
        {/* Header */}
        <div className="helpdesk-header">
          <h2 className="helpdesk-title">Help Desk</h2>
          <button className="helpdesk-close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="helpdesk-tabs">
          <button 
            className={`helpdesk-tab-button ${activeTab === 'FAQ' ? 'active' : ''}`}
            onClick={() => setActiveTab('FAQ')}
          >
            FAQ
          </button>
          <button 
            className={`helpdesk-tab-button ${activeTab === 'CONTACT' ? 'active' : ''}`}
            onClick={() => setActiveTab('CONTACT')}
          >
            Contact Now
          </button>
        </div>

        {/* Content */}
        <div className="helpdesk-content">
          {activeTab === 'FAQ' && (
            <div className="helpdesk-section">
              <h3 className="helpdesk-section-title">Frequently Asked Questions</h3>
              
              <div className="faq-list">
                {faqData.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question">
                      <span className="faq-question-text">{faq.question}</span>
                      <svg className="faq-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

                     {activeTab === 'CONTACT' && (
             <div className="helpdesk-section">
               <div className="contact-header">
                 <div className="contact-icon-large">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                     <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                   </svg>
                 </div>
                 <h3 className="contact-title">Get in Touch</h3>
                 <p className="contact-subtitle">We're here to help with any questions you might have</p>
               </div>

               <div className="contact-email-card">
                 <div className="email-info">
                   <div className="email-icon">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                       <path d="M2.003 5.884L10 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 4.00013 16 4H4C3.48958 4.00013 2.99847 4.19497 2.62718 4.54523C2.25588 4.89549 2.03258 5.37444 2.003 5.884Z" fill="currentColor"/>
                       <path d="M2 7.236V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V7.236L10 11.236L2 7.236Z" fill="currentColor"/>
                     </svg>
                   </div>
                   <div className="email-details">
                     <span className="email-label">Email Support</span>
                     <span className="email-value">support@forex.com</span>
                     <span className="email-status">Available 24/5</span>
                   </div>
                 </div>
               </div>

               <form className="contact-form-modern" onSubmit={handleContactSubmit}>
                 <div className="form-row">
                   <div className="helpdesk-form-group">
                     <label className="helpdesk-form-label">Full Name *</label>
                     <input 
                       type="text" 
                       className="helpdesk-form-input" 
                       name="name"
                       value={contactForm.name}
                       onChange={handleInputChange}
                       required
                     />
                   </div>

                   <div className="helpdesk-form-group">
                     <label className="helpdesk-form-label">Email Address *</label>
                     <input 
                       type="email" 
                       className="helpdesk-form-input" 
                       name="email"
                       value={contactForm.email}
                       onChange={handleInputChange}
                       required
                     />
                   </div>
                 </div>

                 <div className="helpdesk-form-group">
                   <label className="helpdesk-form-label">Subject *</label>
                   <input 
                     type="text" 
                     className="helpdesk-form-input" 
                     name="subject"
                     value={contactForm.subject}
                     onChange={handleInputChange}
                     required
                   />
                 </div>

                 <div className="helpdesk-form-group">
                   <label className="helpdesk-form-label">Message *</label>
                   <textarea 
                     className="helpdesk-form-textarea" 
                     name="message"
                     value={contactForm.message}
                     onChange={handleInputChange}
                     rows="3"
                     required
                   />
                 </div>

                 <button type="submit" className="helpdesk-submit-button-modern">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M1 8L15 8M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                   Send Message
                 </button>
               </form>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default HelpDeskPopup;
