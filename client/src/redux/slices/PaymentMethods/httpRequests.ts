import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getPaymentMethods: RequestTypeHTTP = {
  url: baseUrl + "/api/paymentMethods",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createPaymentMethod: RequestTypeHTTP = {
  url: baseUrl + "/api/paymentMethods",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updatePaymentMethod: RequestTypeHTTP = {
  url: baseUrl + "/api/paymentMethods",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deletePaymentMethod: RequestTypeHTTP = {
  url: baseUrl + "/api/paymentMethods",
  method: "DELETE" /* .../{id} */,
};
