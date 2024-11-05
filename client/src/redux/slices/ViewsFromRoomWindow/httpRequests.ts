import { RequestTypeHTTP } from "../../types";

export const getViewsFromRoomWindow: RequestTypeHTTP = {
  url: "/api/viewsFromRoomWindow",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createViewFromRoomWindow: RequestTypeHTTP = {
  url: "/api/viewsFromRoomWindow",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateViewFromRoomWindow: RequestTypeHTTP = {
  url: "/api/viewsFromRoomWindow",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteViewFromRoomWindow: RequestTypeHTTP = {
  url: "/api/viewsFromRoomWindow",
  method: "DELETE" /* .../{id} */,
};
