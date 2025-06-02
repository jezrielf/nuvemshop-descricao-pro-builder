
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Template } from '@/types/editor';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TemplatesListProps {
  templates: Template[];
  loading: boolean;
  onEdit: (template: Template) => void;
  onView: (template: Template) => void;
  onDelete: (template: Template) => void;
}

export const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  loading,
  onEdit,
  onView,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum template encontrado</p>
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
          <TableHead>Criado por</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell className="font-medium">{template.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">{template.category}</Badge>
            </TableCell>
            <TableCell>{template.blocks?.length || 0} blocos</TableCell>
            <TableCell className="text-muted-foreground">
              {template.user_id ? template.user_id.substring(0, 8) + '...' : 'Sistema'}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(template)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(template)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(template)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
