'use client';

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const {isSignedIn} = useAuth();

    return(
        <div className="text-white font-bold py-36 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1 style={{ marginTop: "-80px" }}>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600" >
                    <TypewriterComponent options={{strings: ['Answering Questions.', 'Code Generation.', 'Image Generation.', 'Video Generation.', 'Music Generation.',], autoStart: true, loop: true,}} />
                </div>
            </div>
            <div className="mt-10 text-sm md:text-xl font-light text-zinc-400">
                Create content using AI 10x faster.
            </div>
            <div className="md:mt-8 mt-12">
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                  <Button variant='upgrade' className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Start Generating for free
                  </Button>
                </Link>
            </div>
            <div className="mt-10 text-zinc-400 text-xs md:text-sm font-normal">
                No Credit Card Required.
            </div>
        </div>
    )
};