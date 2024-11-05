import { RequestTypeHTTP } from "../../types";

export const getRoomRoomBedTypes: RequestTypeHTTP = {
  url: "/api/roomBedTypes",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomBedType: RequestTypeHTTP = {
  url: "/api/roomBedTypes",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomBedType: RequestTypeHTTP = {
  url: "/api/roomBedTypes",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomBedType: RequestTypeHTTP = {
  url: "/api/roomBedTypes",
  method: "DELETE" /* .../{id} */,
};
