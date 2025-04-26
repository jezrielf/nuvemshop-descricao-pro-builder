
import { Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

/**
 * Ensures a block has the correct type structure based on its type property
 */
export function ensureBlockType<T extends Block>(block: Partial<T> & { type: BlockType }): T {
  const baseBlock = {
    id: block.id || uuidv4(),
    type: block.type,
    title: block.title || getDefaultTitle(block.type),
    columns: block.columns || 'full',
    visible: block.visible !== undefined ? block.visible : true,
    style: block.style || {}
  };

  switch (block.type) {
    case 'hero':
      return {
        ...baseBlock,
        heading: block.heading || 'Hero Heading',
        subheading: block.subheading || 'Hero Subheading',
        backgroundImage: block.backgroundImage || '',
        ctaText: block.ctaText || 'Learn More',
        ctaUrl: block.ctaUrl || '#',
        overlay: block.overlay !== undefined ? block.overlay : true,
        alignment: block.alignment || 'center',
      } as unknown as T;
    
    case 'text':
      return {
        ...baseBlock,
        heading: block.heading || 'Text Block Heading',
        content: block.content || '<p>Add your content here.</p>',
        align: block.align || 'left',
      } as unknown as T;
      
    case 'features':
      return {
        ...baseBlock,
        heading: block.heading || 'Features',
        features: block.features || [
          { id: uuidv4(), title: 'Feature 1', description: 'Description 1', icon: 'Star' },
          { id: uuidv4(), title: 'Feature 2', description: 'Description 2', icon: 'Star' },
          { id: uuidv4(), title: 'Feature 3', description: 'Description 3', icon: 'Star' },
        ],
      } as unknown as T;
      
    case 'benefits':
      return {
        ...baseBlock,
        heading: block.heading || 'Benefits',
        benefits: block.benefits || [
          { id: uuidv4(), title: 'Benefit 1', description: 'Description 1' },
          { id: uuidv4(), title: 'Benefit 2', description: 'Description 2' },
          { id: uuidv4(), title: 'Benefit 3', description: 'Description 3' },
        ],
      } as unknown as T;
      
    case 'image':
      return {
        ...baseBlock,
        src: block.src || '',
        alt: block.alt || 'Image description',
        caption: block.caption || '',
        fullWidth: block.fullWidth !== undefined ? block.fullWidth : false,
      } as unknown as T;
      
    case 'gallery':
      return {
        ...baseBlock,
        heading: block.heading || 'Gallery',
        images: block.images || [
          { id: uuidv4(), src: '', alt: 'Image 1', caption: '' },
          { id: uuidv4(), src: '', alt: 'Image 2', caption: '' },
          { id: uuidv4(), src: '', alt: 'Image 3', caption: '' },
        ],
      } as unknown as T;
      
    case 'imageText':
      return {
        ...baseBlock,
        imageSrc: block.imageSrc || '',
        alt: block.alt || 'Image description',
        heading: block.heading || 'Image + Text',
        content: block.content || '<p>Content goes here.</p>',
      } as unknown as T;
      
    case 'textImage':
      return {
        ...baseBlock,
        imageSrc: block.imageSrc || '',
        alt: block.alt || 'Image description',
        heading: block.heading || 'Text + Image',
        content: block.content || '<p>Content goes here.</p>',
      } as unknown as T;
      
    case 'specifications':
      return {
        ...baseBlock,
        heading: block.heading || 'Specifications',
        specs: block.specs || [
          { id: uuidv4(), name: 'Spec 1', value: 'Value 1' },
          { id: uuidv4(), name: 'Spec 2', value: 'Value 2' },
          { id: uuidv4(), name: 'Spec 3', value: 'Value 3' },
        ],
      } as unknown as T;
      
    case 'faq':
      return {
        ...baseBlock,
        heading: block.heading || 'Frequently Asked Questions',
        items: block.items || [
          { id: uuidv4(), question: 'Question 1?', answer: 'Answer 1' },
          { id: uuidv4(), question: 'Question 2?', answer: 'Answer 2' },
          { id: uuidv4(), question: 'Question 3?', answer: 'Answer 3' },
        ],
      } as unknown as T;
      
    case 'cta':
      return {
        ...baseBlock,
        heading: block.heading || 'Call to Action',
        content: block.content || 'Take action now.',
        buttonText: block.buttonText || 'Buy Now',
        buttonUrl: block.buttonUrl || '#',
        secondaryButtonText: block.secondaryButtonText || '',
        secondaryButtonUrl: block.secondaryButtonUrl || '',
      } as unknown as T;
      
    case 'video':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        title: block.title || 'Video Title',
        description: block.description || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay !== undefined ? block.autoplay : false,
      } as unknown as T;
      
    case 'videoText':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay !== undefined ? block.autoplay : false,
        muteAudio: block.muteAudio !== undefined ? block.muteAudio : true,
        heading: block.heading || 'Video + Text',
        content: block.content || '<p>Add your content here.</p>',
      } as unknown as T;
      
    case 'textVideo':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay !== undefined ? block.autoplay : false,
        muteAudio: block.muteAudio !== undefined ? block.muteAudio : true,
        heading: block.heading || 'Text + Video',
        content: block.content || '<p>Add your content here.</p>',
      } as unknown as T;
      
    default:
      return baseBlock as unknown as T;
  }
}

function getDefaultTitle(type: BlockType): string {
  switch (type) {
    case 'hero': return 'Hero Section';
    case 'text': return 'Text Section';
    case 'features': return 'Features';
    case 'benefits': return 'Benefits';
    case 'specifications': return 'Specifications';
    case 'image': return 'Image';
    case 'gallery': return 'Gallery';
    case 'imageText': return 'Image with Text';
    case 'textImage': return 'Text with Image';
    case 'faq': return 'FAQ';
    case 'cta': return 'Call to Action';
    case 'video': return 'Video';
    case 'videoText': return 'Video with Text';
    case 'textVideo': return 'Text with Video';
    default: return 'Section';
  }
}
