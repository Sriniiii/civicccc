import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useGeolocation } from '../../hooks/useGeolocation';
import L from 'leaflet';
import { Loader, AlertTriangle, MapPin } from 'lucide-react';

const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#1976d2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>'
    )}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export const LocationPicker: React.FC = () => {
  const { data: location, loading, error } = useGeolocation();
  const initialPosition: [number, number] = [20.5937, 78.9629]; // Center of India

  return (
    <div className="h-48 rounded-lg overflow-hidden relative">
      <MapContainer center={initialPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {location && (
          <>
            <ChangeView center={[location.latitude, location.longitude]} zoom={16} />
            <Marker position={[location.latitude, location.longitude]} icon={customIcon} />
          </>
        )}
      </MapContainer>
      
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="flex items-center text-text-secondary"><Loader className="w-4 h-4 mr-2 animate-spin" /> Fetching location...</div>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex items-center justify-center">
          <div className="text-error flex items-center"><AlertTriangle className="w-4 h-4 mr-2" /> Could not get location.</div>
        </div>
      )}

      {location && !loading && (
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded-lg text-xs text-secondary-600 flex items-center shadow-md">
            <MapPin className="w-3 h-3 mr-1" />
            Location captured
        </div>
      )}
    </div>
  );
};
