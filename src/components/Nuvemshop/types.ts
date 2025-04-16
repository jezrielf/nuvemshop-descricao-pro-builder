
export interface NuvemshopProduct {
  id: number;
  name: string | { pt?: string; [key: string]: string | undefined };
  sku: string | null;
  price: string | number;
  description?: string | { pt?: string; [key: string]: string | undefined };
}

export interface NuvemshopAuthResponse {
  access_token: string;
  user_id: number | string;
  [key: string]: any;
}

export interface NuvemshopProductUpdatePayload {
  id: number;
  description: { pt: string } | string;
}

export interface ProductEditorContext {
  selectedProduct: NuvemshopProduct | null;
  setSelectedProduct: (product: NuvemshopProduct | null) => void;
  isSaving: boolean;
  saveDescription: () => Promise<boolean>;
  loadProductDescription: (product: NuvemshopProduct) => void;
}
