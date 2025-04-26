
export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  features: PlanFeature[];
  isActive: boolean;
  isDefault: boolean;
  priceId?: string;
  interval: string;  // Changed from optional to required
  currency: string;  // Changed from optional to required
}

export const defaultFeaturesTemplate = [
  { id: 'feature-1', name: 'Descrições ilimitadas', included: false },
  { id: 'feature-2', name: 'Geração de até 3 descrições', included: true },
  { id: 'feature-3', name: 'Salvar e recuperar descrições', included: false },
  { id: 'feature-4', name: 'Ferramentas de SEO completas', included: false },
  { id: 'feature-5', name: 'Gerar descrições com IA', included: false },
  { id: 'feature-6', name: 'Suporte prioritário', included: false },
  { id: 'feature-7', name: 'Exportação em múltiplos formatos', included: false },
  { id: 'feature-8', name: 'Integrações com marketplaces', included: false },
];
