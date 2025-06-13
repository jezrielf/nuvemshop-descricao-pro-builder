
/**
 * Utilitário para criar cópias profundas de objetos complexos
 * Resolve o problema de referências compartilhadas em arrays aninhados
 */

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
};

/**
 * Garante que cada item em um array tenha um ID único
 */
export const ensureUniqueIds = <T extends { id?: string }>(
  items: T[], 
  generateId: () => string
): (T & { id: string })[] => {
  return items.map(item => ({
    ...item,
    id: item.id || generateId()
  }));
};
