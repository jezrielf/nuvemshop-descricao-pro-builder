
// Generate inline CSS for the product description
export const generateInlineStyles = (): string => {
  return `
    <style>
      /* Reset básico */
      .product-description div, .product-description p, .product-description h1, 
      .product-description h2, .product-description h3, .product-description h4,
      .product-description h5, .product-description h6, .product-description ul, 
      .product-description ol, .product-description li, .product-description table,
      .product-description tr, .product-description td, .product-description th {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
      }
      
      /* Estilos básicos */
      .product-description {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      
      .product-description h1 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      
      .product-description h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      
      .product-description h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .product-description p {
        margin-bottom: 15px;
      }
      
      .product-description img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }
      
      /* Grid system */
      .grid {
        display: flex;
        flex-wrap: wrap;
        margin: -10px;
      }
      
      .grid > * {
        padding: 10px;
        flex: 0 0 100%;
      }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 > * {
          flex: 0 0 50%;
        }
        
        .md\\:grid-cols-3 > * {
          flex: 0 0 33.333333%;
        }
        
        .md\\:grid-cols-4 > * {
          flex: 0 0 25%;
        }
      }
      
      /* FAQ estilos com CSS puro (sem JavaScript) */
      .faq-item {
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        margin-bottom: 10px;
        overflow: hidden;
      }
      
      .faq-question {
        padding: 15px;
        background-color: #f9fafb;
        font-weight: 500;
        cursor: pointer;
        position: relative;
      }
      
      .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        background-color: white;
      }
      
      .faq-answer-content {
        padding: 15px;
      }
      
      .faq-toggle:checked ~ .faq-answer {
        max-height: 1000px;
      }
      
      .faq-toggle:checked + .faq-question .faq-icon {
        transform: rotate(45deg);
      }
    </style>
  `;
};
