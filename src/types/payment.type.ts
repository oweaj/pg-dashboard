export interface IPaymentType {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

export interface IPaymentList {
  data: IPaymentType[];
  message: string;
  status: number;
}
