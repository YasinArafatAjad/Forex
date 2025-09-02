import React from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import ChartsWidget from '../Widgets/ChartsWidget';
import PositionsWidget from '../Widgets/PositionsWidget';
import TradesWidget from '../Widgets/TradesWidget';
import WatchlistWidget from '../Widgets/WatchlistWidget';
import './WorkspaceArea.css';

const WorkspaceArea = () => {
  const { widgets, removeWidget } = useWorkspace();

  const renderWidget = (widget) => {
    const commonProps = {
      key: widget.id,
      id: widget.id,
      onClose: removeWidget,
      initialWidth: '100%',
      initialHeight: '100%',
      style: {
        position: 'absolute',
        left: widget.position.x,
        top: widget.position.y,
        zIndex: 1
      }
    };

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
  };

  return (
    <div className="workspace-area">
      {widgets.length === 0 ? (
        <div className="workspace-empty">
          <div className="workspace-title">Workspace Area</div>
          <div className="workspace-subtitle">Add widgets from the sidebar to build your custom workspace</div>
        </div>
      ) : (
        widgets.map(renderWidget)
      )}
    </div>
  );
};

export default WorkspaceArea;
