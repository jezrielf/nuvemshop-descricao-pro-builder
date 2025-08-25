
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
    const requestData = await req.json();
    // Limit perPage to 200 which is the maximum allowed by Nuvemshop API
    const { accessToken, userId, page = 1, perPage = 200 } = requestData;

    if (!accessToken || !userId) {
      return new Response(JSON.stringify({ error: 'Access token and user ID are required' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Fetching products for user ID: ${userId}`);
    console.log(`Using access token: ${accessToken.substring(0, 5)}...`);
    console.log(`Page: ${page}, Per Page: ${perPage}`);

    // Make the request to Nuvemshop API with proper headers and pagination
    // Use the direct URL format for better clarity
    const apiUrl = `https://api.tiendanube.com/v1/${userId}/products?per_page=${perPage}&page=${page}`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'DescricaoPro comercial@weethub.com',
        'Content-Type': 'application/json',
      },
    });

    // Log response details for debugging
    console.log('Response status:', response.status);
    
    // Extract pagination info from headers
    const totalCount = parseInt(response.headers.get('X-Total-Count') || '0');
    const linkHeader = response.headers.get('Link');
    
    console.log('Raw headers:', {
      'X-Total-Count': response.headers.get('X-Total-Count'),
      'Link': linkHeader
    });
    console.log('Total products in store:', totalCount);
    
    // Parse Link header into object
    const parseLinks = (linkHeader: string | null) => {
      const links: {
        next?: { url: string; page: number };
        prev?: { url: string; page: number };
        first?: { url: string; page: number };
        last?: { url: string; page: number };
      } = {};
      
      if (!linkHeader) return links;
      
      const linkRegex = /<([^>]+)>;\s*rel="([^"]+)"/g;
      let match;
      
      while ((match = linkRegex.exec(linkHeader)) !== null) {
        const url = match[1];
        const rel = match[2];
        const pageMatch = url.match(/[?&]page=(\d+)/);
        const pageNum = pageMatch ? parseInt(pageMatch[1]) : 1;
        
        if (rel === 'next' || rel === 'prev' || rel === 'first' || rel === 'last') {
          links[rel as keyof typeof links] = { url, page: pageNum };
        }
      }
      
      return links;
    };
    
    const links = parseLinks(linkHeader);
    console.log('Parsed links:', JSON.stringify(links, null, 2));
    
    const responseText = await response.text();
    console.log('Response preview:', responseText.substring(0, 200) + '...');

    if (!response.ok) {
      console.error('Error response from Nuvemshop API:', responseText);
      
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch products from Nuvemshop', 
        details: responseText,
        status: response.status
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    try {
      // Parse JSON response
      const products = JSON.parse(responseText);
      console.log('Successfully fetched products from Nuvemshop');
      console.log('Number of products:', Array.isArray(products) ? products.length : 'not an array');

      // Calculate pagination metadata with robust fallbacks
      let calculatedTotalPages: number;
      let calculatedTotal: number;
      
      if (totalCount > 0) {
        calculatedTotalPages = Math.ceil(totalCount / perPage);
        calculatedTotal = totalCount;
      } else if (links.last) {
        calculatedTotalPages = links.last.page;
        calculatedTotal = (links.last.page - 1) * perPage + (Array.isArray(products) ? products.length : 0);
      } else if (links.next) {
        calculatedTotalPages = page + 1; // At least one more page
        calculatedTotal = page * perPage + (Array.isArray(products) ? products.length : 0);
      } else {
        calculatedTotalPages = page;
        calculatedTotal = (page - 1) * perPage + (Array.isArray(products) ? products.length : 0);
      }

      // Calculate hasNext and hasPrev with multiple fallback strategies
      const hasNext = !!(
        links.next || 
        (page < calculatedTotalPages) || 
        (Array.isArray(products) && products.length === perPage)
      );
      
      const hasPrev = !!(links.prev || (page > 1));

      const paginationResponse = {
        items: products,
        page,
        perPage,
        total: calculatedTotal,
        totalPages: calculatedTotalPages,
        hasNext,
        hasPrev,
        links
      };

      console.log('Calculated pagination:', {
        page,
        perPage,
        total: calculatedTotal,
        totalPages: calculatedTotalPages,
        hasNext,
        hasPrev,
        itemsReturned: Array.isArray(products) ? products.length : 0
      });

      return new Response(JSON.stringify(paginationResponse), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Failed to parse Nuvemshop API response', 
        details: responseText 
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
