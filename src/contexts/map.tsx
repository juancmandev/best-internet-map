'use client';

import { createContext, useState } from 'react';

type TCoords = {
  lat: number;
  lng: number;
} | null;

type TMapContext = {
  coords: TCoords;
  setCoords: (coords: TCoords) => void;
  reloadReviews: boolean;
  setReloadReviews: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

export const MapContext = createContext<TMapContext>(null);

type MapProviderProps = {
  children: React.ReactNode;
};

export function MapProvider(props: MapProviderProps) {
  const [coords, setCoords] = useState<TCoords>(null);
  const [reloadReviews, setReloadReviews] = useState(false);

  return (
    <MapContext.Provider
      value={{ coords, setCoords, reloadReviews, setReloadReviews }}
    >
      {props.children}
    </MapContext.Provider>
  );
}
