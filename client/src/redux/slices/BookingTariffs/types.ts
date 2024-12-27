// Local
export type CreateBookingTariffType = {
  title: string;
  description: string;
  included_breakfast: boolean;
  terms_сancellation: string;
  payment_method_id: string[];
  included_services?: string[];
  payment_and_cancellation_terms?: string[];
  note?: string;
  byPromoCode: boolean;
  cost: number;
  discount: number;
};

export type UpdateBookingTariffType = CreateBookingTariffType;

export type BookingTariffType = CreateBookingTariffType & {
  _id: string;
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
  id: string;
};
