
export const findExplicitSections = (container: Element): Element[] => {
  const sections: Element[] = [];
  
  const sectionElements = container.querySelectorAll('section, div, article, aside, main');
  
  Array.from(sectionElements).forEach(element => {
    const isDirectChild = element.parentElement === container;
    const hasContent = element.textContent && element.textContent.trim().length > 30;
    const hasImage = element.querySelector('img') !== null;
    const hasSection = element.classList.contains('section') || 
                     element.classList.contains('block') ||
                     element.classList.contains('container');
                     
    if ((isDirectChild && (hasContent || hasImage)) || hasSection) {
      sections.push(element);
    }
  });
  
  return sections;
};

export const findCommonStructures = (container: Element): Element[] => {
  const structures: Element[] = [];
  const headings = container.querySelectorAll('h1, h2, h3');
  
  if (headings.length === 0) {
    return structures;
  }
  
  headings.forEach((heading, index) => {
    const nextHeading = headings[index + 1];
    const sectionElement = document.createElement('div');
    sectionElement.appendChild(heading.cloneNode(true));
    
    let current = heading.nextElementSibling;
    while (current && current !== nextHeading) {
      sectionElement.appendChild(current.cloneNode(true));
      current = current.nextElementSibling;
    }
    
    if (sectionElement.textContent && sectionElement.textContent.trim().length > 20) {
      structures.push(sectionElement);
    }
  });
  
  return structures;
};
