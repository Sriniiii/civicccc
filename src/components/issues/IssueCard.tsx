import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ThumbsUp, MessageCircle, MapPin } from 'lucide-react';
import { Issue } from '../../types';

interface IssueCardProps {
  issue: Issue & { timeAgo: string };
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <Card 
      variant="default" 
      padding="md" 
      className="cursor-pointer hover:shadow-civic transition-shadow"
      onClick={() => navigate(`/issue/${issue.id}`)}
    >
      <div className="flex flex-col space-y-3">
        {/* Image */}
        <img 
          src={issue.photos[0]} 
          alt={issue.title} 
          className="w-full h-40 object-cover rounded-xl"
        />

        {/* Title & Status */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-text-primary pr-2">{issue.title}</h3>
          <Badge
            variant={
              issue.status === 'resolved' ? 'success' :
              issue.status === 'in_progress' ? 'warning' : 'info'
            }
            size="sm"
            className="capitalize flex-shrink-0"
          >
            {issue.status.replace('_', ' ')}
          </Badge>
        </div>

        {/* Location & Time */}
        <div className="flex items-center text-xs text-text-secondary space-x-2">
          <MapPin className="w-3 h-3" />
          <span>{issue.address.split(',')[0]}</span>
          <span>•</span>
          <span>{issue.timeAgo}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-text-secondary pt-2 border-t border-border">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{issue.upvotes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{issue.comments_count}</span>
          </div>
          <Badge variant="default" size="sm" className="capitalize">{issue.category}</Badge>
        </div>
      </div>
    </Card>
  );
};
