
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Mail, AlertTriangle } from 'lucide-react';

const Auth: React.FC = () => {
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showActivationMessage, setShowActivationMessage] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const location = useLocation();
  const { toast } = useToast();
  
  // Se o usuário já estiver autenticado, redireciona para a página inicial
  if (user) {
    const from = location.state?.from || "/editor";
    return <Navigate to={from} />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      // Verificar se é erro de conta não confirmada
      if (error.message?.includes('email_not_confirmed') || 
          error.message?.includes('Email not confirmed') ||
          error.message?.includes('not confirmed')) {
        toast({
          variant: "destructive",
          title: "Conta não ativada",
          description: "Você precisa ativar sua conta através do e-mail enviado. Verifique sua caixa de entrada e spam.",
        });
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    
    try {
      const { data, error } = await authService.signUp(email, password, nome);

      if (error) {
        throw error;
      }

      // Sucesso no cadastro - mostrar mensagem de ativação
      setRegisteredEmail(email);
      setShowActivationMessage(true);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Enviamos um e-mail de confirmação. Verifique sua caixa de entrada.",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar cadastro",
        description: error.message,
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      const { error } = await authService.signUp(registeredEmail, password, nome);
      if (!error) {
        toast({
          title: "E-mail reenviado!",
          description: "Verifique sua caixa de entrada novamente.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao reenviar e-mail",
        description: "Tente novamente em alguns minutos.",
      });
    }
  };

  if (showActivationMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-brand-blue">Ative sua conta</CardTitle>
            <CardDescription>Quase pronto! Só falta um passo.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-300">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-800">E-mail de confirmação enviado!</AlertTitle>
              <AlertDescription className="text-blue-700">
                <p className="mb-2">
                  Enviamos um e-mail de confirmação para <strong>{registeredEmail}</strong>
                </p>
                <p className="text-sm">
                  Clique no link do e-mail para ativar sua conta e ser redirecionado automaticamente para o editor.
                </p>
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Não recebeu o e-mail? Verifique sua pasta de spam.
              </p>
              <Button 
                variant="outline" 
                onClick={handleResendEmail}
                className="w-full"
              >
                Reenviar e-mail de confirmação
              </Button>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant="ghost" 
              onClick={() => setShowActivationMessage(false)}
              className="w-full"
            >
              Voltar ao login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-blue">Descrição Pro</CardTitle>
          <CardDescription>Faça login ou crie uma conta para continuar</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processando...' : 'Entrar'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome</Label>
                  <Input
                    id="register-name"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={registerLoading}>
                  {registerLoading ? 'Processando...' : 'Criar Conta'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
