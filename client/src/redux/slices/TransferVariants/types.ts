// Local
export type CreateTransferVariantType = {
  title: string;
  description: number;
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
