
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
}

interface TutorialPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: TutorialStep[];
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({
  open,
  onOpenChange,
  steps
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    onOpenChange(false);
    setCurrentStep(0);
  };
  
  useEffect(() => {
    if (!open) {
      // Reset to first step when dialog closes
      setCurrentStep(0);
    }
  }, [open]);
  
  const currentStepData = steps[currentStep];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{currentStepData.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          {currentStepData.image && (
            <div className="mb-4 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={currentStepData.image} 
                alt={currentStepData.title} 
                className="w-full h-auto"
              />
            </div>
          )}
          
          <DialogDescription className="text-sm">
            {currentStepData.description}
          </DialogDescription>
        </div>
        
        <div className="flex justify-between mt-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          
          <div className="text-xs text-gray-500 flex items-center">
            {currentStep + 1}/{steps.length}
          </div>
          
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialPopup;
