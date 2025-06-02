import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, RefreshCw, Edit, Eye, Trash2, Upload, Code, Palette, Sparkles } from 'lucide-react';
import { parseHtmlToBlocks } from '@/utils/htmlParsers/htmlToBlocks';

interface TemplateData {
  id: string;
  name: string;
  category: string;
  blocks: any[];
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface TemplatesByCategory {
  [category: string]: TemplateData[];
}

const categories = [
  { value: 'supplements', label: 'Suplementos' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'accessories', label: 'Acessórios' },
  { value: 'shoes', label: 'Calçados' },
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'energy', label: 'Energia' },
  { value: 'casa-decoracao', label: 'Casa e Decoração' },
  { value: 'health', label: 'Saúde' },
  { value: 'luxury', label: 'Luxo' },
  { value: 'adult', label: 'Adulto' },
  { value: 'other', label: 'Outros' },
];

// Templates premium atualizados com máximo de blocos possíveis
const createUpdatedPremiumTemplates = () => [
  {
    id: 'suplementos-premium-v2',
    name: 'Suplementos Premium',
    category: 'supplements',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Transforme Seu Corpo com Suplementos Premium',
        subheading: 'Descubra o poder dos suplementos de alta performance que vão revolucionar seus resultados e acelerar seus objetivos fitness',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        image: { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Suplementos Premium' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#0f172a', textColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Nossa Linha Premium de Suplementos',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f', alt: 'Whey Protein', caption: 'Whey Protein Isolado - 25g por dose' },
          { id: '2', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Creatina', caption: 'Creatina Monohidratada - 5g pura' },
          { id: '3', src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65', alt: 'BCAA', caption: 'BCAA Premium - Proporção 2:1:1' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '60px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        heading: 'Por que Escolher Nossos Suplementos Premium?',
        benefits: [
          { id: '1', title: 'Qualidade Farmacêutica', description: 'Ingredientes de grau farmacêutico com máxima pureza e biodisponibilidade', icon: '💊' },
          { id: '2', title: 'Resultados Comprovados', description: 'Testado e aprovado por atletas profissionais e estudos científicos', icon: '🏆' },
          { id: '3', title: 'Certificações Internacionais', description: 'Certificado pela ANVISA, FDA e com selo de pureza internacional', icon: '✅' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'imagetext-1',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Ciência e Inovação em Cada Fórmula',
        content: 'Nossos suplementos são desenvolvidos com base em pesquisas científicas de ponta, utilizando tecnologia de microencapsulamento para garantir máxima absorção e eficácia. Cada ingrediente é cuidadosamente selecionado e testado para entregar resultados superiores.',
        image: { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56', alt: 'Laboratório científico' },
        visible: true,
        columns: 'full',
        style: { padding: '60px 20px', backgroundColor: '#f1f5f9' }
      },
      {
        id: 'textimage-1',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Confiança de Milhares de Atletas',
        content: 'Mais de 50.000 atletas profissionais e entusiastas do fitness confiam em nossos produtos para alcançar seus objetivos. Desde iniciantes até campeões olímpicos, nossa linha premium oferece o suporte nutricional necessário para superar limites.',
        image: { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Atleta treinando' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Recursos',
        heading: 'Tecnologia e Inovação Premium',
        features: [
          { id: '1', title: 'Absorção Ultra-Rápida', description: 'Tecnologia de liberação controlada para máxima biodisponibilidade', icon: '⚡' },
          { id: '2', title: 'Zero Aditivos Artificiais', description: 'Fórmula limpa sem corantes, conservantes ou açúcares desnecessários', icon: '🌿' },
          { id: '3', title: 'Sabores Naturais', description: 'Desenvolvidos por especialistas em nutrição esportiva', icon: '😋' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '60px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        heading: 'Informações Técnicas Detalhadas',
        specs: [
          { id: '1', name: 'Proteína por dose', value: '25g (Whey Isolado)' },
          { id: '2', name: 'Aminoácidos essenciais', value: '12g (perfil completo)' },
          { id: '3', name: 'Creatina monohidratada', value: '5g (99.9% pura)' },
          { id: '4', name: 'BCAA proporção', value: '2:1:1 (Leucina:Isoleucina:Valina)' },
          { id: '5', name: 'Validade', value: '24 meses (lacrado)' },
          { id: '6', name: 'Origem', value: 'Estados Unidos (importado)' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem',
        image: { src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65', alt: 'Selo de Qualidade Premium' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#f1f5f9' }
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Dúvidas Mais Comuns',
        faqs: [
          { id: '1', question: 'Como e quando devo tomar os suplementos?', answer: 'Recomendamos 1 dose de Whey (30g) pós-treino, 1 dose de Creatina (5g) diariamente e BCAA durante o treino. Consulte sempre um nutricionista.' },
          { id: '2', question: 'Os suplementos têm efeitos colaterais?', answer: 'Nossos produtos são seguros quando consumidos conforme as instruções. São livres de substâncias proibidas e testados para pureza.' },
          { id: '3', question: 'Qual a diferença para outros suplementos do mercado?', answer: 'Utilizamos ingredientes premium importados, tecnologia de microencapsulamento e temos certificações internacionais de qualidade.' },
          { id: '4', question: 'Posso combinar todos os produtos?', answer: 'Sim, nossa linha foi desenvolvida para ser complementar. Recomendamos seguir as dosagens indicadas e orientação profissional.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '60px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Comece Sua Transformação Hoje!',
        description: 'Não deixe para amanhã o que você pode começar hoje. Garante já seus suplementos premium e sinta a diferença nos primeiros dias de uso.',
        buttonText: 'Comprar Agora com 25% OFF',
        buttonUrl: '#comprar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#dc2626', textColor: '#ffffff', padding: '80px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'moda-luxo-v2',
    name: 'Moda de Luxo Premium',
    category: 'clothing',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Elegância Atemporal e Sofisticação',
        subheading: 'Descubra nossa coleção exclusiva de moda luxury crafted para ocasiões especiais e momentos únicos',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#colecao',
        image: { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', alt: 'Moda de Luxo' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#111827', textColor: '#f9fafb', padding: '100px 20px' }
      },
      {
        id: 'gallery-2',
        type: 'gallery',
        title: 'Galeria da Coleção',
        heading: 'Coleção Exclusiva Outono/Inverno',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', alt: 'Vestido de Gala', caption: 'Vestido de Gala - Seda Premium' },
          { id: '2', src: 'https://images.unsplash.com/photo-1566479179817-48ba2af16e9b', alt: 'Terno Sob Medida', caption: 'Terno Sob Medida - Lã Italiana' },
          { id: '3', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b', alt: 'Acessórios de Luxo', caption: 'Acessórios - Couro Legítimo' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f9fafb' }
      },
      {
        id: 'benefits-2',
        type: 'benefits',
        title: 'Benefícios Exclusivos',
        heading: 'Por que Escolher Nossa Moda de Luxo?',
        benefits: [
          { id: '1', title: 'Materiais Nobres Importados', description: 'Tecidos premium importados da Itália e França com acabamento artesanal impecável', icon: '👑' },
          { id: '2', title: 'Design Exclusivo e Atemporal', description: 'Peças únicas desenvolvidas por estilistas renomados internacionalmente', icon: '🎨' },
          { id: '3', title: 'Personalização Completa', description: 'Serviço de alfaiataria e ajustes personalizados para o caimento perfeito', icon: '✨' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'imagetext-2',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Artesanato e Tradição em Cada Detalhe',
        content: 'Cada peça é meticulosamente confeccionada por artesãos especializados que preservam técnicas tradicionais de alta costura. Utilizamos apenas materiais nobres e sustentáveis, garantindo não apenas beleza, mas também responsabilidade ambiental e durabilidade excepcional.',
        image: { src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', alt: 'Artesão trabalhando' },
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f3f4f6' }
      },
      {
        id: 'textimage-2',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Inspiração que Transcende Gerações',
        content: 'Nossa filosofia combina herança clássica com visão contemporânea, criando peças que contam histórias e despertam emoções. Cada coleção é uma jornada através da elegância atemporal, pensada para mulheres e homens que valorizam a exclusividade e o refinamento.',
        image: { src: 'https://images.unsplash.com/photo-1521334884684-d80222895322', alt: 'Modelo elegante' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'features-2',
        type: 'features',
        title: 'Características Premium',
        heading: 'Excelência em Cada Aspecto',
        features: [
          { id: '1', title: 'Corte Sob Medida Premium', description: 'Ajuste anatômico personalizado com até 3 provas incluídas', icon: '✂️' },
          { id: '2', title: 'Sustentabilidade Certificada', description: 'Tecidos eco-friendly e processo produtivo carbono neutro', icon: '🌱' },
          { id: '3', title: 'Acabamento Artesanal', description: 'Detalhes bordados à mão e aplicações exclusivas', icon: '🖐️' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f9fafb' }
      },
      {
        id: 'specifications-2',
        type: 'specifications',
        title: 'Especificações de Materiais',
        heading: 'Composição e Cuidados Premium',
        specs: [
          { id: '1', name: 'Tecido Principal', value: 'Seda 100% natural (Mulberry)' },
          { id: '2', name: 'Forro', value: 'Algodão orgânico premium' },
          { id: '3', name: 'Acabamentos', value: 'Bordados à mão com fios nobres' },
          { id: '4', name: 'Cuidados', value: 'Lavagem a seco especializada' },
          { id: '5', name: 'Origem', value: 'Ateliê em Milão, Itália' },
          { id: '6', name: 'Garantia', value: '2 anos para defeitos de fabricação' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'image-2',
        type: 'image',
        title: 'Certificação de Luxo',
        image: { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', alt: 'Certificado de Autenticidade' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f4f6' }
      },
      {
        id: 'faq-2',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Informações Importantes',
        faqs: [
          { id: '1', question: 'Como funciona o processo de medição sob medida?', answer: 'Agendamos uma consulta presencial em nosso ateliê onde um especialista fará as medições precisas e discutirá preferências de estilo.' },
          { id: '2', question: 'Qual o prazo para entrega de peças sob medida?', answer: 'Peças sob medida levam de 4 a 8 semanas, dependendo da complexidade. Peças prontas são entregues em até 3 dias úteis.' },
          { id: '3', question: 'Vocês fazem ajustes após a entrega?', answer: 'Sim, oferecemos ajustes gratuitos por até 30 dias após a entrega para garantir o caimento perfeito.' },
          { id: '4', question: 'As peças possuem certificado de autenticidade?', answer: 'Todas as peças vêm com certificado de autenticidade e cartão de cuidados personalizados.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f9fafb' }
      },
      {
        id: 'cta-2',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Eleve Seu Estilo ao Próximo Nível',
        description: 'Agende uma consulta exclusiva em nosso ateliê e descubra como a moda de luxo pode transformar não apenas seu visual, mas sua confiança.',
        buttonText: 'Agendar Consulta Exclusiva',
        buttonUrl: '#agendar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1f2937', textColor: '#f9fafb', padding: '100px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'acessorios-premium-v2',
    name: 'Acessórios Premium Collection',
    category: 'accessories',
    blocks: [
      {
        id: 'hero-3',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Acessórios que Definem Personalidade',
        subheading: 'Descubra nossa coleção exclusiva de acessórios premium que elevam qualquer look com sofisticação e autenticidade',
        buttonText: 'Descobrir Coleção',
        buttonUrl: '#colecao',
        image: { src: 'https://images.unsplash.com/photo-1503602642458-232111445657', alt: 'Acessórios Premium' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#0c0a09', textColor: '#fafaf9', padding: '100px 20px' }
      },
      {
        id: 'gallery-3',
        type: 'gallery',
        title: 'Galeria Premium',
        heading: 'Coleção Signature 2024',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt: 'Relógio de Luxo', caption: 'Relógio Swiss Made - Movimento Automático' },
          { id: '2', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', alt: 'Óculos Premium', caption: 'Óculos Artesanais - Acetato Italiano' },
          { id: '3', src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91', alt: 'Jóias Exclusivas', caption: 'Joias Autorais - Ouro 18k' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'benefits-3',
        type: 'benefits',
        title: 'Benefícios Exclusivos',
        heading: 'Por que Escolher Nossos Acessórios Premium?',
        benefits: [
          { id: '1', title: 'Design Autoral e Exclusivo', description: 'Peças únicas desenvolvidas por designers premiados internacionalmente', icon: '🎨' },
          { id: '2', title: 'Materiais Nobres Certificados', description: 'Ouro, prata, couro legítimo e pedras preciosas com certificado de origem', icon: '💎' },
          { id: '3', title: 'Versatilidade Premium', description: 'Combina perfeitamente com qualquer estilo, do casual ao formal', icon: '🔄' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'imagetext-3',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Artesanato e Tecnologia em Harmonia',
        content: 'Cada acessório é uma obra de arte funcional, onde tradição artesanal encontra inovação tecnológica. Nossos mestres artesãos utilizam técnicas centenárias combinadas com ferramentas de precisão para criar peças que transcendem tendências e se tornam clássicos atemporais.',
        image: { src: 'https://images.unsplash.com/photo-1503602642458-232111445657', alt: 'Processo artesanal' },
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f5f5f4' }
      },
      {
        id: 'textimage-3',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Cada Peça Conta uma História',
        content: 'Nossos acessórios não são apenas complementos, são extensões da sua personalidade. Criados para acompanhar momentos especiais da vida, desde reuniões importantes até celebrações íntimas, cada peça carrega o peso da excelência e a leveza da beleza autêntica.',
        image: { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', alt: 'Acessório em uso' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'features-3',
        type: 'features',
        title: 'Características Premium',
        heading: 'Excelência em Cada Detalhe',
        features: [
          { id: '1', title: 'Acabamento Artesanal Superior', description: 'Polimento manual e detalhes gravados com precisão microscópica', icon: '🖐️' },
          { id: '2', title: 'Resistência e Durabilidade', description: 'Materiais tratados contra oxidação e desgaste com garantia estendida', icon: '🔧' },
          { id: '3', title: 'Design Contemporâneo Atemporal', description: 'Estética moderna que permanece relevante através dos anos', icon: '🆕' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'specifications-3',
        type: 'specifications',
        title: 'Especificações Técnicas',
        heading: 'Informações Detalhadas de Qualidade',
        specs: [
          { id: '1', name: 'Material Principal', value: 'Aço inoxidável 316L e couro italiano' },
          { id: '2', name: 'Acabamento', value: 'PVD Gold / Polimento espelhado' },
          { id: '3', name: 'Resistência', value: 'Água até 50m / Anti-riscos' },
          { id: '4', name: 'Movimento (Relógios)', value: 'Suíço automático / 42h reserva' },
          { id: '5', name: 'Garantia', value: '2 anos internacional' },
          { id: '6', name: 'Origem', value: 'Suíça / Itália' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'image-3',
        type: 'image',
        title: 'Certificações',
        image: { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91', alt: 'Selos de Qualidade' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#f5f5f4' }
      },
      {
        id: 'faq-3',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Informações Importantes',
        faqs: [
          { id: '1', question: 'Como cuidar adequadamente dos acessórios?', answer: 'Fornecemos kit de limpeza especializado e manual detalhado. Recomendamos limpeza semanal com produtos específicos inclusos.' },
          { id: '2', question: 'Os acessórios são adequados para uso diário?', answer: 'Sim, são projetados para resistir ao uso cotidiano mantendo a beleza original. Todos possuem tratamentos anti-desgaste.' },
          { id: '3', question: 'Existe serviço de manutenção?', answer: 'Oferecemos manutenção gratuita no primeiro ano e serviço técnico especializado com peças originais.' },
          { id: '4', question: 'Como verificar a autenticidade?', answer: 'Cada peça possui número de série único e QR code para verificação de autenticidade em nosso site.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'cta-3',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Defina Seu Estilo Único',
        description: 'Descubra como nossos acessórios premium podem transformar sua presença e expressar sua personalidade de forma autêntica e sofisticada.',
        buttonText: 'Explorar Coleção Completa',
        buttonUrl: '#colecao',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#78716c', textColor: '#fafaf9', padding: '100px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'calcados-premium',
    name: 'Calçados Premium Collection',
    category: 'shoes',
    blocks: [
      {
        id: 'hero-4',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Calçados que Elevam Sua Jornada',
        subheading: 'Descubra nossa coleção de calçados premium onde conforto excepcional encontra design sofisticado para todos os momentos da sua vida',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#colecao',
        image: { src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772', alt: 'Calçados Premium' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1c1917', textColor: '#fafaf9', padding: '100px 20px' }
      },
      {
        id: 'gallery-4',
        type: 'gallery',
        title: 'Galeria de Calçados',
        heading: 'Coleção Artesanal 2024',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772', alt: 'Sapato Social', caption: 'Oxford Premium - Couro Legítimo' },
          { id: '2', src: 'https://images.unsplash.com/photo-1551107696-a4b57a7739ce', alt: 'Tênis Luxury', caption: 'Tênis Artesanal - Linha Sport' },
          { id: '3', src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', alt: 'Bota Premium', caption: 'Bota Chelsea - Linha Heritage' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'benefits-4',
        type: 'benefits',
        title: 'Benefícios Premium',
        heading: 'Por que Escolher Nossos Calçados?',
        benefits: [
          { id: '1', title: 'Conforto Anatômico Superior', description: 'Palmilhas ortopédicas desenvolvidas com tecnologia NASA para máximo conforto', icon: '👟' },
          { id: '2', title: 'Couro Premium Certificado', description: 'Couro legítimo de origem controlada com curtimento ecológico premium', icon: '🐄' },
          { id: '3', title: 'Artesanato Tradicional', description: 'Costurados à mão por mestres sapateiros com técnicas centenárias', icon: '🔨' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'imagetext-4',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Tradição Familiar de Excelência',
        content: 'Há mais de 80 anos nossa família dedica-se à arte da sapataria premium. Cada par é meticulosamente construído por artesãos especializados que preservam técnicas tradicionais europeias, combinando-as com tecnologia moderna para criar calçados que duram gerações.',
        image: { src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772', alt: 'Artesão trabalhando' },
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f5f5f4' }
      },
      {
        id: 'textimage-4',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Ciência do Conforto Premium',
        content: 'Desenvolvemos tecnologia própria de amortecimento que distribui uniformemente o peso corporal, reduzindo impacto e fadiga. Nossos calçados são testados por podólogos e atletas, garantindo que cada passo seja uma experiência de conforto excepcional.',
        image: { src: 'https://images.unsplash.com/photo-1551107696-a4b57a7739ce', alt: 'Tecnologia de conforto' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'features-4',
        type: 'features',
        title: 'Características Técnicas',
        heading: 'Inovação em Cada Detalhe',
        features: [
          { id: '1', title: 'Sistema de Ventilação', description: 'Microfuros invisíveis que permitem respirabilidade natural do pé', icon: '💨' },
          { id: '2', title: 'Sola Anti-Fadiga', description: 'Tecnologia de retorno de energia que reduz cansaço em 40%', icon: '⚡' },
          { id: '3', title: 'Impermeabilização Natural', description: 'Tratamento especial que repele água mantendo a respirabilidade', icon: '☔' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'specifications-4',
        type: 'specifications',
        title: 'Especificações Premium',
        heading: 'Detalhes Técnicos e Materiais',
        specs: [
          { id: '1', name: 'Material Superior', value: 'Couro bovino premium full grain' },
          { id: '2', name: 'Forro', value: 'Couro de cabra natural respirável' },
          { id: '3', name: 'Palmilha', value: 'Memory foam + gel anti-impacto' },
          { id: '4', name: 'Solado', value: 'Borracha natural + EVA composto' },
          { id: '5', name: 'Costura', value: 'Dupla costura à mão reforçada' },
          { id: '6', name: 'Garantia', value: '3 anos contra defeitos' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'image-4',
        type: 'image',
        title: 'Certificação Artesanal',
        image: { src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', alt: 'Selo de Qualidade Artesanal' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#f5f5f4' }
      },
      {
        id: 'faq-4',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Informações Importantes',
        faqs: [
          { id: '1', question: 'Como escolher o tamanho ideal?', answer: 'Oferecemos guia de medidas personalizado e serviço de consultoria virtual para garantir o ajuste perfeito. Trocas gratuitas por até 60 dias.' },
          { id: '2', question: 'Os calçados são adequados para uso prolongado?', answer: 'Sim, são projetados para conforto duradouro. Testados por profissionais que ficam em pé mais de 8 horas diárias.' },
          { id: '3', question: 'Como fazer a manutenção adequada?', answer: 'Incluímos kit completo de cuidados e oferecemos serviço de restauração profissional anual gratuito no primeiro ano.' },
          { id: '4', question: 'Existe programa de fidelidade?', answer: 'Sim, clientes recebem pontos a cada compra e têm acesso a lançamentos exclusivos e descontos especiais.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#fafaf9' }
      },
      {
        id: 'cta-4',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Caminhe com Confiança e Estilo',
        description: 'Invista em calçados que acompanham sua jornada com conforto excepcional e elegância duradoura. Seus pés merecem o melhor.',
        buttonText: 'Encontrar Meu Calçado Ideal',
        buttonUrl: '#colecao',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#44403c', textColor: '#fafaf9', padding: '100px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'casa-decoracao-premium',
    name: 'Casa e Decoração Premium',
    category: 'casa-decoracao',
    blocks: [
      {
        id: 'hero-5',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Transforme Sua Casa em um Lar de Sonhos',
        subheading: 'Descubra nossa coleção exclusiva de decoração premium que transforma ambientes em espaços únicos e acolhedores',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#colecao',
        image: { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', alt: 'Decoração Premium' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#0f172a', textColor: '#f8fafc', padding: '100px 20px' }
      },
      {
        id: 'gallery-5',
        type: 'gallery',
        title: 'Galeria de Ambientes',
        heading: 'Ambientes Inspiradores 2024',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', alt: 'Sala de Estar', caption: 'Sala de Estar Moderna - Linha Signature' },
          { id: '2', src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', alt: 'Quarto Premium', caption: 'Quarto Master - Coleção Dreams' },
          { id: '3', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136', alt: 'Cozinha Gourmet', caption: 'Cozinha Gourmet - Linha Chef' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'benefits-5',
        type: 'benefits',
        title: 'Benefícios Exclusivos',
        heading: 'Por que Escolher Nossa Decoração Premium?',
        benefits: [
          { id: '1', title: 'Design Autoral Exclusivo', description: 'Peças únicas desenvolvidas por designers renomados internacionalmente', icon: '🎨' },
          { id: '2', title: 'Materiais Sustentáveis Premium', description: 'Madeira certificada, tecidos orgânicos e acabamentos eco-friendly', icon: '🌿' },
          { id: '3', title: 'Projeto Personalizado Completo', description: 'Consultoria decorativa completa com render 3D e acompanhamento', icon: '📐' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'imagetext-5',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Ambientes que Contam Sua História',
        content: 'Cada peça da nossa coleção é cuidadosamente selecionada para criar ambientes que refletem personalidade e estilo de vida. Combinamos funcionalidade excepcional com estética sofisticada, criando espaços que inspiram e acolhem, transformando cada ambiente em uma extensão genuína de quem você é.',
        image: { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', alt: 'Ambiente personalizado' },
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f1f5f9' }
      },
      {
        id: 'textimage-5',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Sustentabilidade e Elegância Unidos',
        content: 'Nossa filosofia combina responsabilidade ambiental com design excepcional. Utilizamos apenas materiais certificados e processos eco-friendly, garantindo que a beleza dos seus ambientes não comprometa o futuro do planeta. Cada peça carrega o selo de sustentabilidade sem abrir mão da sofisticação.',
        image: { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', alt: 'Materiais sustentáveis' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'features-5',
        type: 'features',
        title: 'Características Premium',
        heading: 'Excelência em Cada Ambiente',
        features: [
          { id: '1', title: 'Consultoria Especializada', description: 'Arquitetos e designers dedicados para criar seu projeto ideal', icon: '👥' },
          { id: '2', title: 'Instalação Profissional', description: 'Equipe técnica especializada com garantia total de acabamento', icon: '🔧' },
          { id: '3', title: 'Pós-Venda Premium', description: 'Manutenção e cuidados especializados para vida longa das peças', icon: '⭐' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'specifications-5',
        type: 'specifications',
        title: 'Especificações de Materiais',
        heading: 'Qualidade em Cada Detalhe',
        specs: [
          { id: '1', name: 'Madeiras', value: 'Freijó, Nogueira e Carvalho certificados' },
          { id: '2', name: 'Tecidos', value: 'Algodão orgânico e linho premium' },
          { id: '3', name: 'Acabamentos', value: 'Verniz ecológico UV e óleos naturais' },
          { id: '4', name: 'Metais', value: 'Aço inox escovado e bronze patinado' },
          { id: '5', name: 'Garantia', value: '5 anos para estrutura e acabamentos' },
          { id: '6', name: 'Certificações', value: 'FSC, GREENGUARD e ISO 14001' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'image-5',
        type: 'image',
        title: 'Selos de Qualidade',
        image: { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136', alt: 'Certificações Ambientais' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#f1f5f9' }
      },
      {
        id: 'faq-5',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Informações sobre Nossos Serviços',
        faqs: [
          { id: '1', question: 'Como funciona a consultoria de decoração?', answer: 'Oferecemos consulta inicial gratuita, levantamento das necessidades, projeto 3D personalizado e acompanhamento completo da execução.' },
          { id: '2', question: 'Qual o prazo para entrega e montagem?', answer: 'Móveis sob medida: 30-45 dias. Peças prontas: 7-15 dias. Agendamos montagem conforme sua disponibilidade.' },
          { id: '3', question: 'Vocês trabalham com financiamento?', answer: 'Sim, oferecemos parcelamento em até 24x sem juros e financiamento bancário com condições especiais.' },
          { id: '4', question: 'Existe garantia para os móveis e instalação?', answer: 'Garantia de 5 anos para estrutura, 2 anos para acabamentos e 1 ano para instalação com manutenção gratuita.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f8fafc' }
      },
      {
        id: 'cta-5',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Realize o Lar dos Seus Sonhos',
        description: 'Agende uma consulta gratuita e descubra como podemos transformar seus ambientes em espaços únicos que refletem sua personalidade.',
        buttonText: 'Agendar Consulta Gratuita',
        buttonUrl: '#agendar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1e40af', textColor: '#f8fafc', padding: '100px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'liquidificador-gem-v2',
    name: 'Liquidificador Gem Blend Pro',
    category: 'electronics',
    blocks: [
      {
        id: 'hero-6',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Gem Blend Pro - Revolução na Sua Cozinha',
        subheading: 'O liquidificador mais potente e versátil do mercado, com tecnologia alemã e design premium para chefs exigentes',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        image: { src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Liquidificador Gem Blend Pro' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1e3a8a', textColor: '#f0f9ff', padding: '100px 20px' }
      },
      {
        id: 'gallery-6',
        type: 'gallery',
        title: 'Galeria do Produto',
        heading: 'Tecnologia e Design Premium',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Gem Blend Pro', caption: 'Design Premium - Aço Escovado' },
          { id: '2', src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Motor Potente', caption: 'Motor 1500W - Tecnologia Alemã' },
          { id: '3', src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Lâminas Premium', caption: 'Lâminas Titanium - Ultra Resistentes' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f0f9ff' }
      },
      {
        id: 'benefits-6',
        type: 'benefits',
        title: 'Benefícios Premium',
        heading: 'Por que o Gem Blend Pro é Superior?',
        benefits: [
          { id: '1', title: 'Potência Excepcional 1500W', description: 'Motor alemão de alta performance que tritura qualquer ingrediente', icon: '⚡' },
          { id: '2', title: 'Design Compacto Premium', description: 'Ocupa 40% menos espaço mantendo máxima capacidade', icon: '📐' },
          { id: '3', title: 'Limpeza Automática', description: 'Sistema de auto-limpeza em 30 segundos', icon: '🧼' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'imagetext-6',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Tecnologia Alemã de Última Geração',
        content: 'O Gem Blend Pro incorpora décadas de engenharia alemã de precisão. Seu motor de 1500W com refrigeração inteligente garante performance constante mesmo no uso intensivo. O sistema de lâminas em titanium foi projetado para durar décadas mantendo a eficiência original.',
        image: { src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Tecnologia alemã' },
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#eff6ff' }
      },
      {
        id: 'textimage-6',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Versatilidade para Chefs Profissionais',
        content: 'Com 12 velocidades pré-programadas e 5 programas automáticos, o Gem Blend Pro atende desde smoothies delicados até preparos profissionais. Sua jarra de 2.2L em tritan livre de BPA suporta líquidos quentes até 80°C, permitindo preparar sopas cremosas diretamente no liquidificador.',
        image: { src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Chef profissional' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'features-6',
        type: 'features',
        title: 'Recursos Inovadores',
        heading: 'Tecnologia que Faz a Diferença',
        features: [
          { id: '1', title: 'Controle Digital Touch', description: 'Painel digital sensível ao toque com 12 programas pré-definidos', icon: '📱' },
          { id: '2', title: 'Jarra Dupla Função', description: 'Tritan premium para frio e vidro temperado para preparos quentes', icon: '🍶' },
          { id: '3', title: 'Sistema Anti-Vibração', description: 'Base com absorção de impacto para operação silenciosa', icon: '🔇' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '80px 20px', backgroundColor: '#f0f9ff' }
      },
      {
        id: 'specifications-6',
        type: 'specifications',
        title: 'Especificações Técnicas',
        heading: 'Detalhes Técnicos Profissionais',
        specs: [
          { id: '1', name: 'Potência', value: '1500W (motor alemão)' },
          { id: '2', name: 'Capacidade', value: '2.2L (jarra principal)' },
          { id: '3', name: 'Velocidades', value: '12 + 5 programas automáticos' },
          { id: '4', name: 'Lâminas', value: '6 lâminas em titanium' },
          { id: '5', name: 'Peso', value: '4.2kg (base estável)' },
          { id: '6', name: 'Garantia', value: '3 anos (motor) + 1 ano (acessórios)' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'image-6',
        type: 'image',
        title: 'Certificações de Qualidade',
        image: { src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Selos de Qualidade Internacional' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#eff6ff' }
      },
      {
        id: 'faq-6',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Informações Importantes sobre o Produto',
        faqs: [
          { id: '1', question: 'O Gem Blend Pro funciona em 110V e 220V?', answer: 'Sim, possui chave seletora automática (bivolt) que se adapta automaticamente à voltagem da sua casa.' },
          { id: '2', question: 'Qual a garantia e o que ela cobre?', answer: 'Garantia de 3 anos para motor, 1 ano para acessórios. Cobertura total contra defeitos de fabricação e assistência técnica nacional.' },
          { id: '3', question: 'Posso lavar todas as peças na lava-louças?', answer: 'Sim, jarra, tampa e lâminas são totalmente compatíveis com lava-louças. A base deve ser limpa apenas com pano úmido.' },
          { id: '4', question: 'O liquidificador faz muito barulho?', answer: 'O sistema anti-vibração reduz o ruído em 60% comparado a modelos convencionais, operando com apenas 75dB.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '80px 20px', backgroundColor: '#f0f9ff' }
      },
      {
        id: 'cta-6',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Revolucione Sua Cozinha Hoje!',
        description: 'Não perca a oportunidade de ter o liquidificador mais avançado do mercado. Garantia estendida e frete grátis para todo o Brasil.',
        buttonText: 'Comprar com 30% OFF',
        buttonUrl: '#comprar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1d4ed8', textColor: '#f0f9ff', padding: '100px 20px', textAlign: 'center' }
      }
    ]
  }
];

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [templatesByCategory, setTemplatesByCategory] = useState<TemplatesByCategory>({});
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('other');
  const [formHtml, setFormHtml] = useState('');
  const [formDescription, setFormDescription] = useState('');
  
  const { toast } = useToast();

  const loadTemplates = async () => {
    try {
      setLoading(true);
      console.log('Carregando templates do Supabase...');
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        console.error('Usuário não autenticado');
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para ver os templates",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar templates:', error);
        throw error;
      }

      console.log('Templates carregados do banco:', data?.length || 0);

      const formattedTemplates: TemplateData[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setTemplates(formattedTemplates);

      // Agrupar templates por categoria
      const grouped = formattedTemplates.reduce((acc: TemplatesByCategory, template) => {
        const category = template.category || 'other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});

      setTemplatesByCategory(grouped);
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates. Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const seedPremiumTemplates = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      console.log('Iniciando atualização completa dos templates...');

      // Deletar todos os templates existentes
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Deletar todos

      if (deleteError) {
        console.error('Erro ao deletar templates:', deleteError);
      } else {
        console.log('Templates antigos removidos com sucesso');
      }

      // Inserir novos templates premium atualizados
      const updatedTemplates = createUpdatedPremiumTemplates();
      
      for (const template of updatedTemplates) {
        const { error } = await supabase
          .from('templates')
          .insert({
            name: template.name,
            category: template.category,
            blocks: template.blocks as any,
            user_id: session.session.user.id
          } as any);

        if (error) {
          console.error('Erro ao inserir template:', template.name, error);
        } else {
          console.log('Template criado:', template.name);
        }
      }

      toast({
        title: "✨ Atualização Completa Realizada!",
        description: `${updatedTemplates.length} templates premium com máximo de blocos foram criados com sucesso!`
      });

      await loadTemplates();
    } catch (error) {
      console.error('Erro ao atualizar templates:', error);
      toast({
        title: "Erro",
        description: "Erro na atualização dos templates",
        variant: "destructive"
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData?.label || category;
  };

  const handleCreate = async () => {
    if (!formName.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Usuário não autenticado');
      }

      let blocks = [];
      
      if (formHtml.trim()) {
        try {
          blocks = parseHtmlToBlocks(formHtml);
        } catch (htmlError) {
          console.error('Erro ao converter HTML:', htmlError);
          toast({
            title: "Aviso",
            description: "Não foi possível converter o HTML. Template criado sem blocos.",
            variant: "default"
          });
        }
      }

      const { data, error } = await supabase
        .from('templates')
        .insert({
          name: formName.trim(),
          category: formCategory,
          blocks: blocks as any,
          user_id: sessionData.session.user.id
        } as any)
        .select()
        .single();

      if (error) throw error;

      setFormName('');
      setFormCategory('other');
      setFormHtml('');
      setFormDescription('');
      setCreateDialogOpen(false);
      
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template criado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao criar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar template",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (template: TemplateData) => {
    setSelectedTemplate(template);
    setFormName(template.name);
    setFormCategory(template.category);
    setFormHtml('');
    setFormDescription('');
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedTemplate || !formName.trim()) return;

    try {
      let blocksToUpdate = selectedTemplate.blocks;
      
      if (formHtml.trim()) {
        try {
          blocksToUpdate = parseHtmlToBlocks(formHtml);
        } catch (htmlError) {
          console.error('Erro ao converter HTML:', htmlError);
        }
      }

      const { error } = await supabase
        .from('templates')
        .update({
          name: formName.trim(),
          category: formCategory,
          blocks: blocksToUpdate,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      setFormName('');
      setFormCategory('other');
      setFormHtml('');
      setFormDescription('');
      setEditDialogOpen(false);
      setSelectedTemplate(null);
      
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template atualizado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao atualizar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar template",
        variant: "destructive"
      });
    }
  };

  const handleView = (template: TemplateData) => {
    setSelectedTemplate(template);
    setViewDialogOpen(true);
  };

  const handleDelete = (template: TemplateData) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      setDeleteDialogOpen(false);
      setSelectedTemplate(null);
      
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template excluído com sucesso"
      });
    } catch (error) {
      console.error('Erro ao deletar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir template",
        variant: "destructive"
      });
    }
  };

  const totalTemplates = templates.length;
  const categoriesCount = Object.keys(templatesByCategory).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span>Templates Premium Collection</span>
          </h1>
          <p className="text-muted-foreground">
            Gerencie os templates premium com máximo de blocos ({totalTemplates} templates em {categoriesCount} categorias)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={loadTemplates}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            onClick={seedPremiumTemplates}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Implementar Atualização Completa
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p>Carregando templates...</p>
            </div>
          </CardContent>
        </Card>
      ) : totalTemplates === 0 ? (
        <Card className="border-2 border-dashed border-purple-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nenhum template encontrado</h3>
                <p className="text-muted-foreground">
                  Clique em "Implementar Atualização Completa" para gerar os novos templates premium.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Novos Templates Premium:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Suplementos Premium (10 blocos completos)</li>
                  <li>• Moda de Luxo Premium (10 blocos completos)</li>
                  <li>• Acessórios Premium Collection (10 blocos completos)</li>
                  <li>• Calçados Premium Collection (10 blocos completos)</li>
                  <li>• Casa e Decoração Premium (10 blocos completos)</li>
                  <li>• Liquidificador Gem Blend Pro (10 blocos completos)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <Card key={category} className="border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-purple-600" />
                      <span>{getCategoryLabel(category)}</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {categoryTemplates.length} templates
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Templates premium com máximo de blocos para {getCategoryLabel(category)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-purple-800">{template.name}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {template.blocks?.length || 0} blocos
                            </Badge>
                            <div className="flex items-center text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Premium
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600 bg-white/70 p-3 rounded-lg">
                            <strong>Estrutura completa:</strong> Banner, Galeria, Benefícios, Imagem+Texto, Texto+Imagem, Recursos, Especificações, Imagem, FAQ, CTA
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-purple-600 font-medium">
                              ✨ Sistema de colunas configurável para todos os blocos
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleView(template)}
                                className="text-purple-600 hover:bg-purple-100"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(template)}
                                className="text-blue-600 hover:bg-blue-100"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(template)}
                                className="text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Template Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Template</DialogTitle>
            <DialogDescription>
              Crie um novo template do zero ou importe de HTML
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Template Suplementos Premium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="html">Importar HTML</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Descreva o template..."
                    rows={3}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  O template será criado vazio e você poderá adicionar blocos no editor principal.
                </p>
              </TabsContent>
              
              <TabsContent value="html" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="html">Código HTML</Label>
                  <Textarea
                    id="html"
                    value={formHtml}
                    onChange={(e) => setFormHtml(e.target.value)}
                    placeholder="Cole o código HTML aqui..."
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  O HTML será automaticamente convertido em blocos estruturados.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate}>
              <Upload className="h-4 w-4 mr-2" />
              Criar Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Template</DialogTitle>
            <DialogDescription>
              Edite as informações do template ou atualize com novo HTML
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Template</Label>
              <Input
                id="edit-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Template Suplementos Premium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-html">Atualizar com HTML (opcional)</Label>
              <Textarea
                id="edit-html"
                value={formHtml}
                onChange={(e) => setFormHtml(e.target.value)}
                placeholder="Cole novo código HTML para substituir os blocos existentes..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Deixe vazio para manter os blocos existentes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Template Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Template</DialogTitle>
            <DialogDescription>
              Detalhes do template selecionado
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm">{selectedTemplate.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <div className="mt-1">
                    <Badge variant="secondary">{getCategoryLabel(selectedTemplate.category)}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">ID</label>
                <p className="text-sm font-mono">{selectedTemplate.id}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Criado por</label>
                <p className="text-sm">{selectedTemplate.user_id || 'Sistema'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Blocos ({selectedTemplate.blocks?.length || 0})
                </label>
                <div className="mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
                  {selectedTemplate.blocks && selectedTemplate.blocks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTemplate.blocks.map((block: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{block.type || 'Tipo desconhecido'}</span>
                          <Badge variant="outline" className="text-xs">
                            {block.title || `Bloco ${index + 1}`}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum bloco definido</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Template Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span>Excluir Template</span>
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O template será permanentemente removido do sistema.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">{selectedTemplate.name}</p>
                <p className="text-sm text-muted-foreground">Categoria: {getCategoryLabel(selectedTemplate.category)}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.blocks?.length || 0} blocos
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
