import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderBar from '../../components/HeaderBar';
import WorkspaceArea from '../../components/WorkspaceArea';
import { WorkspaceProvider } from '../../contexts/WorkspaceContext';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <WorkspaceProvider>
      <div className="dashboard-wrapper">
        <Sidebar />
        
        <div className="main-content">
          <HeaderBar />
          <WorkspaceArea />
        </div>
      </div>
    </WorkspaceProvider>
  );
};

export default Dashboard;
