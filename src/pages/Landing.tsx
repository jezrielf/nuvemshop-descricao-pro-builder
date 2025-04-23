
import React from 'react';
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

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is logged in, redirect to editor
  React.useEffect(() => {
    if (user) {
      navigate('/editor');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                DescriçãoPro
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
                Descrições que <span className="text-primary">vendem</span> seu produto
              </h1>
              <p className="text-xl mb-6 text-gray-600">
                Aumente suas vendas com descrições profissionais geradas por IA para seus produtos em minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth?signup=true')}
                  className="shadow-md"
                >
                  Comece agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/plans')}
                >
                  Ver planos
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
          <h2 className="text-3xl font-bold text-center mb-4">Como funciona a plataforma</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Uma interface intuitiva para criar descrições profissionais que convertem visitantes em clientes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            
            <div className="bg-gray-50 rounded-lg p-4 border">
              <img 
                src="/assets/landing/seo-tools.png" 
                alt="Ferramentas SEO" 
                className="w-full h-auto rounded-md shadow-md border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400?text=Ferramentas+SEO";
                }}
              />
              <h3 className="text-xl font-bold mt-4 mb-2">Ferramentas de SEO</h3>
              <p className="text-gray-600">
                Análise completa de SEO para melhorar seu ranking nos motores de busca.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border">
              <img 
                src="/assets/landing/nuvemshop-integration.png" 
                alt="Integração com Nuvemshop" 
                className="w-full h-auto rounded-md shadow-md border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400?text=Integração+Nuvemshop";
                }}
              />
              <h3 className="text-xl font-bold mt-4 mb-2">Integração com e-commerce</h3>
              <p className="text-gray-600">
                Importe e exporte descrições para o Nuvemshop com apenas um clique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos exclusivos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            
            <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Análise de Keywords</h3>
              <p className="text-gray-600">
                Identificamos e incluímos as palavras-chave mais relevantes para sua categoria de produtos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Como funciona</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto text-gray-600">
            Gerar descrições profissionais nunca foi tão fácil
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cadastre seus produtos</h3>
              <p className="text-gray-600">Insira as informações básicas do seu produto</p>
              <img 
                src="/assets/landing/step1-product-info.png"
                alt="Cadastro de produtos" 
                className="mt-4 rounded-lg shadow-sm border mx-auto"
                height="150"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/300x150?text=Cadastro+de+Produtos";
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Escolha o estilo</h3>
              <p className="text-gray-600">Selecione o tom e estilo da descrição</p>
              <img 
                src="/assets/landing/step2-style-selection.png"
                alt="Seleção de estilo" 
                className="mt-4 rounded-lg shadow-sm border mx-auto"
                height="150"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/300x150?text=Seleção+de+Estilo";
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Gere a descrição</h3>
              <p className="text-gray-600">Nossa IA cria sua descrição em segundos</p>
              <img 
                src="/assets/landing/step3-ai-generation.png"
                alt="Geração de descrição" 
                className="mt-4 rounded-lg shadow-sm border mx-auto"
                height="150"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/300x150?text=Geração+de+Descrição";
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Publique</h3>
              <p className="text-gray-600">Publique ou exporte para sua loja</p>
              <img 
                src="/assets/landing/step4-publish.png"
                alt="Publicação" 
                className="mt-4 rounded-lg shadow-sm border mx-auto"
                height="150"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/300x150?text=Publicação";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar DescriçãoPro?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Melhore SEO</h3>
                <p className="text-gray-600">
                  Seja encontrado por mais clientes com descrições otimizadas para buscadores.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Consistência</h3>
                <p className="text-gray-600">
                  Mantenha um tom consistente em todas as suas descrições de produtos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/testimonials/client1.jpg" 
                  alt="Cliente" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/100x100?text=Cliente";
                  }}
                />
                <div>
                  <h4 className="font-bold">Ana Silva</h4>
                  <p className="text-gray-500 text-sm">Loja de Roupas</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Minhas vendas aumentaram 30% desde que comecei a usar o DescriçãoPro. As descrições são profissionais e atraentes."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/testimonials/client2.jpg" 
                  alt="Cliente" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/100x100?text=Cliente";
                  }}
                />
                <div>
                  <h4 className="font-bold">Carlos Mendes</h4>
                  <p className="text-gray-500 text-sm">Loja de Eletrônicos</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Economizo horas por semana com o DescriçãoPro. O sistema é simples e os resultados são incríveis."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/testimonials/client3.jpg" 
                  alt="Cliente" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/100x100?text=Cliente";
                  }}
                />
                <div>
                  <h4 className="font-bold">Mariana Costa</h4>
                  <p className="text-gray-500 text-sm">Loja de Cosméticos</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"A integração com a Nuvemshop é perfeita. Em poucos cliques tenho descrições profissionais na minha loja."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar suas descrições?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de lojistas que já aumentaram suas vendas com descrições profissionais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/auth?signup=true')}
              className="shadow-md"
            >
              Comece grátis agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/plans')}
              className="bg-white text-primary hover:bg-white/90"
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
              <h3 className="text-xl font-bold text-white mb-4">DescriçãoPro</h3>
              <p className="mb-4">
                Descrições profissionais para e-commerce geradas por IA.
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
            <p>&copy; {new Date().getFullYear()} DescriçãoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
