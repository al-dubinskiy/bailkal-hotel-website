import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getBookingTariffs: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingTariffs",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBookingTariff: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingTariffs",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBookingTariff: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingTariffs",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBookingTariff: RequestTypeHTTP = {
  url: baseUrl + "/api/bookingTariffs",
  method: "DELETE" /* .../{id} */,
};
