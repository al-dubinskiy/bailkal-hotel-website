import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getUnavailableBookingDates: RequestTypeHTTP = {
  url: baseUrl + "/api/unavailableBookingDates",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createUnavailableBookingDate: RequestTypeHTTP = {
  url: baseUrl + "/api/unavailableBookingDates",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateUnavailableBookingDate: RequestTypeHTTP = {
  url: baseUrl + "/api/unavailableBookingDates",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteUnavailableBookingDate: RequestTypeHTTP = {
  url: baseUrl + "/api/unavailableBookingDates",
  method: "DELETE" /* .../{id} */,
};
