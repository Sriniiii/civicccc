import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GarbageIcon, RoadIcon, WaterIcon, StreetlightIcon } from '../components/icons/CivicIcons';
import { MapPin, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useMockData } from '../hooks/useMockData';
import { ChatBubble } from '../components/chat/ChatBubble';

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { recentIssues, stats } = useMockData();

  return (
    <PageLayout title="Civic Pulse">
      <div className="p-4 space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-text-primary">
            नमस्ते, {user?.full_name || 'Citizen'}!
          </h1>
          <p className="text-text-secondary">
            Report civic issues, track progress, and build a better community together.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card variant="elevated" padding="md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-xl">
                <MapPin className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Issues Near You</p>
                <p className="text-xl font-bold text-text-primary">{stats.issuesNearYou}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" padding="md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Resolved This Month</p>
                <p className="text-xl font-bold text-text-primary">{stats.resolvedThisMonth}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Issue Categories */}
        <Card variant="default" padding="lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Report an Issue
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Road Issues', icon: RoadIcon, color: 'text-accent-500', count: 15 },
              { name: 'Garbage', icon: GarbageIcon, color: 'text-secondary-500', count: 23 },
              { name: 'Water Issues', icon: WaterIcon, color: 'text-primary-500', count: 8 },
              { name: 'Streetlights', icon: StreetlightIcon, color: 'text-yellow-500', count: 12 },
            ].map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto p-4 flex-col space-y-2"
                onClick={() => navigate('/report')}
              >
                <category.icon className={`w-8 h-8 ${category.color}`} />
                <span className="text-sm font-medium">{category.name}</span>
                <Badge variant="info" size="sm">
                  {category.count} active
                </Badge>
              </Button>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card variant="default" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/issues')}>View All</Button>
          </div>
          
          <div className="space-y-3">
            {recentIssues.slice(0, 3).map((issue) => (
              <div key={issue.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/issue/${issue.id}`)}>
                <div className="flex-1">
                  <p className="font-medium text-text-primary text-sm">
                    {issue.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {issue.address} • {issue.timeAgo}
                  </p>
                </div>
                <Badge 
                  variant={
                    issue.status === 'resolved' ? 'success' :
                    issue.status === 'in_progress' ? 'warning' : 'info'
                  }
                  size="sm"
                >
                  {issue.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <ChatBubble />
    </PageLayout>
  );
}

export default DashboardPage;
