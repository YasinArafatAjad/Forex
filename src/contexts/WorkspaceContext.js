import React, { createContext, useState, useContext, useEffect } from 'react';

const WorkspaceContext = createContext();

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
  const [widgets, setWidgets] = useState([]);
  const [nextWidgetId, setNextWidgetId] = useState(1);

  // Load widgets from localStorage on component mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('workspaceWidgets');
    const savedNextId = localStorage.getItem('workspaceNextWidgetId');
    
    if (savedWidgets) {
      try {
        const parsedWidgets = JSON.parse(savedWidgets);
        setWidgets(parsedWidgets);
      } catch (error) {
        console.error('Error loading saved widgets:', error);
        setWidgets([]);
      }
    }
    
    if (savedNextId) {
      setNextWidgetId(parseInt(savedNextId));
    }
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('workspaceWidgets', JSON.stringify(widgets));
    localStorage.setItem('workspaceNextWidgetId', nextWidgetId.toString());
  }, [widgets, nextWidgetId]);

  // Add a new widget to the workspace
  const addWidget = (type, initialProps = {}) => {
    // Arrange widgets side by side (two columns) by default
    const index = widgets.length;
    const gap = 20;
    const defaultWidth = (initialProps.size && initialProps.size.width) ? initialProps.size.width : 400;
    const defaultHeight = (initialProps.size && initialProps.size.height) ? initialProps.size.height : 300;
    const columns = 2; // two widgets per row by default
    const col = index % columns;
    const row = Math.floor(index / columns);
    const xOffset = col * (defaultWidth + gap) + gap;
    const yOffset = row * (defaultHeight + gap) + gap;
    
    const newWidget = {
      id: `widget-${nextWidgetId}`,
      type,
      position: {
        x: xOffset,
        y: yOffset
      },
      size: {
        width: defaultWidth,
        height: defaultHeight
      },
      isMinimized: false,
      isMaximized: false,
      ...initialProps
    };
    
    setWidgets(prev => [...prev, newWidget]);
    setNextWidgetId(nextWidgetId + 1);
    
    return newWidget.id;
  };

  // Remove a widget from the workspace
  const removeWidget = (widgetId) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  // Update a widget's properties
  const updateWidget = (widgetId, updates) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, ...updates } : widget
    ));
  };

  // Update widget position
  const updateWidgetPosition = (widgetId, newPosition) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, position: newPosition } : widget
    ));
  };

  // Minimize/Maximize widget
  const minimizeWidget = (widgetId) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, isMinimized: !widget.isMinimized, isMaximized: false }
        : widget
    ));
  };

  const maximizeWidget = (widgetId) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, isMaximized: !widget.isMaximized, isMinimized: false }
        : widget
    ));
  };

  // Clear all widgets
  const clearWorkspace = () => {
    setWidgets([]);
    setNextWidgetId(1);
  };

  // Bring widget to front
  const bringToFront = (widgetId) => {
    setWidgets(prev => {
      const widget = prev.find(w => w.id === widgetId);
      const otherWidgets = prev.filter(w => w.id !== widgetId);
      return [...otherWidgets, widget];
    });
  };

  return (
    <WorkspaceContext.Provider value={{ 
      widgets, 
      addWidget, 
      removeWidget, 
      updateWidget,
      updateWidgetPosition,
      minimizeWidget,
      maximizeWidget,
      clearWorkspace,
      bringToFront
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;