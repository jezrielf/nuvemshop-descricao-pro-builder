
import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, FileText, Plus } from 'lucide-react';
import UserButton from './UserButton';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { description, createNewDescription, getHtmlOutput } = useEditorStore();
  const [newDescriptionName, setNewDescriptionName] = React.useState('');
  const [showHtmlDialog, setShowHtmlDialog] = React.useState(false);
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleCreateNew = () => {
    if (!newDescriptionName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a descrição.",
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
