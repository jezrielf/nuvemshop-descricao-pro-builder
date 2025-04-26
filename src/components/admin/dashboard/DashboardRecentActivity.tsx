
import React from 'react';

interface DashboardRecentActivityProps {
  stats: any;
}

const DashboardRecentActivity: React.FC<DashboardRecentActivityProps> = ({ stats }) => {
  const activities = stats?.recentActivities || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
      
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity: any, index: number) => (
            <div key={index} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Nenhuma atividade recente encontrada.</p>
      )}
    </div>
  );
};

export default DashboardRecentActivity;
