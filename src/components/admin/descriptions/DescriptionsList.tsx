
import React from 'react';
import { ProductDescription } from '@/types/editor';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash, Copy, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DescriptionsListProps {
  descriptions: ProductDescription[];
  loading: boolean;
  onViewDescription: (description: ProductDescription) => void;
  onDeleteClick: (description: ProductDescription) => void;
}

const DescriptionsList: React.FC<DescriptionsListProps> = ({
  descriptions,
  loading,
  onViewDescription,
  onDeleteClick
}) => {
  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return <p>Carregando descrições...</p>;
  }

  if (descriptions.length === 0) {
    return (
      <p className="text-center py-8 text-muted-foreground">
        Nenhuma descrição encontrada no sistema.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Lista de todas as descrições de produtos no sistema</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Blocos</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {descriptions.map((description) => (
          <TableRow key={description.id}>
            <TableCell className="font-medium">{truncateText(description.name)}</TableCell>
            <TableCell className="text-xs truncate max-w-[100px]">{description.id}</TableCell>
            <TableCell>{description.blocks.length}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(description.createdAt), { 
                addSuffix: true,
                locale: ptBR
              })}
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(description.updatedAt), { 
                addSuffix: true,
                locale: ptBR
              })}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDescription(description)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDeleteClick(description)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DescriptionsList;
