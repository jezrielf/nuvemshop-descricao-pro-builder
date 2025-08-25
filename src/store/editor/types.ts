
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
  focusedBlockId: string | null; // Novo estado para rastrear o bloco em foco na preview
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
  focusBlock: (id: string | null) => void; // Nova ação para focar bloco na preview
  getHtmlOutput: (productTitle?: string) => string; // Updated to accept optional parameter
  getPlainTextOutput: () => string; // Added missing method
  saveCurrentDescription: (isNewDescription?: boolean) => Promise<boolean>; // Changed to async
  loadSavedDescriptions: () => Promise<void>; // Changed to async
  deleteSavedDescription: (id: string) => Promise<boolean>; // Added missing method
  getSavedDescriptions: () => ProductDescription[];
  setAuthContext: (authContext: ReturnType<typeof useAuth>) => void;
  updateDescription: (updates: Partial<ProductDescription>) => void;
}
