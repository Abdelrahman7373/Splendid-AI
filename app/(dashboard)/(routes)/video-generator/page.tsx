'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import { zodResolver } from '@hookform/resolvers/zod';
import { VideoIcon } from "lucide-react";
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


const VideoGenerator = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {prompt: ''},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post('/api/video-generator', values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403) {proModal.onOpen(); toast.error('Your free trial has expired 😅')} else {toast.error('Something went wrong 😅')}
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Video Generator &nbsp; Note: Generating Videos takes some time So please be patient" description="Generate High Quality Videos Using Splendid AI" icon={VideoIcon} iconColor="text-red-300" bgColor="bg-red-300/10" />
      <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name='prompt' 
                      render={({field}) => (<FormItem className='col-span-12 lg:col-span-10'><FormControl className='m-0 p-0'><Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Turn Your Prompt Into A Video...' {...field} /></FormControl></FormItem>)} 
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

            {!video && !isLoading && (
              <Empty label='There is no videos generated yet!' />
            )}
            {video && (
              <video controls className='w-full aspect-video mt-8 rounded-lg border bg-black'>
                <source src={video} />
              </video>
            )}
        </div>
      </div>
    </div>
  )
}

export default VideoGenerator;
