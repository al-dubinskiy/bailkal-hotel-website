// Local
export type CreateTransferVariantType = {
  from_hotel: boolean;
  to_hotel: boolean;
  time_from: string;
  time_to: string;
  price: number;
  car_id: string;
  comment: string;
};

export type UpdateTransferVariantType = CreateTransferVariantType;

export type TransferVariantType = CreateTransferVariantType & {
  _id: string;
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
  id: string;
};
