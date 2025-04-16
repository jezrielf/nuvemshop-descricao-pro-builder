
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Edit, Save, X } from 'lucide-react';
import { NuvemshopProduct } from '../types';

interface ProductsTableProps {
  products: NuvemshopProduct[];
  loadingProducts: boolean;
  updatingProduct?: boolean;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onUpdateDescription?: (productId: number, description: string) => Promise<boolean>;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  loadingProducts,
  updatingProduct = false,
  currentPage,
  totalPages,
  totalProducts,
  onPrevPage,
  onNextPage,
  onUpdateDescription
}) => {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");
  
  // Helper to safely display product name
  const renderProductName = (name: string | { pt?: string; [key: string]: string | undefined }) => {
    if (typeof name === 'string') {
      return name;
    } else if (name && typeof name === 'object' && 'pt' in name) {
      return name.pt || 'N/A';
    }
    return 'N/A';
  };

  // Helper to safely get product description
  const getProductDescription = (description: string | { pt?: string; [key: string]: string | undefined } | undefined) => {
    if (typeof description === 'string') {
      return description;
    } else if (description && typeof description === 'object' && 'pt' in description) {
      return description.pt || '';
    }
    return '';
  };

  const handleEditStart = (product: NuvemshopProduct) => {
    setEditingProductId(product.id);
    setEditedDescription(getProductDescription(product.description));
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedDescription("");
  };

  const handleSaveDescription = async (productId: number) => {
    if (onUpdateDescription) {
      const success = await onUpdateDescription(productId, editedDescription);
      if (success) {
        setEditingProductId(null);
      }
    }
  };

  return (
    <div>
      <div className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-1/4">Nome</TableHead>
              <TableHead className="w-1/5">SKU</TableHead>
              <TableHead className="w-1/6">Preço</TableHead>
              <TableHead className="w-1/3">Descrição</TableHead>
              <TableHead className="w-24 text-right">Ações</TableHead>
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
                  <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
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
                  <TableCell>
                    {editingProductId === product.id ? (
                      <Textarea 
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="min-h-[80px]"
                        placeholder="Digite a descrição do produto"
                      />
                    ) : (
                      <div className="max-h-24 overflow-y-auto">
                        {getProductDescription(product.description) || 'Sem descrição'}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingProductId === product.id ? (
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCancelEdit}
                          disabled={updatingProduct}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => handleSaveDescription(product.id)}
                          disabled={updatingProduct}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditStart(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
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
