export interface IMerchantList {
  bizType: string;
  mchtCode: string;
  mchtName: string;
  status: string;
}

export interface IMerchantDetail {
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
