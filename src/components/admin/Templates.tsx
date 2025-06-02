import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { TemplatesList } from './templates/TemplatesList';
import { CreateTemplateDialog } from './templates/CreateTemplateDialog';
import { EditTemplateDialog } from './templates/EditTemplateDialog';
import { DeleteTemplateDialog } from './templates/DeleteTemplateDialog';
import { ViewTemplateDialog } from './templates/ViewTemplateDialog';
import { RefreshCw, Plus, Sparkles } from 'lucide-react';

const premiumTemplates: Omit<Template, "id">[] = [
  {
    name: "Suplementos Premium",
    category: "supplements",
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        heading: "Potencialize Seus Resultados com Suplementos Premium",
        subheading: "Transforme seu corpo e sua performance com nossa linha exclusiva de suplementos de alta qualidade, desenvolvidos com tecnologia avançada e ingredientes cientificamente comprovados.",
        buttonText: "Comprar Agora",
        buttonUrl: "#comprar",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#1a1a2e",
          color: "#ffffff",
          padding: "60px 20px",
          textAlign: "center"
        }
      },
      {
        id: "gallery-1",
        type: "gallery",
        title: "Nossa Linha Premium",
        images: [
          { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", alt: "Whey Protein Premium", caption: "Whey Protein Isolado" },
          { url: "https://images.unsplash.com/photo-1594736797933-d0400eb4eca0?w=400", alt: "Creatina Premium", caption: "Creatina Monohidratada" },
          { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", alt: "BCAA Premium", caption: "BCAA 2:1:1" }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f8f9fa",
          padding: "50px 20px"
        }
      },
      {
        id: "benefits-1",
        type: "benefits",
        title: "Benefícios Exclusivos",
        benefits: [
          {
            title: "Resultados Rápidos",
            description: "Veja mudanças em apenas 30 dias com nossa fórmula avançada",
            icon: "⚡"
          },
          {
            title: "Qualidade Premium",
            description: "Ingredientes importados e certificações internacionais",
            icon: "🏆"
          },
          {
            title: "Suporte Completo",
            description: "Acompanhamento nutricional gratuito por 6 meses",
            icon: "💪"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "imageText-1",
        type: "imageText",
        title: "Tecnologia Avançada",
        content: "Nossos suplementos utilizam tecnologia de absorção rápida e bioativos de última geração. Cada produto é desenvolvido em laboratórios certificados, garantindo máxima eficácia e segurança para atletas profissionais e entusiastas do fitness.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        imageAlt: "Laboratório de suplementos",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f1f5f9",
          padding: "50px 20px"
        }
      },
      {
        id: "textImage-1",
        type: "textImage",
        title: "Certificações e Qualidade",
        content: "Todos os nossos produtos possuem certificação internacional ISO 9001, FDA aprovado e testados por laboratórios independentes. Nossa commitment com a excelência garante que você receba apenas o melhor em suplementação esportiva.",
        imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600",
        imageAlt: "Certificações de qualidade",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "features-1",
        type: "features",
        title: "Recursos Únicos",
        features: [
          {
            title: "Absorção Ultra-Rápida",
            description: "Tecnologia de micronização para absorção em até 15 minutos",
            icon: "🚀"
          },
          {
            title: "Zero Açúcar",
            description: "Fórmulas livres de açúcar e adoçantes artificiais prejudiciais",
            icon: "🌿"
          }
        ],
        columns: 2,
        visible: true,
        style: {
          backgroundColor: "#f8f9fa",
          padding: "50px 20px"
        }
      },
      {
        id: "specifications-1",
        type: "specifications",
        title: "Especificações Técnicas",
        specifications: [
          { label: "Proteína por dose", value: "30g" },
          { label: "Aminoácidos essenciais", value: "18 tipos" },
          { label: "Tempo de absorção", value: "15-30 minutos" },
          { label: "Sabores disponíveis", value: "12 opções" },
          { label: "Certificações", value: "FDA, ISO 9001, ANVISA" }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "40px 20px"
        }
      },
      {
        id: "image-1",
        type: "image",
        title: "Resultados Comprovados",
        imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800",
        imageAlt: "Antes e depois - resultados reais",
        caption: "Transformações reais de nossos clientes em 90 dias",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f1f5f9",
          padding: "40px 20px",
          textAlign: "center"
        }
      },
      {
        id: "faq-1",
        type: "faq",
        title: "Perguntas Frequentes",
        faqs: [
          {
            question: "Como tomar os suplementos?",
            answer: "Recomendamos tomar 1 dose 30 minutos antes do treino e 1 dose até 30 minutos após o treino para máximos resultados."
          },
          {
            question: "É seguro para iniciantes?",
            answer: "Sim, todos os nossos produtos são seguros para iniciantes. Recomendamos começar com doses menores e aumentar gradualmente."
          },
          {
            question: "Tem garantia?",
            answer: "Oferecemos garantia de 60 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
          }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "cta-1",
        type: "cta",
        heading: "Transforme Seu Corpo Hoje Mesmo!",
        content: "Não perca mais tempo com suplementos comuns. Experimente nossa linha premium e sinta a diferença já na primeira semana. <strong>Garantia de resultados ou seu dinheiro de volta!</strong>",
        buttonText: "Comprar Agora com Desconto",
        buttonUrl: "#checkout",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#dc2626",
          color: "#ffffff",
          padding: "60px 20px",
          textAlign: "center"
        }
      }
    ],
    user_id: undefined
  },
  {
    name: "Moda de Luxo Premium",
    category: "clothing",
    blocks: [
      {
        id: "hero-2",
        type: "hero",
        heading: "Elegância Atemporal, Estilo Incomparável",
        subheading: "Descubra nossa coleção exclusiva de peças de alta costura, criadas por designers renomados com materiais nobres e acabamento impecável. Cada peça conta uma história de sofisticação e exclusividade.",
        buttonText: "Ver Coleção",
        buttonUrl: "#colecao",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "80px 20px",
          textAlign: "center"
        }
      },
      {
        id: "gallery-2",
        type: "gallery",
        title: "Coleção Exclusiva",
        images: [
          { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", alt: "Vestido de Gala", caption: "Vestido de Gala Exclusivo" },
          { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", alt: "Terno Italiano", caption: "Terno Italiano Sob Medida" },
          { url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400", alt: "Casaco de Cashmere", caption: "Casaco de Cashmere Premium" }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f9f9f9",
          padding: "60px 20px"
        }
      },
      {
        id: "benefits-2",
        type: "benefits",
        title: "Exclusividade Premium",
        benefits: [
          {
            title: "Peças Limitadas",
            description: "Coleções limitadas de até 50 peças por modelo mundial",
            icon: "💎"
          },
          {
            title: "Sob Medida",
            description: "Ajuste personalizado com nossos alfaiates especialistas",
            icon: "✂️"
          },
          {
            title: "Materiais Nobres",
            description: "Tecidos importados da Itália, França e Inglaterra",
            icon: "🏛️"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "imageText-2",
        type: "imageText",
        title: "Artesania Italiana",
        content: "Cada peça é confeccionada em ateliês exclusivos na Itália, seguindo técnicas tradicionais passadas de geração em geração. Nossos artesãos especialistas dedicam em média 40 horas para cada peça, garantindo acabamento impecável e durabilidade excepcional.",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
        imageAlt: "Ateliê de costura italiano",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f8f8f8",
          padding: "60px 20px"
        }
      },
      {
        id: "textImage-2",
        type: "textImage",
        title: "Design Exclusivo",
        content: "Nossos designers trabalham com as principais casas de moda europeias para criar peças únicas que combinam tradição e inovação. Cada coleção é inspirada em tendências globais e adaptada para o gosto refinado brasileiro.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
        imageAlt: "Design de moda exclusivo",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "features-2",
        type: "features",
        title: "Diferenciais Únicos",
        features: [
          {
            title: "Tecidos Exclusivos",
            description: "Materiais desenvolvidos especialmente para nossa marca",
            icon: "🧵"
          },
          {
            title: "Atendimento VIP",
            description: "Personal shopper exclusivo e atendimento domiciliar",
            icon: "👔"
          },
          {
            title: "Garantia Vitalícia",
            description: "Manutenção e ajustes gratuitos por toda vida da peça",
            icon: "♾️"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f9f9f9",
          padding: "60px 20px"
        }
      },
      {
        id: "specifications-2",
        type: "specifications",
        title: "Especificações Premium",
        specifications: [
          { label: "Origem dos tecidos", value: "Itália, França, Inglaterra" },
          { label: "Tempo de confecção", value: "35-45 dias" },
          { label: "Prova de roupa", value: "3 provas incluídas" },
          { label: "Garantia", value: "Vitalícia" },
          { label: "Exclusividade", value: "Máximo 50 peças por modelo" }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "image-2",
        type: "image",
        title: "Showroom Exclusivo",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        imageAlt: "Showroom de luxo",
        caption: "Visite nosso showroom exclusivo no Jardins - São Paulo",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f8f8f8",
          padding: "50px 20px",
          textAlign: "center"
        }
      },
      {
        id: "faq-2",
        type: "faq",
        title: "Perguntas Frequentes",
        faqs: [
          {
            question: "Como funciona o processo de medição?",
            answer: "Nosso alfaiate vai até você para tomar as medidas em 3 sessões: inicial, primeira prova e ajuste final."
          },
          {
            question: "Qual o prazo de entrega?",
            answer: "O prazo varia de 35 a 45 dias úteis, dependendo da complexidade da peça e acabamentos escolhidos."
          },
          {
            question: "Posso personalizar os acabamentos?",
            answer: "Sim, oferecemos mais de 50 opções de acabamentos, botões, forros e bordados personalizados."
          }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "cta-2",
        type: "cta",
        heading: "Vista-se com Exclusividade",
        content: "Faça parte do seleto grupo de pessoas que vestem peças únicas. Agende sua consulta personalizada e descubra o verdadeiro significado de <strong>elegância sob medida</strong>.",
        buttonText: "Agendar Consulta VIP",
        buttonUrl: "#agendamento",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          padding: "70px 20px",
          textAlign: "center"
        }
      }
    ],
    user_id: undefined
  },
  {
    name: "Acessórios Premium Collection",
    category: "accessories",
    blocks: [
      {
        id: "hero-3",
        type: "hero",
        heading: "Acessórios que Definem Seu Estilo",
        subheading: "Coleção exclusiva de acessórios premium feitos com materiais nobres e design atemporal. Cada peça é cuidadosamente selecionada para complementar seu guarda-roupa com sofisticação e elegância.",
        buttonText: "Explorar Coleção",
        buttonUrl: "#colecao",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#2c3e50",
          color: "#ffffff",
          padding: "70px 20px",
          textAlign: "center"
        }
      },
      {
        id: "gallery-3",
        type: "gallery",
        title: "Coleção Premium",
        images: [
          { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", alt: "Relógio de Luxo", caption: "Relógio Suíço Automático" },
          { url: "https://images.unsplash.com/photo-1506629905589-4b9b856ae2f1?w=400", alt: "Bolsa de Couro", caption: "Bolsa de Couro Italiano" },
          { url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", alt: "Óculos Designer", caption: "Óculos de Sol Designer" }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f7f8fc",
          padding: "60px 20px"
        }
      },
      {
        id: "benefits-3",
        type: "benefits",
        title: "Qualidade Premium",
        benefits: [
          {
            title: "Materiais Nobres",
            description: "Couro italiano, metais preciosos e cristais naturais",
            icon: "💍"
          },
          {
            title: "Design Exclusivo",
            description: "Peças desenvolvidas por designers internacionais",
            icon: "🎨"
          },
          {
            title: "Edição Limitada",
            description: "Coleções limitadas com certificado de autenticidade",
            icon: "🏆"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "imageText-3",
        type: "imageText",
        title: "Tradição e Inovação",
        content: "Nossos acessórios combinam técnicas tradicionais de artesania com tecnologia moderna. Cada bolsa é costurada à mão por artesãos especializados, enquanto nossos relógios utilizam movimentos suíços de precisão, garantindo qualidade excepcional.",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        imageAlt: "Artesão trabalhando com couro",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f9f9f9",
          padding: "60px 20px"
        }
      },
      {
        id: "textImage-3",
        type: "textImage",
        title: "Sustentabilidade Premium",
        content: "Comprometidos com práticas sustentáveis, nossos couros são provenientes de curtumes certificados que seguem padrões ambientais rigorosos. Cada peça é feita para durar gerações, reduzindo o impacto ambiental e promovendo o consumo consciente.",
        imageUrl: "https://images.unsplash.com/photo-1506629905589-4b9b856ae2f1?w=600",
        imageAlt: "Processo sustentável de produção",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "features-3",
        type: "features",
        title: "Características Únicas",
        features: [
          {
            title: "Couro Full Grain",
            description: "O mais nobre tipo de couro, que envelhece com beleza",
            icon: "🐄"
          },
          {
            title: "Hardware Dourado",
            description: "Ferragens banhadas a ouro 18k resistentes ao tempo",
            icon: "✨"
          }
        ],
        columns: 2,
        visible: true,
        style: {
          backgroundColor: "#f7f8fc",
          padding: "60px 20px"
        }
      },
      {
        id: "specifications-3",
        type: "specifications",
        title: "Especificações Técnicas",
        specifications: [
          { label: "Tipo de couro", value: "Full Grain Italiano" },
          { label: "Hardware", value: "Ouro 18k e Prata 925" },
          { label: "Garantia", value: "5 anos" },
          { label: "Certificação", value: "Sustentabilidade LWG" },
          { label: "Origem", value: "Itália e Suíça" }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "image-3",
        type: "image",
        title: "Detalhe dos Acabamentos",
        imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800",
        imageAlt: "Detalhes dos acabamentos premium",
        caption: "Cada detalhe reflete nossa busca pela perfeição",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f9f9fc",
          padding: "50px 20px",
          textAlign: "center"
        }
      },
      {
        id: "faq-3",
        type: "faq",
        title: "Perguntas Frequentes",
        faqs: [
          {
            question: "Como cuidar dos acessórios de couro?",
            answer: "Recomendamos limpeza com produtos específicos para couro e armazenamento em local seco. Fornecemos kit de cuidados gratuito."
          },
          {
            question: "Os relógios são à prova d'água?",
            answer: "Sim, nossos relógios possuem resistência à água de até 100 metros, ideais para uso diário e natação."
          },
          {
            question: "Há garantia internacional?",
            answer: "Sim, nossa garantia é válida em mais de 50 países através de nossa rede de parceiros autorizados."
          }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "cta-3",
        type: "cta",
        heading: "Eleve Seu Estilo ao Próximo Nível",
        content: "Invista em acessórios que durarão para sempre. Nossa coleção premium oferece peças atemporais que se valorizam com o tempo. <strong>Compre agora e ganhe frete grátis para todo Brasil.</strong>",
        buttonText: "Comprar Agora",
        buttonUrl: "#comprar",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#2c3e50",
          color: "#ffffff",
          padding: "70px 20px",
          textAlign: "center"
        }
      }
    ],
    user_id: undefined
  },
  {
    name: "Liquidificador Gem Blend Pro",
    category: "casa-decoracao",
    blocks: [
      {
        id: "hero-4",
        type: "hero",
        heading: "Gem Blend Pro - Tecnologia Alemã na Sua Cozinha",
        subheading: "O liquidificador mais potente e silencioso do mercado. Motor alemão de 2200W, lâminas de titânio e tecnologia de redução de ruído para resultados profissionais em casa.",
        buttonText: "Comprar Agora",
        buttonUrl: "#comprar",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#1e3a8a",
          color: "#ffffff",
          padding: "70px 20px",
          textAlign: "center"
        }
      },
      {
        id: "gallery-4",
        type: "gallery",
        title: "Gem Blend Pro em Detalhes",
        images: [
          { url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400", alt: "Gem Blend Pro", caption: "Design Premium" },
          { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", alt: "Lâminas de Titânio", caption: "Lâminas de Titânio" },
          { url: "https://images.unsplash.com/photo-1571167934228-f4238437cd53?w=400", alt: "Painel Digital", caption: "Painel Touch Digital" }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f0f9ff",
          padding: "60px 20px"
        }
      },
      {
        id: "benefits-4",
        type: "benefits",
        title: "Por Que Escolher o Gem Blend Pro",
        benefits: [
          {
            title: "Potência Superior",
            description: "Motor alemão de 2200W para resultados profissionais",
            icon: "⚡"
          },
          {
            title: "Ultra Silencioso",
            description: "Tecnologia de redução de ruído até 75% mais silencioso",
            icon: "🔇"
          },
          {
            title: "Durabilidade Extrema",
            description: "Lâminas de titânio com garantia de 10 anos",
            icon: "💎"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "imageText-4",
        type: "imageText",
        title: "Tecnologia Alemã de Ponta",
        content: "Desenvolvido na Alemanha com os mais altos padrões de qualidade, o Gem Blend Pro possui motor de indução de 2200W que garante potência constante mesmo nos ingredientes mais duros. Sua tecnologia de redução de ruído permite uso a qualquer hora sem incomodar.",
        imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600",
        imageAlt: "Motor alemão de alta potência",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f8fafc",
          padding: "60px 20px"
        }
      },
      {
        id: "textImage-4",
        type: "textImage",
        title: "Design Inteligente e Funcional",
        content: "Com painel touch digital de 10 velocidades pré-programadas e função pulse, o Gem Blend Pro oferece controle total sobre seus preparos. Jarra de tritam livre de BPA com capacidade de 2 litros e design ergonômico para fácil manuseio e armazenamento.",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        imageAlt: "Painel digital inteligente",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "features-4",
        type: "features",
        title: "Recursos Avançados",
        features: [
          {
            title: "Programas Automáticos",
            description: "10 programas pré-definidos para diferentes preparos",
            icon: "🤖"
          },
          {
            title: "Auto-Limpeza",
            description: "Função de limpeza automática em 30 segundos",
            icon: "🧽"
          },
          {
            title: "Proteção Térmica",
            description: "Sistema de proteção contra superaquecimento",
            icon: "🛡️"
          }
        ],
        columns: 3,
        visible: true,
        style: {
          backgroundColor: "#f0f9ff",
          padding: "60px 20px"
        }
      },
      {
        id: "specifications-4",
        type: "specifications",
        title: "Especificações Técnicas",
        specifications: [
          { label: "Potência", value: "2200W Motor Alemão" },
          { label: "Velocidades", value: "10 + Função Pulse" },
          { label: "Capacidade", value: "2 litros" },
          { label: "Material das lâminas", value: "Titânio" },
          { label: "Nível de ruído", value: "Máximo 65dB" },
          { label: "Voltagem", value: "Bivolt automático" },
          { label: "Garantia", value: "10 anos para lâminas, 3 anos motor" }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "50px 20px"
        }
      },
      {
        id: "image-4",
        type: "image",
        title: "Resultado Profissional",
        imageUrl: "https://images.unsplash.com/photo-1571167934228-f4238437cd53?w=800",
        imageAlt: "Smoothies e preparos profissionais",
        caption: "Smoothies cremosos, sopas quentes e gelo triturado em segundos",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#f8fafc",
          padding: "50px 20px",
          textAlign: "center"
        }
      },
      {
        id: "faq-4",
        type: "faq",
        title: "Perguntas Frequentes",
        faqs: [
          {
            question: "O Gem Blend Pro tritura gelo?",
            answer: "Sim! As lâminas de titânio trituram gelo em segundos, criando drinks e smoothies perfeitos."
          },
          {
            question: "É seguro para uso diário?",
            answer: "Absolutamente. Possui proteção térmica e sistema de segurança que impede funcionamento sem a jarra."
          },
          {
            question: "Como funciona a garantia?",
            answer: "10 anos para lâminas de titânio e 3 anos para motor, com assistência técnica em todo Brasil."
          },
          {
            question: "Qual o consumo de energia?",
            answer: "Apesar dos 2200W de potência, o consumo é eficiente devido ao motor alemão de alta tecnologia."
          }
        ],
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#ffffff",
          padding: "60px 20px"
        }
      },
      {
        id: "cta-4",
        type: "cta",
        heading: "Leve a Cozinha Profissional Para Casa",
        content: "O Gem Blend Pro está com <strong>40% de desconto</strong> por tempo limitado. Não perca a chance de ter o liquidificador mais avançado do mercado com frete grátis e garantia estendida.",
        buttonText: "Comprar com Desconto",
        buttonUrl: "#promocao",
        columns: "full",
        visible: true,
        style: {
          backgroundColor: "#dc2626",
          color: "#ffffff",
          padding: "70px 20px",
          textAlign: "center"
        }
      }
    ],
    user_id: undefined
  }
];

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'delete' | 'view' | null>(null);
  const { toast } = useToast();

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      setTemplates(formattedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleImplementFullUpdate = async () => {
    try {
      setLoading(true);
      
      // Primeiro, deletar todos os templates existentes
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteError) {
        console.warn('Erro ao deletar templates existentes:', deleteError);
      }

      // Inserir os novos templates premium
      const { error: insertError } = await supabase
        .from('templates')
        .insert(premiumTemplates.map(template => ({
          name: template.name,
          category: template.category,
          blocks: template.blocks
        })));

      if (insertError) throw insertError;

      toast({
        title: "✨ Atualização Completa Implementada!",
        description: `${premiumTemplates.length} templates premium foram criados com sucesso.`,
      });

      // Recarregar templates
      await loadTemplates();
    } catch (error) {
      console.error('Error implementing full update:', error);
      toast({
        title: "Erro na Atualização",
        description: "Erro ao implementar a atualização completa dos templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('edit');
  };

  const handleView = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('view');
  };

  const handleDelete = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('delete');
  };

  const handleCreate = () => {
    setDialogType('create');
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setSelectedTemplate(null);
  };

  const handleTemplateUpdated = () => {
    loadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template atualizado com sucesso",
    });
  };

  const handleTemplateCreated = () => {
    loadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template criado com sucesso",
    });
  };

  const handleTemplateDeleted = () => {
    loadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template deletado com sucesso",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Templates</h1>
          <p className="text-muted-foreground">
            Gerencie os templates disponíveis para os usuários
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={handleImplementFullUpdate}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? 'Implementando...' : 'Implementar Atualização Completa'}
          </Button>
          <Button onClick={loadTemplates} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Templates Disponíveis</CardTitle>
          <CardDescription>
            Lista de todos os templates criados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemplatesList
            templates={templates}
            loading={loading}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateTemplateDialog
        open={dialogType === 'create'}
        onOpenChange={handleCloseDialog}
        onTemplateCreated={handleTemplateCreated}
      />

      {selectedTemplate && (
        <>
          <EditTemplateDialog
            open={dialogType === 'edit'}
            onOpenChange={handleCloseDialog}
            template={selectedTemplate}
            onTemplateUpdated={handleTemplateUpdated}
          />
          
          <DeleteTemplateDialog
            open={dialogType === 'delete'}
            onOpenChange={handleCloseDialog}
            template={selectedTemplate}
            onTemplateDeleted={handleTemplateDeleted}
          />
          
          <ViewTemplateDialog
            open={dialogType === 'view'}
            onOpenChange={handleCloseDialog}
            template={selectedTemplate}
          />
        </>
      )}
    </div>
  );
};
