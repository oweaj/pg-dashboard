import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMerchantList } from "@/hooks/useMerchant";
import type { IPaymentListType } from "@/types/payment.type";
import { useMemo } from "react";

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
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>거래별 금액 TOP5</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-7 xl:space-y-10">
          {topFiveAmount.map((item, i) => (
            <div key={item.mchtCode} className="flex flex-col justify-between xl:flex-row xl:items-center">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center bg-primary rounded-md text-xs text-white font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium ml-[41px] xl:ml-0">{Number(item.amount).toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRank;
