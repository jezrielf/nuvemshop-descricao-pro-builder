import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight,
  Sparkles,
  BarChart2,
  Check,
  Shield,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Layout
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Dynamic icon mapping
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className={className} />,
    BarChart2: <BarChart2 className={className} />,
    Check: <Check className={className} />,
    Shield: <Shield className={className} />,
    Layout: <Layout className={className} />
  };

  return <>{icons[name] || <Sparkles className={className} />}</>;
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  // If user is logged in, redirect to editor
  useEffect(() => {
    if (user) {
      navigate('/editor');
    }
  }, [user, navigate]);

  // Fetch landing page content from database
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('landing_page_content')
          .select('section, content');

        if (error) throw error;

        // Transform array into an object with section names as keys
        const contentMap = (data || []).reduce((acc, item) => ({
          ...acc,
          [item.section]: item.content
        }), {});

        console.log("Landing page content loaded:", contentMap);
        setContent(contentMap);
      } catch (error) {
        console.error("Error loading landing page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando...</span>
      </div>
    );
  }

  // Default values for the content
  const hero = content.hero || {
    title: 'Crie Descrições que Vendem',
    subtitle: 'Use Inteligência Artificial para gerar descrições profissionais e otimizadas para SEO em minutos. Aumente suas vendas com textos persuasivos e envolventes.',
    cta_primary: 'Começar Gratuitamente',
    cta_secondary: 'Ver Demonstração'
  };

  const features = content.features || {
    title: 'Recursos Poderosos',
    description: 'Tudo que você precisa para criar descrições que convertem',
    items: [
      {
        title: 'IA Especializada em E-commerce',
        description: 'Nossa IA foi treinada com milhares de descrições de sucesso para gerar textos que realmente vendem.',
        icon: 'Sparkles'
      },
      {
        title: 'Otimização SEO em Tempo Real',
        description: 'Análise instantânea de SEO para garantir que suas descrições apareçam no topo das buscas.',
        icon: 'BarChart2'
      },
      {
        title: 'Templates Profissionais',
        description: 'Biblioteca completa de templates testados e aprovados para diferentes segmentos.',
        icon: 'Layout'
      }
    ]
  };

  const howItWorks = content.how_it_works || {
    title: 'Questione, ouça, aprenda e inove.',
    description: 'Plataforma intuitiva que ajusta seu estilo de escrita para melhor SEO.',
    steps: []
  };

  const screenshots = [
    { 
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      title: 'Editor Intuitivo' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      title: 'Análise SEO' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      title: 'Templates Profissionais' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
      title: 'Dashboard Completo' 
    }
  ];

  const stats = [
    { value: '50.000+', label: 'Descrições Geradas' },
    { value: '5.000+', label: 'Usuários Ativos' },
    { value: '98%', label: 'Satisfação' },
    { value: '200%', label: 'Aumento em Vendas' }
  ];

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: '/mês',
      features: [
        'Até 3 descrições por mês',
        'Templates básicos',
        'Análise SEO básica',
        'Suporte por email'
      ],
      cta: 'Começar grátis'
    },
    {
      name: 'Pro',
      price: '97',
      period: '/mês',
      features: [
        'Descrições ilimitadas',
        'Templates exclusivos',
        'Análise e diagnóstico completo de SEO',
        'Suporte prioritário 24/7',
        'Integrações com e-commerce',
        'Exportação em lote'
      ],
      cta: 'Assinar agora',
      highlight: true
    }
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      company: 'Moda Online Store',
      text: 'As descrições geradas pela plataforma aumentaram nossas vendas em 150%. A otimização para SEO nos trouxe muito mais visitantes qualificados.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      rating: 5
    },
    {
      name: 'Carlos Mendes',
      company: 'Tech Store',
      text: 'Economizamos horas de trabalho com as descrições automáticas. A qualidade é excepcional e os resultados são impressionantes.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      rating: 5
    },
    {
      name: 'Marina Costa',
      company: 'Fashion Store',
      text: 'Os templates são perfeitos e a IA entende exatamente o tom da nossa marca. Recomendo para todas as lojas online!',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextScreenshot = () => {
    setActiveScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setActiveScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                DescriçãoPRO
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary">Funcionalidades</a>
              <a href="#plans" className="text-gray-600 hover:text-primary">Planos</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary">Depoimentos</a>
              <a href="#video" className="text-gray-600 hover:text-primary">Vídeo</a>
              <a href="#about" className="text-gray-600 hover:text-primary">Sobre</a>
            </div>
            
            <div className="flex items-center space-x-2">
              {user ? (
                <Button 
                  onClick={() => navigate('/editor')}
                  className="px-4 bg-indigo-600 hover:bg-indigo-700"
                >
                  Ir para Editor
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/auth')}
                    className="px-4 text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth?signup=true')}
                    className="px-4 bg-indigo-600 hover:bg-indigo-700"
                  >
                    Registrar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Updated */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforme suas Descrições de Produtos em Máquinas de Vendas
              </h1>
              <p className="text-xl mb-8 text-indigo-100 leading-relaxed">
                Use nossa IA especializada para criar descrições profissionais que convertem, 
                otimizadas para SEO e que fazem seus produtos se destacarem da concorrência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth?signup=true')}
                  className="shadow-lg bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
                >
                  Começar Agora Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold"
                >
                  Ver Demonstração
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://img.freepik.com/vetores-gratis/freelancer-feliz-com-o-computador-em-casa-jovem-sentado-na-poltrona-e-usando-o-laptop-conversando-online-e-sorrindo-ilustracao-vetorial-para-trabalho-a-distancia-aprendizagem-online-freelance_74855-8401.jpg" 
                  alt="Pessoa utilizando o sistema"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      {/* Features Section - Updated */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{features.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.items.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <DynamicIcon name={feature.icon} className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Redesigned */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{howItWorks.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{howItWorks.description}</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <img 
                  src="/lovable-uploads/ea72f039-790b-455c-b2ea-0c2a7981d2d2.png" 
                  alt="Platform demo" 
                  className="w-full rounded-md"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Economia de tempo</h3>
                    <p className="text-gray-600">Crie descrições em minutos ao invés de horas. Nossa IA faz todo o trabalho pesado.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <BarChart2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Aumento nas vendas</h3>
                    <p className="text-gray-600">Descrições otimizadas que convertem visitantes em clientes satisfeitos.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Star className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Qualidade profissional</h3>
                    <p className="text-gray-600">Algoritmos treinados para produzir textos que se equiparam aos melhores copywriters.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section - Redesigned */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Telas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="w-full h-auto rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/300x200?text=Screenshot";
                  }}
                />
                <p className="mt-2 text-center text-sm font-medium">{screenshot.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Redesigned */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-indigo-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Redesigned */}
      <section id="plans" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nosso Planos de Preços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano perfeito para você com 100% de satisfação garantida.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg p-8 border flex-1 relative ${plan.highlight ? 'border-indigo-500' : 'border-gray-200'}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">R${plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  onClick={() => navigate('/auth?signup=true')}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Redesigned */}
      <section id="video" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Vídeo sobre nosso processo de trabalho
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Entenda melhor como nossa IA cria descrições otimizadas para seus produtos e como isso pode aumentar suas vendas.
          </p>
          
          <div className="max-w-4xl mx-auto aspect-video bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <div className="text-center p-8 text-white">
              <p className="text-indigo-100 mb-4">Vídeo em breve disponível</p>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                Receber notificação quando disponível
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testemunhos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/48x48?text=User";
                    }}
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="italic text-gray-600">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar suas descrições?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-indigo-100">
            Junte-se a milhares de lojistas que já melhoraram suas vendas com descrições otimizadas geradas por IA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/auth?signup=true')}
              className="shadow-md bg-white text-indigo-600 hover:bg-gray-100"
            >
              Começar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/plans')}
              className="border-white text-white hover:bg-indigo-700"
            >
              Ver planos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Redesigned */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">DescriçãoPRO</h3>
              <p className="mb-4">
                Descrições profissionais para e-commerce geradas por IA.
              </p>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li><a href="#features" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#plans" className="hover:text-white">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white">Depoimentos</a></li>
              </ul>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-2">
                <li>contato@descricaopro.com</li>
                <li>+55 (11) 12345-6789</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} DescriçãoPRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
