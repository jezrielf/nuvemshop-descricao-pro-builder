
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

type StepStatus = 'pending' | 'loading' | 'success' | 'error';

interface ProcessStep {
  id: string;
  label: string;
  status: StepStatus;
  errorMessage?: string;
}

const NuvemshopCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<ProcessStep[]>([
    { id: 'init', label: 'Inicializando', status: 'loading' },
    { id: 'code', label: 'Recebendo código de autorização', status: 'pending' },
    { id: 'auth', label: 'Enviando código para autenticação', status: 'pending' },
    { id: 'store', label: 'Buscando informações da loja', status: 'pending' },
    { id: 'save', label: 'Salvando conexão', status: 'pending' },
    { id: 'complete', label: 'Conexão finalizada', status: 'pending' }
  ]);

  const updateStepStatus = (stepId: string, status: StepStatus, errorMessage?: string) => {
    console.log(`${status === 'success' ? '✅' : status === 'error' ? '❌' : '🔄'} ${steps.find(s => s.id === stepId)?.label}: ${status}${errorMessage ? ` - ${errorMessage}` : ''}`);
    
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      const index = newSteps.findIndex(step => step.id === stepId);
      
      if (index >= 0) {
        newSteps[index] = { 
          ...newSteps[index], 
          status,
          errorMessage
        };
        
        // Se este passo foi concluído com sucesso, avance para o próximo
        if (status === 'success' && index < newSteps.length - 1) {
          newSteps[index + 1].status = 'loading';
          setCurrentStepIndex(index + 1);
        }
      }
      
      return newSteps;
    });
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Marcar a inicialização como concluída
        updateStepStatus('init', 'success');
        
        // Etapa 1: Extrair o código dos parâmetros da URL
        const code = searchParams.get('code');
        updateStepStatus('code', 'loading');
        console.log('🔄 Recebido código de autorização:', code);

        if (!code) {
          const errorMsg = "Código de autenticação não encontrado.";
          console.error('❌ ' + errorMsg);
          updateStepStatus('code', 'error', errorMsg);
          
          toast({
            title: "Erro na autenticação",
            description: errorMsg,
            variant: "destructive"
          });
          
          setTimeout(() => navigate('/'), 5000);
          return;
        }

        updateStepStatus('code', 'success');

        // Etapa 2: Enviar código para autenticação
        updateStepStatus('auth', 'loading');
        console.log('🔄 Enviando código para autenticação:', code);
        
        const { data, error } = await supabase.functions.invoke('nuvemshop-auth', {
          body: { code }
        });

        if (error) {
          console.error('❌ Erro na autenticação Nuvemshop:', error);
          updateStepStatus('auth', 'error', error.message);
          
          toast({
            title: "Erro na autenticação",
            description: error.message || "Não foi possível autenticar com a Nuvemshop",
            variant: "destructive"
          });
          
          setTimeout(() => navigate('/'), 5000);
          return;
        }

        console.log('✅ Autenticação bem-sucedida. Resposta:', data);
        updateStepStatus('auth', 'success');
        
        // Finalizar os outros passos rapidamente para simular sucesso
        // Na realidade, esses passos já foram executados dentro da função Edge
        updateStepStatus('store', 'success');
        updateStepStatus('save', 'success');
        updateStepStatus('complete', 'success');
        
        toast({
          title: "Conexão realizada",
          description: "Sua loja Nuvemshop foi conectada com sucesso!"
        });

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('❌ Erro ao processar callback da Nuvemshop:', error);
        
        // Encontrar o passo atual que está carregando e marcá-lo como erro
        const currentLoadingStep = steps.find(step => step.status === 'loading');
        if (currentLoadingStep) {
          updateStepStatus(currentLoadingStep.id, 'error', errorMsg);
        }
        
        toast({
          title: "Erro na conexão",
          description: "Não foi possível completar a conexão com a Nuvemshop.",
          variant: "destructive"
        });
      } finally {
        // Dar ao usuário tempo para ler o status antes de redirecionar
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    };

    handleCallback();
  }, [navigate, toast, searchParams, steps]);

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />;
      default:
        return <ArrowRight className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Conectando com Nuvemshop</h2>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex items-start p-3 rounded-md ${
                step.status === 'error' ? 'bg-red-50' : 
                step.status === 'success' ? 'bg-green-50' : 
                step.status === 'loading' ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              <div className="mr-3 mt-0.5">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  step.status === 'error' ? 'text-red-700' : 
                  step.status === 'success' ? 'text-green-700' : 
                  step.status === 'loading' ? 'text-brand-blue' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                {step.errorMessage && (
                  <p className="text-sm mt-1 text-red-600">{step.errorMessage}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {steps.some(step => step.status === 'error') 
              ? "Ocorreu um erro durante o processo. Redirecionando..." 
              : steps[steps.length - 1].status === 'success'
                ? "Conexão completa! Redirecionando..." 
                : "Por favor, aguarde enquanto processamos sua conexão..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NuvemshopCallback;

