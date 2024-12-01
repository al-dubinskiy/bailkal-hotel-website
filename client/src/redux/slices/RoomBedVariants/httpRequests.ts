import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getRoomRoomBedVariants: RequestTypeHTTP = {
  url: baseUrl + "/api/roomBedVariants",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomBedVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/roomBedVariants",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomBedVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/roomBedVariants",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomBedVariant: RequestTypeHTTP = {
  url: baseUrl + "/api/roomBedVariants",
  method: "DELETE" /* .../{id} */,
};
