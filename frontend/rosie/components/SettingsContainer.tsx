"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  Key as KeyIcon,
  Bell as BellIcon,
  Webhook as WebhookIcon,
  Users as UsersIcon,
  CreditCard as CreditCardIcon,
} from "lucide-react";

const settings = [
  {
    icon: UsersIcon,
    title: "Users",
    desc: "Invite and manage team members and their roles",
    action: "Manage",
    route: "/app/settings/users",
  },
  {
    icon: CreditCardIcon,
    title: "Billing & Subscription",
    desc: "View your plan, update payment methods, and download invoices",
    action: "Manage",
    route: "/app/settings/users",
  },
  {
    icon: KeyIcon,
    title: "API Keys",
    desc: "Manage your API keys for programmatic access",
    action: "Manage",
    route: "/app/settings/users",
  },
  {
    icon: WebhookIcon,
    title: "Webhook Defaults",
    desc: "Configure default webhook endpoints for all fetchers",
    action: "Configure",
    route: "/app/settings/users",
  },
  {
    icon: BellIcon,
    title: "Notifications",
    desc: "Set up email and in-app notification preferences",
    action: "Configure",
    route: "/app/settings/users",
  },
  {
    icon: SettingsIcon,
    title: "Retention Policy",
    desc: "View your data retention settings based on your plan",
    action: "View",
    route: "/app/settings/users",
  },
];

export default function SettingsContainer() {
  const router = useRouter();

  function handleNavigation(route: string) {
    router.push(route);
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account configuration
        </p>
      </div>

      <div className="space-y-4">
        {settings.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-colors cursor-pointer"
            onClick= {() => {handleNavigation(item.route)}}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {item.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
