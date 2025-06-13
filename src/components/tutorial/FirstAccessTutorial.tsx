
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, FileText, Sparkles, Zap, Clock, User, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VisualTutorialManager from './VisualTutorialManager';
import { Badge } from '@/components/ui/badge';

const FirstAccessTutorial: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showVisualTutorial, setShowVisualTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [selectedTutorialType, setSelectedTutorialType] = useState<'quick' | 'complete'>('complete');
  const { toast } = useToast();

  // Check if this is the first time the user is accessing the app
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    const tutorialShownCount = parseInt(localStorage.getItem('tutorialShownCount') || '0');
    
    // Show tutorial on first access or if shown less than 3 times (in case user skipped)
    if (!hasSeenTutorial || tutorialShownCount < 3) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        setOpen(true);
        localStorage.setItem('tutorialShownCount', (tutorialShownCount + 1).toString());
      }, 1000);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    localStorage.setItem('tutorialCompletedAt', new Date().toISOString());
    setTutorialCompleted(true);
    setOpen(false);
    toast({
      title: "Bem-vindo ao DescriçãoPro! ✨",
      description: "Você pode acessar tutoriais e ajuda a qualquer momento pelo botão 'Ajuda' no cabeçalho."
    });
  };

  const handleSkip = () => {
    localStorage.setItem('tutorialSkipped', 'true');
    localStorage.setItem('tutorialSkippedAt', new Date().toISOString());
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                Bem-vindo ao DescriçãoPro!
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-base mt-2">
              A ferramenta mais avançada do Brasil para criar descrições profissionais que vendem mais.
              Vamos mostrar como você pode criar descrições incríveis em poucos minutos!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Hero visual */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg animate-bounce" style={{animationDelay: '0s'}}>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg animate-bounce" style={{animationDelay: '0.2s'}}>
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg animate-bounce" style={{animationDelay: '0.4s'}}>
                      <Sparkles className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Editor Profissional</h3>
                  <p className="text-sm text-gray-600">Templates prontos, blocos personalizáveis e integração com sua loja</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-xs text-gray-600">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5min</div>
                <div className="text-xs text-gray-600">Criação média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1-Click</div>
                <div className="text-xs text-gray-600">Publicação</div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="p-1 bg-green-200 rounded">
                  <Zap className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Rápido e Intuitivo</h4>
                  <p className="text-sm text-green-700">Arraste, solte e personalize. Sem código, sem complicação.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="p-1 bg-blue-200 rounded">
                  <FileText className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Templates Inteligentes</h4>
                  <p className="text-sm text-blue-700">Organizados por categoria com IA para sugerir o melhor conteúdo.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="p-1 bg-purple-200 rounded">
                  <Sparkles className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800">Integração Total</h4>
                  <p className="text-sm text-purple-700">Conecte sua Nuvemshop e publique direto na loja.</p>
                </div>
              </div>
            </div>

            {/* Tutorial options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">Escolha seu tour de boas-vindas:</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedTutorialType('quick')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTutorialType === 'quick' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Tour Rápido</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">4 passos essenciais</p>
                  <Badge variant="secondary" className="text-xs">~3 minutos</Badge>
                </button>

                <button
                  onClick={() => setSelectedTutorialType('complete')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTutorialType === 'complete' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Tour Completo</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">9 passos detalhados</p>
                  <Badge variant="secondary" className="text-xs">~8 minutos</Badge>
                </button>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-600" />
                O que você vai aprender:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-yellow-800">
                <div>• Criar sua primeira descrição</div>
                <div>• Usar templates profissionais</div>
                <div>• Personalizar blocos</div>
                <div>• Conectar sua loja</div>
                {selectedTutorialType === 'complete' && (
                  <>
                    <div>• Análise SEO</div>
                    <div>• Operações em lote</div>
                    <div>• Exportar HTML</div>
                    <div>• Dicas avançadas</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleSkip} className="order-2 sm:order-1">
              <X className="h-4 w-4 mr-2" />
              Pular por agora
            </Button>
            <Button onClick={handleStartVisualTutorial} className="order-1 sm:order-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Começar {selectedTutorialType === 'quick' ? 'Tour Rápido' : 'Tour Completo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <VisualTutorialManager
        type={selectedTutorialType === 'quick' ? 'nuvemshop' : 'first-access'}
        isOpen={showVisualTutorial}
        onClose={handleVisualTutorialClose}
      />
    </>
  );
};

export default FirstAccessTutorial;
