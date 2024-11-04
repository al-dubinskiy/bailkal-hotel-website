import { RequestTypeHTTP } from "../../types";

export const getBookings: RequestTypeHTTP = {
  url: "/api/bookings",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBooking: RequestTypeHTTP = {
  url: "/api/bookings",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBooking: RequestTypeHTTP = {
  url: "/api/bookings",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBooking: RequestTypeHTTP = {
  url: "/api/bookings",
  method: "DELETE" /* .../{id} */,
};
