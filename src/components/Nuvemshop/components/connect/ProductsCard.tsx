import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductsTable } from '../ProductsTable';
import { NuvemshopProduct } from '../../types';

interface ProductsCardProps {
  products: NuvemshopProduct[];
  loadingProducts: boolean;
  updatingProduct: boolean;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleUpdateDescription: (productId: number, description: string) => Promise<boolean>;
  loadAllProducts?: () => void;
  loadingAllProducts?: boolean;
  allProgress?: { loaded: number; total: number };
}

export const ProductsCard: React.FC<ProductsCardProps> = ({
  products,
  loadingProducts,
  updatingProduct,
  currentPage,
  totalPages,
  totalProducts,
  hasNext,
  hasPrev,
  handlePrevPage,
  handleNextPage,
  handleUpdateDescription,
  loadAllProducts,
  loadingAllProducts = false,
  allProgress = { loaded: 0, total: 0 }
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Produtos da Loja</CardTitle>
            <CardDescription>
              Exibindo {products.length} de {totalProducts} produtos
            </CardDescription>
          </div>
          {loadAllProducts && totalPages > 1 && (
            <button
              onClick={loadAllProducts}
              disabled={loadingAllProducts}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {loadingAllProducts ? 
                `Carregando... (${allProgress.loaded}/${allProgress.total})` : 
                'Carregar Todos'
              }
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ProductsTable
          products={products}
          loadingProducts={loadingProducts}
          updatingProduct={updatingProduct}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onUpdateDescription={handleUpdateDescription}
        />
      </CardContent>
    </Card>
  );
};