"use client";

import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useState } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";

interface ITableCalendarProps {
  setColumnFilters: (updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
}

export const DataCalendar = ({ setColumnFilters }: ITableCalendarProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from && range?.to) {
      setColumnFilters((prev: ColumnFiltersState) => {
        const dataFilter = prev.filter((filter) => filter.id !== "date");

        return [
          ...dataFilter,
          {
            id: "date",
            value: { start: range.from, end: range.to },
          },
        ];
      });
    } else if (!range?.from) {
      setColumnFilters((prev: ColumnFiltersState) => prev.filter((filter) => filter.id !== "date"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 text-muted-foreground">
          <IconCalendarEvent />
          {dateRange?.from
            ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString() || ""}`
            : "날짜 선택"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          className="rounded-xl border shadow-sm"
        />
      </PopoverContent>
    </Popover>
  );
};
