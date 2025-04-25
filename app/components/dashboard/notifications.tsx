"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { formatDate, getInitials } from "@/app/lib/utils";

const notifications = [
  {
    id: "1",
    title: "New Feature Announcement",
    message: "We've added a new media tagging feature to help you organize your content more efficiently.",
    date: new Date("2025-04-20T09:30:00"),
    read: false,
    from: {
      name: "Admin Team",
      image: "",
    },
  },
  {
    id: "2",
    title: "Upcoming Maintenance",
    message: "The system will be undergoing maintenance on May 5th from 2:00 AM to 4:00 AM EST. Please plan accordingly.",
    date: new Date("2025-04-18T14:15:00"),
    read: false,
    from: {
      name: "System Admin",
      image: "",
    },
  },
  {
    id: "3",
    title: "Your Subscription Renewal",
    message: "Your premium subscription will renew automatically on May 15th. Please update your payment method if needed.",
    date: new Date("2025-04-15T11:45:00"),
    read: true,
    from: {
      name: "Billing Team",
      image: "",
    },
  },
  {
    id: "4",
    title: "Performance Report Available",
    message: "Your Q1 performance report is now available. Check the analytics section to view your results.",
    date: new Date("2025-04-10T16:20:00"),
    read: true,
    from: {
      name: "Analytics Team",
      image: "",
    },
  },
  {
    id: "5",
    title: "Holiday Schedule",
    message: "Our office will be closed on May 27th for the holiday. Support will be available via email only.",
    date: new Date("2025-04-05T10:00:00"),
    read: true,
    from: {
      name: "Support Team",
      image: "",
    },
  },
];

export function Notifications() {
  return (
    <div className="space-y-6">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`space-y-2 ${notification.read ? "" : "bg-muted/30 p-3 rounded-lg -mx-3"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={notification.from.image} alt={notification.from.name} />
                <AvatarFallback>{getInitials(notification.from.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{notification.from.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(notification.date)}
                </p>
              </div>
            </div>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold">{notification.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {notification.message}
            </p>
          </div>
          <div className="flex justify-end">
            {!notification.read && (
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Mark as read
              </Button>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          View all notifications
        </Button>
      </div>
    </div>
  );
}
