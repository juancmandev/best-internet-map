'use client';

import { useContext, useEffect, useState } from 'react';
import MapShow from './show';
import { MapContext, MapProvider } from '@/contexts/map';

function MapWrapper() {
  const { coords, setCoords } = useContext(MapContext)!;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
          setCoords(null);
        },
      );
    } else {
      setLoading(false);
      setCoords(null);
    }
  }, []);

  return (
    <>
      {loading && (
        <div className='w-full h-screen grid items-center bg-slate-200 animate-pulse'>
          <h1 className='text-center text-xl font-semibold'>Loading map...</h1>
        </div>
      )}
      {!loading && coords && <MapShow />}
      {!loading && !coords && (
        <div className='w-full h-screen grid items-center bg-slate-200'>
          <h1 className='text-center text-xl font-semibold'>
            Can not access to location
          </h1>
        </div>
      )}
    </>
  );
}

export default function MapHandle() {
  return (
    <MapProvider>
      <MapWrapper />
    </MapProvider>
  );
}
