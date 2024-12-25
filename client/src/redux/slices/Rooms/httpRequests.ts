import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getRooms: RequestTypeHTTP = {
  url: baseUrl + "/api/rooms",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoom: RequestTypeHTTP = {
  url: baseUrl + "/api/rooms",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoom: RequestTypeHTTP = {
  url: baseUrl + "/api/rooms",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoom: RequestTypeHTTP = {
  url: baseUrl + "/api/rooms",
  method: "DELETE" /* .../{id} */,
};
