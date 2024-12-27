import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getRoomsCategories: RequestTypeHTTP = {
  url: baseUrl + "/api/roomsCategories",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomsCategories",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomsCategories",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomsCategories",
  method: "DELETE" /* .../{id} */,
};
