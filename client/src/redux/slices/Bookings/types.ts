// Local
export type CreateBookingType = {
  room_id: number;
  user: {
    name: string;
    lastname: string;
    surname: string;
    phone: string;
    email: string;
  };
  adults_count: number;
  children_count: number;
  arrival_datetime: string;
  departure_datetime: string;
  tariff_id: number;
  service_id: number[];
  payment_method_id: number;
  bed_type_id: number;
  view_from_window_id: number;
  transfer_id: number;
  price: number;
};

export type BookingType = CreateBookingType & {
  id: number;
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
  id: number;
};
