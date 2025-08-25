
import React, { useState } from 'react';
import TutorialOverlay from './TutorialOverlay';
import { firstAccessTutorialSteps, advancedTutorialSteps, nuvemshopTutorialSteps, quickTutorialSteps } from './tutorialSteps';
import { useToast } from '@/hooks/use-toast';

export type TutorialType = 'first-access' | 'advanced' | 'nuvemshop' | 'quick';

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
  const [startTime] = useState(Date.now());
  const { toast } = useToast();

  const getTutorialSteps = () => {
    switch (type) {
      case 'first-access':
        return firstAccessTutorialSteps;
      case 'advanced':
        return advancedTutorialSteps;
      case 'nuvemshop':
        return nuvemshopTutorialSteps;
      case 'quick':
        return quickTutorialSteps;
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
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    // Save tutorial completion status with more details
    const completionData = {
      type,
      completedAt: new Date().toISOString(),
      duration,
      stepsCompleted: completedSteps.size,
      totalSteps: steps.length
    };
    
    localStorage.setItem(`tutorial_${type}_completed`, 'true');
    localStorage.setItem(`tutorial_${type}_completion_data`, JSON.stringify(completionData));
    
    // Show completion message based on tutorial type
    const getTutorialName = () => {
      switch (type) {
        case 'quick': return 'Tour Rápido';
        case 'first-access': return 'Tutorial Completo';
        case 'nuvemshop': return 'Tutorial Nuvemshop';
        case 'advanced': return 'Tutorial Avançado';
        default: return 'Tutorial';
      }
    };
    
    toast({
      title: `${getTutorialName()} Concluído! 🎉`,
      description: `Parabéns! Você completou o tutorial em ${Math.floor(duration / 60)}min ${duration % 60}s. Agora você já sabe usar as principais funcionalidades!`,
    });
    
    onClose();
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const handleClose = () => {
    // Track partial completion
    if (completedSteps.size > 0) {
      const partialData = {
        type,
        stepsCompleted: completedSteps.size,
        totalSteps: steps.length,
        lastStep: currentStep,
        closedAt: new Date().toISOString()
      };
      localStorage.setItem(`tutorial_${type}_partial`, JSON.stringify(partialData));
    }
    
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
