// Local
export type CreateRoomBedTypeType = {
  title: string;
  description: number;
};

export type UpdateRoomBedTypeType = CreateRoomBedTypeType;

export type RoomBedTypeType = CreateRoomBedTypeType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetRoomRoomBedTypesApiResponseType = {
  success: boolean;
  data: RoomBedTypeType[];
};

export type CreateRoomBedTypeApiResponseType = {
  success: boolean;
  data: RoomBedTypeType;
};

export type UpdateRoomBedTypeApiResponseType = {
  success: boolean;
  data: RoomBedTypeType;
};

export type DeleteRoomBedTypeApiResponseType = {
  success: boolean;
  id: number;
};
