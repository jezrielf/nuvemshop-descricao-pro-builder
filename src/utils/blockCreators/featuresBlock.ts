
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, FeaturesBlock } from '@/types/editor';

export const createFeaturesBlock = (columns: number = 1): FeaturesBlock => ({
  id: uuidv4(),
  type: 'features',
  title: 'Bloco de Características',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Nossas Características',
  features: [
    { id: uuidv4(), title: 'Característica 1', description: 'Descrição da característica', icon: 'star' },
    { id: uuidv4(), title: 'Característica 2', description: 'Descrição da característica', icon: 'code' },
    { id: uuidv4(), title: 'Característica 3', description: 'Descrição da característica', icon: 'cloud' },
  ],
});
