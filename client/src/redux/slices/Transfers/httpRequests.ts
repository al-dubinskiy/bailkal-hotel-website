import { RequestTypeHTTP } from "../../types";

export const getTransfers: RequestTypeHTTP = {
  url: "/api/transfers",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createTransfer: RequestTypeHTTP = {
  url: "/api/transfers",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateTransfer: RequestTypeHTTP = {
  url: "/api/transfers",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteTransfer: RequestTypeHTTP = {
  url: "/api/transfers",
  method: "DELETE" /* .../{id} */,
};
