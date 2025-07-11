
import React, { useState } from 'react';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminPanel } from '@/components/AdminPanel';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface AdminProps {
  registrations: RegistrationData[];
  onExportData: () => void;
  onClearData: () => void;
}

const Admin: React.FC<AdminProps> = ({ registrations, onExportData, onClearData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <AdminPanel
          registrations={registrations}
          onExportData={onExportData}
          onClearData={onClearData}
        />
      </div>
    </div>
  );
};

export default Admin;
