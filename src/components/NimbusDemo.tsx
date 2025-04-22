
import React from 'react';

export const NimbusDemo: React.FC = () => {
  return (
    <div className="nimbus-ui">
      <div className="ds-flex ds-flex-col ds-gap-4 ds-p-4">
        <h1 className="ds-heading-2xl ds-text-neutral-10">Nimbus Demo</h1>
        <p className="ds-text-base ds-text-neutral-9">
          This is a basic demo of Nimbus Design System integration.
        </p>
        <button className="ds-button ds-button-primary ds-button-md">
          Nimbus Button
        </button>
      </div>
    </div>
  );
};

export default NimbusDemo;
