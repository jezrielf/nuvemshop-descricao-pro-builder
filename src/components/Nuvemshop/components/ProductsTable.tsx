
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NuvemshopProduct } from '../types';

interface ProductsTableProps {
  products: NuvemshopProduct[];
  loadingProducts: boolean;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  loadingProducts,
  currentPage,
  totalPages,
  totalProducts,
  onPrevPage,
  onNextPage
}) => {
  // Helper to safely display product name
  const renderProductName = (name: string | { pt?: string; [key: string]: string | undefined }) => {
    if (typeof name === 'string') {
      return name;
    } else if (name && typeof name === 'object' && 'pt' in name) {
      return name.pt || 'N/A';
    }
    return 'N/A';
  };

  return (
    <div>
      <div className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingProducts ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                </TableRow>
              ))
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{renderProductName(product.name)}</TableCell>
                  <TableCell>{product.sku || 'N/A'}</TableCell>
                  <TableCell>
                    {product.price ? `$${parseFloat(product.price.toString()).toFixed(2)}` : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {products.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrevPage} 
            disabled={currentPage <= 1 || loadingProducts}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <span className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNextPage} 
            disabled={currentPage >= totalPages || loadingProducts}
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
