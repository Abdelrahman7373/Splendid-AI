'use client';

import axios from "axios";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({isPro}:SubscriptionButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
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

    return(
        <Button disabled={isLoading} onClick={onClick} variant={isPro ? 'blue' : 'upgrade'}>
            {isPro ? 'Manage Subscription' : 'Upgrade Now'}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
};