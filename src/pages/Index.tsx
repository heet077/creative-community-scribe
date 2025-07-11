
import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { RegistrationModal } from '@/components/RegistrationModal';
import { RegistrationSummary } from '@/components/RegistrationSummary';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportToExcel } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';
import { Users, Settings } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  customInterest: string;
  software: string[];
  customSoftware: string;
}

const Index = () => {
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData | null>(null);
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartRegistration = () => {
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = (data: RegistrationData) => {
    setCurrentRegistration(data);
    setAllRegistrations(prev => [...prev, data]);
    setShowSummary(true);
    setIsModalOpen(false);
  };

  const handleNewRegistration = () => {
    setCurrentRegistration(null);
    setShowSummary(false);
  };

  const handleExportData = () => {
    if (allRegistrations.length === 0) {
      toast({ 
        title: "No data to export", 
        description: "Please register at least one member first.",
        variant: "destructive" 
      });
      return;
    }
    
    exportToExcel(allRegistrations);
    toast({ 
      title: "Data exported successfully! 📊", 
      description: `Exported ${allRegistrations.length} registration(s) to Excel.` 
    });
  };

  const handleClearData = () => {
    setAllRegistrations([]);
    setCurrentRegistration(null);
    setShowSummary(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin ({allRegistrations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {!showSummary ? (
              <Dashboard 
                onStartRegistration={handleStartRegistration}
                totalRegistrations={allRegistrations.length}
              />
            ) : (
              currentRegistration && (
                <RegistrationSummary
                  data={currentRegistration}
                  onNewRegistration={handleNewRegistration}
                  onExportData={handleExportData}
                />
              )
            )}
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminPanel
              registrations={allRegistrations}
              onExportData={handleExportData}
              onClearData={handleClearData}
            />
          </TabsContent>
        </Tabs>

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleRegistrationSubmit}
        />

        {allRegistrations.length > 0 && !showSummary && (
          <div className="fixed bottom-6 right-6">
            <Button
              onClick={handleExportData}
              className="shadow-lg hover:shadow-xl transition-shadow"
              size="lg"
            >
              Export {allRegistrations.length} Registration(s)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
