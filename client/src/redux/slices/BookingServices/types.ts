// Local
export type CreateBookingServiceType = {
  title: string;
  description?: string;
  value: string;
  price: number;
  isPricePerNight: boolean;
  forGuestsNumber: string;
  isCanOrderSeveral: boolean;
};

export type UpdateBookingServiceType = CreateBookingServiceType;

export type BookingServiceType = CreateBookingServiceType & {
  _id: string;
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
  id: string;
};
