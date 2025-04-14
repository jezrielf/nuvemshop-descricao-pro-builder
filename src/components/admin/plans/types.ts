
export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: PlanFeature[];
  isActive: boolean;
  isDefault: boolean;
  priceId?: string;
}
