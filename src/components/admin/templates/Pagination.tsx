
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  currentPage,
  totalPages
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages || 1}
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrevious} 
          disabled={isPreviousDisabled}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
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
    </div>
  );
};

export default Pagination;
