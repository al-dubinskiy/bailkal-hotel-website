import { RequestTypeHTTP } from "../../types";

export const getRooms: RequestTypeHTTP = {
  url: "/api/rooms",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoom: RequestTypeHTTP = {
  url: "/api/rooms",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoom: RequestTypeHTTP = {
  url: "/api/rooms",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoom: RequestTypeHTTP = {
  url: "/api/rooms",
  method: "DELETE" /* .../{id} */,
};
