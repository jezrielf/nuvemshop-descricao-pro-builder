
import { create } from 'zustand';
import { Block, ProductDescription, Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  description: ProductDescription | null;
  selectedBlockId: string | null;
  availableTemplates: Template[];
  
  // Actions
  createNewDescription: (name: string) => void;
  loadDescription: (description: ProductDescription) => void;
  loadTemplate: (template: Template) => void;
  addBlock: (block: Omit<Block, 'id'>) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  duplicateBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  selectBlock: (id: string | null) => void;
  getHtmlOutput: () => string;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  description: null,
  selectedBlockId: null,
  availableTemplates: [],

  createNewDescription: (name) => {
    set({
      description: {
        id: uuidv4(),
        name,
        blocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: null,
    });
  },

  loadDescription: (description) => {
    set({
      description,
      selectedBlockId: null,
    });
  },

  loadTemplate: (template) => {
    if (!get().description) return;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks: [...template.blocks.map(block => ({ ...block, id: uuidv4() }))],
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: null,
    }));
  },

  addBlock: (blockData) => {
    if (!get().description) return;
    
    const block = { ...blockData, id: uuidv4() } as Block;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks: [...state.description!.blocks, block],
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: block.id,
    }));
  },

  updateBlock: (id, updates) => {
    if (!get().description) return;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks: state.description!.blocks.map((block) =>
          block.id === id ? { ...block, ...updates } : block
        ),
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  duplicateBlock: (id) => {
    if (!get().description) return;
    
    const blockToDuplicate = get().description!.blocks.find((block) => block.id === id);
    if (!blockToDuplicate) return;
    
    const newBlock = { ...blockToDuplicate, id: uuidv4() };
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks: [...state.description!.blocks, newBlock],
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: newBlock.id,
    }));
  },

  removeBlock: (id) => {
    if (!get().description) return;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks: state.description!.blocks.filter((block) => block.id !== id),
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }));
  },

  moveBlockUp: (id) => {
    if (!get().description) return;
    
    const blocks = [...get().description!.blocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index <= 0) return;
    
    const temp = blocks[index];
    blocks[index] = blocks[index - 1];
    blocks[index - 1] = temp;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  moveBlockDown: (id) => {
    if (!get().description) return;
    
    const blocks = [...get().description!.blocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index === -1 || index === blocks.length - 1) return;
    
    const temp = blocks[index];
    blocks[index] = blocks[index + 1];
    blocks[index + 1] = temp;
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  reorderBlocks: (fromIndex, toIndex) => {
    if (!get().description) return;
    
    const blocks = [...get().description!.blocks];
    const [removed] = blocks.splice(fromIndex, 1);
    blocks.splice(toIndex, 0, removed);
    
    set((state) => ({
      description: {
        ...state.description!,
        blocks,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  selectBlock: (id) => {
    set({ selectedBlockId: id });
  },

  getHtmlOutput: () => {
    if (!get().description || !get().description.blocks.length) {
      return '';
    }

    // Esta é uma versão simplificada da conversão para HTML
    // Em uma versão mais completa, cada tipo de bloco teria seu próprio renderizador
    const blocksHtml = get().description.blocks
      .filter(block => block.visible)
      .map(block => {
        switch(block.type) {
          case 'hero':
            return `
              <div style="width:100%;padding:30px;text-align:center;background-color:#f5f5f5;margin-bottom:20px;">
                <h1 style="font-size:28px;font-weight:bold;margin-bottom:10px;">${block.heading}</h1>
                <p style="font-size:16px;margin-bottom:20px;">${block.subheading}</p>
                ${block.buttonText ? `<a href="${block.buttonUrl || '#'}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:4px;">${block.buttonText}</a>` : ''}
              </div>
            `;
          case 'text':
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="font-size:16px;line-height:1.6;">${block.content}</div>
              </div>
            `;
          case 'features':
            const featuresHtml = block.features.map(feature => `
              <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
                <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${feature.title}</h3>
                <p style="font-size:14px;">${feature.description}</p>
              </div>
            `).join('');
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${block.heading}</h2>
                <div style="display:flex;flex-wrap:wrap;">${featuresHtml}</div>
              </div>
            `;
          // Adicione mais casos para outros tipos de blocos conforme necessário
          default:
            return `<div style="padding:20px;margin-bottom:20px;border:1px dashed #ccc;">Bloco do tipo ${block.type}</div>`;
        }
      }).join('');

    return blocksHtml;
  },
}));
