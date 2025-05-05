import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService } from '@/services/auth';

const Auth: React.FC = () => {
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [unverifiedAccount, setUnverifiedAccount] = useState(false);
  const [resendingConfirmation, setResendingConfirmation] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // Se o usuário já estiver autenticado, redireciona para a página inicial
  if (user) {
    const from = location.state?.from || "/";
    return <Navigate to={from} />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Check for unverified email error
        if (error.message.includes('Email not confirmed') || error.message.includes('Email não confirmado')) {
          setUnverifiedAccount(true);
          return;
        }
        
        toast({
          variant: "destructive",
          title: "Erro ao realizar login",
          description: error.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar login",
        description: error.message,
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    
    try {
      // Custom signup with Supabase and custom confirmation email
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
          },
          emailRedirectTo: `${window.location.origin}/confirmar-email`,
        },
      });

      if (error) {
        throw error;
      }

      // Try to send custom confirmation email via our edge function
      if (data.user && data.session) {
        try {
          const result = await supabase.functions.invoke("send-email-confirmation", {
            body: {
              email: email,
              confirmationToken: data.session.access_token || "",
              firstName: nome,
              redirectUrl: `${window.location.origin}/confirmar-email`,
              type: 'confirmation',
            },
          });

          if (result.error) {
            console.error("Error sending custom email:", result.error);
            // If custom email fails, the default Supabase email will be sent
            // So we show a success message anyway
          }
        } catch (emailError) {
          console.error("Failed to send custom email:", emailError);
          // Default Supabase email will be sent
        }
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Enviamos um e-mail de confirmação para o endereço fornecido. Por favor, verifique sua caixa de entrada.",
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordLoading(true);
    
    try {
      const { data, error } = await authService.requestPasswordReset(resetPasswordEmail);
      
      if (error) {
        throw error;
      }
      
      setResetPasswordSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setResetPasswordOpen(false);
        setResetPasswordSuccess(false);
        setResetPasswordEmail('');
      }, 5000);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao solicitar redefinição de senha",
        description: error.message || "Ocorreu um erro ao solicitar a redefinição de senha. Tente novamente mais tarde.",
      });
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendingConfirmation(true);
    
    try {
      const { error } = await authService.resendConfirmationEmail(email);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "E-mail de confirmação reenviado",
        description: "Por favor, verifique sua caixa de entrada e confirme seu endereço de e-mail.",
      });
      
      setUnverifiedAccount(false);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao reenviar e-mail",
        description: error.message || "Ocorreu um erro ao reenviar o e-mail de confirmação. Tente novamente mais tarde.",
      });
    } finally {
      setResendingConfirmation(false);
    }
  };

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
                {unverifiedAccount && (
                  <Alert className="bg-amber-50 border-amber-300 text-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertDescription>
                      <p className="mb-2">Esta conta ainda não foi verificada. Por favor, confirme seu endereço de e-mail clicando no link que enviamos.</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-amber-300 text-amber-700 hover:bg-amber-100"
                        onClick={handleResendConfirmation}
                        disabled={resendingConfirmation}
                      >
                        {resendingConfirmation && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Reenviar e-mail de confirmação
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
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
                <div className="text-right">
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setResetPasswordOpen(true)}
                  >
                    Esqueci minha senha
                  </button>
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
      
      {/* Diálogo para redefinição de senha */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redefinir senha</DialogTitle>
            <DialogDescription>
              Digite seu e-mail para receber um link de redefinição de senha.
            </DialogDescription>
          </DialogHeader>
          
          {resetPasswordSuccess ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">E-mail enviado!</h3>
              <p className="text-gray-500">
                Enviamos um e-mail de redefinição de senha para {resetPasswordEmail}.
                Por favor, verifique sua caixa de entrada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setResetPasswordOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={resetPasswordLoading}>
                  {resetPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : 'Enviar link'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
