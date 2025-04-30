
/**
 * Este arquivo contém templates CSS para uso nos geradores de HTML
 */

export const getSpecificationsCss = (): string => {
  return `
    .specifications-container {
      margin-bottom: 1.5rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    .specifications-heading {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }
    
    .specifications-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .specification-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 0.5rem 0;
    }
    
    .specification-name {
      font-weight: 500;
      color: #111;
    }
    
    .specification-value {
      color: #555;
    }
    
    .care-instruction-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.4rem 0;
    }
    
    .care-instruction-icon {
      display: flex;
      align-items: center;
      color: #22c55e;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }
    
    .care-instruction-text {
      font-size: 1rem;
      flex: 1;
    }
    
    .care-instruction-value {
      color: #555;
      margin-left: 0.5rem;
    }
    
    @media (max-width: 640px) {
      .specification-item {
        flex-direction: column;
        gap: 0.25rem;
      }
      
      .care-instruction-item {
        margin-bottom: 0.25rem;
      }
    }
  `;
};

export const getCoreStylesCss = (): string => {
  return `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #333;
    }
    
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.25;
    }
    
    p {
      margin-bottom: 1em;
    }
    
    ul, ol {
      margin-bottom: 1em;
      padding-left: 1.5em;
    }
  `;
};
