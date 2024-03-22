'use client';

import { useContext, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, LocateFixed, CircleHelp, Github } from 'lucide-react';
import Control from 'react-leaflet-custom-control';
import { MapContext } from '@/contexts/map';
import Modal from '@/components/modal';

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
      <Modal title='Ayuda' open={open} setOpen={setOpen}>
        <div className='space-y-2'>
          <section>
            <h3 className='font-lg font-semibold'>¿Cómo creo una reseña?</h3>
            <ul className='list-disc pl-4'>
              <li>
                Da click o toca el pin rojo (
                <img
                  className='inline w-6'
                  src='/location-pin.svg'
                  alt='Location pin'
                />
                ) para abrir un popup
              </li>
              <li>{`Da click o toca "Reseñar este punto"`}</li>
            </ul>
          </section>
          <section>
            <h3 className='font-lg font-semibold'>Perdí mi pin</h3>
            <ul className='list-disc pl-4'>
              <li>
                Da click o toca el botón (
                <LocateFixed className='w-6 inline' />) en la esquina inferior
                izquierda para ir a tu posición inicial.
              </li>
            </ul>
          </section>
          <section>
            <h3 className='font-lg font-semibold'>¿Cómo reviso una reseña?</h3>
            <ul className='list-disc pl-4'>
              <li>
                Da click o toca cualquier (
                <img
                  className='inline w-6'
                  src='/review-pin.svg'
                  alt='Review pin'
                />
                ) para ver un popup con la reseña
              </li>
            </ul>
          </section>
          <section>
            <p>
              De momento solo se muestran <strong>ISP</strong> (Internet Service
              Provider) de México.
            </p>
            <p>
              Esta app no guarda tu ubicación, solo guarda la ubicacón del pin
              rojo cuando dejas una reseña.
            </p>
          </section>
          <section>
            <Button
              size={null}
              variant='link'
              asChild
              className='flex items-center w-max gap-1'
            >
              <a
                target='_blank'
                href='https://github.com/juancmandev/best-internet-map'
              >
                <Github className='w-5' />
                GitHub
              </a>
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
}
