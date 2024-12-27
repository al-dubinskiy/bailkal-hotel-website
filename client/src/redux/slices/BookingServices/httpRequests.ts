import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getBookingServices: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingServices",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBookingService: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingServices",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBookingService: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingServices",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBookingService: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingServices",
  method: "DELETE" /* .../{id} */,
};
