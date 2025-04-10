
import { create } from 'zustand';
import { EditorState } from './types';
import { createBlockActions } from './blockActions';
import { createDescriptionActions } from './descriptionActions';
import { createOutputActions } from './outputActions';
import { createSaveActions } from './saveActions';

// Create the central store that combines all action creators
export const useEditorStore = create<EditorState>((set, get) => ({
  description: null,
  selectedBlockId: null,
  availableTemplates: [],
  savedDescriptions: [],

  // Combine actions from different modules
  ...createDescriptionActions(get, set),
  ...createBlockActions(get, set),
  ...createOutputActions(get),
  ...createSaveActions(get, set),
}));
