
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { headings, productTitle = null, content = null, keywords = [] } = await req.json();
    
    if (!Array.isArray(headings)) {
      throw new Error('Headings must be an array');
    }

    // Prepare OpenAI prompt with structure information
    const prompt = `
      Você é um especialista em SEO e estrutura de headings para e-commerce. Analise a estrutura de headings abaixo e forneça feedback:
      
      ${productTitle ? `Título do produto: ${productTitle} (será usado como H1)` : ''}
      
      Headings atuais:
      ${headings.map(h => `H${h.level}: ${h.text}`).join('\n')}
      
      ${content ? `\nConteúdo adicional da descrição:\n${content}` : ''}
      
      ${keywords.length > 0 ? `\nPalavras-chave importantes: ${keywords.join(', ')}` : ''}
      
      Forneça uma análise detalhada seguindo este formato JSON:
      {
        "analysis": {
          "strengths": [], // Pontos fortes da estrutura atual
          "weaknesses": [], // Problemas na estrutura atual
          "seoScore": 0, // Pontuação de 0 a 100
          "isHierarchyValid": true/false, // Se a hierarquia está correta (sem pular níveis)
          "keywordUsage": "good/poor/excellent", // Uso de palavras-chave nos headings
          "detailedFeedback": "" // Feedback detalhado sobre a estrutura
        },
        "suggestions": [
          {
            "level": 1, // Nível do heading (1,2,3,4)
            "text": "", // Texto sugerido para o heading
            "original": "", // Texto original (deixar em branco se for novo)
            "reasoning": "" // Explicação do motivo da sugestão
          }
        ],
        "autoCorrect": [
          {
            "level": 1, // Nível do heading
            "text": "", // Texto corrigido para o heading
            "original": "", // Texto original
            "action": "add/modify/remove/reorder", // Ação recomendada
            "explanation": "" // Explicação da correção
          }
        ]
      }
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert SEO assistant specialized in analyzing heading structure for e-commerce product descriptions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse JSON response from AI
    let parsedResponse;
    try {
      // Find and extract the JSON part from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error('Failed to parse OpenAI response as JSON:', e);
      console.log('Raw response:', aiResponse);
      
      // Return a formatted error response
      return new Response(
        JSON.stringify({
          error: 'Failed to parse AI response',
          rawResponse: aiResponse
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Cache the results (optional, for future implementation)
    // This would reduce API calls for similar heading structures

    return new Response(
      JSON.stringify({
        analysis: parsedResponse.analysis,
        suggestions: parsedResponse.suggestions,
        autoCorrect: parsedResponse.autoCorrect,
        rawResponse: aiResponse // For debugging
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-headings function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
