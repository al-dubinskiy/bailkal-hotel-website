// Local
export type CreateRoomFeatureType = {
  title: string;
  description?: string;
  category_id: string;
};

export type RoomFeatureType = CreateRoomFeatureType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type UpdateRoomFeatureType = RoomFeatureType;

// API
export type GetRoomFeaturesApiResponseType = {
  success: boolean;
  data: RoomFeatureType[];
};

export type CreateRoomFeatureApiResponseType = {
  success: boolean;
  data: RoomFeatureType;
};

export type UpdateRoomFeatureApiResponseType = {
  success: boolean;
  data: RoomFeatureType;
};

export type DeleteRoomFeatureApiResponseType = {
  success: boolean;
  id: string;
};
