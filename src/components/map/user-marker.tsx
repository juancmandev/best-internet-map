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
    iconSize: [64, 64],
    className: 'cursor-grab !z-10',
  });

  return (
    <Marker
      draggable
      icon={icon}
      ref={markerRef}
      eventHandlers={{
        dragend: () => {
          if (!markerRef.current) return;

          setCoords(markerRef.current.getLatLng());
        },
      }}
      position={[coords!.lat, coords!.lng]}
    >
      <MarkerPopup />
    </Marker>
  );
}
