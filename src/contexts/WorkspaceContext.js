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
      setWidgets(JSON.parse(savedWidgets));
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
    // Calculate position to avoid overlap
    const baseOffset = widgets.length * 30;
    const xOffset = baseOffset % 200;
    const yOffset = Math.floor(baseOffset / 200) * 50;
    
    const newWidget = {
      id: `widget-${nextWidgetId}`,
      type,
      position: {
        x: 20 + xOffset,
        y: 20 + yOffset
      },
      ...initialProps
    };
    
    setWidgets([...widgets, newWidget]);
    setNextWidgetId(nextWidgetId + 1);
    
    return newWidget.id;
  };

  // Remove a widget from the workspace
  const removeWidget = (widgetId) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };

  // Update a widget's properties
  const updateWidget = (widgetId, updates) => {
    setWidgets(widgets.map(widget => 
      widget.id === widgetId ? { ...widget, ...updates } : widget
    ));
  };

  // Clear all widgets
  const clearWorkspace = () => {
    setWidgets([]);
  };
  return (
    <WorkspaceContext.Provider value={{ 
      widgets, 
      addWidget, 
      removeWidget, 
      updateWidget,
      clearWorkspace
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
