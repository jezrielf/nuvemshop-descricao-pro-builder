
import React from 'react';
import { SEOKeyword } from '../types';

interface KeywordsListProps {
  keywords: SEOKeyword[];
}

export const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Palavras-chave encontradas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex justify-between items-center border rounded p-2">
            <div className="font-medium">{keyword.word}</div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">{keyword.count}x</div>
              <div className={`text-xs px-1.5 py-0.5 rounded ${
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
