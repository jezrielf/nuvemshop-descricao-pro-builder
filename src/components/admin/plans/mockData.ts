
import { Plan } from './types';

export const mockPlans: Plan[] = [
  {
    id: 'free-plan',
    name: 'Plano Gratuito',
    price: 0,
    isActive: true,
    isDefault: false,
    interval: 'month',
    currency: 'BRL',
    features: [
      { id: 'feature-1', name: 'Até 5 descrições', included: true },
      { id: 'feature-2', name: 'Templates básicos', included: true },
      { id: 'feature-3', name: 'Exportação em HTML', included: true },
      { id: 'feature-4', name: 'Ferramentas SEO limitadas', included: false },
      { id: 'feature-5', name: 'Suporte por email', included: false },
    ]
  },
  {
    id: 'basic-plan',
    name: 'Plano Básico',
    price: 29.90,
    isActive: true,
    isDefault: true,
    interval: 'month',
    currency: 'BRL',
    features: [
      { id: 'feature-1', name: 'Descrições ilimitadas', included: true },
      { id: 'feature-2', name: 'Todos os templates', included: true },
      { id: 'feature-3', name: 'Exportação em múltiplos formatos', included: true },
      { id: 'feature-4', name: 'Ferramentas SEO completas', included: true },
      { id: 'feature-5', name: 'Suporte prioritário', included: false },
    ]
  },
  {
    id: 'premium-plan',
    name: 'Plano Premium',
    price: 59.90,
    isActive: true,
    isDefault: false,
    interval: 'month',
    currency: 'BRL',
    features: [
      { id: 'feature-1', name: 'Descrições ilimitadas', included: true },
      { id: 'feature-2', name: 'Todos os templates', included: true },
      { id: 'feature-3', name: 'Exportação em múltiplos formatos', included: true },
      { id: 'feature-4', name: 'Ferramentas SEO completas', included: true },
      { id: 'feature-5', name: 'Suporte prioritário', included: true },
      { id: 'feature-6', name: 'Geração com IA', included: true },
      { id: 'feature-7', name: 'Integrações com marketplaces', included: true },
    ]
  }
];
