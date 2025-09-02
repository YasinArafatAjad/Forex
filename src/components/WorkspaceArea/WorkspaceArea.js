import React from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import ChartsWidget from '../Widgets/ChartsWidget';
import PositionsWidget from '../Widgets/PositionsWidget';
import TradesWidget from '../Widgets/TradesWidget';
import WatchlistWidget from '../Widgets/WatchlistWidget';
import './WorkspaceArea.css';

const WorkspaceArea = () => {
  const { 
    widgets, 
    removeWidget, 
    updateWidgetPosition, 
    minimizeWidget, 
    maximizeWidget,
    bringToFront 
  } = useWorkspace();

  const renderWidget = (widget) => {
    const commonProps = {
      key: widget.id,
      id: widget.id,
      onClose: removeWidget,
      onMinimize: minimizeWidget,
      onMaximize: maximizeWidget,
      onPositionChange: updateWidgetPosition,
      onActivate: bringToFront,
      position: widget.position,
      initialWidth: widget.size?.width || 400,
      initialHeight: widget.size?.height || 300,
      isMinimized: widget.isMinimized || false,
      isMaximized: widget.isMaximized || false,
      style: {
        zIndex: widget.isMaximized ? 1000 : 10
      }
    };

    const widgetElement = (() => {
      switch (widget.type) {
        case 'charts':
          return <ChartsWidget {...commonProps} symbol={widget.symbol} />;
        case 'positions':
          return <PositionsWidget {...commonProps} />;
        case 'trades':
          return <TradesWidget {...commonProps} />;
        case 'watchlist':
          return <WatchlistWidget {...commonProps} activeTab={widget.activeTab} />;
        default:
          return null;
      }
    })();

    return widgetElement;
  };

  return (
    <div className="workspace-area">
      {widgets.length === 0 ? (
        <div className="workspace-empty">
          <div className="workspace-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8H24V24H8V8ZM40 8H56V24H40V8ZM8 40H24V56H8V40ZM40 40H56V56H40V40Z" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M32 16H32.01M32 32H32.01M16 32H16.01M48 32H48.01M32 48H32.01" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="workspace-title">Welcome to Your Trading Workspace</div>
          <div className="workspace-subtitle">Click the grid icon in the sidebar to add widgets and customize your trading environment</div>
        </div>
      ) : (
        widgets.map(renderWidget)
      )}
    </div>
  );
};

export default WorkspaceArea;