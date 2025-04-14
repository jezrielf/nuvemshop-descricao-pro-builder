
import React from 'react';
import { Check, CircleX, Lock } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanFeaturesListProps {
  features: PlanFeature[];
  isPriceFree: boolean;
}

const PlanFeaturesList: React.FC<PlanFeaturesListProps> = ({ features, isPriceFree }) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          {feature.included ? (
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <CircleX className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
          )}
          <span className={feature.included ? '' : 'text-muted-foreground'}>
            {feature.name}
            {!feature.included && isPriceFree && (
              <Lock className="h-3 w-3 inline ml-1 text-yellow-500" />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeaturesList;
