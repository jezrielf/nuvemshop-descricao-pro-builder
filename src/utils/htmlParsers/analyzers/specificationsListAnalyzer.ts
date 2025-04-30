
import { v4 as uuidv4 } from 'uuid';
import { Block } from '@/types/editor';

/**
 * Processa listas de especificações ou instruções de cuidados em HTML
 * e converte em um bloco de especificações estruturado
 */
export const processSpecificationsFromList = (element: Element, blocks: Block[]): void => {
  // Determinar o título da seção
  let sectionTitle = 'Especificações do Produto';
  
  // Tentar encontrar um título mais adequado baseado no conteúdo
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length > 0) {
    const firstHeading = headings[0].textContent?.trim();
    if (firstHeading) {
      sectionTitle = firstHeading;
    }
  } else if (element.textContent?.includes('Cuidados')) {
    sectionTitle = 'Cuidados com o Produto';
  } else if (element.textContent?.includes('Instruções')) {
    sectionTitle = 'Instruções de Uso';
  }
  
  // Extrair pares de especificação
  const specs: Array<{id: string, name: string, value: string}> = [];
  
  // Primeiro procura por uma lista explícita
  const listItems = element.querySelectorAll('li');
  
  if (listItems.length > 0) {
    // Processar itens de lista
    listItems.forEach(item => {
      const text = item.textContent?.trim() || '';
      
      // Verificar se o item tem um formato "nome: valor"
      const colonMatch = text.match(/^(.*?):\s*(.*)/);
      if (colonMatch && colonMatch[1] && colonMatch[2]) {
        specs.push({
          id: uuidv4(),
          name: colonMatch[1].trim(),
          value: colonMatch[2].trim()
        });
      } else {
        // Se não tiver ":", trata como uma instrução simples
        specs.push({
          id: uuidv4(),
          name: text,
          value: ''
        });
      }
    });
  } else {
    // Se não tem lista, procura por parágrafos que podem ser instruções
    const paragraphs = element.querySelectorAll('p');
    
    if (paragraphs.length > 0) {
      paragraphs.forEach(p => {
        const text = p.textContent?.trim() || '';
        if (text) {
          // Verificar se é uma repetição da mesma informação ou o título
          if (!specs.some(s => s.name === text) && 
              text !== sectionTitle &&
              !text.includes('check')) {
            
            const colonMatch = text.match(/^(.*?):\s*(.*)/);
            if (colonMatch && colonMatch[1] && colonMatch[2]) {
              specs.push({
                id: uuidv4(),
                name: colonMatch[1].trim(),
                value: colonMatch[2].trim()
              });
            } else {
              // Sem dois pontos, tratamos como uma especificação simples
              specs.push({
                id: uuidv4(),
                name: text,
                value: ''
              });
            }
          }
        }
      });
    }
  }
  
  // Se não encontramos em listas ou parágrafos, tenta dividir o texto em linhas
  if (specs.length === 0) {
    const text = element.textContent || '';
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    // Ignora as primeiras linhas se forem títulos
    const startIndex = lines.findIndex(line => 
      !line.includes('Especificações') && 
      !line.includes('Cuidados') && 
      !line.includes('Instruções') &&
      !line.includes('check')
    );
    
    if (startIndex !== -1) {
      lines.slice(startIndex).forEach(line => {
        // Processa cada linha como uma instrução
        if (line && !line.includes('check')) {
          const colonMatch = line.match(/^(.*?):\s*(.*)/);
          if (colonMatch && colonMatch[1] && colonMatch[2]) {
            specs.push({
              id: uuidv4(),
              name: colonMatch[1].trim(),
              value: colonMatch[2].trim()
            });
          } else {
            // Sem dois pontos, tratamos como uma especificação simples
            specs.push({
              id: uuidv4(),
              name: line,
              value: ''
            });
          }
        }
      });
    }
  }
  
  // Só cria o bloco se tiver especificações
  if (specs.length > 0) {
    // Criar um bloco de especificações
    const specsBlock: Block = {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações',
      heading: sectionTitle,
      visible: true,
      columns: 'full',
      style: {},
      specs: specs.map(spec => ({
        id: spec.id,
        name: spec.name.replace(/^check\s*/, ''), // Remove qualquer "check" restante
        value: spec.value
      }))
    };
    
    blocks.push(specsBlock);
  } else {
    // Se não conseguimos extrair especificações, volta para o processamento padrão
    console.log('Não foi possível extrair especificações da lista, usando método padrão');
  }
};
