
import { Plan } from './types';

// Mock data for plans
export const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Gratuito',
    price: 0,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: false },
      { id: '5', name: 'Todos os templates', included: false },
      { id: '6', name: 'Suporte prioritário', included: false },
    ],
    isActive: true,
    isDefault: true
  },
  {
    id: '2',
    name: 'Premium',
    price: 29.90,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: true },
      { id: '5', name: 'Todos os templates', included: true },
      { id: '6', name: 'Suporte prioritário', included: true },
    ],
    isActive: true,
    isDefault: false
  },
  {
    id: '3',
    name: 'Empresarial',
    price: 99.90,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: true },
      { id: '5', name: 'Todos os templates', included: true },
      { id: '6', name: 'Suporte prioritário', included: true },
      { id: '7', name: 'API para integração', included: true },
      { id: '8', name: 'White label', included: true },
    ],
    isActive: true,
    isDefault: false
  }
];
