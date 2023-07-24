'use client';

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { FreeCounter } from "./FreeCounter";

const routes = [{
    label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', color: 'text-sky-500',
}, {
    label: 'Chat', icon: MessageSquare, href: '/chat', color: 'text-sky-500',
}, {
    label: 'Code Generator', icon: Code, href: '/code-generator', color: 'text-green-300',
}, {
    label: 'Image Generator', icon: ImageIcon, href: '/image-generator', color: 'text-pink-300',
}, {
    label: 'Video Generator', icon: VideoIcon, href: '/video-generator', color: 'text-red-300',
}, {
    label: 'Music Generator', icon: Music, href: '/music-generator', color: 'text-yellow-300',
}, {
    label: 'Settings', icon: Settings, href: '/settings',
}]

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({apiLimitCount, isPro=false}:SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-700 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
          <div className="relative w-96 h-12 mr-6">
            <Image fill alt="Logo" src="/images/Logo1.png" />
          </div>
        </Link>
        <div className="space-y-1">
            {routes.map((route) => (
                <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname===route.href ? 'text-white bg-white/10' : 'text-zinc-400')}>
                  <div className="flex items-center flex-1">
                    <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                    {route.label}
                  </div>
                </Link>
            ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  )
}

export default Sidebar;
