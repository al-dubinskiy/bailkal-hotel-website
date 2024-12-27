// Local
export type CreateRoomFeaturesCategoryType = {
  title: string;
};

export type RoomFeaturesCategoryType = CreateRoomFeaturesCategoryType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type UpdateRoomFeaturesCategoryType = RoomFeaturesCategoryType;

// API
export type GetRoomFeaturesCategoriesApiResponseType = {
  success: boolean;
  data: RoomFeaturesCategoryType[];
};

export type CreateRoomFeaturesCategoryApiResponseType = {
  success: boolean;
  data: RoomFeaturesCategoryType;
};

export type UpdateRoomFeaturesCategoryApiResponseType = {
  success: boolean;
  data: RoomFeaturesCategoryType;
};

export type DeleteRoomFeaturesCategoryApiResponseType = {
  success: boolean;
  id: string;
};
