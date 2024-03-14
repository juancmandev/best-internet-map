'use client';

import { useContext, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, LocateFixed, CircleHelp } from 'lucide-react';
import Control from 'react-leaflet-custom-control';
import { MapContext } from '@/contexts/map';
import DialogOrDrawer from '@/components/dialog-or-drawer';

export default function MapControls() {
  const map = useMap();

  const [open, setOpen] = useState(false);

  const { initialPosition, setCoords } = useContext(MapContext)!;

  return (
    <>
      <Control position='topleft'>
        <div className='flex flex-col gap-1'>
          <Button variant='outline' size='icon' onClick={() => map.zoomIn()}>
            <ZoomIn className='w-6' />
          </Button>
          <Button variant='outline' size='icon' onClick={() => map.zoomOut()}>
            <ZoomOut className='w-6' />
          </Button>
        </div>
      </Control>
      <Control position='bottomleft'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => {
            setCoords({
              lat: initialPosition!.lat,
              lng: initialPosition!.lng,
            });
            map.flyTo(
              {
                lat: initialPosition!.lat,
                lng: initialPosition!.lng,
              },
              18,
            );
          }}
        >
          <LocateFixed className='w-6' />
        </Button>
      </Control>
      <Control position='topright'>
        <Button onClick={() => setOpen(true)} variant='outline' size='icon'>
          <CircleHelp className='w-6' />
        </Button>
      </Control>
      <DialogOrDrawer title='Help' open={open} setOpen={setOpen}>
        <h3 className='mb-1 font-lg font-semibold'>
          How do I create a review?
        </h3>
        <ul className='list-disc pl-4'>
          <li>
            Click/touch the red pin (
            <img
              className='inline w-6'
              src='/location-pin.svg'
              alt='Location pin'
            />
            ) to open a popup
          </li>
          <li>{`Click or touch "Review this point"`}</li>
        </ul>
        <h3 className='mt-2 mb-1 font-lg font-semibold'>I lost my marker</h3>
        <ul className='list-disc pl-4'>
          <li>
            Click or touch the (<LocateFixed className='w-5 inline' />) button
            in the lower left corner to go to your initial position
          </li>
        </ul>
        <h3 className='mt-2 mb-1 font-lg font-semibold'>
          How do I check a review?
        </h3>
        <ul className='list-disc pl-4'>
          <li>
            Click or touch any ({' '}
            <img
              className='inline w-6'
              src='/review-pin.svg'
              alt='Review pin'
            />
            ) to see a popup with the review
          </li>
        </ul>
        <p className='mt-4'>
          This app do not save your location, only saves the locations of the
          reviews.
        </p>
      </DialogOrDrawer>
    </>
  );
}
