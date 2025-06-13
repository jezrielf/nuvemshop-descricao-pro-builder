
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, FileText, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VisualTutorialManager from './VisualTutorialManager';

const FirstAccessTutorial: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showVisualTutorial, setShowVisualTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const { toast } = useToast();

  // Check if this is the first time the user is accessing the app
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setOpen(true);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setTutorialCompleted(true);
    setOpen(false);
    toast({
      title: "Bem-vindo ao DescriçãoPro! ✨",
      description: "Você pode acessar a ajuda e tutoriais a qualquer momento pelo menu."
    });
  };

  const handleSkip = () => {
    completeTutorial();
  };

  const handleStartVisualTutorial = () => {
    setOpen(false);
    setShowVisualTutorial(true);
  };

  const handleVisualTutorialClose = () => {
    setShowVisualTutorial(false);
    completeTutorial();
  };

  if (tutorialCompleted) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Bem-vindo ao DescriçãoPro!
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-base">
              Crie descrições profissionais para seus produtos em poucos minutos com nossa ferramenta completa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Welcome image */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800">Editor Profissional</h3>
                  <p className="text-sm text-gray-600">Templates, blocos personalizáveis e muito mais</p>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Rápido e Fácil</h4>
                  <p className="text-sm text-green-700">Crie descrições profissionais em minutos</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Templates Prontos</h4>
                  <p className="text-sm text-blue-700">Centenas de templates por categoria</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Integração Nuvemshop</h4>
                  <p className="text-sm text-purple-700">Publique direto na sua loja</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleSkip} className="order-2 sm:order-1">
              Pular tutorial
            </Button>
            <Button onClick={handleStartVisualTutorial} className="order-1 sm:order-2 flex items-center gap-2">
              Começar Tour Interativo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <VisualTutorialManager
        type="first-access"
        isOpen={showVisualTutorial}
        onClose={handleVisualTutorialClose}
      />
    </>
  );
};

export default FirstAccessTutorial;
