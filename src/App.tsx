
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useState } from 'react';
import { exportToExcel } from '@/utils/exportUtils';

const queryClient = new QueryClient();

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

const App: React.FC = () => {
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);

  const handleExportData = () => {
    exportToExcel(allRegistrations);
  };

  const handleClearData = () => {
    setAllRegistrations([]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/admin" 
            element={
              <Admin 
                registrations={allRegistrations}
                onExportData={handleExportData}
                onClearData={handleClearData}
              />
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
