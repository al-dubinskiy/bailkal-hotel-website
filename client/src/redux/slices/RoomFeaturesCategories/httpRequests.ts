import { baseUrl } from "../../constants";
import { RequestTypeHTTP } from "../../types";

export const getRoomFeaturesCategories: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeaturesCategories",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createRoomFeaturesCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeaturesCategories",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateRoomFeaturesCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeaturesCategories",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteRoomFeaturesCategory: RequestTypeHTTP = {
  url: baseUrl + "/api/roomFeaturesCategories",
  method: "DELETE" /* .../{id} */,
};
