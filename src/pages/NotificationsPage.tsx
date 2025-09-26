import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useMockData } from '../hooks/useMockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, CheckCheck } from 'lucide-react';
import { cn } from '../utils/cn';

function NotificationsPage() {
  const { notifications } = useMockData();

  return (
    <PageLayout title="Notifications" showBottomNav={true}>
      <div className="p-4 space-y-4">
        <div className="flex justify-end">
            <Button variant="ghost" size="sm">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
            </Button>
        </div>

        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Card 
              key={notification.id} 
              padding="md"
              className={cn(
                "flex items-start space-x-4",
                !notification.read && "bg-primary-50 border-primary-200"
              )}
            >
              <div className={cn(
                  "p-2 rounded-full",
                  !notification.read ? "bg-primary-100 text-primary-500" : "bg-gray-100 text-text-secondary"
              )}>
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{notification.title}</p>
                <p className="text-sm text-text-secondary">{notification.message}</p>
                <p className="text-xs text-text-muted mt-2">{notification.timeAgo}</p>
              </div>
              {!notification.read && (
                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full self-center"></div>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 mx-auto text-text-secondary mb-4" />
            <h2 className="text-xl font-semibold">No new notifications</h2>
            <p className="text-text-secondary">You're all caught up!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default NotificationsPage;
