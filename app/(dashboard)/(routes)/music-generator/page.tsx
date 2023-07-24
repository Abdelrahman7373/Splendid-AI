'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import { zodResolver } from '@hookform/resolvers/zod';
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useProModal } from '@/hooks/UseProModal';
import { toast } from 'react-hot-toast';


const MusicGenerator = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {prompt: ''},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post('/api/music-generator', values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403) {proModal.onOpen(); toast.error('Your free trial has expired 😅')} else {toast.error('Something went wrong 😅')}
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Music Generator &nbsp; Note: Generating Music takes some time So please be patient" description="Generate Phenomenal Music Using Splendid AI" icon={Music} iconColor="text-yellow-300" bgColor="bg-yellow-300/10" />
      <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name='prompt' 
                      render={({field}) => (<FormItem className='col-span-12 lg:col-span-10'><FormControl className='m-0 p-0'><Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Turn Your Prompt Into Music...' {...field} /></FormControl></FormItem>)} 
                    />
                    <Button className='col-span-12 lg:col-span-2 w-full' variant="blue" disabled={isLoading}>
                        Generate
                    </Button>
                </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4'>
            {isLoading && (
              <div className='p-20'>
                <Loader />
              </div>
            )}

            {!music && !isLoading && (
              <Empty label='There is no music generated yet!' />
            )}
            {music && (
              <audio controls className='w-full mt-8'>
                <source src={music} />
              </audio>
            )}
        </div>
      </div>
    </div>
  )
}

export default MusicGenerator;
