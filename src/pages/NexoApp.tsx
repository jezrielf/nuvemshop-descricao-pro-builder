
import React from 'react';
import { NexoAppRoot } from '@/components/Nuvemshop/nexo/NexoAppRoot';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

// Componente de fallback para erros com melhor UX
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-8 text-center flex flex-col items-center justify-center min-h-screen">
    <img 
      src="/lovable-uploads/a59d7173-4605-432b-ae03-533076c93edf.png" 
      alt="Erro na aplicação" 
      className="max-w-xs mb-6"
    />
    <h2 className="text-2xl font-bold text-red-600 mb-4">Ocorreu um erro com o aplicativo Descrição PRO</h2>
    <p className="mb-4 text-gray-700">Não foi possível carregar o aplicativo neste momento.</p>
    <pre className="p-4 bg-gray-100 rounded text-left overflow-auto my-4 max-h-48 text-sm">
      {error.message}
    </pre>
    <div className="flex gap-4">
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
        Tentar novamente
      </button>
      <a 
        href="https://ajuda.nuvemshop.com.br" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        Central de ajuda
      </a>
    </div>
  </div>
);

const NexoApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Descritor Pro - Nexo</title>
        <meta name="description" content="Versão Nexo do Descritor Pro para integração com a Nuvemshop" />
      </Helmet>
      
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Limpa quaisquer dados de estado que possam estar causando o erro
          localStorage.removeItem('nexo_error');
          localStorage.removeItem('nexo_state');
          // Recarrega a página quando o usuário clicar em "Tentar novamente"
          window.location.reload();
        }}
        onError={(error) => {
          // Registra o erro para depuração
          console.error('Erro fatal na aplicação Nexo:', error);
          localStorage.setItem('nexo_error', JSON.stringify({
            message: error.message,
            stack: error.stack,
            time: new Date().toISOString()
          }));
        }}
      >
        <React.Suspense fallback={<LoadingSpinner text="Carregando aplicação Nexo..." />}>
          <NexoAppRoot />
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
};

export default NexoApp;
