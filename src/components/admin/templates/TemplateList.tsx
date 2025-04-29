
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Template } from '@/types/editor';
import { Badge } from '@/components/ui/badge';
import { TemplateActions } from './TemplateActions';
import { getCategoryName } from './utils';

interface TemplateListProps {
  templates: Template[];
  onTemplateDeleted?: () => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ 
  templates,
  onTemplateDeleted
}) => {
  if (!templates.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum template encontrado.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Blocos</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell className="font-medium">{template.name}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {getCategoryName(template.category)}
              </Badge>
            </TableCell>
            <TableCell>{template.blocks.length}</TableCell>
            <TableCell className="text-right">
              <TemplateActions 
                template={template} 
                onTemplateDeleted={onTemplateDeleted}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
