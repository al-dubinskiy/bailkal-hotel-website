// Local
export type CreateUnavailableBookingDateType = {
  date: string;
};

export type UpdateUnavailableBookingDateType = CreateUnavailableBookingDateType;

export type UnavailableBookingDateType = CreateUnavailableBookingDateType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

// API
export type GetUnavailableBookingDatesApiResponseType = {
  success: boolean;
  data: UnavailableBookingDateType[];
};

export type CreateUnavailableBookingDateApiResponseType = {
  success: boolean;
  data: UnavailableBookingDateType;
};

export type UpdateUnavailableBookingDateApiResponseType = {
  success: boolean;
  data: UnavailableBookingDateType;
};

export type DeleteUnavailableBookingDateApiResponseType = {
  success: boolean;
  id: string;
};
