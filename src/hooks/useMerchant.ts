import { merchantDetailApi, merchantDetailCodeApi, merchantListApi } from "@/lib/api/merchant";
import type { IMerchantDetail, IMerchantList } from "@/types/merchant.type";
import { useQuery } from "@tanstack/react-query";

// 가맹점 목록 조회
export const useMerchantList = () => {
  return useQuery<IMerchantList>({
    queryKey: ["merchant_list"],
    queryFn: merchantListApi,
  });
};

// 가맹점 상세 조회
export const useMerchantDetail = () => {
  return useQuery<IMerchantDetail>({
    queryKey: ["merchant_detail"],
    queryFn: merchantDetailApi,
  });
};

// 가맹점 상세 코드 조회
export const useMerchantDetailCode = ({ mchtCode }: { mchtCode: string }) => {
  return useQuery<IMerchantDetail>({
    queryKey: ["merchant_detailCode"],
    queryFn: () => merchantDetailCodeApi(mchtCode),
  });
};
