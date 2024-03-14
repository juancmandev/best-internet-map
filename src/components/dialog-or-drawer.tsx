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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
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

export default function DialogOrDrawer(props: Props) {
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
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={props.open} onOpenChange={props.setOpen}>
      <DrawerContent className='px-2'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{props.title}</DrawerTitle>
          <DrawerDescription>{props.description}</DrawerDescription>
        </DrawerHeader>
        <main className='px-4'>{props.children}</main>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className='w-full' variant='outline'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
