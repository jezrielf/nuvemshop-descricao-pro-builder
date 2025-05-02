
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Parse the request body
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Analyzing URL as Googlebot: ${url}`);

    // Make the request to the URL with Googlebot user agent
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    // Get response headers
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Get HTML content
    const html = await response.text();

    // Analyze the HTML content
    const analysis = analyzeHtml(html, headers);

    // Return the analysis results
    return new Response(JSON.stringify({
      status: response.status,
      headers: headers,
      html: html.substring(0, 10000), // Limit HTML size in response
      analysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error analyzing as Googlebot:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze URL', 
      details: error.message
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});

/**
 * Analyzes HTML content and headers like Googlebot would
 */
function analyzeHtml(html: string, headers: Record<string, string>) {
  // Check basic SEO elements
  const hasTitle = /<title>.*?<\/title>/i.test(html);
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1]) : null;

  const hasMeta = /<meta\s+[^>]*name=["']description["'][^>]*>/i.test(html);
  const metaMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const metaDescription = metaMatch ? decodeHtmlEntities(metaMatch[1]) : null;

  const hasH1 = /<h1.*?>.*?<\/h1>/i.test(html);
  const h1Match = html.match(/<h1.*?>(.*?)<\/h1>/i);
  const h1Content = h1Match ? decodeHtmlEntities(h1Match[1]) : null;

  // Check robots directives
  const robotsMatch = html.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["'](.*?)["']/i);
  const robotsMeta = robotsMatch ? robotsMatch[1] : null;
  const robotsHeader = headers['x-robots-tag'];

  // Check canonical
  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;

  // Check hreflang tags
  const hreflangMatches = html.match(/<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["'](.*?)["'][^>]*>/gi) || [];
  const hreflangs = hreflangMatches.map(match => {
    const langMatch = match.match(/hreflang=["'](.*?)["']/i);
    const urlMatch = match.match(/href=["'](.*?)["']/i);
    return {
      lang: langMatch ? langMatch[1] : null,
      url: urlMatch ? urlMatch[1] : null
    };
  });

  // Check mobile optimization
  const hasViewport = /<meta\s+[^>]*name=["']viewport["'][^>]*>/i.test(html);
  const viewportMatch = html.match(/<meta\s+[^>]*name=["']viewport["'][^>]*content=["'](.*?)["']/i);
  const viewport = viewportMatch ? viewportMatch[1] : null;

  // Check structured data
  const structuredDataMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  const structuredData = structuredDataMatches.map(match => {
    const contentMatch = match.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    try {
      if (contentMatch && contentMatch[1]) {
        const parsed = JSON.parse(contentMatch[1]);
        return {
          valid: true,
          type: parsed["@type"] || null,
          data: parsed
        };
      }
      return { valid: false, type: null, data: null };
    } catch (e) {
      return { valid: false, type: null, data: null, error: e.message };
    }
  });

  // Check images - extract and decode alt text
  const images = (html.match(/<img[^>]+>/g) || []).map(img => {
    const srcMatch = img.match(/src=["'](.*?)["']/i);
    const altMatch = img.match(/alt=["'](.*?)["']/i);
    return {
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? decodeHtmlEntities(altMatch[1]) : null,
      hasAlt: altMatch !== null
    };
  });

  // Check links
  const links = (html.match(/<a[^>]+>/g) || []).map(a => {
    const hrefMatch = a.match(/href=["'](.*?)["']/i);
    return {
      href: hrefMatch ? hrefMatch[1] : null
    };
  });

  // Check performance indicators (rough estimates)
  const htmlSize = html.length;
  const loadTimeEstimate = Math.round((htmlSize / 1024) * 0.05 * 10) / 10; // Very rough estimate

  // Extract clean text content for keyword analysis
  const textContent = extractTextContent(html);
  
  // Extract keywords
  const keywords = analyzeKeywords(textContent);

  return {
    title: {
      exists: hasTitle,
      content: title,
      length: title ? title.length : 0
    },
    metaDescription: {
      exists: hasMeta,
      content: metaDescription,
      length: metaDescription ? metaDescription.length : 0
    },
    h1: {
      exists: hasH1,
      content: h1Content
    },
    robots: {
      meta: robotsMeta,
      header: robotsHeader
    },
    canonical: canonical,
    hreflangs: hreflangs,
    mobile: {
      hasViewport: hasViewport,
      viewport: viewport
    },
    structuredData: {
      count: structuredDataMatches.length,
      items: structuredData
    },
    images: {
      count: images.length,
      withoutAlt: images.filter(img => !img.hasAlt).length
    },
    links: {
      count: links.length,
      externalCount: links.filter(link => link.href && link.href.startsWith('http')).length
    },
    performance: {
      htmlSize: htmlSize,
      estimatedLoadTime: loadTimeEstimate
    },
    keywords: keywords
  };
}

/**
 * Extracts text content from HTML
 */
function extractTextContent(html: string): string {
  // Create a clean version of HTML for text extraction
  let cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
                      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
                      .replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  cleanHtml = decodeHtmlEntities(cleanHtml);
  
  // Normalize whitespace
  return cleanHtml.replace(/\s+/g, ' ').trim();
}

/**
 * Decodes HTML entities in a string
 */
function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  
  // Common HTML entities map
  const htmlEntities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&aacute;': 'á',
    '&eacute;': 'é',
    '&iacute;': 'í',
    '&oacute;': 'ó',
    '&uacute;': 'ú',
    '&ccedil;': 'ç',
    '&atilde;': 'ã',
    '&otilde;': 'õ',
    '&ntilde;': 'ñ',
    '&acirc;': 'â',
    '&ecirc;': 'ê',
    '&ocirc;': 'ô'
  };

  // Replace known entities
  let decoded = text;
  Object.entries(htmlEntities).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  });
  
  // Handle numeric HTML entities
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  return decoded;
}

/**
 * Analyzes keywords from text content
 */
function analyzeKeywords(text: string) {
  // Portuguese stopwords
  const stopwords = new Set([
    'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até',
    'com', 'como', 'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois',
    'do', 'dos', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era',
    'eram', 'éramos', 'essa', 'essas', 'esse', 'esses', 'esta', 'estas', 'este', 'estes',
    'eu', 'foi', 'fomos', 'for', 'foram', 'forem', 'formos', 'fosse', 'fossem', 'fôssemos',
    'há', 'haja', 'hajam', 'hajamos', 'hão', 'havemos', 'haver', 'hei', 'houve', 'houvemos',
    'houver', 'houverá', 'houverão', 'houverem', 'houveremos', 'houveria', 'houveriam', 'houveríamos', 'houvermos', 'houvesse',
    'houvessem', 'houvéssemos', 'isso', 'isto', 'já', 'lhe', 'lhes', 'mais', 'mas', 'me',
    'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'na', 'não', 'nas', 'nem',
    'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa', 'o',
    'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'por', 'qual', 'quando',
    'que', 'quem', 'se', 'seja', 'sejam', 'sejamos', 'sem', 'será', 'serão', 'serei',
    'seremos', 'seria', 'seriam', 'seríamos', 'seu', 'seus', 'só', 'somos', 'são', 'sua',
    'suas', 'também', 'te', 'tem', 'têm', 'temos', 'tenha', 'tenham', 'tenhamos', 'tenho',
    'terá', 'terão', 'terei', 'teremos', 'teria', 'teriam', 'teríamos', 'teu', 'teus', 'teve',
    'tinha', 'tinham', 'tínhamos', 'tive', 'tivemos', 'tiver', 'tivera', 'tiveram', 'tiverem', 'tivermos',
    'tivesse', 'tivessem', 'tivéssemos', 'tu', 'tua', 'tuas', 'um', 'uma', 'você', 'vocês',
    'vos', 'vós'
  ]);
  
  // Extract words
  const words = text.toLowerCase()
    .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopwords.has(word));
  
  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Sort by frequency and get top 10
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: words.length ? (count / words.length) * 100 : 0
    }));
}
