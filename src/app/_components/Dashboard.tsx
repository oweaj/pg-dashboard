"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { usePaymentList } from "@/hooks/usePayment";
import TotalRank from "./TotalRank";

const DashBoard = () => {
  const { data } = usePaymentList();

  if (!data) return null;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards data={data.data} />
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-3">
          <ChartAreaInteractive data={data.data} />
          <TotalRank data={data.data} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
