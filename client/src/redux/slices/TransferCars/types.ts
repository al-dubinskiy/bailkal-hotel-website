// Local
export type CreateTransferCarType = {
  brand: string;
  model: string;
  seats_number: number;
  body_type: string;
};

export type UpdateTransferCarType = CreateTransferCarType;

export type TransferCarType = CreateTransferCarType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetTransferCarsApiResponseType = {
  success: boolean;
  data: TransferCarType[];
};

export type CreateTransferCarApiResponseType = {
  success: boolean;
  data: TransferCarType;
};

export type UpdateTransferCarApiResponseType = {
  success: boolean;
  data: TransferCarType;
};

export type DeleteTransferCarApiResponseType = {
  success: boolean;
  id: number;
};
