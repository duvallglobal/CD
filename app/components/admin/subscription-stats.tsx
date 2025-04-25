"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "@/app/lib/utils";

const data = [
  { name: "Free", value: 45, color: "#94a3b8" },
  { name: "Basic", value: 51, color: "#3b82f6" },
  { name: "Premium", value: 16, color: "#8b5cf6" },
  { name: "Enterprise", value: 8, color: "#ec4899" },
];

const COLORS = data.map(item => item.color);

export function SubscriptionStats() {
  const totalClients = data.reduce((sum, item) => sum + item.value, 0);
  const monthlyRevenue = 
    (data[1].value * 19.99) + // Basic plan price
    (data[2].value * 49.99) + // Premium plan price
    (data[3].value * 99.99);  // Enterprise plan price

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <p className="text-2xl font-bold">{totalClients}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</p>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} clients`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.value} clients ({((item.value / totalClients) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
