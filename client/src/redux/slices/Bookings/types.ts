import { Moment } from "moment";

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
