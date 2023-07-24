'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';


export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();

    return(
        <nav className='p-4 bg-transparent flex items-center justify-between'>
            <Link href='/' className='flex items-center'>
              <div className='relative h-12 w-48 mr-6'>
                <Image fill src='/images/Logo1.png' alt='Logo' />
              </div>
            </Link>
            <div className='flex items-center gap-x-2'>
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                  <Button variant='blue' className='rounded-full'>
                    Get Started
                  </Button>
                </Link>
            </div>
        </nav>
    )
};