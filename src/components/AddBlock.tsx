import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';
import { BlockType, ColumnLayout } from '@/types/editor';
import { PlusCircle, Layout, Type, Image, ImagePlus, FileText, List, HelpCircle, BarChart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const blockTypeInfo: Record<BlockType, { name: string; icon: React.ReactNode; description: string }> = {
  hero: {
    name: 'Banner Principal',
    icon: <Layout className="h-5 w-5" />,
    description: 'Seção de destaque com título, subtítulo e botão opcional'
  },
  features: {
    name: 'Recursos',
    icon: <BarChart className="h-5 w-5" />,
    description: 'Lista de recursos ou características do produto'
  },
  benefits: {
    name: 'Benefícios',
    icon: <List className="h-5 w-5" />,
    description: 'Destaque os principais benefícios do produto'
  },
  specifications: {
    name: 'Especificações',
    icon: <FileText className="h-5 w-5" />,
    description: 'Lista técnica de especificações do produto'
  },
  text: {
    name: 'Texto',
    icon: <Type className="h-5 w-5" />,
    description: 'Bloco de texto com formatação livre'
  },
  image: {
    name: 'Imagem',
    icon: <Image className="h-5 w-5" />,
    description: 'Imagem única com legenda opcional'
  },
  gallery: {
    name: 'Galeria',
    icon: <ImagePlus className="h-5 w-5" />,
    description: 'Conjunto de imagens em formato de galeria'
  },
  imageText: {
    name: 'Imagem + Texto',
    icon: <Layout className="h-5 w-5" />,
    description: 'Imagem à esquerda com texto à direita'
  },
  textImage: {
    name: 'Texto + Imagem',
    icon: <Layout className="h-5 w-5" />,
    description: 'Texto à esquerda com imagem à direita'
  },
  faq: {
    name: 'Perguntas Frequentes',
    icon: <HelpCircle className="h-5 w-5" />,
    description: 'Lista de perguntas e respostas comuns'
  },
  cta: {
    name: 'Chamada para Ação',
    icon: <PlusCircle className="h-5 w-5" />,
    description: 'Bloco de conversão com botão de destaque'
  }
};

const AddBlock: React.FC = () => {
  const { addBlock } = useEditorStore();
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<BlockType | null>(null);
  const [columns, setColumns] = React.useState<ColumnLayout>(1);
  const { toast } = useToast();
  
  const handleAddBlock = (type: BlockType) => {
    if (!type) return;
    
    switch (type) {
      case 'hero':
        addBlock({
          type,
          title: blockTypeInfo[type].name,
          columns,
          visible: true,
          heading: 'Título Principal',
          subheading: 'Subtítulo com descrição do produto',
          buttonText: 'Saiba Mais',
          buttonUrl: '#'
        });
        break;
      case 'text':
        addBlock({
          type,
          title: blockTypeInfo[type].name,
          columns,
          visible: true,
          content: '<p>Digite seu texto aqui. Este é um bloco de texto que você pode personalizar com conteúdo sobre seu produto.</p>'
        });
        break;
      // Implemente outros tipos conforme necessário
      default:
        // Bloco temporário/genérico para tipos ainda não implementados
        addBlock({
          type,
          title: blockTypeInfo[type].name,
          columns,
          visible: true
        });
    }
    
    toast({
      title: "Bloco adicionado",
      description: `${blockTypeInfo[type].name} foi adicionado à sua descrição.`,
    });
    
    setSelectedType(null);
    setColumns(1);
    setOpen(false);
  };
  
  return (
    <div className="my-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full border-dashed flex items-center justify-center py-6">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Bloco
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {!selectedType ? (
            <div className="space-y-2">
              <h3 className="font-medium mb-2">Escolha um tipo de bloco</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(blockTypeInfo).map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 text-center p-1"
                    onClick={() => setSelectedType(type as BlockType)}
                  >
                    <div className="mb-1">{blockTypeInfo[type as BlockType].icon}</div>
                    <span className="text-xs">{blockTypeInfo[type as BlockType].name}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{blockTypeInfo[selectedType].name}</h3>
                <p className="text-sm text-gray-500">{blockTypeInfo[selectedType].description}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Número de Colunas</label>
                <Select
                  value={columns.toString()}
                  onValueChange={(value) => setColumns(parseInt(value) as ColumnLayout)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o número de colunas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Coluna</SelectItem>
                    <SelectItem value="2">2 Colunas</SelectItem>
                    <SelectItem value="3">3 Colunas</SelectItem>
                    <SelectItem value="4">4 Colunas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => setSelectedType(null)}>
                  Voltar
                </Button>
                <Button size="sm" onClick={() => handleAddBlock(selectedType)}>
                  Adicionar
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddBlock;
