
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
        
        {/* Additional Nimbus components demo */}
        <div className="ds-card ds-p-4 ds-mt-4">
          <div className="ds-card-header">
            <h2 className="ds-heading-lg ds-text-neutral-10">Card Component</h2>
          </div>
          <div className="ds-card-content">
            <p className="ds-text-sm ds-text-neutral-9">
              This is a Nimbus card component example.
            </p>
          </div>
          <div className="ds-card-footer ds-flex ds-justify-end ds-mt-4">
            <button className="ds-button ds-button-tertiary ds-button-sm ds-mr-2">Cancel</button>
            <button className="ds-button ds-button-primary ds-button-sm">Confirm</button>
          </div>
        </div>

        {/* Form elements demo */}
        <div className="ds-form-group ds-mt-4">
          <label className="ds-label ds-mb-1">Input Example</label>
          <input type="text" className="ds-input" placeholder="Type something..." />
        </div>

        <div className="ds-form-group ds-mt-2">
          <label className="ds-label ds-mb-1">Select Example</label>
          <select className="ds-select">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>

        {/* Alert component demo */}
        <div className="ds-alert ds-alert-info ds-mt-4">
          <div className="ds-alert-content">
            <p className="ds-text-sm">This is an informational alert.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NimbusDemo;
