import { paymentListApi, paymentStatusApi, paymentTypeApi } from "@/lib/api/payment";
import type { IPaymentCommon, IPaymentCommonStatus, IPaymentList } from "@/types/payment.type";
import { useQuery } from "@tanstack/react-query";

// 거래 내역 조회
export const usePaymentList = () => {
  return useQuery<IPaymentList>({
    queryKey: ["payment_list"],
    queryFn: paymentListApi,
  });
};

// 결제 상태 코드
export const usePaymentStatus = () => {
  return useQuery<IPaymentCommonStatus>({
    queryKey: ["payment_status"],
    queryFn: paymentStatusApi,
  });
};

// 결제 수단 코드
export const usePaymentType = () => {
  return useQuery<IPaymentCommon>({
    queryKey: ["payment_type"],
    queryFn: paymentTypeApi,
  });
};
