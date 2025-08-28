import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ProcessorConfig {
  onApplyToProducts: (productIds: number[], onStatusChange?: (productId: number, status: 'pending' | 'success' | 'error', message?: string) => void) => Promise<void>;
  concurrencyLimit: number;
}

interface QueueItem {
  id: number;
  status: 'waiting' | 'processing' | 'completed' | 'error';
  message?: string;
  retryCount: number;
}

interface ProcessingStats {
  total: number;
  completed: number;
  success: number;
  errors: number;
  pending: number;
}

export const useBulkProductProcessor = ({ onApplyToProducts, concurrencyLimit }: ProcessorConfig) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [statusMap, setStatusMap] = useState<Map<number, { status: 'pending' | 'success' | 'error'; message?: string }>>(new Map());
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const processingRef = useRef<AbortController | null>(null);
  const retryLimit = 3;

  const stats: ProcessingStats = {
    total: queue.length,
    completed: queue.filter(item => item.status === 'completed' || item.status === 'error').length,
    success: queue.filter(item => item.status === 'completed').length,
    errors: queue.filter(item => item.status === 'error').length,
    pending: queue.filter(item => item.status === 'waiting' || item.status === 'processing').length
  };

  const updateProgress = useCallback(() => {
    setProgress(stats.total > 0 ? (stats.completed / stats.total) * 100 : 0);
  }, [stats]);

  const updateItemStatus = useCallback((id: number, status: QueueItem['status'], message?: string) => {
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status, message } : item
    ));
    
    setStatusMap(prev => {
      const newMap = new Map(prev);
      if (status === 'processing') {
        newMap.set(id, { status: 'pending', message: message || 'Processando...' });
      } else if (status === 'completed') {
        newMap.set(id, { status: 'success', message: message || 'Concluído com sucesso' });
      } else if (status === 'error') {
        newMap.set(id, { status: 'error', message: message || 'Erro no processamento' });
      }
      return newMap;
    });
  }, []);

  const processQueue = useCallback(async (productIds: number[]) => {
    if (!productIds.length) return;

    const controller = new AbortController();
    processingRef.current = controller;

    try {
      // Initialize queue
      const initialQueue = productIds.map(id => ({
        id,
        status: 'waiting' as const,
        retryCount: 0
      }));
      
      setQueue(initialQueue);
      setIsProcessing(true);
      setIsPaused(false);

      // Initialize status map
      const initialStatusMap = new Map();
      productIds.forEach(id => {
        initialStatusMap.set(id, { status: 'pending' as const, message: 'Aguardando...' });
      });
      setStatusMap(initialStatusMap);

      // Process items with concurrency control
      const semaphore = new Array(concurrencyLimit).fill(null);
      let currentIndex = 0;

      const processNext = async (workerIndex: number): Promise<void> => {
        while (currentIndex < productIds.length && !controller.signal.aborted) {
          // Check if paused
          while (isPaused && !controller.signal.aborted) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          if (controller.signal.aborted) break;

          const index = currentIndex++;
          const productId = productIds[index];
          
          updateItemStatus(productId, 'processing', `Processando... (Worker ${workerIndex + 1})`);

          try {
            // Create a single-item processor to handle the status callback
            await onApplyToProducts([productId], (id, status, message) => {
              if (status === 'success') {
                updateItemStatus(id, 'completed', message);
              } else if (status === 'error') {
                updateItemStatus(id, 'error', message);
              } else {
                updateItemStatus(id, 'processing', message);
              }
            });

          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            updateItemStatus(productId, 'error', errorMessage);
          }

          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      };

      // Start workers
      await Promise.all(semaphore.map((_, index) => processNext(index)));

      // Final status check
      const finalStats = {
        total: productIds.length,
        success: queue.filter(item => item.status === 'completed').length,
        errors: queue.filter(item => item.status === 'error').length
      };

      if (finalStats.success === productIds.length) {
        toast({
          title: '✅ Processamento concluído!',
          description: `Todos os ${finalStats.success} produtos foram processados com sucesso.`,
        });
      } else if (finalStats.success > 0) {
        toast({
          title: '⚠️ Processamento parcial',
          description: `${finalStats.success} de ${productIds.length} produtos processados com sucesso.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '❌ Falha no processamento',
          description: 'Nenhum produto foi processado com sucesso.',
        });
      }

    } catch (error) {
      console.error('Error in bulk processing:', error);
      toast({
        variant: 'destructive',
        title: 'Erro no processamento',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    } finally {
      setIsProcessing(false);
      processingRef.current = null;
      updateProgress();
    }
  }, [onApplyToProducts, concurrencyLimit, isPaused, updateItemStatus, queue, toast, updateProgress]);

  const startProcessing = useCallback(async (productIds: number[]) => {
    await processQueue(productIds);
  }, [processQueue]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
    toast({
      title: isPaused ? 'Processamento retomado' : 'Processamento pausado',
      description: isPaused ? 'Continuando o processamento...' : 'O processamento foi pausado.',
    });
  }, [isPaused, toast]);

  const retry = useCallback(() => {
    const failedItems = queue.filter(item => item.status === 'error').map(item => item.id);
    if (failedItems.length > 0) {
      processQueue(failedItems);
    }
  }, [queue, processQueue]);

  const reset = useCallback(() => {
    if (processingRef.current) {
      processingRef.current.abort();
    }
    setQueue([]);
    setStatusMap(new Map());
    setProgress(0);
    setIsProcessing(false);
    setIsPaused(false);
  }, []);

  const exportResults = useCallback(() => {
    const csvData = queue.map(item => {
      const status = item.status === 'completed' ? 'Sucesso' : 
                    item.status === 'error' ? 'Erro' : 
                    item.status === 'processing' ? 'Processando' : 'Aguardando';
      
      return {
        'ID do Produto': item.id,
        'Status': status,
        'Mensagem': item.message || '',
        'Tentativas': item.retryCount
      };
    });

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bulk-processing-results-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: 'Exportação concluída',
      description: 'Resultados exportados para CSV.',
    });
  }, [queue, toast]);

  return {
    isProcessing,
    isPaused,
    progress,
    queue,
    statusMap,
    stats,
    startProcessing,
    togglePause,
    retry,
    reset,
    exportResults
  };
};