import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMerchantList } from "@/hooks/useMerchant";
import type { IPaymentListType } from "@/types/payment.type";
import { useMemo } from "react";

// 거래 금액 랭킹 컴포넌트
const TotalRank = ({ data }: { data: IPaymentListType[] }) => {
  const { data: merchantList } = useMerchantList();

  const topFiveAmount = useMemo(() => {
    const topFive = [...data].sort((a, b) => Number(b.amount) - Number(a.amount)).slice(0, 5);

    return topFive.map((data) => {
      const match = merchantList?.data.find((mcht) => mcht.mchtCode === data.mchtCode);
      return {
        ...data,
        name: match?.mchtName || "알수없음",
      };
    });
  }, [data, merchantList]);

  return (
    <Card className="flex-1">
      <CardHeader className="text-center mb-2">
        <CardTitle>거래별 금액 TOP5</CardTitle>
        <CardDescription className="text-sm">※ 단순 거래별 금액 순위입니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-7 xl:space-y-12">
          {topFiveAmount.map((item, i) => (
            <div
              key={item.paymentCode}
              className="w-full flex flex-row items-center justify-evenly md:justify-between md:flex-col xl:flex-row xl:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center bg-primary rounded-md text-xs text-white font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm ml-1 font-medium">{Number(item.amount).toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRank;
