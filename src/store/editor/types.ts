
import { 
  Block, 
  ProductDescription, 
  Template, 
  BlockType, 
  ColumnLayout 
} from '@/types/editor';
import { useAuth } from '@/contexts/AuthContext';

export interface EditorState {
  description: ProductDescription | null;
  selectedBlockId: string | null;
  availableTemplates: Template[];
  savedDescriptions: ProductDescription[];
  user: { id: string } | null;
  
  // Actions
  createNewDescription: (name: string) => void;
  loadDescription: (description: ProductDescription) => void;
  loadTemplate: (template: Template) => void;
  addBlock: (block: Partial<Block> & { type: BlockType, title: string, columns: ColumnLayout, visible: boolean }) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  duplicateBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  selectBlock: (id: string | null) => void;
  getHtmlOutput: () => string;
  saveCurrentDescription: () => boolean;
  loadSavedDescriptions: () => void;
  getSavedDescriptions: () => ProductDescription[];
  setAuthContext: (authContext: ReturnType<typeof useAuth>) => void;
  updateDescription: (description: ProductDescription) => void;
}
