import React from 'react';
import WidgetContainer from '../../WidgetContainer';
import './ChartsWidget.css';

const ChartsWidget = ({ id, onClose, initialWidth, initialHeight, symbol = null }) => {
  return (
    <WidgetContainer 
      title={symbol ? `Chart - ${symbol}` : "Charts"}
      id={id}
      onClose={onClose}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
    >
      <div className="charts-widget">
        <div className="chart-placeholder">
          <div className="chart-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L6 14M2 10L10 10M14 6L14 18M18 10L18 22M22 4L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M30 8L42 8M36 2L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="6" cy="10" r="2" fill="currentColor"/>
              <circle cx="14" cy="12" r="2" fill="currentColor"/>
              <circle cx="22" cy="10" r="2" fill="currentColor"/>
              <circle cx="30" cy="8" r="2" fill="currentColor"/>
              <circle cx="42" cy="8" r="2" fill="currentColor"/>
            </svg>
          </div>
          <div className="chart-message">
            {symbol ? `${symbol} Chart Loading...` : 'Select an instrument to display chart'}
          </div>
          {symbol && (
            <div className="chart-symbol-info">
              <div className="symbol-name">{symbol}</div>
              <div className="symbol-price">Loading price data...</div>
            </div>
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ChartsWidget;
