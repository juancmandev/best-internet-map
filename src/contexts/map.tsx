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
  initialPosition: TCoords;
  setInitialPosition: (coords: TCoords) => void;
} | null;

export const MapContext = createContext<TMapContext>(null);

type MapProviderProps = {
  children: React.ReactNode;
};

export function MapProvider(props: MapProviderProps) {
  const [coords, setCoords] = useState<TCoords>(null);
  const [initialPosition, setInitialPosition] = useState<TCoords>(null);
  const [reloadReviews, setReloadReviews] = useState(false);

  return (
    <MapContext.Provider
      value={{
        coords,
        setCoords,
        reloadReviews,
        setReloadReviews,
        initialPosition,
        setInitialPosition,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
}
