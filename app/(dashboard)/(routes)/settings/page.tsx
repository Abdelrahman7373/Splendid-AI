import { SubscriptionButton } from "@/components/SubscriptionButton";
import { Heading } from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { checkSubscription } from "@/lib/subscription";
import { SettingsIcon } from "lucide-react";

const Settings = async () => {
    const isPro = await checkSubscription();

  return (
    <div>
      <Heading title='Settings' description='Manage Account Settings' icon={SettingsIcon} iconColor="text-gray-700" />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
            {isPro ? <div>You are currently subscribed to Splendid <Badge variant='upgrade' className="uppercase text-sm py-1">pro</Badge></div> : 'You are currently on a free trial'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default Settings;