
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
  onClose: () => void;
}

const groupNames = ['Pavitra', 'Param', 'Pulkit', 'Parmanand'];

const creativeInterests = [
  'Video Editing',
  'Designing', 
  'Sketching',
  'Photography',
  'Video Shooting'
];

const softwareOptions = [
  'Adobe Premiere Pro',
  'After Effects',
  'Filmora',
  'CapCut',
  'VN',
  'Photoshop',
  'Canva',
  'Lightroom'
];

const steps = [
  { title: 'Personal Info', fields: ['fullName'] },
  { title: 'Contact', fields: ['mobileNumber'] },
  { title: 'Details', fields: ['roomNumber'] },
  { title: 'Group', fields: ['groupName'] },
  { title: 'Skills', fields: ['interests', 'software'] }
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    mobileNumber: '',
    roomNumber: '',
    groupName: '',
    interests: [],
    customInterest: '',
    software: [],
    customSoftware: ''
  });

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: 'interests' | 'software', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateCurrentStep = () => {
    const currentFields = steps[currentStep].fields;
    
    for (const field of currentFields) {
      if (field === 'fullName' && !formData.fullName.trim()) {
        toast({ title: "Please enter your full name", variant: "destructive" });
        return false;
      }
      if (field === 'mobileNumber' && !formData.mobileNumber.trim()) {
        toast({ title: "Please enter your mobile number", variant: "destructive" });
        return false;
      }
      if (field === 'roomNumber' && !formData.roomNumber.trim()) {
        toast({ title: "Please enter your room number", variant: "destructive" });
        return false;
      }
      if (field === 'groupName' && !formData.groupName.trim()) {
        toast({ title: "Please select your group name", variant: "destructive" });
        return false;
      }
      if (field === 'interests' && formData.interests.length === 0 && !formData.customInterest.trim()) {
        toast({ title: "Please select at least one creative interest or specify other", variant: "destructive" });
        return false;
      }
      if (field === 'software' && formData.software.length === 0 && !formData.customSoftware.trim()) {
        toast({ title: "Please select at least one software/application or specify other", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      interests: formData.customInterest.trim() 
        ? [...formData.interests, formData.customInterest] 
        : formData.interests,
      software: formData.customSoftware.trim() 
        ? [...formData.software, formData.customSoftware] 
        : formData.software
    };
    
    onSubmit(finalData);
    toast({ title: "Registration submitted successfully! 🎉" });
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-base font-medium">👤 Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mobileNumber" className="text-base font-medium">📱 Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="roomNumber" className="text-base font-medium">🏠 Room Number</Label>
              <Input
                id="roomNumber"
                type="text"
                placeholder="Enter your room number"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName" className="text-base font-medium">🧑‍🤝‍🧑 Group Name</Label>
              <Select value={formData.groupName} onValueChange={(value) => handleInputChange('groupName', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your group" />
                </SelectTrigger>
                <SelectContent>
                  {groupNames.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Creative Interests */}
            <div>
              <Label className="text-base font-medium mb-3 block">🎨 Your Creative Interests</Label>
              <div className="grid grid-cols-2 gap-3">
                {creativeInterests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('interests', interest, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={interest} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <Label htmlFor="customInterest" className="text-sm font-medium">Other (please specify):</Label>
                <Input
                  id="customInterest"
                  type="text"
                  placeholder="Enter other creative interest"
                  value={formData.customInterest}
                  onChange={(e) => handleInputChange('customInterest', e.target.value)}
                  className="mt-1"
                />
              </div>

              {(formData.interests.length > 0 || formData.customInterest) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {formData.customInterest && (
                    <Badge variant="secondary" className="text-xs">
                      {formData.customInterest}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Software/Applications */}
            <div>
              <Label className="text-base font-medium mb-3 block">🛠️ Software/Applications You Use</Label>
              <div className="grid grid-cols-2 gap-3">
                {softwareOptions.map((software) => (
                  <div key={software} className="flex items-center space-x-2">
                    <Checkbox
                      id={software}
                      checked={formData.software.includes(software)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('software', software, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={software} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {software}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <Label htmlFor="customSoftware" className="text-sm font-medium">Other (please specify):</Label>
                <Input
                  id="customSoftware"
                  type="text"
                  placeholder="Enter other software/application"
                  value={formData.customSoftware}
                  onChange={(e) => handleInputChange('customSoftware', e.target.value)}
                  className="mt-1"
                />
              </div>

              {(formData.software.length > 0 || formData.customSoftware) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.software.map((software) => (
                    <Badge key={software} variant="outline" className="text-xs">
                      {software}
                    </Badge>
                  ))}
                  {formData.customSoftware && (
                    <Badge variant="outline" className="text-xs">
                      {formData.customSoftware}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Palette className="h-8 w-8 text-primary mr-2" />
          <CardTitle className="text-2xl">Creative Community Registration</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button type="button" onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              <>
                <Heart className="h-4 w-4 mr-2" />
                Submit Registration
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
