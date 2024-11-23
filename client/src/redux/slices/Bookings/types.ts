// Local
export type BookingUserInfoType = {
  name: string;
  lastname: string;
  surname: string;
  phone: string;
  email: string;
};

export type CreateBookingType = {
  room_id: string;
  room_category_id: string;
  user: BookingUserInfoType;
  adults_count: number;
  childrens_count: number;
  arrival_datetime: string;
  departure_datetime: string;
  tariff_id: string;
  service_id: string[];
  bed_type_id?: string;
  view_from_window_id?: string;
  payment_method_id: string;
  transfer_id?: string;
  transfer_comment?: string;
  price: number;
};

export type BookingType = CreateBookingType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type UpdateBookingType = BookingType;

// API
export type GetBookingsApiResponseType = {
  success: boolean;
  data: BookingType[];
};

export type CreateBookingApiResponseType = {
  success: boolean;
  data: BookingType;
};

export type UpdateBookingApiResponseType = {
  success: boolean;
  data: BookingType;
};

export type DeleteBookingApiResponseType = {
  success: boolean;
  id: string;
};
