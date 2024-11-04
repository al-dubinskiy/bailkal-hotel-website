// Local
export type CreateBookingServiceType = {
  title: string;
  price: number;
};

export type UpdateBookingServiceType = CreateBookingServiceType;

export type BookingServiceType = CreateBookingServiceType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetBookingServicesApiResponseType = {
  success: boolean;
  data: BookingServiceType[];
};

export type CreateBookingServiceApiResponseType = {
  success: boolean;
  data: BookingServiceType;
};

export type UpdateBookingServiceApiResponseType = {
  success: boolean;
  data: BookingServiceType;
};

export type DeleteBookingServiceApiResponseType = {
  success: boolean;
  id: number;
};
