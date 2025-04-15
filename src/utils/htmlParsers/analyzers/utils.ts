
export const extractHeading = (element: Element): string | null => {
  const heading = element.querySelector('h1, h2, h3');
  return heading ? heading.textContent : null;
};

export const sanitizeHtmlContent = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '');
};

