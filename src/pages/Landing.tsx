import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight,
  Sparkles,
  BarChart2,
  Search,
  RefreshCw,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Dynamic icon mapping
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className={className} />,
    BarChart2: <BarChart2 className={className} />,
    Search: <Search className={className} />,
    RefreshCw: <RefreshCw className={className} />,
    Zap: <Zap className={className} />,
    ShieldCheck: <ShieldCheck className={className} />
  };

  return <>{icons[name] || <Sparkles className={className} />}</>;
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

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

  // Default values if content is not loaded
  const hero = content.hero || {
    title: 'Descrições que vendem seu produto',
    subtitle: 'Aumente suas vendas com descrições profissionais geradas por IA para seus produtos em minutos.',
    cta_primary: 'Comece agora',
    cta_secondary: 'Ver planos'
  };

  const features = content.features || {
    title: 'Como funciona a plataforma',
    description: 'Uma interface intuitiva para criar descrições profissionais que convertem visitantes em clientes',
    items: []
  };

  const exclusiveFeatures = content.exclusive_features || {
    title: 'Recursos exclusivos',
    items: []
  };

  const howItWorks = content.how_it_works || {
    title: 'Como funciona',
    description: 'Gerar descrições profissionais nunca foi tão fácil',
    steps: []
  };

  const benefits = content.benefits || {
    title: 'Por que usar DescriçãoPro?',
    items: []
  };

  const testimonials = content.testimonials || {
    title: 'O que nossos clientes dizem',
    items: []
  };

  const cta = content.cta || {
    title: 'Pronto para transformar suas descrições?',
    description: 'Junte-se a centenas de lojistas que já aumentaram suas vendas com descrições profissionais.',
    cta_primary: 'Comece grátis agora',
    cta_secondary: 'Ver planos'
  };

  const footer = content.footer || {
    main_text: 'Descrições profissionais para e-commerce geradas por IA.',
    company_name: 'DescriçãoPro',
    copyright: 'Todos os direitos reservados'
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                {footer.company_name || "DescriçãoPRO"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {user ? (
                <Button 
                  onClick={() => navigate('/editor')}
                  className="px-4"
                >
                  Ir para Editor
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/auth')}
                    className="px-4"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth?signup=true')}
                    className="px-4"
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {hero.title?.includes('vendem') ? (
                  <>
                    Descrições que <span className="text-primary">vendem</span> seu produto
                  </>
                ) : hero.title}
              </h1>
              <p className="text-xl mb-6 text-gray-600">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth?signup=true')}
                  className="shadow-md"
                >
                  {hero.cta_primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/plans')}
                >
                  {hero.cta_secondary}
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="/assets/landing/editor-showcase.png" 
                alt="DescriçãoPro Editor" 
                className="rounded-lg shadow-lg border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400?text=Editor+do+DescricaoPro";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Screenshots */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{features.title}</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            {features.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.items && features.items.length > 0 ? (
              features.items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto rounded-md shadow-md border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400?text=" + encodeURIComponent(item.title || "Feature");
                    }}
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))
            ) : (
              // Fallback feature items if none exist in database
              <>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <img 
                    src="/assets/landing/editor-interface.png" 
                    alt="Interface do editor" 
                    className="w-full h-auto rounded-md shadow-md border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400?text=Interface+do+Editor";
                    }}
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">Editor intuitivo</h3>
                  <p className="text-gray-600">
                    Interface simples e intuitiva para criar descrições ricas sem conhecimento técnico.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <img 
                    src="/assets/landing/ai-generator.png" 
                    alt="Gerador de IA" 
                    className="w-full h-auto rounded-md shadow-md border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400?text=Gerador+de+IA";
                    }}
                  />
                  <h3 className="text-xl font-bold mt-4 mb-2">Gerador por IA</h3>
                  <p className="text-gray-600">
                    Nossa IA cria descrições otimizadas para SEO adaptadas ao seu tipo de produto.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{exclusiveFeatures.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exclusiveFeatures.items && exclusiveFeatures.items.length > 0 ? (
              exclusiveFeatures.items.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <DynamicIcon name={item.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))
            ) : (
              // Fallback features if none exist in database
              <>
                <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Geração por IA</h3>
                  <p className="text-gray-600">
                    Descrições profissionais criadas por inteligência artificial especializada em copywriting.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Otimização SEO</h3>
                  <p className="text-gray-600">
                    Melhore seu ranking nos motores de busca com descrições otimizadas para SEO.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{howItWorks.title}</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto text-gray-600">
            {howItWorks.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.steps && howItWorks.steps.length > 0 ? (
              // Sort steps by number
              [...howItWorks.steps]
                .sort((a, b) => a.number - b.number)
                .map((step: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <img 
                      src={step.image}
                      alt={step.title} 
                      className="mt-4 rounded-lg shadow-sm border mx-auto"
                      height="150"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/300x150?text=${encodeURIComponent(step.title || "Step")}`;
                      }}
                    />
                  </div>
                ))
            ) : (
              // Fallback steps if none exist in database
              <>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cadastre seus produtos</h3>
                  <p className="text-gray-600">Insira as informações básicas do seu produto</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Escolha o estilo</h3>
                  <p className="text-gray-600">Selecione o tom e estilo da descrição</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{benefits.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.items && benefits.items.length > 0 ? (
              benefits.items.map((item: any, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <DynamicIcon name={item.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback benefits if none exist in database
              <>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Economize tempo</h3>
                    <p className="text-gray-600">
                      Crie descrições em minutos, não em horas. Nosso sistema automatiza todo o processo.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Aumente conversões</h3>
                    <p className="text-gray-600">
                      Descrições persuasivas que convertam visitantes em clientes.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{testimonials.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.items && testimonials.items.length > 0 ? (
              testimonials.items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/100x100?text=Cliente";
                      }}
                    />
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">{item.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{item.text}"</p>
                </div>
              ))
            ) : (
              // Fallback testimonials if none exist in database
              <>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gray-300"></div>
                    <div>
                      <h4 className="font-bold">Ana Silva</h4>
                      <p className="text-gray-500 text-sm">Loja de Roupas</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"Minhas vendas aumentaram 30% desde que comecei a usar o DescriçãoPro."</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gray-300"></div>
                    <div>
                      <h4 className="font-bold">Carlos Mendes</h4>
                      <p className="text-gray-500 text-sm">Loja de Eletrônicos</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"Economizo horas por semana com o DescriçãoPro."</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/auth?signup=true')}
              className="shadow-md"
            >
              {cta.cta_primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/plans')}
              className="bg-white text-primary hover:bg-white/90"
            >
              {cta.cta_secondary}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{footer.company_name}</h3>
              <p className="mb-4">
                {footer.main_text}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li><a href="/plans" className="hover:text-white">Planos</a></li>
                <li><a href="/auth" className="hover:text-white">Entrar</a></li>
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
            <p>&copy; {new Date().getFullYear()} {footer.company_name}. {footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
