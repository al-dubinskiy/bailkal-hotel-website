// Local
export type CreateBedTypeType = {
  title: string;
  description: number;
};

export type UpdateBedTypeType = CreateBedTypeType;

export type BedTypeType = CreateBedTypeType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetBedTypesApiResponseType = {
  success: boolean;
  data: BedTypeType[];
};

export type CreateBedTypeApiResponseType = {
  success: boolean;
  data: BedTypeType;
};

export type UpdateBedTypeApiResponseType = {
  success: boolean;
  data: BedTypeType;
};

export type DeleteBedTypeApiResponseType = {
  success: boolean;
  id: number;
};
