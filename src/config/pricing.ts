
// This file contains pricing information for the application
export const pricing = {
  plans: [
    {
      name: 'Free',
      description: 'Para usuários individuais e iniciantes',
      price: 0,
      interval: 'month',
      currency: 'BRL',
      features: [
        'Até 3 descrições',
        'Editor básico',
        'Templates básicos'
      ]
    },
    {
      name: 'Premium',
      description: 'Para criadores de conteúdo',
      price: 29.90,
      interval: 'month',
      currency: 'BRL',
      features: [
        'Descrições ilimitadas',
        'Todos os recursos do editor',
        'Todos os templates',
        'Salvar e recuperar descrições',
        'Ferramentas básicas de SEO'
      ]
    },
    {
      name: 'Business',
      description: 'Para empresas e lojas online',
      price: 59.90,
      interval: 'month',
      currency: 'BRL',
      features: [
        'Tudo do Premium',
        'Integração com e-commerces',
        'Ferramentas avançadas de SEO',
        'Geração com IA',
        'Suporte prioritário'
      ]
    }
  ]
};
