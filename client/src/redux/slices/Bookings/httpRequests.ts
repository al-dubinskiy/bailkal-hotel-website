import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getBookings: RequestTypeHTTP = {
  url: baseUrl + "/api/bookings",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBooking: RequestTypeHTTP = {
  url: baseUrl + "/api/bookings",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBooking: RequestTypeHTTP = {
  url: baseUrl + "/api/bookings",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBooking: RequestTypeHTTP = {
  url: baseUrl + "/api/bookings",
  method: "DELETE" /* .../{id} */,
};
