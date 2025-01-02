import { Moment } from "moment";
import { SelectItemType } from "../../../pages/components/shared/FormElements/CustomSelect";

// Local
export type BookingGuestsDetailsType = {
  name: string;
  lastname: string;
  surname: string;
  phone: string;
  email: string;
  nationality: SelectItemType;
  sendConfirmOnPhone: boolean;
  wantToKnowAboutSpecialOffersAndNews: boolean;
  arrivalTime: SelectItemType;
  departureTime: SelectItemType;
  comment: string;
  bookingForWhom: "for_yourself" | "for_another";
  paymentMethodId: string;
};

export type BookingGuestsDetailsPrimitiveType = {
  name: string;
  lastname: string;
  surname: string;
  phone: string;
  email: string;
  nationality: string;
  sendConfirmOnPhone: boolean;
  wantToKnowAboutSpecialOffersAndNews: boolean;
  arrivalTime: string;
  departureTime: string;
  comment: string;
  bookingForWhom: "for_yourself" | "for_another";
  paymentMethodId: string;
};

export type BookingUserInfoType = {
  name: string;
  lastname: string;
  surname: string;
  phone: string;
  email: string;
  nationality: string;
  send_confirm_on_phone: boolean;
  want_to_know_about_special_offers_and_news: boolean;
};

export type BookingDateTimeType = {
  arrival_datetime: Moment;
  departure_datetime: Moment;
};

export type CreateBookingType = {
  room_id: string;
  room_category_id: string;
  user: BookingUserInfoType;
  adults_count: number;
  children_count: number;
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
  comment?: string;
  booking_for_whom: "for_yourself" | "for_another";
};

export type BookingType = CreateBookingType & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type UpdateBookingType = BookingType;

/* --- Booking page --- */
export type CreateBookingLocalType = CreateBookingType & {
  tempId: string;
  roomPrice: number;
  tariffPrice: number;
  servicePriceTotal: number;
  transferPrice: number;
  isRoomCategoryWasChanged: boolean;
};

type ActionType = "addRooms" | "removeRooms" | "";

export type NewBookingsType = {
  bookings: CreateBookingLocalType[];
  actionType: ActionType;
};

export type BookingStepNameType =
  | "Select a room"
  | "Select a tariff"
  | "Order services"
  | "Enter guest details"
  | "";

// Filters bar
export type RoomGuestsCountType = {
  id: string;
  adults: number;
  children: number;
};

export type FiltersParamsType = {
  arrival_datetime: Moment;
  departure_datetime: Moment;
  rooms: RoomGuestsCountType[];
};

export type BookingStepType = {
  roomId: string;
  name: BookingStepNameType;
  isCurrent: boolean;
  isComplete: boolean;
};

export type RoomCategoryPriceType = {
  id: string;
  roomsTotal: number;
  earlyBookingsCount: number;
  newBookingsIds: string[];
  price: number;
};

// API
export type GetBookingsApiResponseType = {
  success: boolean;
  data: BookingType[];
};

export type CreateBookingApiResponseType = {
  success: boolean;
  data: BookingType[];
};

export type UpdateBookingApiResponseType = {
  success: boolean;
  data: BookingType;
};

export type DeleteBookingApiResponseType = {
  success: boolean;
  id: string;
};
