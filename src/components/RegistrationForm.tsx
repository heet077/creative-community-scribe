
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Palette, ChevronLeft, ChevronRight, User, Phone, Home, UserCheck } from 'lucide-react';
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
  { title: 'Personal Info', fields: ['fullName'], icon: User },
  { title: 'Contact', fields: ['mobileNumber'], icon: Phone },
  { title: 'Location', fields: ['roomNumber'], icon: Home },
  { title: 'Team', fields: ['groupName'], icon: Users },
  { title: 'Skills', fields: ['interests', 'software'], icon: Palette }
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

  const renderPreviousData = () => {
    if (currentStep === 0) return null;

    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
          <UserCheck className="h-4 w-4 mr-2" />
          Your Information So Far:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {formData.fullName && (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-2 text-blue-600" />
              <span className="font-medium">Name:</span>
              <span className="ml-2 text-blue-700">{formData.fullName}</span>
            </div>
          )}
          {formData.mobileNumber && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-2 text-green-600" />
              <span className="font-medium">Mobile:</span>
              <span className="ml-2 text-green-700">{formData.mobileNumber}</span>
            </div>
          )}
          {formData.roomNumber && (
            <div className="flex items-center">
              <Home className="h-3 w-3 mr-2 text-purple-600" />
              <span className="font-medium">Room:</span>
              <span className="ml-2 text-purple-700">{formData.roomNumber}</span>
            </div>
          )}
          {formData.groupName && (
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-2 text-orange-600" />
              <span className="font-medium">Group:</span>
              <span className="ml-2 text-orange-700">{formData.groupName}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    const StepIcon = steps[currentStep].icon;
    
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">Let's start with your name</h3>
              <p className="text-muted-foreground">Tell us who you are!</p>
            </div>
            <div>
              <Label htmlFor="fullName" className="text-base font-medium">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-2 text-lg p-3"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">How can we reach you?</h3>
              <p className="text-muted-foreground">Your contact information</p>
            </div>
            <div>
              <Label htmlFor="mobileNumber" className="text-base font-medium">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+91-XXXXXXXXXX"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="mt-2 text-lg p-3"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">Where do you stay?</h3>
              <p className="text-muted-foreground">Your room details</p>
            </div>
            <div>
              <Label htmlFor="roomNumber" className="text-base font-medium">Room Number</Label>
              <Input
                id="roomNumber"
                type="text"
                placeholder="Enter your room number"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                className="mt-2 text-lg p-3"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">Choose your creative team</h3>
              <p className="text-muted-foreground">Join one of our amazing groups</p>
            </div>
            <div>
              <Label htmlFor="groupName" className="text-base font-medium">Group Name</Label>
              <Select value={formData.groupName} onValueChange={(value) => handleInputChange('groupName', value)}>
                <SelectTrigger className="mt-2 text-lg p-3 h-12">
                  <SelectValue placeholder="Select your group" />
                </SelectTrigger>
                <SelectContent>
                  {groupNames.map((group) => (
                    <SelectItem key={group} value={group} className="text-lg p-3">
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
          <div className="space-y-8">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-12 w-12 text-pink-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">Show us your creative side</h3>
              <p className="text-muted-foreground">What are your skills and tools?</p>
            </div>
            
            {/* Creative Interests */}
            <div>
              <Label className="text-base font-medium mb-4 block">🎨 Your Creative Interests</Label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {creativeInterests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('interests', interest, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={interest} 
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div>
                <Label htmlFor="customInterest" className="text-sm font-medium">Other (specify):</Label>
                <Input
                  id="customInterest"
                  type="text"
                  placeholder="Enter other creative interest"
                  value={formData.customInterest}
                  onChange={(e) => handleInputChange('customInterest', e.target.value)}
                  className="mt-2"
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
              <Label className="text-base font-medium mb-4 block">🛠️ Software/Applications You Use</Label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {softwareOptions.map((software) => (
                  <div key={software} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox
                      id={software}
                      checked={formData.software.includes(software)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('software', software, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={software} 
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {software}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div>
                <Label htmlFor="customSoftware" className="text-sm font-medium">Other (specify):</Label>
                <Input
                  id="customSoftware"
                  type="text"
                  placeholder="Enter other software/application"
                  value={formData.customSoftware}
                  onChange={(e) => handleInputChange('customSoftware', e.target.value)}
                  className="mt-2"
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
    <Card className="w-full max-w-3xl mx-auto max-h-[85vh] overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-center mb-4">
          <Palette className="h-8 w-8 text-primary mr-2" />
          <CardTitle className="text-2xl">Creative Community Registration</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-96 p-6">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 mt-8 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            type="button" 
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
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
