// Local
export type CreateViewFromWindowType = {
  title: string;
  description: number;
};

export type UpdateViewFromWindowType = CreateViewFromWindowType;

export type ViewFromWindowType = CreateViewFromWindowType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetViewsFromWindowApiResponseType = {
  success: boolean;
  data: ViewFromWindowType[];
};

export type CreateViewFromWindowApiResponseType = {
  success: boolean;
  data: ViewFromWindowType;
};

export type UpdateViewFromWindowApiResponseType = {
  success: boolean;
  data: ViewFromWindowType;
};

export type DeleteViewFromWindowApiResponseType = {
  success: boolean;
  id: number;
};
