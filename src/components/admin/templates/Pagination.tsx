
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled
}) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onPrevious} 
        disabled={isPreviousDisabled}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onNext} 
        disabled={isNextDisabled}
      >
        Próximo
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default Pagination;
