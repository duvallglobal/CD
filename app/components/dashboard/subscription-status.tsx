"use client";

import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { formatCurrency } from "@/app/lib/utils";

export function SubscriptionStatus() {
  // This would typically come from your API
  const subscription = {
    plan: "Premium",
    price: 49.99,
    billingCycle: "monthly",
    nextBillingDate: new Date("2025-05-15"),
    features: [
      "Unlimited media storage",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
    ],
    usage: {
      storage: {
        used: 2.4,
        total: 10,
        unit: "GB",
      },
      appointments: {
        used: 12,
        total: 50,
        unit: "appointments",
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Current Plan</p>
          <p className="text-2xl font-bold">{subscription.plan}</p>
        </div>
        <Button variant="outline">Manage</Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">Price</p>
          <p className="font-medium">
            {formatCurrency(subscription.price)}/{subscription.billingCycle}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">Next billing date</p>
          <p className="font-medium">
            {subscription.nextBillingDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Storage Usage</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {subscription.usage.storage.used} {subscription.usage.storage.unit} of{" "}
              {subscription.usage.storage.total} {subscription.usage.storage.unit}
            </p>
            <p className="font-medium">
              {Math.round((subscription.usage.storage.used / subscription.usage.storage.total) * 100)}%
            </p>
          </div>
          <Progress 
            value={(subscription.usage.storage.used / subscription.usage.storage.total) * 100} 
            className="h-2"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Appointments</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {subscription.usage.appointments.used} of{" "}
              {subscription.usage.appointments.total} {subscription.usage.appointments.unit}
            </p>
            <p className="font-medium">
              {Math.round((subscription.usage.appointments.used / subscription.usage.appointments.total) * 100)}%
            </p>
          </div>
          <Progress 
            value={(subscription.usage.appointments.used / subscription.usage.appointments.total) * 100} 
            className="h-2"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Features</p>
        <ul className="space-y-1">
          {subscription.features.map((feature, index) => (
            <li key={index} className="text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-primary"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
