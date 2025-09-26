import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Settings, LogOut, FileText, Star, Shield } from 'lucide-react';

function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isAdmin = user?.role === 'authority' || user?.role === 'ngo';

  return (
    <PageLayout title="My Profile">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
              <AvatarFallback className="text-3xl">
                {user?.full_name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.full_name}</h1>
              <p className="text-text-secondary">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <Card padding="lg">
            <h2 className="text-lg font-semibold mb-4">My Contribution</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold text-primary-500">24</p>
                    <p className="text-xs text-text-secondary">Reports</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-secondary-500">18</p>
                    <p className="text-xs text-text-secondary">Resolved</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-accent-500">4.5 ★</p>
                    <p className="text-xs text-text-secondary">Rating</p>
                </div>
            </div>
        </Card>

        {/* Menu Options */}
        <div className="space-y-2">
            {isAdmin && (
              <Button variant="ghost" className="w-full justify-start text-base" onClick={() => navigate('/admin')}>
                  <Shield className="w-5 h-5 mr-3 text-text-secondary" /> Admin Dashboard
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start text-base">
                <FileText className="w-5 h-5 mr-3 text-text-secondary" /> My Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base">
                <Star className="w-5 h-5 mr-3 text-text-secondary" /> Followed Issues
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base">
                <Settings className="w-5 h-5 mr-3 text-text-secondary" /> Settings
            </Button>
        </div>

        {/* Logout */}
        <div className="pt-4">
            <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
            </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
