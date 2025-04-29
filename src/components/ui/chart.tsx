
import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface ChartConfig {
  score?: number;
  [key: string]: any; // Allow any additional properties
}

const ChartContext = createContext<ChartConfig>({});

export function useChartConfig() {
  return useContext(ChartContext);
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={config}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}
