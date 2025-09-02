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
          <div className="no-trades-message">
            No trades available
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default TradesWidget;
            <div className="no-trades-message">
              No trades available
            </div>
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
        )}
      </div>
    </WidgetContainer>
  );
};

export default TradesWidget;