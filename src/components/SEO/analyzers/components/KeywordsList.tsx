
import React from 'react';
import { SEOKeyword } from '../types';

interface KeywordsListProps {
  keywords: SEOKeyword[];
}

export const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  return (
    <div>
      <h3 className="text-base font-medium mb-1">Palavras-chave encontradas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex justify-between items-center border rounded p-1">
            <div className="font-medium text-sm">{keyword.word}</div>
            <div className="flex items-center gap-1">
              <div className="text-xs text-gray-500">{keyword.count}x</div>
              <div className={`text-xs px-1 py-0.5 rounded ${
                keyword.relevance > 80 ? 'bg-green-100 text-green-800' :
                keyword.relevance > 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {keyword.relevance}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
