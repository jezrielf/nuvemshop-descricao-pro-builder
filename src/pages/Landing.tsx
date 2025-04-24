
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
  ChevronLeft
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Dynamic icon mapping
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className={className} />,
    BarChart2: <BarChart2 className={className} />,
    Check: <Check className={className} />,
    Shield: <Shield className={className} />
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
    title: 'Aplicativo de desktop para seu estilo de vida.',
    subtitle: 'Suas descrições, o que você é!',
    cta_primary: 'Comece agora',
    cta_secondary: 'Saiba mais'
  };

  const features = content.features || {
    title: 'Porque amamos o que fazemos!',
    description: 'Otimizando as descrições de produtos para melhorar suas vendas e conversão.',
    items: [
      {
        title: 'Simples como CTRL+C',
        description: 'Copie e cole as descrições geradas em qualquer plataforma.',
        icon: 'Check'
      },
      {
        title: 'Trabalho Inteligente',
        description: 'Nossa IA entende seu produto e gera descrições personalizadas.',
        icon: 'Sparkles'
      }
    ]
  };

  const howItWorks = content.how_it_works || {
    title: 'Questione, ouça, aprenda e inove.',
    description: 'Plataforma intuitiva que ajusta seu estilo de escrita para melhor SEO.',
    steps: []
  };

  const screenshots = [
    { image: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png', title: 'Dashboard' },
    { image: '/assets/landing/editor-interface.png', title: 'Editor' },
    { image: '/assets/landing/ai-generator.png', title: 'Gerador de IA' },
    { image: '/assets/landing/analytics.png', title: 'Analíticos' }
  ];

  const stats = [
    { value: '3546+', label: 'Descrições' },
    { value: '2052+', label: 'Usuários' },
    { value: '2+', label: 'Anos de Trabalho' },
    { value: '2955+', label: 'Produtos Cadastrados' }
  ];

  const plans = [
    {
      name: 'Grátis',
      price: '0',
      period: 'Free',
      features: [
        'Limite de 5 descrições',
        'Acesso a 3 templates',
        'Suporte básico',
        'Válido por 7 dias'
      ],
      cta: 'Cadastrar-se'
    },
    {
      name: 'Profissional',
      price: '25',
      period: '/mês',
      features: [
        'Descrições ilimitadas',
        'Templates ilimitados',
        'Gestão completa',
        'Análise de SEO em tempo real'
      ],
      cta: 'Cadastrar-se',
      highlight: true
    }
  ];

  const testimonials = content.testimonials?.items || [
    {
      name: 'João Silva',
      company: 'Loja Virtual ABC',
      text: 'As descrições geradas aumentaram minhas vendas em 40% em apenas dois meses. Nunca foi tão fácil criar conteúdo de qualidade.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5
    },
    {
      name: 'Maria Costa',
      company: 'MC Eletrônicos',
      text: 'Uso diariamente para meus produtos e notei uma melhora significativa no tráfego orgânico. A função de SEO em tempo real é fantástica.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5
    },
    {
      name: 'Carlos Mendes',
      company: 'Tech Shop',
      text: 'Economizo horas todas as semanas com essa ferramenta. As descrições são profissionais e convertem muito melhor que as antigas.',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
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

      {/* Hero Section */}
      <section className="bg-indigo-600 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500 rounded-bl-full opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {hero.title}
              </h1>
              <p className="text-xl mb-6 text-indigo-100">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth?signup=true')}
                  className="shadow-md bg-white text-indigo-600 hover:bg-gray-100"
                >
                  {hero.cta_primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/plans')}
                  className="border-white text-white hover:bg-indigo-700"
                >
                  {hero.cta_secondary}
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png" 
                  alt="Dashboard do DescriçãoPro" 
                  className="rounded-md w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400?text=Dashboard+DescricaoPro";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{features.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.items && features.items.length > 0 ? (
              features.items.map((item: any, index: number) => (
                <div key={index} className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <DynamicIcon name={item.icon} className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Descrições ilimitadas</h3>
                    <p className="text-gray-600">Crie quantas descrições quiser para todos os seus produtos sem limites.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Templates ilimitados</h3>
                    <p className="text-gray-600">Acesse todos os templates disponíveis e personalize-os como quiser.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <BarChart2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gestão completa</h3>
                    <p className="text-gray-600">Gerencie todas as suas descrições em um só lugar com ferramentas poderosas.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Análise de SEO em tempo real</h3>
                    <p className="text-gray-600">Receba análises e diagnósticos completos de SEO enquanto escreve.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-indigo-100 absolute -top-5 -left-5 w-full h-full rounded-lg"></div>
                <img 
                  src="/assets/landing/analytics.png" 
                  alt="Dashboard analítico" 
                  className="rounded-lg shadow-md relative z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400?text=Analytics+Dashboard";
                  }}
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">{howItWorks.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{howItWorks.description}</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Economia de tempo</h3>
                    <p className="text-gray-600">Crie descrições em minutos ao invés de horas. Nossa IA faz todo o trabalho pesado.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <BarChart2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Aumento nas vendas</h3>
                    <p className="text-gray-600">Descrições otimizadas que convertem visitantes em clientes satisfeitos.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Star className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Qualidade profissional</h3>
                    <p className="text-gray-600">Algoritmos treinados para produzir textos que se equiparam aos melhores copywriters.</p>
                  </div>
                </li>
              </ul>
              
              <Button
                className="mt-8 bg-indigo-600 hover:bg-indigo-700"
                size="lg"
                onClick={() => navigate('/plans')}
              >
                Explorar plataforma
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Telas</h2>
          
          <div className="relative">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl relative">
                <img 
                  src={screenshots[activeScreenshot].image}
                  alt={screenshots[activeScreenshot].title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/800x450?text=Screenshot";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                  <p className="text-white text-lg">{screenshots[activeScreenshot].title}</p>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevScreenshot}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextScreenshot}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {screenshots.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`p-1 min-w-0 h-2 ${activeScreenshot === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                onClick={() => setActiveScreenshot(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nosso Planos de Preços</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Escolha o plano perfeito para você com 100% de satisfação garantida.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg p-8 text-gray-800 flex-1 relative ${plan.highlight ? 'transform md:-translate-y-4' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-sm font-medium">
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

      {/* Video Section */}
      <section id="video" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Vídeo sobre nosso processo de trabalho
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Entenda melhor como nossa IA cria descrições otimizadas para seus produtos e como isso pode aumentar suas vendas.
          </p>
          
          <div className="max-w-4xl mx-auto aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-gray-500 mb-4">Vídeo em breve disponível</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Receber notificação quando disponível
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testemunhos</h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <img 
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/200x200?text=User";
                    }}
                  />
                  <div className="flex mb-2">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-bold text-center">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-500 text-sm text-center">{testimonials[activeTestimonial].company}</p>
                </div>
                
                <div className="md:w-3/4 flex items-center">
                  <p className="italic text-gray-600">"{testimonials[activeTestimonial].text}"</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-white hover:bg-gray-50"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="flex justify-center gap-2 items-center">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`p-1 min-w-0 h-2 ${activeTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="bg-white hover:bg-gray-50"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">DescriçãoPRO</h3>
              <p className="mb-4">
                Descrições profissionais para e-commerce geradas por IA.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li><a href="#features" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#plans" className="hover:text-white">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
            
            <div>
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
