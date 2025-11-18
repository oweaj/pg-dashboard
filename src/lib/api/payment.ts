import { cfetch } from "./cfetch";

// 거래 내역 조회
export const paymentListApi = async () => {
  const result = await cfetch("/payments/list");
  return result;
};
