
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
  handleUpdateDescription
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos da Loja</CardTitle>
        <CardDescription>
          Página {currentPage} - Exibindo {products.length} produtos 
          {totalProducts > 0 ? ` de aproximadamente ${totalProducts}` : ''}
        </CardDescription>
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
