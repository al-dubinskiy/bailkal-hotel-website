// Local
export type CreateViewFromRoomWindowType = {
  title: string;
  description: number;
};

export type UpdateViewFromRoomWindowType = CreateViewFromRoomWindowType;

export type ViewFromRoomWindowType = CreateViewFromRoomWindowType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetViewsFromRoomWindowApiResponseType = {
  success: boolean;
  data: ViewFromRoomWindowType[];
};

export type CreateViewFromRoomWindowApiResponseType = {
  success: boolean;
  data: ViewFromRoomWindowType;
};

export type UpdateViewFromRoomWindowApiResponseType = {
  success: boolean;
  data: ViewFromRoomWindowType;
};

export type DeleteViewFromRoomWindowApiResponseType = {
  success: boolean;
  id: number;
};
