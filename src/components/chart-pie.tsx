"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ReactNode } from "react";

interface IChartDataItem {
  browser: string;
  visitors: number;
  fill?: string;
}

interface IChartConfigItem {
  label?: ReactNode;
  color?: string;
}

interface IChartProps {
  chartData: IChartDataItem[];
  chartConfig: Record<string, IChartConfigItem>;
  title: string;
}

export function ChartPieLabel({ chartData, chartConfig, title }: IChartProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-3/4 max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, value }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 12;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                    {value}
                  </text>
                );
              }}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="translate-y-2 flex-wrap gap-2 *:basis-1/5 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
