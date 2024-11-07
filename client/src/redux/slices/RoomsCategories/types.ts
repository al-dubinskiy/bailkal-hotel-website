// Local
export type CreateRoomCategoryType = {
  title: string;
  description: string;
  feature_id: number[];
  guests_capacity: number;
  square: number;
  room_id: [number];
  price_per_night_for_one_quest: number;
  price_per_night_for_two_quest: number;
};

export type UpdateRoomCategoryType = CreateRoomCategoryType;

export type RoomCategoryType = CreateRoomCategoryType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetRoomsCategoriesApiResponseType = {
  success: boolean;
  data: RoomCategoryType[];
};

export type CreateRoomCategoryApiResponseType = {
  success: boolean;
  data: RoomCategoryType;
};

export type UpdateRoomCategoryApiResponseType = {
  success: boolean;
  data: RoomCategoryType;
};

export type DeleteRoomCategoryApiResponseType = {
  success: boolean;
  id: number;
};
