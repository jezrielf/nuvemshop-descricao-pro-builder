
export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  interval: string;
  currency: string;
  features: string[] | Array<{ name: string; included: boolean }>;
  priceId?: string;
  isActive?: boolean;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  cancelAt?: string;
  canceledAt?: string;
}
