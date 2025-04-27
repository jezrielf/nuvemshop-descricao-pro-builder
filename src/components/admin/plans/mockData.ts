
import { Plan } from './types';

// Planos mockados para desenvolvimento
export const mockPlans: Plan[] = [
  {
    id: 'free-plan',
    name: 'Free',
    price: 0,
    isActive: true,
    isDefault: false,
    features: [
      { id: 'free-1', name: 'Até 3 descrições de produto', included: true },
      { id: 'free-2', name: 'Editor básico', included: true },
      { id: 'free-3', name: 'Templates básicos', included: true },
      { id: 'free-4', name: 'Salvar descrições', included: false },
      { id: 'free-5', name: 'Ferramentas de SEO', included: false },
      { id: 'free-6', name: 'Geração com IA', included: false },
    ]
  },
  {
    id: 'premium-plan',
    name: 'Premium',
    price: 4990,
    isActive: true,
    isDefault: true,
    features: [
      { id: 'premium-1', name: 'Descrições ilimitadas', included: true },
      { id: 'premium-2', name: 'Todos os recursos do editor', included: true },
      { id: 'premium-3', name: 'Todos os templates', included: true },
      { id: 'premium-4', name: 'Salvar e recuperar descrições', included: true },
      { id: 'premium-5', name: 'Ferramentas básicas de SEO', included: true },
      { id: 'premium-6', name: 'Geração com IA', included: false },
    ]
  },
  {
    id: 'business-plan',
    name: 'Empresarial',
    price: 9990,
    isActive: true,
    isDefault: false,
    features: [
      { id: 'business-1', name: 'Descrições ilimitadas', included: true },
      { id: 'business-2', name: 'Todos os recursos do editor', included: true },
      { id: 'business-3', name: 'Todos os templates', included: true },
      { id: 'business-4', name: 'Salvar e recuperar descrições', included: true },
      { id: 'business-5', name: 'Ferramentas avançadas de SEO', included: true },
      { id: 'business-6', name: 'Geração completa com IA', included: true },
    ]
  }
];
