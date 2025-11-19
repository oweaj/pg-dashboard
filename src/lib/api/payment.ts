import { cfetch } from "./cfetch";

// 거래 내역 조회
export const paymentListApi = async () => {
  const result = await cfetch("/payments/list");
  return result;
};

// 결제 상태 코드
export const paymentStatusApi = async () => {
  const result = await cfetch("/common/payment-status/all");
  return result;
};

// 결제 수단 코드
export const paymentTypeApi = async () => {
  const result = await cfetch("/common/paymemt-type/all");
  return result;
};
