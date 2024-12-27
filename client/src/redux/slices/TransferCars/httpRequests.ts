import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getTransferCars: RequestTypeHTTP = {
  url: baseUrl + "/api/transferCars",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createTransferCar: RequestTypeHTTP = {
  url: baseUrl + "/api/transferCars",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateTransferCar: RequestTypeHTTP = {
  url: baseUrl + "/api/transferCars",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteTransferCar: RequestTypeHTTP = {
  url: baseUrl + "/api/transferCars",
  method: "DELETE" /* .../{id} */,
};
