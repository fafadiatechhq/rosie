"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  Key as KeyIcon,
  Bell as BellIcon,
  Webhook as WebhookIcon,
  Users as UsersIcon,
  CreditCard as CreditCardIcon,
} from "lucide-react";

export default function SettingsContainer() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account configuration
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: UsersIcon,
            title: "Users",
            desc: "Invite and manage team members and their roles",
            action: "Manage",
            onClick: () => <Link href="/app/settings/users"></Link>,
          },
          {
            icon: CreditCardIcon,
            title: "Billing & Subscription",
            desc: "View your plan, update payment methods, and download invoices",
            action: "Manage",
          },
          {
            icon: KeyIcon,
            title: "API Keys",
            desc: "Manage your API keys for programmatic access",
            action: "Manage",
          },
          {
            icon: WebhookIcon,
            title: "Webhook Defaults",
            desc: "Configure default webhook endpoints for all fetchers",
            action: "Configure",
          },
          {
            icon: BellIcon,
            title: "Notifications",
            desc: "Set up email and in-app notification preferences",
            action: "Configure",
          },
          {
            icon: SettingsIcon,
            title: "Retention Policy",
            desc: "View your data retention settings based on your plan",
            action: "View",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-colors cursor-pointer"
            onClick={item.onClick}
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
