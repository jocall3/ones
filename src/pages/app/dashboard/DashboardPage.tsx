import React from 'react';
import Dashboard from '../../../components/Dashboard';
import { AuthGuard } from '../../../components/AuthGuard';

const DashboardPage: React.FC = () => {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
};

export default DashboardPage;