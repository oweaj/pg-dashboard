// 거래 리스트 반환
export interface IPaymentList {
  data: IPaymentType[];
  message: string;
  status: number;
}

export interface IPaymentType {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

// 공통 결제 상태 코드 반환
export interface IPaymentCommonStatus {
  data: IPaymentCommonStatusType[];
  status: number;
  message: string;
}

export interface IPaymentCommonStatusType {
  code: string;
  description: string;
}

// 공통 결제 수단 코드 반환
export interface IPaymentCommon {
  data: IPaymentCommonType[];
  status: number;
  message: string;
}

export interface IPaymentCommonType {
  type: string;
  description: string;
}
