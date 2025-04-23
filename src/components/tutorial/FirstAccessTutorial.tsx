
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  X,
  FileText, 
  Edit3, 
  Eye, 
  Settings, 
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
}

const FirstAccessTutorial: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const { toast } = useToast();

  // Check if this is the first time the user is accessing the app
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setOpen(true);
    }
  }, []);

  // Tutorial steps
  const steps: TutorialStep[] = [
    {
      title: "Bem-vindo ao DescriçãoPro!",
      description: "Vamos te guiar pelos principais recursos da nossa ferramenta para você começar a criar descrições incríveis.",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      title: "Editor de descrições",
      description: "Use nosso editor intuitivo para criar e personalizar suas descrições. Arraste blocos prontos e edite conforme sua necessidade.",
      image: "/assets/tutorial/editor.png",
      icon: <Edit3 className="h-8 w-8 text-primary" />
    },
    {
      title: "Visualização em tempo real",
      description: "Veja em tempo real como sua descrição ficará na sua loja. Toda alteração é imediatamente refletida na visualização.",
      image: "/assets/tutorial/preview.png",
      icon: <Eye className="h-8 w-8 text-primary" />
    },
    {
      title: "Configurações e personalização",
      description: "Ajuste as configurações da sua descrição, como cores, fontes e estilos para combinar com a sua marca.",
      image: "/assets/tutorial/settings.png",
      icon: <Settings className="h-8 w-8 text-primary" />
    },
    {
      title: "Salvar e exportar",
      description: "Quando terminar, salve sua descrição e exporte para sua loja online com apenas um clique.",
      image: "/assets/tutorial/export.png",
      icon: <Save className="h-8 w-8 text-primary" />
    }
  ];

  const completeTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setTutorialCompleted(true);
    setOpen(false);
    
    toast({
      title: "Tutorial completo!",
      description: "Você pode acessá-lo novamente pelo menu de ajuda se precisar.",
    });
  };

  const handleSkip = () => {
    completeTutorial();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const resetTutorial = () => {
    localStorage.removeItem('hasSeenTutorial');
    setCurrentStep(0);
    setTutorialCompleted(false);
    setOpen(true);
  };

  // Render placeholder image if the image doesn't load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://via.placeholder.com/600x400?text=Tutorial+Step";
  };

  if (tutorialCompleted) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-xl">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {steps[currentStep].description}
            </DialogDescription>
          </DialogHeader>

          {steps[currentStep].image && (
            <div className="relative w-full h-64 my-4 rounded-md overflow-hidden bg-gray-100">
              <img
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 w-6 rounded-full ${currentStep === index ? 'bg-primary' : 'bg-gray-200'}`} 
                />
              ))}
            </div>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={handleSkip}>
                Pular tutorial
              </Button>
              <Button onClick={handleNext}>
                {currentStep < steps.length - 1 ? (
                  <>Próximo <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  'Concluir'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão flutuante para reabrir o tutorial */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setOpen(true)}
          className="rounded-full shadow-lg"
        >
          Tutorial
        </Button>
      </div>
    </>
  );
};

export default FirstAccessTutorial;
