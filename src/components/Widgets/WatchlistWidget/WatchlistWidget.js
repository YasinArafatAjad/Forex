import React, { useState } from 'react';
import WidgetContainer from '../../WidgetContainer';
import './WatchlistWidget.css';

const WatchlistWidget = ({ 
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
  activeTab: initialActiveTab = 'popular',
  style = {}
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  
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

  return (
    <WidgetContainer 
      title="Watchlist" 
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
      <div className="watchlist-widget">
        <div className="watchlist-tabs">
          <button
            className={`watchlist-tab-button ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popüler
          </button>
          <button
            className={`watchlist-tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favoriler
          </button>
          <button
            className={`watchlist-tab-button ${activeTab === 'bist' ? 'active' : ''}`}
            onClick={() => setActiveTab('bist')}
          >
            BIST
          </button>
        </div>
        
        <div className="watchlist-table">
          <div className="watchlist-header">
            <div className="watchlist-cell">Sembol</div>
            <div className="watchlist-cell">Fiyat</div>
            <div className="watchlist-cell">Değişim</div>
          </div>
          
          <div className="watchlist-body">
            {watchlistData[activeTab].map((item, index) => (
              <div key={index} className="watchlist-row">
                <div className="watchlist-cell">{item.name}</div>
                <div className="watchlist-cell">{item.price}</div>
                <div className={`watchlist-cell change-cell ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default WatchlistWidget;