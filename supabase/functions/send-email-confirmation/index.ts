
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
    
    console.log("Sending confirmation email to:", email);
    console.log("Confirmation URL:", confirmationUrl);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Descrição Pro <noreply@descricaopro.com.br>",
      to: [email],
      subject: "Confirme seu cadastro no Descrição Pro",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirme seu cadastro</title>
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
            <p>Obrigado por se cadastrar no Descrição Pro. Para começar a usar nossa plataforma, confirme seu e-mail clicando no botão abaixo:</p>
            <div style="text-align: center;">
              <a href="${confirmationUrl}" class="button">Confirmar meu e-mail</a>
            </div>
            <p>Se você não solicitou esse cadastro, pode ignorar este e-mail.</p>
            <p>O link de confirmação expira em 24 horas.</p>
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
