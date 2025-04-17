
import React from 'react';
import DescriptionsPanel from '@/components/admin/DescriptionsPanel';

const DescriptionsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Minhas Descrições</h1>
        <DescriptionsPanel />
      </div>
    </div>
  );
};

export default DescriptionsView;
