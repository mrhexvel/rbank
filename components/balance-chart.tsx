"use client";

import { Card } from "@/components/ui/card";
import { format, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

const generateData = () => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = subDays(today, i);
    const formattedDate = format(date, "d MMM", { locale: ru });

    let value = 10000;
    if (i === 30) value = 10000;
    else {
      const prevValue = data[data.length - 1].value;
      const change = Math.random() * 500 - 200;
      value = Math.max(prevValue + change, 5000);
    }

    data.push({
      date: formattedDate,
      value: Math.round(value),
    });
  }

  return data;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-black/80 border border-white/10 p-3 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-primary text-lg font-bold">
          ₽{payload[0].value?.toLocaleString()}
        </p>
      </Card>
    );
  }

  return null;
};

export function BalanceChart() {
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickMargin={10}
          />
          <YAxis
            tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickFormatter={(value) => `${value.toLocaleString()}`}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 8,
              fill: "#7c3aed",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
