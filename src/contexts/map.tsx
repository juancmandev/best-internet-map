'use client';

import { createContext, useState } from 'react';

type TCoords = {
  lat: number;
  lng: number;
} | null;

type TMapContext = {
  coords: TCoords;
  setCoords: (coords: TCoords) => void;
} | null;

export const MapContext = createContext<TMapContext>(null);

type MapProviderProps = {
  children: React.ReactNode;
};

export function MapProvider(props: MapProviderProps) {
  const [coords, setCoords] = useState<TCoords>(null);

  return (
    <MapContext.Provider value={{ coords, setCoords }}>
      {props.children}
    </MapContext.Provider>
  );
}
