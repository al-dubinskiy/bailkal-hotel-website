// Local
export type CreateRoomType = {
  number: number;
};

export type RoomType = CreateRoomType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type UpdateRoomType = RoomType;

// API
export type GetRoomsApiResponseType = {
  success: boolean;
  data: RoomType[];
};

export type CreateRoomApiResponseType = {
  success: boolean;
  data: RoomType;
};

export type UpdateRoomApiResponseType = {
  success: boolean;
  data: RoomType;
};

export type DeleteRoomApiResponseType = {
  success: boolean;
  id: string;
};
