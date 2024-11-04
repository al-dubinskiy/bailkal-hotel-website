// Local
export type CreatePaymentMethodType = {
  title: string;
  description: number;
};

export type UpdatePaymentMethodType = CreatePaymentMethodType;

export type PaymentMethodType = CreatePaymentMethodType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetPaymentMethodsApiResponseType = {
  success: boolean;
  data: PaymentMethodType[];
};

export type CreatePaymentMethodApiResponseType = {
  success: boolean;
  data: PaymentMethodType;
};

export type UpdatePaymentMethodApiResponseType = {
  success: boolean;
  data: PaymentMethodType;
};

export type DeletePaymentMethodApiResponseType = {
  success: boolean;
  id: number;
};
