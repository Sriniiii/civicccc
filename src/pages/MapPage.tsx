import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PageLayout } from '../components/layout/PageLayout';
import { useMockData } from '../hooks/useMockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Custom Icon using Lucide
const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#1976d2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>'
    )}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function MapPage() {
  const navigate = useNavigate();
  const { issues } = useMockData();
  const [selectedIssue, setSelectedIssue] = useState<(typeof issues[0]) | null>(null);

  const initialPosition: [number, number] = [28.644800, 77.216721]; // Delhi

  return (
    <PageLayout title="Issues Map" showBottomNav={true}>
      <div className="relative h-[calc(100vh-120px)]">
        <MapContainer center={initialPosition} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {issues.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.latitude, issue.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  setSelectedIssue(issue);
                },
              }}
            >
              {selectedIssue && selectedIssue.id === issue.id && (
                <Popup>
                  <Card 
                    padding="sm" 
                    className="w-64 cursor-pointer border-none shadow-none" 
                    onClick={() => navigate(`/issue/${selectedIssue.id}`)}
                  >
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
            </Marker>
          ))}
        </MapContainer>
      </div>
    </PageLayout>
  );
}

export default MapPage;
