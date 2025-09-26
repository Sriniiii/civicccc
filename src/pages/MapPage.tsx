import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { PageLayout } from '../components/layout/PageLayout';
import { useMockData } from '../hooks/useMockData';
import { MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapPage() {
  const navigate = useNavigate();
  const { issues } = useMockData();
  const [selectedIssue, setSelectedIssue] = useState<(typeof issues[0]) | null>(null);

  const initialViewState = {
    longitude: 77.216721, // Delhi
    latitude: 28.644800,
    zoom: 11
  };

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN') {
    return (
        <PageLayout title="Map">
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <h2 className="text-2xl font-bold text-error mb-4">Map Configuration Error</h2>
                <p className="text-text-secondary">
                    A Mapbox access token is required to display the map. Please add your token to the 
                    <code className="bg-gray-200 text-red-600 px-2 py-1 rounded-md mx-1">.env</code> file as 
                    <code className="bg-gray-200 text-red-600 px-2 py-1 rounded-md mx-1">VITE_MAPBOX_TOKEN</code>.
                </p>
            </div>
        </PageLayout>
    );
  }

  return (
    <PageLayout title="Issues Map" showBottomNav={true}>
      <div className="relative h-[calc(100vh-120px)]">
        <Map
          initialViewState={initialViewState}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {issues.map(issue => (
            <Marker
              key={issue.id}
              longitude={issue.longitude}
              latitude={issue.latitude}
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedIssue(issue);
              }}
            >
              <MapPin className="w-8 h-8 text-primary-500 cursor-pointer" fill="#1976d2" />
            </Marker>
          ))}

          {selectedIssue && (
            <Popup
              longitude={selectedIssue.longitude}
              latitude={selectedIssue.latitude}
              onClose={() => setSelectedIssue(null)}
              closeOnClick={false}
              anchor="top"
              offset={30}
            >
              <Card padding="sm" className="w-64 cursor-pointer" onClick={() => navigate(`/issue/${selectedIssue.id}`)}>
                <h3 className="font-semibold text-sm mb-1">{selectedIssue.title}</h3>
                <p className="text-xs text-text-secondary mb-2">{selectedIssue.address}</p>
                <Badge 
                    variant={selectedIssue.status === 'resolved' ? 'success' : 'info'}
                    size="sm"
                    className="capitalize"
                >
                    {selectedIssue.status.replace('_', ' ')}
                </Badge>
              </Card>
            </Popup>
          )}
        </Map>
      </div>
    </PageLayout>
  );
}

export default MapPage;
