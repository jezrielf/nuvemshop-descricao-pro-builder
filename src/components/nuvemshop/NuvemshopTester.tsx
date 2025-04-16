
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const NuvemshopTester = () => {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTest = async () => {
    if (!code) {
      toast({
        title: "Código necessário",
        description: "Por favor, insira o código de autorização",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      console.log('🔄 Testando autenticação com código:', code);
      
      // Chamando a função Edge que simula o curl
      const { data, error } = await supabase.functions.invoke('nuvemshop-test-auth', {
        body: { code }
      });

      console.log('📊 Resposta:', data);

      if (error) {
        console.error('❌ Erro no teste:', error);
        toast({
          title: "Erro no teste",
          description: error.message || "Falha ao testar autenticação",
          variant: "destructive"
        });
        setResponse(JSON.stringify({ error: error.message }, null, 2));
        return;
      }

      if (data.error) {
        console.error('❌ Erro retornado pela API:', data.error);
        toast({
          title: "Erro da API Nuvemshop",
          description: data.error || "A API retornou um erro",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Teste bem-sucedido",
          description: "Conexão com a API Nuvemshop realizada"
        });
      }

      setResponse(JSON.stringify(data, null, 2));
      
    } catch (error) {
      console.error('❌ Exceção no teste:', error);
      toast({
        title: "Erro no teste",
        description: "Ocorreu um erro ao tentar testar a autenticação",
        variant: "destructive"
      });
      setResponse(JSON.stringify({ error: error.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Teste da API Nuvemshop</CardTitle>
        <CardDescription>
          Use esta ferramenta para testar diretamente a autenticação com a API da Nuvemshop
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="code">Código de autorização</Label>
          <Input
            id="code"
            placeholder="Insira o código de autorização"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Este é o código obtido após o redirecionamento da Nuvemshop (parâmetro code na URL)
          </p>
        </div>

        {response && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Label>Resultado</Label>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm max-h-80">
                {response}
              </pre>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleTest} 
          disabled={loading || !code}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testando...
            </>
          ) : (
            'Testar Autenticação'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NuvemshopTester;
