import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';
import { Camera, AlertTriangle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { IssueCategory } from '../types';
import { LocationPicker } from '../components/issues/LocationPicker';
import { useNavigate } from 'react-router-dom';

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);
  const [category, setCategory] = useState<IssueCategory | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [aiSuggestion, setAiSuggestion] = useState<IssueCategory | null>(null);

  const { data: location } = useGeolocation();

  useEffect(() => {
    if (photos.length > 0 && !aiSuggestion) {
      // Simulate AI analysis
      setTimeout(() => {
        const suggested: IssueCategory = 'pothole';
        setAiSuggestion(suggested);
      }, 1500);
    }
  }, [photos, aiSuggestion]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotos(prevPhotos => [...prevPhotos, ...fileArray]);
    }
  };

  const isFormValid = photos.length > 0 && location && category && title;

  return (
    <PageLayout title="Report New Issue" showBottomNav={false}>
      <div className="p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="p-4 space-y-6">
        {/* Photo Upload */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold mb-4">1. Add Photos</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`issue photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
            ))}
          </div>
          <label htmlFor="photo-upload" className="w-full">
            <Button as="span" variant="outline" className="w-full">
              <Camera className="w-5 h-5 mr-2" />
              {photos.length > 0 ? 'Add More Photos' : 'Upload Photos'}
            </Button>
            <input id="photo-upload" type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
          </label>
        </Card>

        {/* Location */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold mb-4">2. Confirm Location</h2>
          <LocationPicker />
        </Card>

        {/* Issue Details */}
        <Card padding="lg">
          <h2 className="text-lg font-semibold mb-4">3. Provide Details</h2>
          <div className="space-y-4">
            {aiSuggestion && !category && (
              <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg space-y-3">
                <p className="text-sm font-medium text-primary-700">AI Suggestion: Is this a '{aiSuggestion}'?</p>
                <Button size="sm" onClick={() => setCategory(aiSuggestion)}>Yes, confirm</Button>
              </div>
            )}
            <Select label="Category" value={category} onChange={e => setCategory(e.target.value as IssueCategory)} required>
              <option value="" disabled>Select a category</option>
              {(['pothole', 'garbage', 'streetlight', 'waterlogging', 'drainage', 'roadwork', 'water_supply', 'electricity', 'other'] as IssueCategory[]).map(c => (
                <option key={c} value={c} className="capitalize">{c.replace('_', ' ')}</option>
              ))}
            </Select>
            <Input label="Title" placeholder="e.g., Large pothole on Main Street" value={title} onChange={e => setTitle(e.target.value)} required />
            <Textarea label="Description" placeholder="Add more details about the issue..." value={description} onChange={e => setDescription(e.target.value)} />
            <Select label="Severity" value={severity} onChange={e => setSeverity(e.target.value as 'low' | 'medium' | 'high')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
        </Card>

        {/* Submit */}
        <Button size="lg" className="w-full" disabled={!isFormValid}>
          <CheckCircle className="w-5 h-5 mr-2" />
          Submit Report
        </Button>
      </div>
    </PageLayout>
  );
};

export default ReportPage;
