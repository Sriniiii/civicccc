import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Camera, MapPin, Bell } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // In a real app, you'd save a flag that the user has completed onboarding
    console.log('Onboarding complete');
    navigate('/');
  };

  const handleRequestPermissions = () => {
    // Placeholder for requesting permissions
    alert('Requesting Camera, GPS, and Notification permissions...');
    // In a real app:
    // navigator.camera.getPicture(...)
    // navigator.geolocation.getCurrentPosition(...)
    // Notification.requestPermission()
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Welcome to Civic Pulse!</h1>
          <p className="text-text-secondary mt-2">Let's get you set up to make a difference.</p>
        </div>

        <Card variant="default" padding="lg">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">Key Features</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 rounded-xl text-primary-500"><Camera /></div>
                <div>
                  <h3 className="font-semibold">Report with Photos</h3>
                  <p className="text-sm text-text-secondary">Easily capture and upload evidence of civic issues.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary-100 rounded-xl text-secondary-500"><MapPin /></div>
                <div>
                  <h3 className="font-semibold">Track on Map</h3>
                  <p className="text-sm text-text-secondary">See all reported issues in your area on an interactive map.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent-100 rounded-xl text-accent-500"><Bell /></div>
                <div>
                  <h3 className="font-semibold">Get Real-time Updates</h3>
                  <p className="text-sm text-text-secondary">Receive notifications as your reported issues are resolved.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="lg">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Permissions</h2>
          <p className="text-text-secondary mb-6">To provide the best experience, Civic Pulse needs access to your device's features.</p>
          <Button size="lg" className="w-full" onClick={handleRequestPermissions}>
            Grant Permissions
          </Button>
        </Card>

        <Button size="lg" variant="primary" className="w-full" onClick={handleComplete}>
          Finish Setup & Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
