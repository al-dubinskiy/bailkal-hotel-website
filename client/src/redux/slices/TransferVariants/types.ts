// Local
export type CreateTransferVariantType = {
  from_hotel: boolean;
  to_hotel: boolean;
  price: number;
  car_id: Boolean;
};

export type UpdateTransferVariantType = CreateTransferVariantType;

export type TransferVariantType = CreateTransferVariantType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetTransferVariantsApiResponseType = {
  success: boolean;
  data: TransferVariantType[];
};

export type CreateTransferVariantApiResponseType = {
  success: boolean;
  data: TransferVariantType;
};

export type UpdateTransferVariantApiResponseType = {
  success: boolean;
  data: TransferVariantType;
};

export type DeleteTransferVariantApiResponseType = {
  success: boolean;
  id: number;
};
