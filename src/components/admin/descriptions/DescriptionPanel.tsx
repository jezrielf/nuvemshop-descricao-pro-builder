
import React, { useState, useEffect } from 'react';
import { ProductDescription } from '@/types/editor';
import { Card } from '@/components/ui/card';
import DescriptionsList from './DescriptionsList';
import PreviewDialog from './PreviewDialog';
import DeleteDialog from './DeleteDialog';
import SubscriptionBanner from './SubscriptionBanner';

const DescriptionsPanel: React.FC = () => {
  const [descriptions, setDescriptions] = useState<ProductDescription[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<ProductDescription | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all descriptions from localStorage for demonstration
  useEffect(() => {
    setLoading(true);
    
    // Get all keys from localStorage
    const allStorageKeys = Object.keys(localStorage);
    
    // Filter for saved descriptions keys
    const descriptionKeys = allStorageKeys.filter(key => 
      key.startsWith('savedDescriptions_')
    );
    
    // Get all descriptions from all users
    const allDescriptions: ProductDescription[] = [];
    
    descriptionKeys.forEach(key => {
      try {
        const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
        allDescriptions.push(...userDescriptions);
      } catch (error) {
        console.error(`Error parsing descriptions for key ${key}:`, error);
      }
    });
    
    setDescriptions(allDescriptions);
    setLoading(false);
  }, []);

  const handleViewDescription = (description: ProductDescription) => {
    setSelectedDescription(description);
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (description: ProductDescription) => {
    setSelectedDescription(description);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDescription) return;
    
    // In a real application, this would delete from the database
    // For now, we'll just update our local state
    setDescriptions(descriptions.filter(d => d.id !== selectedDescription.id));
    setIsDeleteDialogOpen(false);
    setSelectedDescription(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Descrições</h2>
      
      {/* Subscription Banner */}
      <SubscriptionBanner />
      
      <Card className="p-6">
        <DescriptionsList 
          descriptions={descriptions} 
          loading={loading}
          onViewDescription={handleViewDescription}
          onDeleteClick={handleDeleteClick}
        />
      </Card>

      {/* Dialogs */}
      <PreviewDialog 
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        description={selectedDescription}
      />

      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description={selectedDescription}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default DescriptionsPanel;
