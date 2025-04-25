"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "Jan",
    new: 18,
    active: 65,
    inactive: 5,
  },
  {
    name: "Feb",
    new: 15,
    active: 78,
    inactive: 7,
  },
  {
    name: "Mar",
    new: 22,
    active: 95,
    inactive: 8,
  },
  {
    name: "Apr",
    new: 25,
    active: 110,
    inactive: 10,
  },
  {
    name: "May",
    new: 20,
    active: 125,
    inactive: 12,
  },
  {
    name: "Jun",
    new: 12,
    active: 128,
    inactive: 15,
  },
];

export function ClientsOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="new"
          name="New Clients"
          fill="#4f46e5"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="active"
          name="Active Clients"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="inactive"
          name="Inactive Clients"
          fill="#f43f5e"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
