
export interface NuvemshopProduct {
  id: number;
  name: string | { pt?: string; [key: string]: string | undefined };
  sku: string | null;
  price: string | number;
}

export interface NuvemshopAuthResponse {
  access_token: string;
  user_id: number | string;
  [key: string]: any;
}
