// Local
export type CreateBookingTariffType = {
  title: string;
  description: string;
  included_breakfast: boolean;
  terms_сancellation: string;
  payment_method_id: number;
  included_services?: string[];
  paymentAndCancellationTerms?: string[];
  note?: string;
  byPromoCode: boolean;
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
