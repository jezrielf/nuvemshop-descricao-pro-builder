
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { TutorialStep } from './tutorialSteps';

interface TutorialOverlayProps {
  steps: TutorialStep[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onStepComplete?: (stepId: string) => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onClose,
  onStepComplete
}) => {
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!currentStepData) return;

    const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      
      // Scroll element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Calculate tooltip position
      const rect = element.getBoundingClientRect();
      let x = rect.left + rect.width / 2;
      let y = rect.top;

      switch (currentStepData.position) {
        case 'top':
          y = rect.top - 20;
          break;
        case 'bottom':
          y = rect.bottom + 20;
          break;
        case 'left':
          x = rect.left - 20;
          y = rect.top + rect.height / 2;
          break;
        case 'right':
          x = rect.right + 20;
          y = rect.top + rect.height / 2;
          break;
      }

      setTooltipPosition({ x, y });
    }
  }, [currentStep, currentStepData]);

  const handleStepComplete = () => {
    if (onStepComplete && currentStepData) {
      onStepComplete(currentStepData.id);
    }
    onNext();
  };

  if (!currentStepData) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      
      {/* Spotlight effect */}
      {highlightedElement && (
        <div
          className="absolute border-4 border-blue-500 rounded-lg shadow-2xl pointer-events-none animate-pulse"
          style={{
            left: highlightedElement.getBoundingClientRect().left - 8,
            top: highlightedElement.getBoundingClientRect().top - 8,
            width: highlightedElement.getBoundingClientRect().width + 16,
            height: highlightedElement.getBoundingClientRect().height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
          }}
        />
      )}
      
      {/* Tutorial tooltip */}
      <Card
        className="absolute max-w-sm bg-white shadow-2xl z-[10000]"
        style={{
          left: Math.min(Math.max(tooltipPosition.x - 200, 20), window.innerWidth - 420),
          top: Math.min(Math.max(tooltipPosition.y - 100, 20), window.innerHeight - 300),
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentStepData.image && (
            <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={currentStepData.image} 
                alt={currentStepData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/300x150?text=Tutorial+Step";
                }}
              />
            </div>
          )}
          
          {currentStepData.video && (
            <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
              <video 
                src={currentStepData.video} 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            </div>
          )}
          
          <CardDescription className="text-sm leading-relaxed">
            {currentStepData.description}
          </CardDescription>
          
          {currentStepData.actionText && currentStepData.onAction && (
            <Button 
              onClick={currentStepData.onAction}
              className="w-full"
              variant="outline"
            >
              {currentStepData.actionText}
            </Button>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Anterior
            </Button>
            
            <span className="text-xs text-gray-500">
              {currentStep + 1} de {steps.length}
            </span>
            
            <Button
              size="sm"
              onClick={handleStepComplete}
              className="flex items-center gap-1"
            >
              {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
              {currentStep !== steps.length - 1 && <ArrowRight className="h-3 w-3" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body
  );
};

export default TutorialOverlay;
