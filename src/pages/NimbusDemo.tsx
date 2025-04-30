
import React from 'react';
import { NimbusButton, NimbusBadge, NimbusAlert, useNimbusUI } from '@/components/Nuvemshop/NimbusProvider';
import { NimbusToggle } from '@/components/Nuvemshop/components/NimbusToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const NimbusDemo: React.FC = () => {
  const { useNimbusUI } = useNimbusUI();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nimbus Design System</h1>
        <NimbusToggle />
      </div>

      <div className="grid gap-8">
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Botões</h2>
          <div className="flex flex-wrap gap-4">
            {useNimbusUI ? (
              <>
                <NimbusButton variant="primary">Botão Primário</NimbusButton>
                <NimbusButton variant="secondary">Botão Secundário</NimbusButton>
                <NimbusButton variant="danger">Botão Perigo</NimbusButton>
                <NimbusButton variant="text">Botão Texto</NimbusButton>
                <NimbusButton variant="primary" disabled>Botão Desabilitado</NimbusButton>
              </>
            ) : (
              <>
                <Button>Botão Padrão</Button>
                <Button variant="secondary">Botão Secundário</Button>
                <Button variant="destructive">Botão Destructive</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button disabled>Botão Desabilitado</Button>
              </>
            )}
          </div>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-4">
            {useNimbusUI ? (
              <>
                <NimbusBadge variant="default">Badge Padrão</NimbusBadge>
                <NimbusBadge variant="success">Sucesso</NimbusBadge>
                <NimbusBadge variant="warning">Atenção</NimbusBadge>
                <NimbusBadge variant="error">Erro</NimbusBadge>
                <NimbusBadge variant="info">Informação</NimbusBadge>
              </>
            ) : (
              <>
                <Badge>Badge Padrão</Badge>
                <Badge variant="secondary">Badge Secundário</Badge>
                <Badge variant="destructive">Badge Destructive</Badge>
                <Badge variant="outline">Badge Outline</Badge>
                <Badge variant="success">Badge Success</Badge>
              </>
            )}
          </div>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Alertas</h2>
          <div className="space-y-4">
            {useNimbusUI ? (
              <>
                <NimbusAlert variant="default" title="Alerta Padrão">
                  Este é um alerta padrão do Nimbus Design System.
                </NimbusAlert>
                <NimbusAlert variant="success" title="Sucesso">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Operação realizada com sucesso!
                  </div>
                </NimbusAlert>
                <NimbusAlert variant="warning" title="Atenção">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                    Você precisa completar algumas informações adicionais.
                  </div>
                </NimbusAlert>
                <NimbusAlert variant="error" title="Erro">
                  Não foi possível completar a operação.
                </NimbusAlert>
                <NimbusAlert variant="info" title="Informação">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-600" />
                    O sistema será atualizado em breve.
                  </div>
                </NimbusAlert>
              </>
            ) : (
              <>
                <Alert>
                  <AlertDescription>
                    Este é um alerta padrão do shadcn/ui.
                  </AlertDescription>
                </Alert>
                <Alert variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Operação realizada com sucesso!
                  </AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Você precisa completar algumas informações adicionais.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertDescription>
                    Não foi possível completar a operação.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NimbusDemo;
