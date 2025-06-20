
import React from 'react';
import { FAQBlock as FAQBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { deepClone } from '@/utils/deepClone';

interface FAQBlockProps {
  block: FAQBlockType;
  isPreview?: boolean;
}

const FAQBlock: React.FC<FAQBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      question: 'Nova Pergunta?',
      answer: 'Resposta para a pergunta.'
    };
    
    // Create deep copy of current questions to prevent reference sharing
    const currentQuestions = deepClone(block.questions || []);
    
    updateBlock(block.id, {
      questions: [...currentQuestions, newQuestion]
    });
  };
  
  const handleUpdateQuestion = (questionId: string, field: 'question' | 'answer', value: string) => {
    console.log('Updating question:', questionId, field, value);
    
    // Create deep copy of current questions to prevent reference sharing
    const currentQuestions = deepClone(block.questions || []);
    
    // Find and update the specific question with deep cloning
    const updatedQuestions = currentQuestions.map((q: any) => {
      if (q.id === questionId) {
        // Create a completely new object to avoid reference sharing
        return {
          ...q,
          [field]: value
        };
      }
      return q;
    });
    
    console.log('Updated questions array:', updatedQuestions);
    console.log('Specific question updated:', updatedQuestions.find((q: any) => q.id === questionId));
    
    updateBlock(block.id, { questions: updatedQuestions });
  };
  
  const handleRemoveQuestion = (questionId: string) => {
    // Create deep copy of current questions and filter
    const currentQuestions = deepClone(block.questions || []);
    const updatedQuestions = currentQuestions.filter((q: any) => q.id !== questionId);
    updateBlock(block.id, { questions: updatedQuestions });
  };
  
  // Ensure we have a valid array of questions
  const questions = block.questions || [];
  
  // Debug: log IDs to verify uniqueness
  console.log('FAQ Questions IDs:', questions.map(q => ({ id: q.id, question: q.question.substring(0, 20) })));
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
        {questions.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {questions.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-gray-500 italic">Nenhuma pergunta adicionada ainda.</p>
        )}
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Título da Seção</label>
          <Input
            value={block.heading}
            onChange={(e) => handleUpdateHeading(e.target.value)}
            placeholder="Digite o título da seção"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Perguntas e Respostas</h3>
          
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <div key={item.id} className="p-3 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pergunta {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1">Pergunta</label>
                    <Input
                      value={item.question}
                      onChange={(e) => handleUpdateQuestion(item.id, 'question', e.target.value)}
                      placeholder="Digite a pergunta"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs mb-1">Resposta</label>
                    <Textarea
                      value={item.answer}
                      onChange={(e) => handleUpdateQuestion(item.id, 'answer', e.target.value)}
                      placeholder="Digite a resposta"
                      rows={3}
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Você pode usar HTML básico para formatação.
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma pergunta adicionada ainda.</p>
              <p className="text-sm">Clique no botão abaixo para adicionar a primeira pergunta.</p>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={handleAddQuestion}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Pergunta
          </Button>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default FAQBlock;
