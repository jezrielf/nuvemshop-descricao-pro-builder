
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Todos os templates estáticos que precisam ser migrados
const staticTemplates = [
  {
    name: 'Suplementos Premium',
    category: 'supplements',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Potencialize seus resultados',
          subtitle: 'Descubra o poder dos suplementos premium',
          buttonText: 'Saiba Mais'
        }
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        content: {
          items: [
            'Melhora no desempenho físico',
            'Recuperação mais rápida',
            'Energia aumentada'
          ]
        }
      }
    ]
  },
  {
    name: 'Eletrônicos Premium',
    category: 'electronics',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Tecnologia de ponta',
          subtitle: 'Produtos eletrônicos com qualidade garantida',
          buttonText: 'Ver Produtos'
        }
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        content: {
          specs: {
            'Garantia': '2 anos',
            'Origem': 'Original',
            'Certificação': 'Anatel'
          }
        }
      }
    ]
  },
  {
    name: 'Moda Fashion',
    category: 'clothing',
    blocks: [
      {
        id: 'hero-3',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Estilo e elegância',
          subtitle: 'Roupas que definem personalidade',
          buttonText: 'Descobrir'
        }
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria',
        content: {
          images: []
        }
      }
    ]
  },
  {
    name: 'Calçados Premium',
    category: 'shoes',
    blocks: [
      {
        id: 'hero-4',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Pisadas confortáveis',
          subtitle: 'Calçados de alta qualidade',
          buttonText: 'Ver Coleção'
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características',
        content: {
          features: [
            {
              title: 'Conforto',
              description: 'Material macio e adaptável'
            },
            {
              title: 'Durabilidade',
              description: 'Resistente ao uso diário'
            }
          ]
        }
      }
    ]
  },
  {
    name: 'Acessórios Exclusivos',
    category: 'accessories',
    blocks: [
      {
        id: 'hero-5',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Detalhes que fazem a diferença',
          subtitle: 'Acessórios únicos e especiais',
          buttonText: 'Explorar'
        }
      }
    ]
  },
  {
    name: 'Casa e Decoração Premium',
    category: 'Casa e decoração',
    blocks: [
      {
        id: 'hero-6',
        type: 'hero',
        title: 'Banner Principal',
        content: {
          title: 'Transforme seu espaço',
          subtitle: 'Decoração que inspira',
          buttonText: 'Descobrir'
        }
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Sobre o Produto',
        content: {
          text: 'Produtos de decoração cuidadosamente selecionados para criar ambientes únicos e aconchegantes.'
        }
      }
    ]
  }
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Iniciando migração de templates...');

    // Verificar se já existem templates no banco
    const { data: existingTemplates, error: checkError } = await supabaseClient
      .from('templates')
      .select('name')
      .limit(1);

    if (checkError) {
      console.error('Erro ao verificar templates existentes:', checkError);
      throw checkError;
    }

    // Se já existem templates, não migrar novamente
    if (existingTemplates && existingTemplates.length > 0) {
      console.log('Templates já existem no banco, pulando migração');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Templates já existem no banco de dados',
          count: existingTemplates.length 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Migrar templates estáticos
    const migratedTemplates = [];
    
    for (const template of staticTemplates) {
      try {
        const { data, error } = await supabaseClient
          .from('templates')
          .insert({
            name: template.name,
            category: template.category,
            blocks: template.blocks,
            user_id: null // Templates do sistema não têm dono específico
          })
          .select()
          .single();

        if (error) {
          console.error(`Erro ao inserir template ${template.name}:`, error);
          continue;
        }

        migratedTemplates.push(data);
        console.log(`Template migrado: ${template.name}`);
      } catch (err) {
        console.error(`Erro inesperado ao migrar ${template.name}:`, err);
      }
    }

    console.log(`Migração concluída. ${migratedTemplates.length} templates migrados.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${migratedTemplates.length} templates migrados com sucesso`,
        templates: migratedTemplates 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Erro na migração:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
