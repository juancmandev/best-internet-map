'use client';

import { useState } from 'react';
import { Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import DialogOrDrawer from '@/components/dialog-or-drawer';
import ReviewForm from './review-form';

export default function MarkerPopup() {
  const [open, setOpen] = useState(false);

  return (
    <Popup>
      <h3 className='text-lg text-center mb-2'>You're here!</h3>
      <Button onClick={() => setOpen((prev) => !prev)}>
        Review this point
      </Button>
      <DialogOrDrawer
        open={open}
        setOpen={setOpen}
        title='Review this point'
        description='Say what do you think about your Internet Service Provider.'
      >
        <ReviewForm />
      </DialogOrDrawer>
    </Popup>
  );
}
