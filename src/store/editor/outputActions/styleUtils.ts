
/**
 * This file provides utility functions for generating styles in HTML output
 */

// Generate CSS variables for blocks that need custom styling
export const generateStyleVariables = (blockId: string, styles: Record<string, string>): string => {
  const variables = Object.entries(styles).map(([key, value]) => {
    return `--${key}: ${value};`;
  });
  
  return variables.length ? variables.join(' ') : '';
};

// Convert the style object to inline CSS string
export const generateInlineStyles = (styles: Record<string, string>): string => {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
};
