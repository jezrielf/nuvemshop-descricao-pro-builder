
import React from 'react';
import { NexoAppRoot } from '@/components/Nuvemshop/nexo/NexoAppRoot';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

// Componente de fallback para erros
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Ocorreu um erro com o aplicativo Descrição PRO</h2>
    <p className="mb-4">Não foi possível carregar o aplicativo neste momento.</p>
    <pre className="p-4 bg-gray-100 rounded text-left overflow-auto my-4 max-h-48 text-sm">
      {error.message}
    </pre>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      Tentar novamente
    </button>
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
          // Recarrega a página quando o usuário clicar em "Tentar novamente"
          window.location.reload();
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
