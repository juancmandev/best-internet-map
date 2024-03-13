'use client';

import { useContext, useRef } from 'react';
import * as L from 'leaflet';
import { Marker } from 'react-leaflet';
import { MapContext } from '@/contexts/map';
import MarkerPopup from './marker-popup';

export default function MapUserMarker() {
  const { coords, setCoords } = useContext(MapContext)!;

  const markerRef = useRef<L.Marker | null>(null);

  const icon = new L.Icon({
    iconUrl: '/location-pin.svg',
    iconSize: [32, 32],
    className: 'cursor-grab',
  });

  return (
    <Marker
      draggable
      icon={icon}
      ref={markerRef}
      position={[coords!.lat, coords!.lng]}
      eventHandlers={{
        dragend: () => {
          if (!markerRef.current) return;

          setCoords(markerRef.current.getLatLng());
        },
      }}
    >
      <MarkerPopup />
    </Marker>
  );
}
