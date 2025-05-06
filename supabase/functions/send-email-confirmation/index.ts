
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
  type?: 'confirmation' | 'reset_password';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: EmailConfirmationRequest = await req.json();
    const { email, confirmationToken, firstName, redirectUrl, type = 'confirmation' } = requestData;
    
    // Construct appropriate URL and email content based on type
    let confirmationUrl = '';
    let subject = '';
    let title = '';
    let buttonText = '';
    let mainMessage = '';
    let expirationMessage = '';
    
    if (type === 'reset_password') {
      confirmationUrl = `${redirectUrl}?type=recovery`;
      subject = "Redefinição de Senha - Descrição Pro";
      title = "Redefinição de Senha";
      buttonText = "Criar nova senha";
      mainMessage = "Você solicitou a redefinição da sua senha no Descrição Pro. Clique no botão abaixo para criar uma nova senha:";
      expirationMessage = "O link de redefinição expira em 24 horas.";
    } else {
      // Default is 'confirmation'
      confirmationUrl = `${redirectUrl}?token=${encodeURIComponent(confirmationToken)}`;
      subject = "Confirme seu cadastro no Descrição Pro";
      title = "Confirme seu cadastro";
      buttonText = "Confirmar meu e-mail";
      mainMessage = "Obrigado por se cadastrar no Descrição Pro. Para começar a usar nossa plataforma, confirme seu e-mail clicando no botão abaixo:";
      expirationMessage = "O link de confirmação expira em 24 horas.";
    }
    
    console.log(`Sending ${type} email to:`, email);
    console.log("URL:", confirmationUrl);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Descrição Pro <noreply@descricaopro.com.br>",
      to: [email],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header { 
              text-align: center;
              padding: 20px 0;
              background-color: #3b82f6;
              color: white;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              background-color: #f9fafb;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              background-color: #3b82f6;
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 4px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Descrição Pro</h1>
          </div>
          <div class="content">
            <h2>Olá${firstName ? `, ${firstName}` : ""}!</h2>
            <p>${mainMessage}</p>
            <div style="text-align: center;">
              <a href="${confirmationUrl}" class="button">${buttonText}</a>
            </div>
            <p>${type === 'reset_password' ? 'Se você não solicitou essa redefinição de senha, pode ignorar este e-mail.' : 'Se você não solicitou esse cadastro, pode ignorar este e-mail.'}</p>
            <p>${expirationMessage}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Descrição Pro. Todos os direitos reservados.</p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent response:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-email-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
