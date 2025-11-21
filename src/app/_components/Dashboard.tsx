"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { usePaymentList, usePaymentType } from "@/hooks/usePayment";
import TotalRank from "./TotalRank";
import { ChartPieLabel } from "@/components/chart-pie";
import type { ChartConfig } from "@/components/ui/chart";
import { useMerchantDetail } from "@/hooks/useMerchant";
import { useDataCount } from "@/hooks/useDataCount";

const DashBoard = () => {
  const { data } = usePaymentList();
  const { data: paymentType } = usePaymentType();
  const { data: merchantDetail } = useMerchantDetail();

  // 결제 수단 별 차트 데이터
  const getPayTypeCount = useDataCount(
    data?.data,
    (item) => item.payType,
    (item) => paymentType?.data.find((pay) => pay.type === item.payType)?.description
  );

  // 가맹 유형 별 차트 데이터
  const getMerchantTypeCount = useDataCount(
    data?.data,
    (item) => {
      const mcht = merchantDetail?.data.find((pay) => pay.mchtCode === item.mchtCode);
      return mcht?.bizType;
    },
    (item) => {
      const mcht = merchantDetail?.data.find((pay) => pay.mchtCode === item.mchtCode);
      return mcht?.bizType;
    }
  );

  const mchtTypeChart = getMerchantTypeCount.map((data, i) => ({
    browser: data.label,
    visitors: data.count,
    fill: `var(--chart-${i + 1})`,
  }));

  const mchtTypeChartConfig: ChartConfig = {};
  getMerchantTypeCount.forEach((data, i) => {
    mchtTypeChartConfig[data.label] = {
      label: data.label,
      color: `var(--chart-${i + 1})`,
    };
  });

  const payTypeChart = getPayTypeCount.map((data, i) => ({
    browser: data.label,
    visitors: data.count,
    fill: `var(--chart-${i + 1})`,
  }));

  const payTypeChartConfig: ChartConfig = {};
  getPayTypeCount.forEach((data, i) => {
    payTypeChartConfig[data.label] = {
      label: data.label,
      color: `var(--chart-${i + 1})`,
    };
  });

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
        <SectionCards data={data?.data} />
        <div className="flex flex-col gap-4 md:flex-row">
          <ChartAreaInteractive data={data?.data ?? []} />
          <TotalRank data={data?.data ?? []} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <ChartPieLabel chartData={mchtTypeChart} chartConfig={mchtTypeChartConfig} title="유형 별 거래 건수" />
          <ChartPieLabel chartData={payTypeChart} chartConfig={payTypeChartConfig} title="결제수단 별 거래 건수" />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
