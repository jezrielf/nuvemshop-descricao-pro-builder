
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DescriptionMetric } from '../types';
import { getScoreColor, getScoreBg } from '../utils/scoreUtils';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';

interface DescriptionsListProps {
  descriptions: DescriptionMetric[];
}

export const DescriptionsList: React.FC<DescriptionsListProps> = ({ descriptions }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead className="text-center">Pontuação</TableHead>
            <TableHead className="text-center">Sent. Média</TableHead>
            <TableHead className="text-center">Palavras Complexas</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {descriptions.map((desc) => (
            <TableRow key={desc.id}>
              <TableCell className="font-medium">{desc.title}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${getScoreBg(desc.score)} text-white font-medium`}>
                    {desc.score}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">{desc.avgSentenceLength}</TableCell>
              <TableCell className="text-center">{desc.complexWordsPerc}%</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
