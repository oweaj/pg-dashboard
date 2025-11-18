export interface IMerchantType {
  bizType: string;
  mchtCode: string;
  mchtName: string;
  status: string;
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

export interface IMerchantList {
  data: IMerchantType[];
  message: string;
  status: number;
}

export interface IMerchantDetail {
  data: IMerchantDetailType[];
  message: string;
  status: number;
}
