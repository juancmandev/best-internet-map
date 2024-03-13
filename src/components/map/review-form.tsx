'use client';

import { useState } from 'react';
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

const ISP = [
  {
    value: 'totalplay',
    label: 'TotalPlay',
  },
  {
    value: 'telmex',
    label: 'Telmex',
  },
];

const FormSchema = z.object({
  isp: z.string({
    required_error: 'Please select a ISP.',
  }),
  comments: z.string({
    required_error: 'Please add your comments',
  }),
});

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(3);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleRating(rate: number) {
    setRating(rate);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <section className='flex flex-col gap-2'>
          <Label>Rating</Label>
          <Rating onClick={handleRating} SVGclassName='inline-block' />
        </section>
        <FormField
          control={form.control}
          name='isp'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>ISP</FormLabel>
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
                    {field.value
                      ? ISP.find((isp) => isp.value === field.value)?.label
                      : 'Choose ISP...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='popover-content'>
                  <Command>
                    <CommandInput placeholder='Search ISP...' />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {ISP.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={() => {
                              form.setValue('isp', item.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'w-4 h-4 mr-2',
                                item.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
