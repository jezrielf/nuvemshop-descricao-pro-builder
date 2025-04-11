
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import TutorialPopup from './TutorialPopup';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Bem-vindo ao Descrição Pro',
    description: 'Este assistente vai ajudar você a conhecer as principais funcionalidades do editor de descrições.',
    image: '/tutorial/welcome.png'
  },
  {
    title: 'Adicione blocos',
    description: 'Clique no botão "Adicionar Bloco" para inserir diferentes tipos de conteúdo à sua descrição.',
    image: '/tutorial/add-blocks.png'
  },
  {
    title: 'Utilize Templates',
    description: 'Use os templates para criar descrições completas rapidamente ou crie suas próprias descrições do zero.',
    image: '/tutorial/templates.png'
  },
  {
    title: 'Personalize os Blocos',
    description: 'Cada bloco pode ser estilizado individualmente. Clique em um bloco para editá-lo.',
    image: '/tutorial/customize.png'
  },
  {
    title: 'Visualize o Resultado',
    description: 'Use a pré-visualização para ver como sua descrição ficará em dispositivos móveis e desktop.',
    image: '/tutorial/preview.png'
  },
  {
    title: 'Exporte o HTML',
    description: 'Quando terminar, você pode exportar o código HTML para usar em sua loja ou site.',
    image: '/tutorial/export.png'
  }
];

const TutorialManager: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if it's the user's first visit
    const hasVisitedBefore = localStorage.getItem('tutorial_shown');
    
    if (!hasVisitedBefore) {
      setFirstVisit(true);
      localStorage.setItem('tutorial_shown', 'true');
      
      // Show toast inviting to tutorial
      toast({
        title: "Bem-vindo ao Descrição Pro!",
        description: "Gostaria de um tour rápido pelas funcionalidades?",
        action: (
          <Button size="sm" onClick={() => setShowTutorial(true)}>
            Iniciar Tour
          </Button>
        ),
      });
    }
  }, [toast]);
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowTutorial(true)}
        className="flex items-center"
      >
        <HelpCircle className="h-4 w-4 mr-1" />
        <span className="hidden md:inline">Ajuda</span>
      </Button>
      
      <TutorialPopup 
        open={showTutorial} 
        onOpenChange={setShowTutorial}
        steps={tutorialSteps}
      />
    </>
  );
};

export default TutorialManager;
