import React from 'react';
import WidgetContainer from '../../WidgetContainer';
import './PositionsWidget.css';

const PositionsWidget = ({ id, onClose, initialWidth, initialHeight }) => {
  // Sample positions data
  const positions = [
    { 
      id: 1, 
      symbol: 'EURUSD', 
      type: 'Buy', 
      openPrice: '1.0820', 
      currentPrice: '1.0850', 
      pips: '+30', 
      profit: '+$32.50',
      volume: '0.10',
      openTime: '2023-04-15 09:45'
    },
    { 
      id: 2, 
      symbol: 'GBPUSD', 
      type: 'Sell', 
      openPrice: '1.2680', 
      currentPrice: '1.2650', 
      pips: '+30', 
      profit: '+$38.20',
      volume: '0.12',
      openTime: '2023-04-15 10:30'
    },
    { 
      id: 3, 
      symbol: 'USDJPY', 
      type: 'Buy', 
      openPrice: '148.20', 
      currentPrice: '148.50', 
      pips: '+30', 
      profit: '+$25.10',
      volume: '0.08',
      openTime: '2023-04-15 11:15'
    },
  ];

  return (
    <WidgetContainer 
      title="Positions" 
      id={id}
      onClose={onClose}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
    >
      <div className="positions-widget">
        {positions.length > 0 ? (
          <table className="positions-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Current</th>
                <th>Pips</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {positions.map(position => (
                <tr key={position.id}>
                  <td>{position.symbol}</td>
                  <td className={position.type === 'Buy' ? 'buy-type' : 'sell-type'}>
                    {position.type}
                  </td>
                  <td>{position.volume}</td>
                  <td>{position.openPrice}</td>
                  <td>{position.currentPrice}</td>
                  <td className={position.pips.startsWith('+') ? 'positive' : 'negative'}>
                    {position.pips}
                  </td>
                  <td className={position.profit.startsWith('+') ? 'positive' : 'negative'}>
                    {position.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-positions">
            <div className="no-positions-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.8 14.4H38.4V7.2C38.4 5.2904 37.6414 3.45909 36.3037 2.12132C34.9659 0.783569 33.1346 0.025 31.2 0H7.2C5.2654 0 3.43411 0.758569 2.09634 2.09634C0.758569 3.43411 0 5.2654 0 7.2V36C0 37.9346 0.758569 39.7659 2.09634 41.1037C3.43411 42.4414 5.2654 43.2 7.2 43.2H9.6V45.6C9.6 46.5548 9.97928 47.4705 10.6544 48.1456C11.3295 48.8207 12.2452 49.2 13.2 49.2H40.8C41.7548 49.2 42.6705 48.8207 43.3456 48.1456C44.0207 47.4705 44.4 46.5548 44.4 45.6V18C44.4 17.0452 44.0207 16.1295 43.3456 15.4544C42.6705 14.7793 41.7548 14.4 40.8 14.4ZM4.8 7.2C4.8 6.26957 5.16857 5.37715 5.82426 4.72147C6.47995 4.06578 7.37236 3.69721 8.3028 3.69721H30.0972C31.0276 3.69721 31.92 4.06578 32.5757 4.72147C33.2314 5.37715 33.6 6.26957 33.6 7.2V12H13.2C12.2452 12 11.3295 12.3793 10.6544 13.0544C9.97928 13.7295 9.6 14.6452 9.6 15.6V38.4H7.2C6.26957 38.4 5.37715 38.0314 4.72147 37.3757C4.06578 36.72 3.69721 35.8276 3.69721 34.8972V8.3028C3.69721 7.37236 4.06578 6.47995 4.72147 5.82426C5.37715 5.16857 6.26957 4.8 7.2 4.8H31.2C32.1304 4.8 33.0228 5.16857 33.6785 5.82426C34.3342 6.47995 34.7028 7.37236 34.7028 8.3028V14.4H13.2C12.2452 14.4 11.3295 14.7793 10.6544 15.4544C9.97928 16.1295 9.6 17.0452 9.6 18V38.4C8.64957 38.4 7.75715 38.0314 7.10147 37.3757C6.44578 36.72 6.07721 35.8276 6.07721 34.8972V7.2H4.8ZM40.8 45.6H13.2V18H40.8V45.6Z" fill="#6c757d"/>
              </svg>
            </div>
            <div className="no-positions-message">
              No open positions
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default PositionsWidget;
