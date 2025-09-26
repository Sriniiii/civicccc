import React from 'react';
import { CheckCircle, Clock, Wrench, Flag } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IssueStatus } from '../../types';

interface IssueStatusTimelineProps {
  status: IssueStatus;
}

const statusSteps: { id: IssueStatus; label: string; icon: React.ElementType }[] = [
  { id: 'reported', label: 'Reported', icon: Flag },
  { id: 'assigned', label: 'Assigned', icon: Clock },
  { id: 'in_progress', label: 'In Progress', icon: Wrench },
  { id: 'resolved', label: 'Resolved', icon: CheckCircle },
];

export const IssueStatusTimeline: React.FC<IssueStatusTimelineProps> = ({ status }) => {
  const currentStatusIndex = statusSteps.findIndex(step => step.id === status);

  return (
    <div className="flex items-center justify-between">
      {statusSteps.map((step, index) => {
        const isCompleted = index <= currentStatusIndex;
        const isCurrent = index === currentStatusIndex;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted ? 'bg-secondary-500 text-white' : 'bg-gray-200 text-gray-500'
                )}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <p
                className={cn(
                  'text-xs font-medium',
                  isCompleted ? 'text-secondary-700' : 'text-text-secondary'
                )}
              >
                {step.label}
              </p>
            </div>
            {index < statusSteps.length - 1 && (
              <div className={cn(
                'flex-1 h-1 mx-2',
                isCompleted ? 'bg-secondary-500' : 'bg-gray-200'
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
