import { RequestTypeHTTP } from "../../types";

export const getRoomsCategories: RequestTypeHTTP = {
  url: "/api/roomsCategories",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomCategory: RequestTypeHTTP = {
  url: "/api/roomsCategories",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomCategory: RequestTypeHTTP = {
  url: "/api/roomsCategories",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomCategory: RequestTypeHTTP = {
  url: "/api/roomsCategories",
  method: "DELETE" /* .../{id} */,
};
