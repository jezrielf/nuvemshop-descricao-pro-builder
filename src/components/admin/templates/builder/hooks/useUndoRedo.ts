import { useState, useCallback, useRef } from 'react';
import { Template } from '@/types/editor';

interface HistoryState {
  past: Template[];
  present: Template;
  future: Template[];
}

export const useUndoRedo = (
  initialTemplate: Template,
  onTemplateChange: (template: Template) => void,
  maxHistory: number = 50
) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialTemplate,
    future: []
  });

  const lastPushTimeRef = useRef<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const pushToHistory = useCallback((template: Template) => {
    const now = Date.now();
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce rapid changes (300ms)
    debounceTimeoutRef.current = setTimeout(() => {
      setHistory(prev => {
        // Don't push if template is the same
        if (JSON.stringify(prev.present) === JSON.stringify(template)) {
          return prev;
        }

        const newPast = [...prev.past, prev.present];
        
        // Limit history size
        if (newPast.length > maxHistory) {
          newPast.shift();
        }

        return {
          past: newPast,
          present: template,
          future: [] // Clear future when new change is made
        };
      });
      lastPushTimeRef.current = now;
    }, 300);
  }, [maxHistory]);

  const undo = useCallback(() => {
    if (!canUndo) return;

    setHistory(prev => {
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);
      
      onTemplateChange(previous);
      
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future]
      };
    });
  }, [canUndo, onTemplateChange]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setHistory(prev => {
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      
      onTemplateChange(next);
      
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture
      };
    });
  }, [canRedo, onTemplateChange]);

  const reset = useCallback((template: Template) => {
    setHistory({
      past: [],
      present: template,
      future: []
    });
  }, []);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    pushToHistory,
    reset
  };
};