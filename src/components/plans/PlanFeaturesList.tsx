
import React from 'react';
import { CheckIcon, X } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanFeaturesListProps {
  features: PlanFeature[];
  isPriceFree?: boolean;
}

const PlanFeaturesList: React.FC<PlanFeaturesListProps> = ({ 
  features,
  isPriceFree = false
}) => {
  // Ensure we have features
  if (!features || features.length === 0) {
    return (
      <p className="text-muted-foreground text-sm italic">
        {isPriceFree ? 'Plano com recursos básicos' : 'Nenhum recurso especificado'}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          {feature.included ? (
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
          ) : (
            <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
          )}
          <span className={feature.included ? "" : "text-muted-foreground"}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeaturesList;
