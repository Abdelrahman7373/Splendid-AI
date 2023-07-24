'use client';

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare, ArrowRight, Code, ImageIcon, VideoIcon, Music, } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [{
  label: 'Chat', icon: MessageSquare, href: '/chat', color: 'text-sky-500', bgColor: 'bg-sky-500/10',
}, {
  label: 'Code Generator', icon: Code, href: '/code-generator', color: 'text-green-300', bgColor: 'bg-green-300/10',
}, {
  label: 'Image Generator', icon: ImageIcon, href: '/image-generator', color: 'text-pink-300', bgColor: 'bg-pink-300/10',
}, {
  label: 'Video Generator', icon: VideoIcon, href: '/video-generator', color: 'text-red-300', bgColor: 'bg-red-300/10',
}, {
  label: 'Music Generator', icon: Music, href: '/music-generator', color: 'text-yellow-300', bgColor: 'bg-yellow-300/10',
}, ]

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <div className='mb-8 sapce-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Explore the power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>Chat with Splendid AI</p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
