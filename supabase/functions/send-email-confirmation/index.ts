
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL");

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailConfirmationRequest {
  email: string;
  confirmationToken: string;
  firstName: string;
  redirectUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: EmailConfirmationRequest = await req.json();
    const { email, confirmationToken, firstName, redirectUrl } = requestData;
    
    // Construct confirmation URL that points to our custom page
    const confirmationUrl = `${redirectUrl}?token=${encodeURIComponent(confirmationToken)}`;
    
    console.log("Enviando email de confirmação para:", email);
    console.log("URL de confirmação:", confirmationUrl);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Descrição Pro <noreply@descricaopro.com.br>",
      to: [email],
      subject: "🎉 Bem-vindo(a) ao Descrição Pro! Confirme sua conta",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirme sua conta - Descrição Pro</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              background-color: white;
              margin: 20px auto;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .header { 
              text-align: center;
              padding: 40px 20px 30px;
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .subtitle {
              font-size: 16px;
              opacity: 0.9;
              margin: 0;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .welcome-text {
              font-size: 24px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 16px;
            }
            .description {
              font-size: 16px;
              color: #6b7280;
              margin-bottom: 32px;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              transition: all 0.3s ease;
            }
            .button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
            }
            .features {
              background-color: #f8fafc;
              padding: 30px;
              margin: 30px 0;
              border-radius: 8px;
              text-align: left;
            }
            .features h3 {
              color: #1f2937;
              margin-bottom: 16px;
              font-size: 18px;
            }
            .feature-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              font-size: 14px;
              color: #4b5563;
            }
            .feature-icon {
              color: #3b82f6;
              margin-right: 8px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
              padding: 20px 30px 40px;
              border-top: 1px solid #e5e7eb;
            }
            .footer a {
              color: #3b82f6;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Descrição Pro</div>
              <p class="subtitle">Sua ferramenta profissional para descrições de produtos</p>
            </div>
            
            <div class="content">
              <h1 class="welcome-text">Olá${firstName ? `, ${firstName}` : ""}! 👋</h1>
              <p class="description">
                Que ótimo ter você conosco! Estamos animados para ajudá-lo a criar descrições de produtos 
                profissionais e impactantes que vão fazer seus produtos se destacarem.
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${confirmationUrl}" class="button">
                  ✨ Confirmar minha conta e começar
                </a>
              </div>
              
              <div class="features">
                <h3>🚀 O que você pode fazer com o Descrição Pro:</h3>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  Criar descrições profissionais com nossos blocos inteligentes
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  Usar templates prontos para diferentes categorias
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  Integrar diretamente com sua loja Nuvemshop
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  Otimizar para SEO e conversões
                </div>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                <strong>Importante:</strong> Este link de confirmação expira em 24 horas. 
                Se você não solicitou este cadastro, pode ignorar este e-mail com segurança.
              </p>
            </div>
            
            <div class="footer">
              <p>
                © ${new Date().getFullYear()} Descrição Pro. Todos os direitos reservados.<br>
                <a href="https://descricaopro.com.br">descricaopro.com.br</a> | 
                <a href="mailto:suporte@descricaopro.com.br">suporte@descricaopro.com.br</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Erro na função send-email-confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
