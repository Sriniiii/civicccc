import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { IssueCard } from '../components/issues/IssueCard';
import { useMockData } from '../hooks/useMockData';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

const IssueCardSkeleton: React.FC = () => (
    <div className="space-y-3 p-4 border border-border rounded-2xl">
        <SkeletonLoader className="w-full h-40" />
        <SkeletonLoader shape="text" className="w-3/4" />
        <SkeletonLoader shape="text" className="w-1/2" />
        <div className="flex justify-between pt-2 border-t border-border">
            <SkeletonLoader shape="text" className="w-1/4" />
            <SkeletonLoader shape="text" className="w-1/4" />
        </div>
    </div>
);

function IssuesPage() {
  const { issues } = useMockData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout title="All Issues">
      <div className="p-4">
        {/* TODO: Add filter and sort controls here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading 
            ? Array.from({ length: 6 }).map((_, i) => <IssueCardSkeleton key={i} />)
            : issues.map(issue => <IssueCard key={issue.id} issue={issue} />)
          }
        </div>
        {/* TODO: Add infinite scroll loader */}
      </div>
    </PageLayout>
  );
}

export default IssuesPage;
