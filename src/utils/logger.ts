type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEvent {
  level: LogLevel;
  action: string;
  data?: any;
  timestamp: string;
  component?: string;
}

class Logger {
  private events: LogEvent[] = [];
  private maxEvents = 1000;

  log(level: LogLevel, action: string, data?: any, component?: string) {
    const event: LogEvent = {
      level,
      action,
      data,
      component,
      timestamp: new Date().toISOString()
    };

    this.events.push(event);
    
    // Keep only the last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Console output in development
    if (process.env.NODE_ENV === 'development') {
      const prefix = `[${level.toUpperCase()}] ${component || 'App'}:`;
      const message = `${action}${data ? ` | ${JSON.stringify(data)}` : ''}`;
      
      switch (level) {
        case 'error':
          console.error(prefix, message);
          break;
        case 'warn':
          console.warn(prefix, message);
          break;
        case 'debug':
          console.debug(prefix, message);
          break;
        default:
          console.info(prefix, message);
      }
    }
  }

  info(action: string, data?: any, component?: string) {
    this.log('info', action, data, component);
  }

  warn(action: string, data?: any, component?: string) {
    this.log('warn', action, data, component);
  }

  error(action: string, data?: any, component?: string) {
    this.log('error', action, data, component);
  }

  debug(action: string, data?: any, component?: string) {
    this.log('debug', action, data, component);
  }

  getEvents(level?: LogLevel, component?: string): LogEvent[] {
    return this.events.filter(event => 
      (!level || event.level === level) &&
      (!component || event.component === component)
    );
  }

  clear() {
    this.events = [];
  }
}

export const logger = new Logger();

// Template Builder specific loggers
export const templateBuilderLogger = {
  blockAdded: (blockType: string, blockId: string) => 
    logger.info('block_added', { blockType, blockId }, 'TemplateBuilder'),
  
  blockUpdated: (blockId: string, updates: any) => 
    logger.info('block_updated', { blockId, updates }, 'TemplateBuilder'),
  
  blockDeleted: (blockId: string) => 
    logger.info('block_deleted', { blockId }, 'TemplateBuilder'),
  
  blockReordered: (fromIndex: number, toIndex: number) => 
    logger.info('block_reordered', { fromIndex, toIndex }, 'TemplateBuilder'),
  
  undoAction: () => 
    logger.info('undo_action', {}, 'TemplateBuilder'),
  
  redoAction: () => 
    logger.info('redo_action', {}, 'TemplateBuilder'),
  
  presetApplied: (presetId: string, target: 'template' | 'block') => 
    logger.info('preset_applied', { presetId, target }, 'TemplateBuilder'),
  
  seoSuggestionApplied: (suggestion: string) => 
    logger.info('seo_suggestion_applied', { suggestion }, 'TemplateBuilder'),
  
  templateSaved: (templateId: string, isNew: boolean) => 
    logger.info('template_saved', { templateId, isNew }, 'TemplateBuilder'),
  
  error: (action: string, error: any) => 
    logger.error(action, { error: error.message || error }, 'TemplateBuilder')
};
