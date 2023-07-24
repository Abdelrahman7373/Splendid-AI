'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Heading } from "@/components/heading";
import { ChatCompletionRequestMessage } from 'openai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';
import ReactMarkdown from 'react-markdown';
import { useProModal } from '@/hooks/UseProModal';
import { toast } from 'react-hot-toast';


const CodeGenerator = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {prompt: ''},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {role: 'user', content: values.prompt, };
      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/code-generator', {messages: newMessages});

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403) {proModal.onOpen(); toast.error('Your free trial has expired 😅')} else {toast.error('Something went wrong 😅')}
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading title="Code Generator" description="Splendid AI Code Generator Model" icon={Code} iconColor="text-green-300" bgColor="bg-green-300/10" />
      <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name='prompt' 
                      render={({field}) => (<FormItem className='col-span-12 lg:col-span-10'><FormControl className='m-0 p-0'><Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Create Whatever You Want With The Power Of Splendid AI Code Generator Model...' {...field} /></FormControl></FormItem>)} 
                    />
                    <Button className='col-span-12 lg:col-span-2 w-full' variant="blue" disabled={isLoading}>
                        Send
                    </Button>
                </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4'>
            {isLoading && (
              <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                <Loader />
              </div>
            )}

            {messages.length === 0 && !isLoading && (
              <Empty label='Send A Message To Start Talking With AI' />
            )}
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((message) => (
                <div key={message.content} className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}>
                  {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown 
                    components={{pre: ({node, ...props}) => (<div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'><pre {...props} /></div>),
                    code: ({node, ...props}) => (<code className='bg-black/10 rounded-lg p-1' {...props} />)}}
                    className='text-sm overflow-hidden leading-7'
                  >
                    {message.content || ''}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default CodeGenerator;
