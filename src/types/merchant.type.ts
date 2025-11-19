// 가맹점 목록 반환
export interface IMerchantList {
  data: IMerchantListType[];
  message: string;
  status: number;
}

export interface IMerchantListType {
  bizType: string;
  mchtCode: string;
  mchtName: string;
  status: string;
}

// 가맹점 상세 반환
export interface IMerchantDetail {
  data: IMerchantDetailType[];
  message: string;
  status: number;
}

export interface IMerchantDetailType {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

// 공통 가맹점 상태 코드 반환
export interface IMerchantCommon {
  data: IMerchantCommonStatus[];
  status: number;
  message: string;
}

export interface IMerchantCommonStatus {
  code: string;
  description: string;
}
