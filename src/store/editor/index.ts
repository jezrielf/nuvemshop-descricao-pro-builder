
import { create } from 'zustand';
import { EditorState } from './types';
import { createBlockActions } from './blockActions';
import { createDescriptionActions } from './descriptionActions';
import { createOutputActions } from './outputActions';
import { createSaveActions } from './saveActions';
import { subscribeWithSelector } from 'zustand/middleware';

// Create the central store that combines all action creators with selector middleware for performance
export const useEditorStore = create<EditorState>(
  subscribeWithSelector((set, get) => ({
    description: null,
    selectedBlockId: null,
    availableTemplates: [],
    savedDescriptions: [],
    user: null,

    // Combine actions from different modules
    ...createDescriptionActions(get, set),
    ...createBlockActions(get, set),
    ...createOutputActions(get),
    ...createSaveActions(get, set),
  }))
);

// Create selector hooks for common state access patterns
export const useDescription = () => useEditorStore(state => state.description);
export const useSelectedBlockId = () => useEditorStore(state => state.selectedBlockId);
export const useSavedDescriptions = () => useEditorStore(state => state.savedDescriptions);

// Export actions directly for easier imports
export const {
  createNewDescription,
  loadDescription,
  loadTemplate,
  addBlock,
  updateBlock,
  removeBlock,
  moveBlockUp,
  moveBlockDown,
  reorderBlocks,
  selectBlock,
  duplicateBlock,
  getHtmlOutput,
  saveCurrentDescription,
  loadSavedDescriptions
} = useEditorStore.getState();
