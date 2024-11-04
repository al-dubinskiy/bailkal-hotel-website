// Local
export type CreateBookingTariffType = {
  title: string;
  description: string;
  included_breakfast: boolean;
  terms_сancellation: string;
  price_per_night: number;
  payment_method_id: number;
};

export type UpdateBookingTariffType = CreateBookingTariffType;

export type BookingTariffType = CreateBookingTariffType & {
  id: number;
  created_at: string;
  updated_at: string;
};

// API
export type GetBookingTariffsApiResponseType = {
  success: boolean;
  data: BookingTariffType[];
};

export type CreateBookingTariffApiResponseType = {
  success: boolean;
  data: BookingTariffType;
};

export type UpdateBookingTariffApiResponseType = {
  success: boolean;
  data: BookingTariffType;
};

export type DeleteBookingTariffApiResponseType = {
  success: boolean;
  id: number;
};
