
import React, { useState } from 'react';
import TutorialOverlay from './TutorialOverlay';
import { firstAccessTutorialSteps, advancedTutorialSteps, nuvemshopTutorialSteps } from './tutorialSteps';
import { useToast } from '@/hooks/use-toast';

export type TutorialType = 'first-access' | 'advanced' | 'nuvemshop';

interface VisualTutorialManagerProps {
  type: TutorialType;
  isOpen: boolean;
  onClose: () => void;
}

const VisualTutorialManager: React.FC<VisualTutorialManagerProps> = ({
  type,
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const getTutorialSteps = () => {
    switch (type) {
      case 'first-access':
        return firstAccessTutorialSteps;
      case 'advanced':
        return advancedTutorialSteps;
      case 'nuvemshop':
        return nuvemshopTutorialSteps;
      default:
        return firstAccessTutorialSteps;
    }
  };

  const steps = getTutorialSteps();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set(prev).add(stepId));
  };

  const handleComplete = () => {
    // Save tutorial completion status
    localStorage.setItem(`tutorial_${type}_completed`, 'true');
    localStorage.setItem(`tutorial_${type}_completed_at`, new Date().toISOString());
    
    toast({
      title: 'Tutorial Concluído! 🎉',
      description: 'Parabéns! Agora você já sabe usar todas as funcionalidades principais.',
    });
    
    onClose();
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  if (!isOpen) return null;

  return (
    <TutorialOverlay
      steps={steps}
      currentStep={currentStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onClose={handleClose}
      onStepComplete={handleStepComplete}
    />
  );
};

export default VisualTutorialManager;
