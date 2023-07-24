'use client';

import axios from "axios";
import { useProModal } from "@/hooks/UseProModal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { MessageSquare, Code, ImageIcon, VideoIcon, Music, Check, Zap, } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";



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
}, ];




export const ProModal = () => {
    const proModal = useProModal();
    const [isLoading, setIsLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            toast.error('Something went wrong 😅');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">
                    Upgrade To Splendid
                    <Badge variant='upgrade' className="uppercase text-sm py-1">
                        pro
                    </Badge>
                </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                {tools.map((tool) => (
                  <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                            <tool.icon className={cn("w-6 h-6", tool.color)} />
                        </div>
                        <div className="font-semibold text-sm">
                            {tool.label}
                        </div>
                    </div>
                    <Check className="text-green-300 w-7 h-7" />
                  </Card>
                ))}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button onClick={onSubscribe} variant='upgrade' size='lg' className="w-full" disabled={isLoading}>
                Upgrade Now
                <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}