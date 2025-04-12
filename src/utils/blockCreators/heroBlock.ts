
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, HeroBlock } from '@/types/editor';

export const createHeroBlock = (columns: number = 1): HeroBlock => ({
  id: uuidv4(),
  type: 'hero',
  title: 'Bloco de Hero',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Título Principal',
  subheading: 'Subtítulo Atraente',
  backgroundImage: 'URL da Imagem',
  buttonText: 'Clique Aqui',
  buttonUrl: '#',
});
