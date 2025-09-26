import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { useMockData } from '../hooks/useMockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { IssueStatusTimeline } from '../components/issues/IssueStatusTimeline';
import { MapPin, ThumbsUp, MessageCircle, Share2, Flag, ArrowLeft } from 'lucide-react';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issues } = useMockData();
  const issue = issues.find(i => i.id === id);

  if (!issue) {
    return (
      <PageLayout title="Issue Not Found" showBottomNav={false}>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Issue Not Found</h1>
          <p className="text-text-secondary my-4">The issue you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/issues')}>Back to All Issues</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Issue Details" showBottomNav={false}>
       <div className="p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="space-y-4 pb-4">
        {/* Image Carousel */}
        <div className="relative w-full h-64 bg-gray-200">
          <img src={issue.photos[0]} alt={issue.title} className="w-full h-full object-cover"/>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">1 / {issue.photos.length}</div>
        </div>

        <div className="p-4 space-y-6">
            {/* Title and Actions */}
            <div className="space-y-3">
                <Badge variant="info" size="md" className="capitalize">{issue.category}</Badge>
                <h1 className="text-2xl font-bold text-text-primary">{issue.title}</h1>
                <div className="flex items-center text-sm text-text-secondary space-x-4">
                    <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{issue.address}</span>
                    </div>
                    <span>•</span>
                    <span>{issue.timeAgo}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Upvote ({issue.upvotes})
                </Button>
                <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
            </div>

            {/* Status Timeline */}
            <Card padding="lg">
                <h2 className="text-lg font-semibold mb-4">Status</h2>
                <IssueStatusTimeline status={issue.status} />
            </Card>

            {/* Description */}
            <Card padding="lg">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-text-secondary leading-relaxed">{issue.description}</p>
            </Card>

            {/* Comments Section Placeholder */}
            <Card padding="lg">
                <h2 className="text-lg font-semibold mb-4">Comments ({issue.comments_count})</h2>
                <div className="space-y-4">
                    <div className="text-center text-text-secondary py-4">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                        <p>Comments section coming soon.</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export default IssueDetailPage;
