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
import { Plus, RefreshCw, Edit, Eye, Trash2, Upload, Code, Palette } from 'lucide-react';
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

// Templates premium com máximo de blocos
const createPremiumTemplates = () => [
  {
    id: 'suplementos-premium',
    name: 'Suplementos Premium',
    category: 'supplements',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Potencialize seus Resultados',
        subheading: 'Descubra o poder dos suplementos premium que vão revolucionar seu treino',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        image: { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Suplementos' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#1a1a2e', textColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Conheça Nossa Linha Premium',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f', alt: 'Whey Protein', caption: 'Whey Protein Isolado' },
          { id: '2', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Creatina', caption: 'Creatina Pura' },
          { id: '3', src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65', alt: 'BCAA', caption: 'BCAA Premium' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        heading: 'Por que Escolher Nossos Suplementos?',
        benefits: [
          { id: '1', title: 'Qualidade Premium', description: 'Ingredientes de alta qualidade importados', icon: '⭐' },
          { id: '2', title: 'Resultados Comprovados', description: 'Testado por atletas profissionais', icon: '🏆' },
          { id: '3', title: 'Certificações', description: 'Certificado pela ANVISA e FDA', icon: '✅' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#f8f9fa', padding: '40px 20px' }
      },
      {
        id: 'imagetext-1',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Ciência por Trás dos Resultados',
        content: 'Nossos suplementos são desenvolvidos com base em pesquisas científicas avançadas, garantindo máxima absorção e eficácia. Cada fórmula é cuidadosamente balanceada para potencializar seus resultados.',
        image: { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56', alt: 'Laboratório' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'textimage-1',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Atletas Confiam em Nós',
        content: 'Mais de 10.000 atletas profissionais e amadores confiam em nossos produtos para alcançar seus objetivos. Seja você iniciante ou profissional, temos o suplemento ideal para sua jornada.',
        image: { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', alt: 'Atleta' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Recursos',
        heading: 'Características Exclusivas',
        features: [
          { id: '1', title: 'Absorção Rápida', description: 'Tecnologia de micro-encapsulamento', icon: '⚡' },
          { id: '2', title: 'Zero Açúcar', description: 'Fórmula sem açúcares adicionados', icon: '🚫' },
          { id: '3', title: 'Sabor Premium', description: 'Sabores desenvolvidos por especialistas', icon: '😋' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        heading: 'Informações Técnicas',
        specs: [
          { id: '1', name: 'Proteína por dose', value: '25g' },
          { id: '2', name: 'Aminoácidos essenciais', value: '12g' },
          { id: '3', name: 'Validade', value: '24 meses' },
          { id: '4', name: 'Origem', value: 'Estados Unidos' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#f8f9fa', padding: '40px 20px' }
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem',
        image: { src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65', alt: 'Selo de Qualidade' },
        visible: true,
        columns: 'full',
        style: { padding: '20px', textAlign: 'center' }
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Dúvidas Frequentes',
        faqs: [
          { id: '1', question: 'Como devo tomar o suplemento?', answer: 'Recomendamos 1 dose (30g) misturada em 300ml de água, preferencialmente pós-treino.' },
          { id: '2', question: 'Há efeitos colaterais?', answer: 'Nossos produtos são seguros quando consumidos conforme as instruções. Consulte um nutricionista.' },
          { id: '3', question: 'Qual a diferença para outros produtos?', answer: 'Utilizamos ingredientes premium e tecnologia avançada de absorção.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Transforme Seu Treino Hoje!',
        description: 'Não perca tempo! Garante já o seu suplemento premium e sinta a diferença nos primeiros dias.',
        buttonText: 'Comprar Agora com 20% OFF',
        buttonUrl: '#comprar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ff6b35', textColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'moda-luxo',
    name: 'Moda de Luxo',
    category: 'luxury',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Elegância Atemporal',
        subheading: 'Descubra a coleção exclusiva de moda luxury para ocasiões especiais',
        buttonText: 'Ver Coleção',
        buttonUrl: '#colecao',
        image: { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', alt: 'Moda Luxo' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#000000', textColor: '#ffffff', padding: '80px 20px' }
      },
      {
        id: 'gallery-2',
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Coleção Exclusiva',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', alt: 'Vestido Exclusivo', caption: 'Vestido de Gala' },
          { id: '2', src: 'https://images.unsplash.com/photo-1566479179817-48ba2af16e9b', alt: 'Terno Premium', caption: 'Terno Sob Medida' },
          { id: '3', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b', alt: 'Acessórios', caption: 'Acessórios de Luxo' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '50px 20px', backgroundColor: '#f8f9fa' }
      },
      {
        id: 'benefits-2',
        type: 'benefits',
        title: 'Benefícios',
        heading: 'Por que Escolher Nossa Moda de Luxo?',
        benefits: [
          { id: '1', title: 'Materiais Nobres', description: 'Tecidos importados e acabamento impecável', icon: '💎' },
          { id: '2', title: 'Design Exclusivo', description: 'Peças únicas e sofisticadas', icon: '🎨' },
          { id: '3', title: 'Conforto e Estilo', description: 'Moda que une elegância e conforto', icon: '✨' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'imagetext-2',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Detalhes que Encantam',
        content: 'Cada peça é cuidadosamente confeccionada para garantir qualidade e exclusividade. Descubra os detalhes que fazem a diferença em nossa coleção.',
        image: { src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', alt: 'Detalhes da roupa' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'textimage-2',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Moda que Inspira',
        content: 'Inspire-se com nossas coleções que combinam tradição e modernidade, pensadas para quem busca exclusividade e bom gosto.',
        image: { src: 'https://images.unsplash.com/photo-1521334884684-d80222895322', alt: 'Modelo elegante' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#f0f0f0', padding: '40px 20px' }
      },
      {
        id: 'features-2',
        type: 'features',
        title: 'Recursos',
        heading: 'Destaques da Coleção',
        features: [
          { id: '1', title: 'Corte Sob Medida', description: 'Ajuste perfeito para seu corpo', icon: '✂️' },
          { id: '2', title: 'Tecidos Sustentáveis', description: 'Compromisso com o meio ambiente', icon: '🌿' },
          { id: '3', title: 'Acabamento Manual', description: 'Detalhes feitos à mão', icon: '🖐️' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'specifications-2',
        type: 'specifications',
        title: 'Especificações',
        heading: 'Informações Técnicas',
        specs: [
          { id: '1', name: 'Material', value: 'Seda e algodão' },
          { id: '2', name: 'Cuidados', value: 'Lavagem a seco recomendada' },
          { id: '3', name: 'Origem', value: 'Itália' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'image-2',
        type: 'image',
        title: 'Imagem',
        image: { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', alt: 'Etiqueta de luxo' },
        visible: true,
        columns: 'full',
        style: { padding: '20px', textAlign: 'center' }
      },
      {
        id: 'faq-2',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Dúvidas Frequentes',
        faqs: [
          { id: '1', question: 'Como escolher o tamanho correto?', answer: 'Consulte nossa tabela de medidas para garantir o ajuste perfeito.' },
          { id: '2', question: 'Quais são os prazos de entrega?', answer: 'Entrega em até 7 dias úteis para todo o Brasil.' },
          { id: '3', question: 'Posso trocar o produto?', answer: 'Sim, oferecemos troca gratuita em até 30 dias.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'cta-2',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Vista-se com Elegância',
        description: 'Adquira agora as peças da nossa coleção de luxo e destaque-se em qualquer ocasião.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#colecao',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#222222', textColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'acessorios-premium',
    name: 'Acessórios Premium',
    category: 'accessories',
    blocks: [
      {
        id: 'hero-3',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Acessórios que Transformam',
        subheading: 'Descubra acessórios premium que elevam seu estilo',
        buttonText: 'Ver Acessórios',
        buttonUrl: '#acessorios',
        image: { src: 'https://images.unsplash.com/photo-1503602642458-232111445657', alt: 'Acessórios' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#222222', textColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'gallery-3',
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Coleção de Acessórios',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt: 'Relógio', caption: 'Relógio de Luxo' },
          { id: '2', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', alt: 'Óculos', caption: 'Óculos Estiloso' },
          { id: '3', src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91', alt: 'Pulseira', caption: 'Pulseira Exclusiva' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'benefits-3',
        type: 'benefits',
        title: 'Benefícios',
        heading: 'Por que Escolher Nossos Acessórios?',
        benefits: [
          { id: '1', title: 'Design Exclusivo', description: 'Peças únicas e sofisticadas', icon: '🎨' },
          { id: '2', title: 'Materiais Nobres', description: 'Acabamento premium e durabilidade', icon: '💎' },
          { id: '3', title: 'Versatilidade', description: 'Combina com qualquer estilo', icon: '🔄' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#f9f9f9', padding: '40px 20px' }
      },
      {
        id: 'imagetext-3',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Detalhes que Fazem a Diferença',
        content: 'Cada acessório é pensado para oferecer estilo e funcionalidade, com atenção aos mínimos detalhes.',
        image: { src: 'https://images.unsplash.com/photo-1503602642458-232111445657', alt: 'Detalhes do acessório' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'textimage-3',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Acessórios para Todas as Ocasiões',
        content: 'Seja para o dia a dia ou eventos especiais, nossos acessórios complementam seu visual com elegância.',
        image: { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', alt: 'Acessório estiloso' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'features-3',
        type: 'features',
        title: 'Recursos',
        heading: 'Destaques dos Acessórios',
        features: [
          { id: '1', title: 'Acabamento Premium', description: 'Detalhes feitos à mão', icon: '🖐️' },
          { id: '2', title: 'Materiais Duráveis', description: 'Resistência e qualidade', icon: '🔧' },
          { id: '3', title: 'Design Moderno', description: 'Estilo contemporâneo', icon: '🆕' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'specifications-3',
        type: 'specifications',
        title: 'Especificações',
        heading: 'Informações Técnicas',
        specs: [
          { id: '1', name: 'Material', value: 'Aço inoxidável e couro' },
          { id: '2', name: 'Garantia', value: '12 meses' },
          { id: '3', name: 'Origem', value: 'Suíça' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#f9f9f9', padding: '40px 20px' }
      },
      {
        id: 'image-3',
        type: 'image',
        title: 'Imagem',
        image: { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91', alt: 'Etiqueta de qualidade' },
        visible: true,
        columns: 'full',
        style: { padding: '20px', textAlign: 'center' }
      },
      {
        id: 'faq-3',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Dúvidas Frequentes',
        faqs: [
          { id: '1', question: 'Como cuidar dos acessórios?', answer: 'Recomendamos limpeza regular com pano macio e armazenamento adequado.' },
          { id: '2', question: 'Posso usar em qualquer ocasião?', answer: 'Sim, nossos acessórios são versáteis para diversas ocasiões.' },
          { id: '3', question: 'Qual o prazo de entrega?', answer: 'Entrega em até 5 dias úteis.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'cta-3',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Complete Seu Estilo',
        description: 'Adquira acessórios premium que fazem a diferença no seu visual.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#acessorios',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#333333', textColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'liquidificador-gem',
    name: 'Liquidificador Gem Blend',
    category: 'electronics',
    blocks: [
      {
        id: 'hero-4',
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Liquidificador Gem Blend',
        subheading: 'Potência e design para sua cozinha',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        image: { src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Liquidificador' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#004d40', textColor: '#ffffff', padding: '60px 20px' }
      },
      {
        id: 'gallery-4',
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Detalhes do Produto',
        images: [
          { id: '1', src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Liquidificador frontal', caption: 'Design moderno' },
          { id: '2', src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Liquidificador lateral', caption: 'Potência máxima' },
          { id: '3', src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Liquidificador em uso', caption: 'Fácil de limpar' }
        ],
        visible: true,
        columns: 2,
        style: { padding: '40px 20px' }
      },
      {
        id: 'benefits-4',
        type: 'benefits',
        title: 'Benefícios',
        heading: 'Por que escolher o Gem Blend?',
        benefits: [
          { id: '1', title: 'Alta Potência', description: 'Motor de 1200W para triturar qualquer ingrediente', icon: '⚡' },
          { id: '2', title: 'Design Compacto', description: 'Ocupa pouco espaço na sua cozinha', icon: '📐' },
          { id: '3', title: 'Fácil Limpeza', description: 'Peças removíveis e laváveis', icon: '🧼' }
        ],
        visible: true,
        columns: 3,
        style: { backgroundColor: '#e0f2f1', padding: '40px 20px' }
      },
      {
        id: 'imagetext-4',
        type: 'imageText',
        title: 'Imagem + Texto',
        heading: 'Tecnologia Avançada',
        content: 'O Gem Blend utiliza tecnologia de ponta para garantir eficiência e durabilidade em todas as suas funções.',
        image: { src: 'https://images.unsplash.com/photo-1586201375761-83865001e1f5', alt: 'Tecnologia do liquidificador' },
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'textimage-4',
        type: 'textImage',
        title: 'Texto + Imagem',
        heading: 'Praticidade no Dia a Dia',
        content: 'Com controles intuitivos e design ergonômico, o Gem Blend facilita o preparo das suas receitas favoritas.',
        image: { src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Liquidificador em uso' },
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'features-4',
        type: 'features',
        title: 'Recursos',
        heading: 'Destaques do Produto',
        features: [
          { id: '1', title: 'Velocidades Variáveis', description: 'Controle preciso para diferentes preparos', icon: '🎚️' },
          { id: '2', title: 'Jarra de Vidro', description: 'Resistente e fácil de limpar', icon: '🍶' },
          { id: '3', title: 'Segurança', description: 'Sistema de trava para uso seguro', icon: '🔒' }
        ],
        visible: true,
        columns: 3,
        style: { padding: '40px 20px' }
      },
      {
        id: 'specifications-4',
        type: 'specifications',
        title: 'Especificações',
        heading: 'Detalhes Técnicos',
        specs: [
          { id: '1', name: 'Potência', value: '1200W' },
          { id: '2', name: 'Capacidade da Jarra', value: '1.5L' },
          { id: '3', name: 'Peso', value: '3.2kg' }
        ],
        visible: true,
        columns: 2,
        style: { backgroundColor: '#e0f2f1', padding: '40px 20px' }
      },
      {
        id: 'image-4',
        type: 'image',
        title: 'Imagem',
        image: { src: 'https://images.unsplash.com/photo-1590080877777-0a1a0a1a1a1a', alt: 'Etiqueta de qualidade' },
        visible: true,
        columns: 'full',
        style: { padding: '20px', textAlign: 'center' }
      },
      {
        id: 'faq-4',
        type: 'faq',
        title: 'Perguntas Frequentes',
        heading: 'Dúvidas Frequentes',
        faqs: [
          { id: '1', question: 'Qual a voltagem do produto?', answer: 'Disponível nas versões 110V e 220V.' },
          { id: '2', question: 'O produto possui garantia?', answer: 'Sim, garantia de 12 meses contra defeitos de fabricação.' },
          { id: '3', question: 'Posso lavar a jarra na lava-louças?', answer: 'Sim, a jarra é compatível com lava-louças.' }
        ],
        visible: true,
        columns: 'full',
        style: { padding: '40px 20px' }
      },
      {
        id: 'cta-4',
        type: 'cta',
        title: 'Chamada Para Ação',
        heading: 'Adquira o Gem Blend',
        description: 'Garanta já o seu liquidificador com tecnologia e design inovadores.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        visible: true,
        columns: 'full',
        style: { backgroundColor: '#00796b', textColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }
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

      // Deletar templates existentes primeiro
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Deletar todos

      if (deleteError) {
        console.error('Erro ao deletar templates:', deleteError);
      }

      // Inserir novos templates premium
      const premiumTemplates = createPremiumTemplates();
      
      for (const template of premiumTemplates) {
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
        }
      }

      toast({
        title: "Sucesso",
        description: "Templates premium criados com sucesso!"
      });

      await loadTemplates();
    } catch (error) {
      console.error('Erro ao criar templates premium:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar templates premium",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

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
          <h1 className="text-3xl font-bold tracking-tight">Templates Premium</h1>
          <p className="text-muted-foreground">
            Gerencie os templates premium do sistema ({totalTemplates} templates em {categoriesCount} categorias)
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
            variant="outline"
            onClick={seedPremiumTemplates}
          >
            <Code className="h-4 w-4 mr-2" />
            Criar Templates Premium
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
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">Nenhum template encontrado</p>
              <p className="text-sm text-muted-foreground">
                Clique em "Criar Templates Premium" para gerar os templates padrão do sistema.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{getCategoryLabel(category)}</span>
                      <Badge variant="secondary">{categoryTemplates.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Templates premium da categoria {getCategoryLabel(category)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{template.blocks?.length || 0} blocos</Badge>
                            <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                              <Palette className="h-3 w-3 mr-1" />
                              Premium
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Personalização avançada de blocos e colunas
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(template)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(template)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
