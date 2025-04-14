
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { CopyCheck, ExternalLink, InfoIcon, ShoppingBag } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NuvemshopIntegrationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NuvemshopIntegrationDialog: React.FC<NuvemshopIntegrationDialogProps> = ({ 
  isOpen, 
  onOpenChange
}) => {
  const { getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  const [storeUrl, setStoreUrl] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');
  
  const handleCopyHtml = () => {
    const htmlOutput = getHtmlOutput();
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };
  
  const handleExportToNuvemshop = () => {
    setIsExporting(true);
    
    // Simulate API call to Nuvemshop
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Integração simulada",
        description: "Esta é uma simulação de integração. Para uma integração real, seria necessário configurar a API da Nuvemshop.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
            Integração com Nuvemshop
          </DialogTitle>
          <DialogDescription>
            Exporte sua descrição de produto diretamente para a Nuvemshop ou copie o código HTML.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Exportação Manual</TabsTrigger>
            <TabsTrigger value="api">API Nuvemshop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4 mt-4">
            <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Copie o código HTML e cole na descrição do seu produto na Nuvemshop manualmente.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-4">
              <Button
                variant="default"
                className="w-full"
                onClick={handleCopyHtml}
              >
                <CopyCheck className="mr-2 h-4 w-4" />
                Copiar HTML para Área de Transferência
              </Button>
              
              <div className="flex justify-center mt-2">
                <a 
                  href="https://www.nuvemshop.com.br/admin/produtos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 flex items-center hover:underline"
                >
                  Abrir painel da Nuvemshop <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Conecte sua loja Nuvemshop para exportar produtos diretamente. 
                É necessário ter uma conta Nuvemshop ativa.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="store-url">URL da sua loja Nuvemshop</Label>
                <Input
                  id="store-url"
                  placeholder="minhaloja.lojavirtualnuvem.com.br"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                />
              </div>
              
              <Button
                variant="default"
                className="w-full"
                disabled={!storeUrl || isExporting}
                onClick={handleExportToNuvemshop}
              >
                {isExporting ? "Exportando..." : "Exportar para Nuvemshop"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Ao conectar sua loja, você autoriza Descrição Pro a acessar seus produtos na Nuvemshop.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NuvemshopIntegrationDialog;
