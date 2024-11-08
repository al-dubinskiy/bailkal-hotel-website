// Local
export type CreateBookingTariffType = {
  title: string;
  description: string;
  included_breakfast: boolean;
  terms_сancellation: string;
  payment_method_id: string;
  included_services_id?: string[];
  paymentAndCancellationTerms?: string[];
  note?: string;
  byPromoCode: boolean;
};

export type UpdateBookingTariffType = CreateBookingTariffType;

export type BookingTariffType = CreateBookingTariffType & {
  id: string;
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
