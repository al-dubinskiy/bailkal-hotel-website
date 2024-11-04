import { RequestTypeHTTP } from "../../types";

export const getPaymentMethods: RequestTypeHTTP = {
  url: "/api/paymentMethods",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createPaymentMethod: RequestTypeHTTP = {
  url: "/api/paymentMethods",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updatePaymentMethod: RequestTypeHTTP = {
  url: "/api/paymentMethods",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deletePaymentMethod: RequestTypeHTTP = {
  url: "/api/paymentMethods",
  method: "DELETE" /* .../{id} */,
};
