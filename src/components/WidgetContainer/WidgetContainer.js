import React, { useState, useRef, useEffect } from 'react';
import './WidgetContainer.css';

const WidgetContainer = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  onPositionChange,
  id,
  initialWidth = 400,
  initialHeight = 300,
  position = { x: 0, y: 0 },
  isMinimized = false,
  isMaximized = false,
  style = {}
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const widgetRef = useRef(null);
  const headerRef = useRef(null);

  // Update position when prop changes
  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const handleMouseDown = (e) => {
    if (isMaximized || isMinimized) return;
    
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized || isMinimized) return;

    const workspaceRect = widgetRef.current.parentElement.getBoundingClientRect();
    const newX = Math.max(0, Math.min(
      e.clientX - workspaceRect.left - dragOffset.x,
      workspaceRect.width - size.width
    ));
    const newY = Math.max(0, Math.min(
      e.clientY - workspaceRect.top - dragOffset.y,
      workspaceRect.height - size.height
    ));

    const newPosition = { x: newX, y: newY };
    setCurrentPosition(newPosition);
    
    if (onPositionChange) {
      onPositionChange(id, newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle resize
  const handleResizeStart = (e) => {
    if (isMaximized || isMinimized) return;
    
    setIsResizing(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleResize = (e) => {
    if (!isResizing || isMaximized || isMinimized) return;

    const workspaceRect = widgetRef.current.parentElement.getBoundingClientRect();
    const newWidth = Math.max(200, Math.min(
      e.clientX - workspaceRect.left - currentPosition.x,
      workspaceRect.width - currentPosition.x
    ));
    const newHeight = Math.max(150, Math.min(
      e.clientY - workspaceRect.top - currentPosition.y,
      workspaceRect.height - currentPosition.y
    ));

    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, dragOffset, size]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResize, currentPosition]);

  const handleMinimize = () => {
    if (onMinimize) onMinimize(id);
  };

  const handleMaximize = () => {
    if (onMaximize) onMaximize(id);
  };

  const handleClose = () => {
    if (onClose) onClose(id);
  };

  const getWidgetStyle = () => {
    if (isMaximized) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        ...style
      };
    }

    if (isMinimized) {
      return {
        position: 'absolute',
        left: currentPosition.x,
        top: currentPosition.y,
        width: size.width,
        height: 40,
        zIndex: 10,
        ...style
      };
    }

    return {
      position: 'absolute',
      left: currentPosition.x,
      top: currentPosition.y,
      width: size.width,
      height: size.height,
      zIndex: isDragging ? 1000 : 10,
      ...style
    };
  };

  return (
    <div 
      ref={widgetRef}
      className={`widget-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={getWidgetStyle()}
    >
      <div 
        ref={headerRef}
        className="widget-header"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="widget-title">{title}</div>
        <div className="widget-controls">
          <button className="widget-control minimize" onClick={handleMinimize}>
            {isMinimized ? 
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              :
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L6 10L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </button>
          <button className="widget-control maximize" onClick={handleMaximize}>
            {isMaximized ?
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 1H1V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11H11V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              :
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H10V10H2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </button>
          <button className="widget-control close" onClick={handleClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="widget-content">
        {!isMinimized && children}
      </div>
      
      {/* Resize handle */}
      {!isMinimized && !isMaximized && (
        <div 
          className="resize-handle"
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
};

export default WidgetContainer;