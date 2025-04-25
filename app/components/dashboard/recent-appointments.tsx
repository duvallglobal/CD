"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { formatDate, getInitials } from "@/app/lib/utils";
import { Check, X } from "lucide-react";

const appointments = [
  {
    id: "1",
    title: "Strategy Session",
    date: new Date("2025-05-01T14:00:00"),
    status: "pending",
    with: {
      name: "Sarah Johnson",
      image: "",
    },
  },
  {
    id: "2",
    title: "Content Review",
    date: new Date("2025-05-03T10:30:00"),
    status: "pending",
    with: {
      name: "Michael Chen",
      image: "",
    },
  },
  {
    id: "3",
    title: "Performance Analysis",
    date: new Date("2025-05-05T15:00:00"),
    status: "pending",
    with: {
      name: "Jessica Williams",
      image: "",
    },
  },
  {
    id: "4",
    title: "Quarterly Planning",
    date: new Date("2025-04-20T11:00:00"),
    status: "completed",
    with: {
      name: "David Miller",
      image: "",
    },
  },
  {
    id: "5",
    title: "Campaign Review",
    date: new Date("2025-04-15T09:00:00"),
    status: "completed",
    with: {
      name: "Emily Rodriguez",
      image: "",
    },
  },
];

export function RecentAppointments() {
  return (
    <div className="space-y-8">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={appointment.with.image} alt={appointment.with.name} />
            <AvatarFallback>{getInitials(appointment.with.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{appointment.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(appointment.date)}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {appointment.status === "pending" ? (
              <>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">Completed</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
