import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, FileText, Plus, Save, Lock, ListTodo, BadgeAlert } from 'lucide-react';
import UserButton from './UserButton';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { description, createNewDescription, getHtmlOutput, saveCurrentDescription, loadSavedDescriptions, savedDescriptions, setAuthContext } = useEditorStore();
  const [newDescriptionName, setNewDescriptionName] = React.useState('');
  const [showHtmlDialog, setShowHtmlDialog] = React.useState(false);
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const [showSavedDialog, setShowSavedDialog] = React.useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isPremium, descriptionCount, canCreateMoreDescriptions } = auth;
  
  // Set auth context in the store when component mounts
  useEffect(() => {
    setAuthContext(auth);
  }, [auth, setAuthContext]);
  
  useEffect(() => {
    // Load saved descriptions when component mounts
    loadSavedDescriptions();
  }, [loadSavedDescriptions]);
  
  const handleCreateNew = () => {
    if (!newDescriptionName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a descrição.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user can create more descriptions
    if (!canCreateMoreDescriptions()) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para o plano premium para criar mais.",
        variant: "destructive",
      });
      return;
    }
    
    createNewDescription(newDescriptionName);
    setNewDescriptionName('');
    setShowNewDialog(false);
    
    toast({
      title: "Descrição criada",
      description: "Nova descrição de produto iniciada com sucesso!",
    });
  };
  
  const handleSaveDescription = () => {
    if (!description) {
      toast({
        title: "Nenhuma descrição ativa",
        description: "Crie uma nova descrição primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    const saved = saveCurrentDescription();
    
    if (saved) {
      toast({
        title: "Descrição salva",
        description: "Sua descrição foi salva com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao salvar",
        description: isPremium() 
          ? "Ocorreu um erro ao salvar a descrição." 
          : "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para o plano premium.",
        variant: "destructive",
      });
    }
  };
  
  const htmlOutput = getHtmlOutput();
  
  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };
  
  return (
    <header className="border-b bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-brand-blue">Descrição Pro</h1>
          {description && (
            <span className="text-sm text-gray-500">
              Editando: <span className="font-medium text-gray-700">{description.name}</span>
            </span>
          )}
          
          {!isPremium() && (
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
              <BadgeAlert className="mr-1 h-3 w-3" />
              Modo Grátis ({descriptionCount}/3)
            </Badge>
          )}
          
          {isPremium() && (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-300">
              <Badge className="mr-1 h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Nova Descrição
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Descrição de Produto</DialogTitle>
                <DialogDescription>
                  Crie uma nova descrição para seu produto na Nuvemshop.
                  {!isPremium() && (
                    <div className="mt-2 text-yellow-600 text-sm flex items-center">
                      <BadgeAlert className="mr-1 h-4 w-4" />
                      Você usou {descriptionCount}/3 descrições gratuitas.
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="name">Nome da Descrição</Label>
                <Input
                  id="name"
                  value={newDescriptionName}
                  onChange={(e) => setNewDescriptionName(e.target.value)}
                  placeholder="Ex: Descrição Whey Protein Premium"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateNew}>Criar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={handleSaveDescription}
            disabled={!description}
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Descrição
            {!isPremium() && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
          </Button>
          
          <Dialog open={showSavedDialog} onOpenChange={setShowSavedDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <ListTodo className="mr-2 h-4 w-4" />
                Descrições Salvas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suas Descrições Salvas</DialogTitle>
                <DialogDescription>
                  Selecione uma descrição para continuar editando.
                  {!isPremium() && (
                    <div className="mt-2 text-yellow-600 text-sm flex items-center">
                      <BadgeAlert className="mr-1 h-4 w-4" />
                      Você usou {descriptionCount}/3 descrições gratuitas.
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {savedDescriptions.length > 0 ? (
                  <div className="space-y-2">
                    {savedDescriptions.map((desc) => (
                      <div 
                        key={desc.id} 
                        className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          useEditorStore.getState().loadDescription(desc);
                          setShowSavedDialog(false);
                        }}
                      >
                        <div>
                          <p className="font-medium">{desc.name}</p>
                          <p className="text-xs text-gray-500">
                            Atualizado em: {new Date(desc.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {desc.blocks.length} blocos
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma descrição salva ainda.
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          {description && (
            <Dialog open={showHtmlDialog} onOpenChange={setShowHtmlDialog}>
              <DialogTrigger asChild>
                <Button variant="default" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver HTML
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Código HTML para Nuvemshop</DialogTitle>
                  <DialogDescription>
                    Copie este código HTML e cole diretamente na descrição do seu produto na Nuvemshop.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="relative">
                    <Textarea
                      className="min-h-[300px] font-mono text-xs"
                      readOnly
                      value={htmlOutput}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-2"
                      onClick={copyHtmlToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
