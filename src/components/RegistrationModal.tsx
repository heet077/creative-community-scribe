
import React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { RegistrationForm } from './RegistrationForm';

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

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <RegistrationForm onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
