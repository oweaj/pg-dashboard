"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import chartDataFilter from "@/utils/chartData";
import type { IPaymentType } from "@/types/payment.type";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useMobile } from "@/hooks/useMobile";

export interface IPaymentDataType {
  data: IPaymentType[];
}

export function ChartAreaInteractive({ data }: IPaymentDataType) {
  const isMobile = useMobile();
  const [timeRange, setTimeRange] = useState("week");
  const chartData = chartDataFilter(data, timeRange);

  useEffect(() => {
    if (isMobile) {
      setTimeRange("week");
    }
  }, [isMobile]);

  const chartConfig = {
    desktop: {
      label: "total",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>총 거래액 차트</CardTitle>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden md:flex"
          >
            <ToggleGroupItem value="week">이번 주</ToggleGroupItem>
            <ToggleGroupItem value="month">이번 달</ToggleGroupItem>
            <ToggleGroupItem value="year">올해</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-24 md:hidden" size="sm" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="week" className="rounded-lg">
                이번 주
              </SelectItem>
              <SelectItem value="month" className="rounded-lg">
                이번 달
              </SelectItem>
              <SelectItem value="year" className="rounded-lg">
                올해
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full p-4">
          <LineChart accessibilityLayer data={chartData} margin={{ top: 12, right: 12, bottom: 12, left: 24 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              tickFormatter={(value) => (value === 0 ? "" : `${Number(value).toLocaleString()}원`)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="total" type="linear" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
