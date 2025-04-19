
import React from 'react';
import { NexoAppRoot } from '@/components/Nuvemshop/nexo/NexoAppRoot';
import { Helmet } from 'react-helmet-async';

const NexoApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Descritor Pro - Nexo</title>
        <meta name="description" content="Versão Nexo do Descritor Pro para integração com a Nuvemshop" />
      </Helmet>
      
      <NexoAppRoot />
    </>
  );
};

export default NexoApp;
