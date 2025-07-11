
import React, { useState } from 'react';
import { RegistrationForm } from '@/components/RegistrationForm';
import { RegistrationSummary } from '@/components/RegistrationSummary';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportToExcel } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';
import { Users, Settings, Heart } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

const Index = () => {
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData | null>(null);
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleRegistrationSubmit = (data: RegistrationData) => {
    setCurrentRegistration(data);
    setAllRegistrations(prev => [...prev, data]);
    setShowSummary(true);
  };

  const handleNewRegistration = () => {
    setCurrentRegistration(null);
    setShowSummary(false);
  };

  const handleReset = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Creative Community Hub
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our vibrant community of creative minds and showcase your artistic talents!
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="register" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Register
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin ({allRegistrations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-6">
            {!showSummary ? (
              <RegistrationForm 
                onSubmit={handleRegistrationSubmit}
                onReset={handleReset}
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
