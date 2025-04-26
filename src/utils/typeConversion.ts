
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

  const anyBlock = block as any;
  
  switch (block.type) {
    case 'hero':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Hero Heading',
        subheading: anyBlock.subheading || 'Hero Subheading',
        backgroundImage: anyBlock.backgroundImage || '',
        ctaText: anyBlock.ctaText || 'Learn More',
        ctaUrl: anyBlock.ctaUrl || '#',
        overlay: anyBlock.overlay !== undefined ? anyBlock.overlay : true,
        alignment: anyBlock.alignment || 'center',
      } as unknown as T;
    
    case 'text':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Text Block Heading',
        content: anyBlock.content || '<p>Add your content here.</p>',
        align: anyBlock.align || 'left',
      } as unknown as T;
      
    case 'features':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Features',
        features: anyBlock.features || [
          { id: uuidv4(), title: 'Feature 1', description: 'Description 1', icon: 'Star' },
          { id: uuidv4(), title: 'Feature 2', description: 'Description 2', icon: 'Star' },
          { id: uuidv4(), title: 'Feature 3', description: 'Description 3', icon: 'Star' },
        ],
      } as unknown as T;
      
    case 'benefits':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Benefits',
        benefits: anyBlock.benefits || [
          { id: uuidv4(), title: 'Benefit 1', description: 'Description 1' },
          { id: uuidv4(), title: 'Benefit 2', description: 'Description 2' },
          { id: uuidv4(), title: 'Benefit 3', description: 'Description 3' },
        ],
      } as unknown as T;
      
    case 'image':
      return {
        ...baseBlock,
        src: anyBlock.src || '',
        alt: anyBlock.alt || 'Image description',
        caption: anyBlock.caption || '',
        fullWidth: anyBlock.fullWidth !== undefined ? anyBlock.fullWidth : false,
      } as unknown as T;
      
    case 'gallery':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Gallery',
        images: anyBlock.images || [
          { id: uuidv4(), src: '', alt: 'Image 1', caption: '' },
          { id: uuidv4(), src: '', alt: 'Image 2', caption: '' },
          { id: uuidv4(), src: '', alt: 'Image 3', caption: '' },
        ],
      } as unknown as T;
      
    case 'imageText':
      return {
        ...baseBlock,
        imageSrc: anyBlock.imageSrc || '',
        alt: anyBlock.alt || 'Image description',
        heading: anyBlock.heading || 'Image + Text',
        content: anyBlock.content || '<p>Content goes here.</p>',
      } as unknown as T;
      
    case 'textImage':
      return {
        ...baseBlock,
        imageSrc: anyBlock.imageSrc || '',
        alt: anyBlock.alt || 'Image description',
        heading: anyBlock.heading || 'Text + Image',
        content: anyBlock.content || '<p>Content goes here.</p>',
      } as unknown as T;
      
    case 'specifications':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Specifications',
        specs: anyBlock.specs || [
          { id: uuidv4(), name: 'Spec 1', value: 'Value 1' },
          { id: uuidv4(), name: 'Spec 2', value: 'Value 2' },
          { id: uuidv4(), name: 'Spec 3', value: 'Value 3' },
        ],
      } as unknown as T;
      
    case 'faq':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Frequently Asked Questions',
        items: anyBlock.items || [
          { id: uuidv4(), question: 'Question 1?', answer: 'Answer 1' },
          { id: uuidv4(), question: 'Question 2?', answer: 'Answer 2' },
          { id: uuidv4(), question: 'Question 3?', answer: 'Answer 3' },
        ],
      } as unknown as T;
      
    case 'cta':
      return {
        ...baseBlock,
        heading: anyBlock.heading || 'Call to Action',
        content: anyBlock.content || 'Take action now.',
        buttonText: anyBlock.buttonText || 'Buy Now',
        buttonUrl: anyBlock.buttonUrl || '#',
        secondaryButtonText: anyBlock.secondaryButtonText || '',
        secondaryButtonUrl: anyBlock.secondaryButtonUrl || '',
      } as unknown as T;
      
    case 'video':
      return {
        ...baseBlock,
        videoUrl: anyBlock.videoUrl || '',
        title: anyBlock.title || 'Video Title',
        description: anyBlock.description || '',
        aspectRatio: anyBlock.aspectRatio || '16:9',
        autoplay: anyBlock.autoplay !== undefined ? anyBlock.autoplay : false,
      } as unknown as T;
      
    case 'videoText':
      return {
        ...baseBlock,
        videoUrl: anyBlock.videoUrl || '',
        aspectRatio: anyBlock.aspectRatio || '16:9',
        autoplay: anyBlock.autoplay !== undefined ? anyBlock.autoplay : false,
        muteAudio: anyBlock.muteAudio !== undefined ? anyBlock.muteAudio : true,
        heading: anyBlock.heading || 'Video + Text',
        content: anyBlock.content || '<p>Add your content here.</p>',
      } as unknown as T;
      
    case 'textVideo':
      return {
        ...baseBlock,
        videoUrl: anyBlock.videoUrl || '',
        aspectRatio: anyBlock.aspectRatio || '16:9',
        autoplay: anyBlock.autoplay !== undefined ? anyBlock.autoplay : false,
        muteAudio: anyBlock.muteAudio !== undefined ? anyBlock.muteAudio : true,
        heading: anyBlock.heading || 'Text + Video',
        content: anyBlock.content || '<p>Add your content here.</p>',
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
