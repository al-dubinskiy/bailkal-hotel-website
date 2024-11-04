import { RequestTypeHTTP } from "../../types";

export const getBookingServices: RequestTypeHTTP = {
  url: "/api/bookingServices",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBookingService: RequestTypeHTTP = {
  url: "/api/bookingServices",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBookingService: RequestTypeHTTP = {
  url: "/api/bookingServices",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBookingService: RequestTypeHTTP = {
  url: "/api/bookingServices",
  method: "DELETE" /* .../{id} */,
};
