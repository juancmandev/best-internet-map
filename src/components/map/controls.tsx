'use client';

import { useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';
import Control from 'react-leaflet-custom-control';

export default function MapControls() {
  const map = useMap();

  return (
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
  );
}
