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
  Layout,
  Target,
  Zap,
  TrendingUp,
  Award,
  Users,
  ThumbsUp,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Compare } from '@/components/ui/compare';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is logged in, redirect to editor
  useEffect(() => {
    if (user) {
      navigate('/editor');
    }
  }, [user, navigate]);

  const testimonials = [
    {
      name: 'Ana Silva',
      company: 'Moda Online',
      text: 'As descrições otimizadas ajudaram nossa loja a vender muito mais. Textos prontos, bem escritos e que realmente atraem clientes.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b789',
      rating: 5
    },
    {
      name: 'Carlos Mendes',
      company: 'Tech Store',
      text: 'Economizei muito tempo. Antes eu travava para escrever, agora tudo é rápido e direto.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      rating: 5
    },
    {
      name: 'Marina Costa',
      company: 'Fashion Store',
      text: 'Os templates são incríveis. O estilo do texto é perfeito para minha loja. Super recomendo.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rating: 5
    }
  ];

  const stats = [
    { value: '50.000+', label: 'Descrições Criadas' },
    { value: '5.000+', label: 'Usuários Ativos' },
    { value: '98%', label: 'Satisfação' },
    { value: '200%', label: 'Aumento nas Vendas' }
  ];

  const features = [
    {
      icon: <Layout className="h-6 w-6 md:h-8 md:w-8" />,
      title: 'Templates profissionais para e-commerce',
      description: 'Opções prontas para diferentes nichos, como moda, tecnologia, casa e saúde.'
    },
    {
      icon: <BarChart2 className="h-6 w-6 md:h-8 md:w-8" />,
      title: 'SEO estruturado para ranqueamento no Google',
      description: 'Otimização completa para seus produtos aparecerem no topo das buscas.'
    },
    {
      icon: <Zap className="h-6 w-6 md:h-8 md:w-8" />,
      title: 'Editor simples e rápido',
      description: 'Escreva, edite e publique descrições com poucos cliques.'
    },
    {
      icon: <Target className="h-6 w-6 md:h-8 md:w-8" />,
      title: 'Organização completa',
      description: 'Gerencie todas as suas descrições em um único lugar.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 md:h-8 md:w-8" />,
      title: 'Resultados comprovados',
      description: 'Clientes relatam aumento de até 200% nas vendas após otimizar suas descrições.'
    }
  ];

  const resources = [
    {
      icon: <Layout className="h-5 w-5" />,
      title: 'Templates prontos para diversos segmentos'
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: 'SEO estruturado para ranqueamento no Google'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Editor intuitivo e fácil de usar'
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: 'Dashboard completo para organização das descrições'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Criação rápida: economize tempo e ganhe eficiência'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Aumento nas vendas com descrições bem elaboradas'
    }
  ];

  const plans = [
    {
      name: 'Grátis',
      price: '0',
      period: '/mês',
      features: [
        '3 descrições por mês',
        'Templates básicos',
        'SEO básico',
        'Suporte por e-mail'
      ],
      cta: 'Começar Grátis',
      highlight: false
    },
    {
      name: 'Premium',
      price: '79,90',
      period: '/mês',
      features: [
        'Descrições ilimitadas',
        'Todos os templates premium',
        'Estrutura completa e otimizada',
        'Suporte prioritário e chat exclusivo',
        'Aumento de vendas comprovado'
      ],
      cta: 'Assinar Premium',
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/f6cadb24-e515-45e4-93b9-6d5abf46919d.png" 
                alt="DescriçãoPRO Logo"
                className="h-8 w-auto mr-3"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors">Funcionalidades</a>
              <a href="#plans" className="text-gray-600 hover:text-violet-600 transition-colors">Planos</a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600 transition-colors">Depoimentos</a>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <Button 
                  onClick={() => navigate('/editor')}
                  className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
                >
                  Ir para Editor
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/auth')}
                    className="border-violet-200 text-violet-600 hover:bg-violet-50"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth?signup=true')}
                    className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
                  >
                    Registrar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors">Funcionalidades</a>
                <a href="#plans" className="text-gray-600 hover:text-violet-600 transition-colors">Planos</a>
                <a href="#testimonials" className="text-gray-600 hover:text-violet-600 transition-colors">Depoimentos</a>
                {user ? (
                  <Button 
                    onClick={() => navigate('/editor')}
                    className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 w-full"
                  >
                    Ir para Editor
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/auth')}
                      className="border-violet-200 text-violet-600 hover:bg-violet-50 w-full"
                    >
                      Entrar
                    </Button>
                    <Button 
                      onClick={() => navigate('/auth?signup=true')}
                      className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 w-full"
                    >
                      Registrar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <BackgroundBeamsWithCollision className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {"Transforme Suas Descrições de Produtos em Máquinas de Vendas"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Crie descrições otimizadas para SEO, que atraem mais clientes e ajudam sua loja a vender mais. 
              Ganhe tempo e destaque seus produtos com descrições profissionais de qualidade.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8 md:mb-12 px-4"
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/auth?signup=true')}
                className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Começar Agora Gratuitamente
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative max-w-4xl mx-auto px-4"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border border-violet-100">
                <img 
                  src="/lovable-uploads/b276bca5-ec90-4f48-abdd-dabdc77f5c67.png"
                  alt="DescriçãoPRO - Editor de descrições de produtos"
                  className="w-full h-auto rounded-lg md:rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Why Choose Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-white to-violet-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Por que o DescriçãoPRO é a Melhor Escolha?
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Diga Adeus às Descrições Sem Graça – Crie Textos que Vendem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100 group hover:border-violet-200"
              >
                <div className="bg-gradient-to-br from-violet-100 to-pink-100 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-violet-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Veja a Diferença</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Compare descrições antigas com as otimizadas pelo DescriçãoPRO
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-violet-200 w-full max-w-4xl">
              <Compare
                firstImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                secondImage="https://images.unsplash.com/photo-1556742111-a301076d9d18"
                firstImageClassName="object-cover object-left-top"
                secondImageClassname="object-cover object-left-top"
                className="h-48 w-full sm:h-64 md:h-80 lg:h-96"
                slideMode="hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="features" className="py-12 md:py-24 bg-gradient-to-b from-violet-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Recursos do DescriçãoPRO</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Tudo o que você precisa para criar descrições profissionais em minutos:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center p-3 md:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-violet-100"
              >
                <div className="bg-gradient-to-br from-violet-100 to-pink-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4 text-violet-600 flex-shrink-0">
                  {resource.icon}
                </div>
                <span className="font-medium text-gray-900 text-sm md:text-base">{resource.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Depoimentos de Clientes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white to-violet-50 p-6 md:p-8 rounded-2xl shadow-lg border border-violet-100"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-3 md:mr-4 border-2 border-violet-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-violet-600 font-medium text-xs md:text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-12 md:py-24 bg-gradient-to-b from-violet-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">Planos de Preço</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Escolha o plano ideal para sua loja:
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 flex-1 relative ${
                  plan.highlight 
                    ? 'border-violet-500 bg-gradient-to-br from-white to-violet-50' 
                    : 'border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 md:px-6 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                      Mais Popular
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline mb-4 md:mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">R${plan.price}</span>
                  <span className="text-gray-500 ml-1 text-sm md:text-base">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => navigate('/auth?signup=true')}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-violet-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Resultados que Comprovam</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">{stat.value}</div>
                <div className="text-violet-100 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(108, 0, 162)"
        gradientBackgroundEnd="rgb(0, 17, 82)"
        firstColor="18, 113, 255"
        secondColor="221, 74, 255"
        thirdColor="100, 220, 255"
        containerClassName="py-12 md:py-24"
      >
        <div className="absolute z-50 inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Pronto para Vender Mais?
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Não perca mais tempo com descrições que não geram resultados.<br className="hidden sm:block" />
              Com o DescriçãoPRO, você cria textos profissionais, otimizados e prontos para aumentar suas vendas.<br className="hidden sm:block" />
              Comece agora – é grátis.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                size="lg"
                onClick={() => navigate('/auth?signup=true')}
                className="bg-white text-violet-600 hover:bg-gray-100 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Começar Agora Gratuitamente
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-3 md:mb-4">
                <img 
                  src="/lovable-uploads/f6cadb24-e515-45e4-93b9-6d5abf46919d.png" 
                  alt="DescriçãoPRO Logo"
                  className="h-8 w-auto mr-3"
                />
              </div>
              <p className="text-gray-400 mb-3 md:mb-4 max-w-md text-sm md:text-base">
                Descrições profissionais para e-commerce.
              </p>
              <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                <p>contato@descricaopro.com</p>
                <p>+55 31 99453-4410</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Links</h4>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#plans" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Legal</h4>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-sm md:text-base">&copy; 2025 DescriçãoPRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
