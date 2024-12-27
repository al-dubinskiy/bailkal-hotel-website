// Local
export type BookedRoomType = {
  room_id: string;
  arrival_datetime: string;
  departure_datetime: string;
};

export type CreateRoomCategoryType = {
  title: string;
  description: string;
  feature_id: string[];
  guests_capacity: number;
  square: number;
  room_id: string[];
  price_per_night_for_one_quest: number;
  price_per_night_for_two_quest: number;
  discount: number;
  include_service_id: string[];
  available_bed_variant_id: string[];
  available_tariff_id: string[];
  main_view_from_room_window_id: string;
  additional_view_from_room_window_id: string[];
};

export type UpdateRoomCategoryType = CreateRoomCategoryType;

export type RoomCategoryType = CreateRoomCategoryType & {
  _id: string;
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
  id: string;
};
