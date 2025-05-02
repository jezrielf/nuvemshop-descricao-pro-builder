
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
  const title = titleMatch ? titleMatch[1] : null;

  const hasMeta = /<meta\s+[^>]*name=["']description["'][^>]*>/i.test(html);
  const metaMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const metaDescription = metaMatch ? metaMatch[1] : null;

  const hasH1 = /<h1.*?>.*?<\/h1>/i.test(html);
  const h1Match = html.match(/<h1.*?>(.*?)<\/h1>/i);
  const h1Content = h1Match ? h1Match[1] : null;

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

  // Check images
  const images = (html.match(/<img[^>]+>/g) || []).map(img => {
    const srcMatch = img.match(/src=["'](.*?)["']/i);
    const altMatch = img.match(/alt=["'](.*?)["']/i);
    return {
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? altMatch[1] : null,
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
    }
  };
}
