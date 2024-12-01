import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getViewsFromRoomWindow: RequestTypeHTTP = {
  url: baseUrl + "/api/viewsFromRoomWindow",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createViewFromRoomWindow: RequestTypeHTTP = {
  url: baseUrl + "/api/viewsFromRoomWindow",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateViewFromRoomWindow: RequestTypeHTTP = {
  url: baseUrl + "/api/viewsFromRoomWindow",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteViewFromRoomWindow: RequestTypeHTTP = {
  url: baseUrl + "/api/viewsFromRoomWindow",
  method: "DELETE" /* .../{id} */,
};
