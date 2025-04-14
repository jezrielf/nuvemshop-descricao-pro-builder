
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TemplateActions } from './TemplateListActions';
import { Badge } from '@/components/ui/badge';
import { Template, ProductCategory } from '@/types/editor';

interface TemplateListProps {
  templates: Template[];
  onView: (template: Template) => void;
  onEdit: (template: Template) => void;
  onDelete: (template: Template) => void;
  getCategoryName: (category: ProductCategory) => string;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onView,
  onEdit,
  onDelete,
  getCategoryName
}) => {
  // Verificação adicional para garantir que templates é um array válido
  const validTemplates = Array.isArray(templates) ? templates : [];
  
  return (
    <Table>
      <TableCaption>Lista de todos os templates disponíveis no sistema</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Blocos</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {validTemplates.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              Nenhum template encontrado.
            </TableCell>
          </TableRow>
        ) : (
          validTemplates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getCategoryName(template.category)}
                </Badge>
              </TableCell>
              <TableCell>{template.blocks ? template.blocks.length : 0}</TableCell>
              <TableCell className="text-right">
                <TemplateActions 
                  template={template}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TemplateList;
