
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Pagination as UIPagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false
}) => {
  // Use the actual pagination values to determine if buttons should be disabled
  const prevDisabled = isPreviousDisabled || currentPage <= 1;
  const nextDisabled = isNextDisabled || currentPage >= totalPages;
  
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </div>
      
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onPrevious} 
              disabled={prevDisabled}
              className={prevDisabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
          </PaginationItem>
          
          {totalPages > 0 && (
            <PaginationItem>
              <PaginationLink isActive={true}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onNext} 
              disabled={nextDisabled}
              className={nextDisabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
};

export default Pagination;
