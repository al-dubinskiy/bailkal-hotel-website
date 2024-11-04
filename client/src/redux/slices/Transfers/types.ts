// Local
export type CreateTransferType = {
  title: string;
  description: number;
};

export type UpdateTransferType = CreateTransferType;

export type TransferType = CreateTransferType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetTransfersApiResponseType = {
  success: boolean;
  data: TransferType[];
};

export type CreateTransferApiResponseType = {
  success: boolean;
  data: TransferType;
};

export type UpdateTransferApiResponseType = {
  success: boolean;
  data: TransferType;
};

export type DeleteTransferApiResponseType = {
  success: boolean;
  id: number;
};
