
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Keyword {
  word: string;
  count: number;
  relevance: number;
  categories: string[];
}

interface KeywordsListProps {
  keywords: Keyword[];
}

export const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 80) return 'bg-[#1DB779]';
    if (relevance >= 60) return 'bg-[#F9B944]';
    return 'bg-[#E54D2E]';
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Palavra-chave</TableHead>
            <TableHead>Ocorrências</TableHead>
            <TableHead>Relevância</TableHead>
            <TableHead>Categorias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((keyword, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{keyword.word}</TableCell>
              <TableCell>{keyword.count}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={keyword.relevance} 
                    max={100} 
                    className={`h-2 ${getRelevanceColor(keyword.relevance)}`} 
                  />
                  <span className="text-sm">{keyword.relevance}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {keyword.categories.map((category, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
