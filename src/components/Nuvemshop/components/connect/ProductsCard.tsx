
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
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleUpdateDescription: (productId: number, description: string) => Promise<boolean>;
  loadAllProducts?: () => void;
  loadingAllProducts?: boolean;
}

export const ProductsCard: React.FC<ProductsCardProps> = ({
  products,
  loadingProducts,
  updatingProduct,
  currentPage,
  totalPages,
  totalProducts,
  handlePrevPage,
  handleNextPage,
  handleUpdateDescription,
  loadAllProducts,
  loadingAllProducts
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Produtos da Loja</CardTitle>
            <CardDescription>
              Página {currentPage} de {totalPages} - Exibindo {products.length} produtos 
              {totalProducts > 0 ? ` de ${totalProducts} total` : ''}
            </CardDescription>
          </div>
          {loadAllProducts && totalProducts > products.length && (
            <button
              onClick={loadAllProducts}
              disabled={loadingAllProducts}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {loadingAllProducts ? 'Carregando...' : 'Carregar Todos'}
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
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onUpdateDescription={handleUpdateDescription}
        />
      </CardContent>
    </Card>
  );
};
