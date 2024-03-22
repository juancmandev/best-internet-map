'use client';

import { useState } from 'react';
import { Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal';
import ReviewForm from './review-form';

export default function MarkerPopup() {
  const [open, setOpen] = useState(false);

  return (
    <Popup>
      <h3 className='text-lg text-center'>¡Estás aquí!</h3>
      <p className='!m-0 !mb-2'>Puedes mover este pin arrastrándolo</p>
      <Button className='w-full' onClick={() => setOpen((prev) => !prev)}>
        Reseñar este punto
      </Button>
      <Modal open={open} setOpen={setOpen} title='Reseñar este punto'>
        <ReviewForm setOpen={setOpen} />
      </Modal>
    </Popup>
  );
}
