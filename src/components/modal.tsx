'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useMediaQuery from '@/hooks/use-media-query';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function Modal(props: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop)
    return (
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogContent className='sm:max-w-[425px] py-8'>
          <ScrollArea className='px-6'>
            <div className='p-2'>
              <DialogHeader>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogDescription>{props.description}</DialogDescription>
              </DialogHeader>
              <main>{props.children}</main>
              <DialogFooter className='mt-2'>
                <DialogClose asChild>
                  <Button className='w-full' variant='outline'>
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Sheet open={props.open} onOpenChange={props.setOpen}>
      <SheetContent side='top' className='px-4'>
        <SheetHeader className='text-left'>
          <SheetTitle>{props.title}</SheetTitle>
          <SheetDescription>{props.description}</SheetDescription>
        </SheetHeader>
        <main>{props.children}</main>
        <SheetFooter className='mt-2'>
          <SheetClose asChild>
            <Button className='w-full' variant='outline'>
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
