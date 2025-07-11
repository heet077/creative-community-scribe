
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Palette, Download, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
  onReset: () => void;
}

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

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, onReset }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    mobileNumber: '',
    roomNumber: '',
    groupName: '',
    interests: [],
    software: []
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

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({ title: "Please enter your full name", variant: "destructive" });
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      toast({ title: "Please enter your mobile number", variant: "destructive" });
      return false;
    }
    if (!formData.roomNumber.trim()) {
      toast({ title: "Please enter your room number", variant: "destructive" });
      return false;
    }
    if (!formData.groupName.trim()) {
      toast({ title: "Please enter your group name", variant: "destructive" });
      return false;
    }
    if (formData.interests.length === 0) {
      toast({ title: "Please select at least one creative interest", variant: "destructive" });
      return false;
    }
    if (formData.software.length === 0) {
      toast({ title: "Please select at least one software/application", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      toast({ title: "Registration submitted successfully! 🎉" });
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
          Hi there! 😊 Welcome to the Creative Community Registration. 
          We'd love to know more about you and your creative skills! 
          Please take a moment to fill out this short form.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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

            <div>
              <Label htmlFor="groupName" className="text-base font-medium">🧑‍🤝‍🧑 Group Name</Label>
              <Input
                id="groupName"
                type="text"
                placeholder="e.g., Creative Minds, Pixel Squad"
                value={formData.groupName}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

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
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
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
            {formData.software.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.software.map((software) => (
                  <Badge key={software} variant="outline" className="text-xs">
                    {software}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Submit Registration
            </Button>
            <Button type="button" variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
