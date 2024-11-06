import { RequestTypeHTTP } from "../../types";

export const getTransferCars: RequestTypeHTTP = {
  url: "/api/transferCars",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createTransferCar: RequestTypeHTTP = {
  url: "/api/transferCars",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateTransferCar: RequestTypeHTTP = {
  url: "/api/transferCars",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteTransferCar: RequestTypeHTTP = {
  url: "/api/transferCars",
  method: "DELETE" /* .../{id} */,
};
