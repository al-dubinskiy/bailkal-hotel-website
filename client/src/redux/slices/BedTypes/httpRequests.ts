import { RequestTypeHTTP } from "../../types";

export const getBedTypes: RequestTypeHTTP = {
  url: "/api/bedTypes",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createBedType: RequestTypeHTTP = {
  url: "/api/bedTypes",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateBedType: RequestTypeHTTP = {
  url: "/api/bedTypes",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteBedType: RequestTypeHTTP = {
  url: "/api/bedTypes",
  method: "DELETE" /* .../{id} */,
};
