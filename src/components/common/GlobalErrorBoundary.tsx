import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorId: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { 
      hasError: true, 
      error,
      errorId
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    logger.error('Global error caught', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId
    }, 'ErrorBoundary');

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to external monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with monitoring service (Sentry, LogRocket, etc.)
      console.error('Production error:', {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack
      });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: '' });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Algo deu errado</AlertTitle>
              <AlertDescription>
                <p className="mb-4">
                  {this.state.error?.message || 'Um erro inesperado ocorreu. Nossa equipe foi notificada.'}
                </p>
                
                {process.env.NODE_ENV === 'development' && (
                  <details className="mb-4 p-2 bg-muted rounded text-xs">
                    <summary className="cursor-pointer font-medium">
                      Detalhes técnicos (desenvolvimento)
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap break-words">
                      {this.state.error?.stack}
                    </pre>
                  </details>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={this.handleRetry}
                    size="sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={this.handleReload}
                    size="sm"
                  >
                    Recarregar Página
                  </Button>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    ID do erro: {this.state.errorId}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;