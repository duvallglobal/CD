"use client";

import { Button } from "@/app/components/ui/button";
import { formatDate } from "@/app/lib/utils";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";

const notifications = [
  {
    id: "1",
    title: "System Update Completed",
    message: "The system update has been successfully completed. All features are now available.",
    date: new Date("2025-04-22T09:30:00"),
    type: "success",
  },
  {
    id: "2",
    title: "New Client Registration",
    message: "A new client has registered and requires approval. Please review their information.",
    date: new Date("2025-04-21T14:15:00"),
    type: "info",
  },
  {
    id: "3",
    title: "Payment Processing Error",
    message: "There was an error processing payments for 3 clients. Please check the billing system.",
    date: new Date("2025-04-20T11:45:00"),
    type: "error",
  },
  {
    id: "4",
    title: "Storage Limit Warning",
    message: "The system is approaching 80% of the allocated storage capacity. Consider upgrading or cleaning up old files.",
    date: new Date("2025-04-18T16:20:00"),
    type: "warning",
  },
  {
    id: "5",
    title: "New Feature Available",
    message: "The media tagging feature is now available for all clients. You can enable it in the settings.",
    date: new Date("2025-04-15T10:00:00"),
    type: "info",
  },
];

export function RecentNotifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {notifications.map((notification) => (
        <div key={notification.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon(notification.type)}
              <h4 className="text-sm font-semibold">{notification.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(notification.date)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {notification.message}
          </p>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="gap-1">
          <Bell className="h-4 w-4" />
          Send new notification
        </Button>
      </div>
    </div>
  );
}
