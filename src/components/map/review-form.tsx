'use client';

import { useContext, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Rating } from 'react-simple-star-rating';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import { MapContext } from '@/contexts/map';

const FormSchema = z.object({
  isp: z.object({
    id: z.number({ required_error: 'Please select a ISP.' }),
    name: z.string({ required_error: 'Please select a ISP.' }),
  }),
  comments: z.string({
    required_error: 'Please add your comments',
  }),
});

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TIsp = {
  id: number;
  name: string;
};

export default function ReviewForm(props: Props) {
  const supabase = createBrowserClient();

  const { coords, setReloadReviews } = useContext(MapContext)!;

  const [isp, setIsp] = useState<TIsp[] | null>(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(3);

  async function fetchIsp() {
    const { data } = await supabase.from('isp').select().order('name');

    setIsp(data);
  }

  useEffect(() => {
    fetchIsp();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleRating(rate: number) {
    setRating(rate);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await supabase.from('reviews').insert({
      rating: rating,
      isp: data.isp.id,
      comments: data.comments,
      location: `POINT(${coords!.lng} ${coords!.lat})`,
    });

    if (res.error) {
      return;
    }

    toast('Review created! Move your marker');

    setReloadReviews((prev) => !prev);

    props.setOpen((prev) => !prev);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-2 space-y-4'>
        <section className='flex flex-col gap-2'>
          <Label>Rating</Label>
          <div className='w-max [&span]:w-max'>
            <Rating
              initialValue={rating}
              onClick={handleRating}
              SVGclassName='inline-block'
            />
          </div>
        </section>
        <FormField
          control={form.control}
          name='isp'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>ISP</FormLabel>
              {!isp && (
                <div className='w-full h-10 rounded-md bg-slate-200 animate-pulse' />
              )}
              {isp && (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role='combobox'
                      variant='outline'
                      aria-expanded={open}
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value &&
                      isp.find((item: TIsp) => item.id === field.value.id)
                        ? field.value.name
                        : 'Choose ISP...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='popover-content'>
                    <Command>
                      <CommandInput placeholder='Search ISP...' />
                      <CommandEmpty>No ISP found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {isp.map((item: TIsp) => (
                            <CommandItem
                              key={item.id.toString()}
                              value={item.id.toString()}
                              onSelect={() => {
                                form.setValue('isp', item);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'w-4 h-4 mr-2',
                                  item.id === field.value?.id
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='comments'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none'
                    placeholder='Tell more about this ISP'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
