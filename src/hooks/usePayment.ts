import { paymentListApi } from "@/lib/api/payment";
import type { IPaymentList } from "@/types/payment.type";
import { useQuery } from "@tanstack/react-query";

// 거래 내역 조회
export const usePaymentList = () => {
  return useQuery<IPaymentList>({
    queryKey: ["payment_list"],
    queryFn: paymentListApi,
  });
};
