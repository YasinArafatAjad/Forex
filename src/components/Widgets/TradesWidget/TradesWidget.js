import React from 'react';
import WidgetContainer from '../../WidgetContainer';
import './TradesWidget.css';

const TradesWidget = ({ 
  id, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onPositionChange,
  position,
  initialWidth, 
  initialHeight,
  isMinimized,
  isMaximized,
  style = {}
}) => {
  // Sample trades data
  const trades = [
    { 
      id: 1, 
      symbol: 'EURUSD', 
      type: 'Buy', 
      openPrice: '1.0750', 
      closePrice: '1.0830', 
      pips: '+80', 
      profit: '+$85.20',
      volume: '0.10',
      openTime: '2023-04-10 09:45',
      closeTime: '2023-04-12 14:30'
    },
    { 
      id: 2, 
      symbol: 'GBPUSD', 
      type: 'Sell', 
      openPrice: '1.2720', 
      closePrice: '1.2650', 
      pips: '+70', 
      profit: '+$92.40',
      volume: '0.12',
      openTime: '2023-04-08 10:30',
      closeTime: '2023-04-11 16:15'
    },
    { 
      id: 3, 
      symbol: 'USDJPY', 
      type: 'Buy', 
      openPrice: '147.80', 
      closePrice: '147.20', 
      pips: '-60', 
      profit: '-$48.30',
      volume: '0.08',
      openTime: '2023-04-07 11:15',
      closeTime: '2023-04-10 09:20'
    },
  ];

  return (
    <WidgetContainer 
      title="Trade History" 
      id={id}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onPositionChange={onPositionChange}
      position={position}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      style={style}
    >
      <div className="trades-widget">
        {trades.length > 0 ? (
          <table className="trades-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open</th>
                <th>Close</th>
                <th>Pips</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => (
                <tr key={trade.id}>
                  <td>{trade.symbol}</td>
                  <td className={trade.type === 'Buy' ? 'buy-type' : 'sell-type'}>
                    {trade.type}
                  </td>
                  <td>{trade.volume}</td>
                  <td>{trade.openPrice}</td>
                  <td>{trade.closePrice}</td>
                  <td className={trade.pips.startsWith('+') ? 'positive' : 'negative'}>
                    {trade.pips}
                  </td>
                  <td className={trade.profit.startsWith('+') ? 'positive' : 'negative'}>
                    {trade.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-trades">
            <div className="no-trades-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="no-trades-message">
              No trades available
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default TradesWidget;