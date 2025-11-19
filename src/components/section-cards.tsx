import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMerchantList } from "@/hooks/useMerchant";
import type { IPaymentType } from "@/types/payment.type";

export function SectionCards({ data }: { data: IPaymentType[] }) {
  const { data: merchantData } = useMerchantList();

  if (!merchantData) return null;

  const total = data.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>총 매출</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total.toLocaleString()}원
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>총 거래 건수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.length ?? 0}건
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>거래 가맹점 수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {merchantData.data.length}개
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
