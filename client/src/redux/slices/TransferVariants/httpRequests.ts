import { RequestTypeHTTP } from "../../types";

export const getTransferVariants: RequestTypeHTTP = {
  url: "/api/transferVariants",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createTransferVariant: RequestTypeHTTP = {
  url: "/api/transferVariants",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateTransferVariant: RequestTypeHTTP = {
  url: "/api/transferVariants",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteTransferVariant: RequestTypeHTTP = {
  url: "/api/transferVariants",
  method: "DELETE" /* .../{id} */,
};
