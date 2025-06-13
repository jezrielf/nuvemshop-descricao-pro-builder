
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ArrowLeft, ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';
import { TutorialStep } from './tutorialSteps';
import { Badge } from '@/components/ui/badge';

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
  const [showTips, setShowTips] = useState(false);

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!currentStepData) return;

    const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      
      // Scroll element into view with better behavior
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
      
      // Calculate tooltip position with improved logic
      const rect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
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

      // Ensure tooltip stays within viewport
      const tooltipWidth = 400;
      const tooltipHeight = 350;
      
      x = Math.min(Math.max(x - tooltipWidth / 2, 20), viewportWidth - tooltipWidth - 20);
      y = Math.min(Math.max(y - tooltipHeight / 2, 20), viewportHeight - tooltipHeight - 20);

      setTooltipPosition({ x, y });
    }
  }, [currentStep, currentStepData]);

  const handleStepComplete = () => {
    if (onStepComplete && currentStepData) {
      onStepComplete(currentStepData.id);
    }
    onNext();
  };

  const getProgressPercentage = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };

  if (!currentStepData) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Dark overlay with subtle pattern */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm" 
        onClick={onClose}
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}
      />
      
      {/* Enhanced spotlight effect */}
      {highlightedElement && (
        <div
          className="absolute border-4 border-blue-400 rounded-lg shadow-2xl pointer-events-none animate-pulse"
          style={{
            left: highlightedElement.getBoundingClientRect().left - 12,
            top: highlightedElement.getBoundingClientRect().top - 12,
            width: highlightedElement.getBoundingClientRect().width + 24,
            height: highlightedElement.getBoundingClientRect().height + 24,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75), 0 0 30px rgba(59, 130, 246, 0.5)',
            background: 'rgba(59, 130, 246, 0.1)',
          }}
        />
      )}
      
      {/* Enhanced tutorial tooltip */}
      <Card
        className="absolute max-w-md bg-white shadow-2xl z-[10000] border-2 border-blue-200"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
        }}
      >
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {currentStepData.title}
                {currentStepData.isOptional && (
                  <Badge variant="secondary" className="text-xs">Opcional</Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {getProgressPercentage()}%
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 ml-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentStepData.image && (
            <div className="relative w-full h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden border">
              <img 
                src={currentStepData.image} 
                alt={currentStepData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/300x150/3b82f6/ffffff?text=Tutorial+Step";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          
          {currentStepData.video && (
            <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden border">
              <video 
                src={currentStepData.video} 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            </div>
          )}
          
          <CardDescription className="text-sm leading-relaxed text-gray-700">
            {currentStepData.description}
          </CardDescription>
          
          {/* Tips section */}
          {currentStepData.tips && currentStepData.tips.length > 0 && (
            <div className="border rounded-lg p-3 bg-yellow-50 border-yellow-200">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-sm font-medium text-yellow-800 w-full text-left"
              >
                <Lightbulb className="h-4 w-4" />
                Dicas úteis ({currentStepData.tips.length})
                <ArrowRight className={`h-3 w-3 transition-transform ${showTips ? 'rotate-90' : ''}`} />
              </button>
              {showTips && (
                <ul className="mt-2 space-y-1 text-xs text-yellow-700">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          {currentStepData.actionText && currentStepData.onAction && (
            <Button 
              onClick={currentStepData.onAction}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              variant="default"
            >
              {currentStepData.actionText}
            </Button>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t">
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
            
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span className="font-medium">{currentStep + 1}</span> 
              de 
              <span className="font-medium">{steps.length}</span>
            </span>
            
            <Button
              size="sm"
              onClick={handleStepComplete}
              className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
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
