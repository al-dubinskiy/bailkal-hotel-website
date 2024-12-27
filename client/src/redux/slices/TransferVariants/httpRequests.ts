import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getTransferVariants: RequestTypeHTTP = {
  url: baseUrl + "/api/transferVariants",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createTransferVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/transferVariants",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateTransferVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/transferVariants",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteTransferVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/transferVariants",
  method: "DELETE" /* .../{id} */,
};
