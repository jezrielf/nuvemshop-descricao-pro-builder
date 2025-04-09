
import { 
  HeroBlock, 
  TextBlock, 
  FeaturesBlock,
  BenefitsBlock,
  SpecificationsBlock,
  ImageBlock,
  GalleryBlock,
  ImageTextBlock,
  TextImageBlock,
  FAQBlock,
  CTABlock
} from '@/types/editor';
import { EditorState } from './types';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    const description = get().description;
    
    // Check if description exists and has blocks before trying to map over them
    if (!description || !description.blocks || description.blocks.length === 0) {
      return '';
    }

    // Generate HTML for each block type
    const blocksHtml = description.blocks
      .filter(block => block.visible)
      .map(block => {
        switch(block.type) {
          case 'hero':
            const heroBlock = block as HeroBlock;
            return `
              <div style="width:100%;padding:30px;text-align:center;background-color:#f5f5f5;margin-bottom:20px;">
                <h1 style="font-size:28px;font-weight:bold;margin-bottom:10px;">${heroBlock.heading}</h1>
                <p style="font-size:16px;margin-bottom:20px;">${heroBlock.subheading}</p>
                ${heroBlock.buttonText ? `<a href="${heroBlock.buttonUrl || '#'}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:4px;">${heroBlock.buttonText}</a>` : ''}
              </div>
            `;
            
          case 'text':
            const textBlock = block as TextBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="font-size:16px;line-height:1.6;">${textBlock.content}</div>
              </div>
            `;
            
          case 'features':
            const featuresBlock = block as FeaturesBlock;
            const featuresHtml = featuresBlock.features && featuresBlock.features.length > 0 
              ? featuresBlock.features.map(feature => `
                <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
                  <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${feature.title}</h3>
                  <p style="font-size:14px;">${feature.description}</p>
                </div>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${featuresBlock.heading}</h2>
                <div style="display:flex;flex-wrap:wrap;">${featuresHtml}</div>
              </div>
            `;
            
          case 'benefits':
            const benefitsBlock = block as BenefitsBlock;
            const benefitsHtml = benefitsBlock.benefits && benefitsBlock.benefits.length > 0 
              ? benefitsBlock.benefits.map(benefit => `
                <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
                  <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${benefit.title}</h3>
                  <p style="font-size:14px;">${benefit.description}</p>
                </div>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${benefitsBlock.heading}</h2>
                <div style="display:flex;flex-wrap:wrap;">${benefitsHtml}</div>
              </div>
            `;
            
          case 'specifications':
            const specsBlock = block as SpecificationsBlock;
            const specsHtml = specsBlock.specs && specsBlock.specs.length > 0 
              ? specsBlock.specs.map((spec, index) => `
                <tr style="background-color:${index % 2 === 0 ? '#f9fafb' : '#ffffff'}">
                  <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:500;">${spec.name}</td>
                  <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${spec.value}</td>
                </tr>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${specsBlock.heading}</h2>
                <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
                  <tbody>
                    ${specsHtml}
                  </tbody>
                </table>
              </div>
            `;
            
          case 'image':
            const imageBlock = block as ImageBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;text-align:center;">
                ${imageBlock.src ? 
                  `<img src="${imageBlock.src}" alt="${imageBlock.alt || ''}" style="max-width:100%;height:auto;border-radius:4px;" />` :
                  `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
                }
                ${imageBlock.caption ? `<p style="margin-top:8px;font-size:14px;color:#6b7280;">${imageBlock.caption}</p>` : ''}
              </div>
            `;
            
          case 'gallery':
            const galleryBlock = block as GalleryBlock;
            const galleryHtml = galleryBlock.images && galleryBlock.images.length > 0 
              ? galleryBlock.images.map(image => `
                <div style="flex:1;padding:10px;min-width:${100/block.columns}%;">
                  ${image.src ? 
                    `<img src="${image.src}" alt="${image.alt || ''}" style="width:100%;height:auto;object-fit:cover;border-radius:4px;" />` :
                    `<div style="background-color:#f3f4f6;height:150px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem</span></div>`
                  }
                  ${image.caption ? `<p style="margin-top:8px;font-size:14px;color:#6b7280;text-align:center;">${image.caption}</p>` : ''}
                </div>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="display:flex;flex-wrap:wrap;margin:-10px;">${galleryHtml}</div>
              </div>
            `;
            
          case 'imageText':
            const imageTextBlock = block as ImageTextBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="display:flex;flex-wrap:wrap;gap:20px;">
                  <div style="flex:1;min-width:300px;">
                    ${imageTextBlock.image.src ? 
                      `<img src="${imageTextBlock.image.src}" alt="${imageTextBlock.image.alt || ''}" style="width:100%;height:auto;object-fit:cover;border-radius:4px;" />` :
                      `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
                    }
                  </div>
                  <div style="flex:1;min-width:300px;">
                    <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${imageTextBlock.heading}</h2>
                    <div style="font-size:16px;line-height:1.6;">${imageTextBlock.content}</div>
                  </div>
                </div>
              </div>
            `;
            
          case 'textImage':
            const textImageBlock = block as TextImageBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="display:flex;flex-wrap:wrap;gap:20px;">
                  <div style="flex:1;min-width:300px;">
                    <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${textImageBlock.heading}</h2>
                    <div style="font-size:16px;line-height:1.6;">${textImageBlock.content}</div>
                  </div>
                  <div style="flex:1;min-width:300px;">
                    ${textImageBlock.image.src ? 
                      `<img src="${textImageBlock.image.src}" alt="${textImageBlock.image.alt || ''}" style="width:100%;height:auto;object-fit:cover;border-radius:4px;" />` :
                      `<div style="background-color:#f3f4f6;height:200px;display:flex;align-items:center;justify-content:center;border-radius:4px;"><span style="color:#9ca3af;">Imagem do Produto</span></div>`
                    }
                  </div>
                </div>
              </div>
            `;
            
          case 'faq':
            const faqBlock = block as FAQBlock;
            const faqHtml = faqBlock.questions && faqBlock.questions.length > 0 
              ? faqBlock.questions.map(item => `
                <div style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="padding:12px 16px;background-color:#f9fafb;font-weight:500;border-bottom:1px solid #e5e7eb;">${item.question}</div>
                  <div style="padding:16px;background-color:white;">${item.answer}</div>
                </div>
              `).join('')
              : '';
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${faqBlock.heading}</h2>
                <div>${faqHtml}</div>
              </div>
            `;
            
          case 'cta':
            const ctaBlock = block as CTABlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="background-color:#f9fafb;padding:30px;border-radius:8px;text-align:center;">
                  <h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">${ctaBlock.heading}</h2>
                  <div style="font-size:16px;line-height:1.6;margin-bottom:20px;max-width:600px;margin-left:auto;margin-right:auto;">${ctaBlock.content}</div>
                  <a href="${ctaBlock.buttonUrl || '#'}" style="display:inline-block;padding:12px 24px;background-color:#2563EB;color:white;font-weight:500;text-decoration:none;border-radius:4px;font-size:16px;">${ctaBlock.buttonText}</a>
                </div>
              </div>
            `;
            
          default:
            return `<div style="padding:20px;margin-bottom:20px;border:1px dashed #ccc;">Bloco do tipo ${block.type}</div>`;
        }
      }).join('');

    return blocksHtml;
  }
});
