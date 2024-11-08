// Local
export type CreateRoomBedVariantType = {
  title: string;
  description?: string;
};

export type UpdateRoomBedVariantType = CreateRoomBedVariantType;

export type RoomBedVariantType = CreateRoomBedVariantType & {
  id: string;
  created_at: string;
  updated_at: string;
};

// API
export type GetRoomRoomBedVariantsApiResponseType = {
  success: boolean;
  data: RoomBedVariantType[];
};

export type CreateRoomBedVariantApiResponseType = {
  success: boolean;
  data: RoomBedVariantType;
};

export type UpdateRoomBedVariantApiResponseType = {
  success: boolean;
  data: RoomBedVariantType;
};

export type DeleteRoomBedVariantApiResponseType = {
  success: boolean;
  id: string;
};
