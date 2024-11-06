// Local
export type CreatePaymentMethodType = {
  title: string;
  description: number;
  paymentSystems?: string[];
  payment_then_caption?: string;
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
