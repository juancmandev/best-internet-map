import { MapContainer } from 'react-leaflet';
import MapUserMarker from './user-marker';
import MapTileLayer from './tile-layer';
import { useContext } from 'react';
import { MapContext } from '@/contexts/map';

export default function MapShow() {
  const { coords } = useContext(MapContext)!;

  return (
    <MapContainer
      zoom={20}
      zoomControl={false}
      className='w-full h-[100dvh] z-10'
      center={[coords!.lat, coords!.lng]}
    >
      <MapTileLayer />
      <MapUserMarker />
    </MapContainer>
  );
}
