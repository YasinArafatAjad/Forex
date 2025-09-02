import React from 'react';
import WidgetContainer from '../../WidgetContainer';
import './TradesWidget.css';

const TradesWidget = ({ id, onClose, initialWidth, initialHeight }) => {
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
      initialWidth={initialWidth}
      initialHeight={initialHeight}
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
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 0C17.3141 0.0175493 12.2725 1.99739 8.544 5.568V2.4C8.544 1.76348 8.29123 1.15303 7.84114 0.702944C7.39106 0.252856 6.78061 0 6.144 0C5.50739 0 4.89695 0.252856 4.44686 0.702944C3.99677 1.15303 3.744 1.76348 3.744 2.4V13.2C3.744 13.8365 3.99677 14.447 4.44686 14.8971C4.89695 15.3471 5.50739 15.6 6.144 15.6H16.944C17.5806 15.6 18.191 15.3471 18.6411 14.8971C19.0912 14.447 19.344 13.8365 19.344 13.2C19.344 12.5635 19.0912 11.953 18.6411 11.5029C18.191 11.0529 17.5806 10.8 16.944 10.8H8.784C10.9722 8.48883 13.7005 6.75782 16.7237 5.76274C19.7468 4.76766 22.9698 4.53965 26.1029 5.09928C29.2359 5.65891 32.1806 7.08863 34.6723 9.24878C37.164 11.4089 39.1243 14.2174 40.3771 17.4032C41.6298 20.589 42.1354 24.0602 41.8485 27.5299C41.5617 30.9996 40.5119 34.3483 38.7943 37.3018C37.0767 40.2553 34.6875 42.7303 31.781 44.5313C28.8745 46.3323 25.5389 47.4118 22.08 47.52C21.4434 47.52 20.833 47.7729 20.3829 48.2229C19.9328 48.673 19.68 49.2835 19.68 49.92C19.68 50.5565 19.9328 51.167 20.3829 51.617C20.833 52.0671 21.4434 52.32 22.08 52.32C29.0214 52.32 35.6459 49.4714 40.4267 44.6906C45.2075 39.9098 48.0562 33.2854 48.0562 26.344C48.0562 19.4026 45.2075 12.7782 40.4267 7.99736C35.6459 3.21653 29.0214 0.367859 22.08 0.367859L22.56 0ZM22.656 14.4C22.0194 14.4 21.409 14.6529 20.9589 15.1029C20.5088 15.553 20.256 16.1635 20.256 16.8V24C20.256 24.6365 20.5088 25.247 20.9589 25.697C21.409 26.1471 22.0194 26.4 22.656 26.4H27.456C28.0926 26.4 28.703 26.1471 29.1531 25.697C29.6032 25.247 29.856 24.6365 29.856 24C29.856 23.3635 29.6032 22.753 29.1531 22.303C28.703 21.8529 28.0926 21.6 27.456 21.6H25.056V16.8C25.056 16.1635 24.8032 15.553 24.3531 15.1029C23.903 14.6529 23.2926 14.4 22.656 14.4Z" fill="#6c757d"/>
              </svg>
            </div>
            <div className="no-trades-message">
              No trade history available
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default TradesWidget;
