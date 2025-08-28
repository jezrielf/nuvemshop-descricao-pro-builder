import { Template, Block } from '@/types/editor';

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingSize: string;
    contentSize: string;
    fontWeight: string;
  };
  spacing: {
    padding: string;
    margin: string;
  };
  effects: {
    borderRadius: string;
    shadow: string;
    gradient?: string;
  };
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Design limpo com muito espaço branco',
    colors: {
      primary: 'hsl(220, 14%, 96%)',
      secondary: 'hsl(220, 14%, 91%)',
      accent: 'hsl(220, 9%, 46%)',
      background: 'hsl(0, 0%, 100%)',
      text: 'hsl(220, 9%, 15%)'
    },
    typography: {
      headingSize: 'text-2xl',
      contentSize: 'text-base',
      fontWeight: 'font-normal'
    },
    spacing: {
      padding: 'p-8',
      margin: 'mb-6'
    },
    effects: {
      borderRadius: 'rounded-none',
      shadow: 'shadow-none'
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Elegante com gradients e sombras suaves',
    colors: {
      primary: 'hsl(221, 39%, 11%)',
      secondary: 'hsl(210, 40%, 94%)',
      accent: 'hsl(142, 76%, 36%)',
      background: 'hsl(0, 0%, 100%)',
      text: 'hsl(221, 39%, 11%)'
    },
    typography: {
      headingSize: 'text-3xl',
      contentSize: 'text-lg',
      fontWeight: 'font-semibold'
    },
    spacing: {
      padding: 'p-12',
      margin: 'mb-8'
    },
    effects: {
      borderRadius: 'rounded-lg',
      shadow: 'shadow-lg',
      gradient: 'linear-gradient(135deg, hsl(142, 76%, 36%), hsl(158, 64%, 52%))'
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'Cores vivas e contrastes fortes',
    colors: {
      primary: 'hsl(280, 100%, 70%)',
      secondary: 'hsl(45, 100%, 60%)',
      accent: 'hsl(200, 100%, 50%)',
      background: 'hsl(0, 0%, 5%)',
      text: 'hsl(0, 0%, 100%)'
    },
    typography: {
      headingSize: 'text-4xl',
      contentSize: 'text-lg',
      fontWeight: 'font-bold'
    },
    spacing: {
      padding: 'p-10',
      margin: 'mb-10'
    },
    effects: {
      borderRadius: 'rounded-2xl',
      shadow: 'shadow-2xl',
      gradient: 'linear-gradient(45deg, hsl(280, 100%, 70%), hsl(45, 100%, 60%))'
    }
  }
];

export const applyPresetToTemplate = (template: Template, preset: StylePreset): Template => {
  const updatedBlocks = template.blocks.map(block => ({
    ...block,
    style: {
      ...block.style,
      backgroundColor: preset.colors.background,
      textColor: preset.colors.text,
      headingColor: preset.colors.primary,
      padding: preset.spacing.padding,
      borderRadius: preset.effects.borderRadius,
      boxShadow: preset.effects.shadow,
      backgroundGradient: preset.effects.gradient,
      fontSize: preset.typography.contentSize,
      fontWeight: preset.typography.fontWeight
    }
  }));

  return {
    ...template,
    blocks: updatedBlocks
  };
};

export const applyPresetToBlock = (block: Block, preset: StylePreset): Block => {
  return {
    ...block,
    style: {
      ...block.style,
      backgroundColor: preset.colors.background,
      textColor: preset.colors.text,
      headingColor: preset.colors.primary,
      padding: preset.spacing.padding,
      borderRadius: preset.effects.borderRadius,
      boxShadow: preset.effects.shadow,
      backgroundGradient: preset.effects.gradient,
      fontSize: preset.typography.contentSize,
      fontWeight: preset.typography.fontWeight
    }
  };
};