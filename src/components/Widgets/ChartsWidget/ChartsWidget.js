import React from 'react';
import WidgetContainer from '../../WidgetContainer';
import './ChartsWidget.css';

const ChartsWidget = ({ 
  id, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onPositionChange,
  onActivate,
  position,
  initialWidth, 
  initialHeight, 
  isMinimized,
  isMaximized,
  symbol = null,
  style = {}
}) => {
  return (
    <WidgetContainer 
      title={symbol ? `Chart - ${symbol}` : "Charts"}
      id={id}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onPositionChange={onPositionChange}
      onActivate={onActivate}
      position={position}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      style={style}
    >
      <div className="charts-widget">
        <div className="chart-placeholder">
          <div className="chart-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 36L18 24L24 30L42 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="36" r="3" fill="currentColor"/>
              <circle cx="18" cy="24" r="3" fill="currentColor"/>
              <circle cx="24" cy="30" r="3" fill="currentColor"/>
              <circle cx="42" cy="12" r="3" fill="currentColor"/>
            </svg>
          </div>
          {symbol ? (
            <div className="chart-symbol-info">
              <div className="symbol-name">{symbol}</div>
              <div className="symbol-price">Chart will be displayed here</div>
            </div>
          ) : (
            <div className="chart-message">
              Select an instrument to display chart
            </div>
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ChartsWidget;