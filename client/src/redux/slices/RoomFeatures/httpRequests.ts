import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getRoomFeatures: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeatures",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomFeature: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeatures",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomFeature: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeatures",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomFeature: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeatures",
  method: "DELETE" /* .../{id} */,
};
