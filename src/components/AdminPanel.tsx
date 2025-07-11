
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Users, FileText, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface AdminPanelProps {
  registrations: RegistrationData[];
  onExportData: () => void;
  onClearData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  registrations, 
  onExportData, 
  onClearData 
}) => {
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all registration data? This action cannot be undone.')) {
      onClearData();
      toast({ title: "All registration data cleared successfully" });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-primary mr-2" />
            <div>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>Manage creative community registrations</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={onExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export ({registrations.length})
            </Button>
            <Button onClick={handleClearData} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {registrations.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No registrations yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Name:</span>
                        <p className="font-semibold">{registration.fullName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Mobile:</span>
                        <p>{registration.mobileNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Room:</span>
                        <p>{registration.roomNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Group:</span>
                        <p>{registration.groupName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground block mb-2">Interests:</span>
                        <div className="flex flex-wrap gap-1">
                          {registration.interests.map((interest, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-muted-foreground block mb-2">Software:</span>
                        <div className="flex flex-wrap gap-1">
                          {registration.software.map((tool, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
