import { RequestTypeHTTP } from "../../types";

export const getRoomRoomBedVariants: RequestTypeHTTP = {
  url: "/api/roomBedVariants",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomBedVariant: RequestTypeHTTP = {
  url: "/api/roomBedVariants",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomBedVariant: RequestTypeHTTP = {
  url: "/api/roomBedVariants",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomBedVariant: RequestTypeHTTP = {
  url: "/api/roomBedVariants",
  method: "DELETE" /* .../{id} */,
};
