import { RequestTypeHTTP } from "../../types";

export const getViewsFromWindow: RequestTypeHTTP = {
  url: "/api/viewsFromWindow",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const createViewFromWindow: RequestTypeHTTP = {
  url: "/api/viewsFromWindow",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const updateViewFromWindow: RequestTypeHTTP = {
  url: "/api/viewsFromWindow",
  method: "PUT" /* .../{id} */,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const deleteViewFromWindow: RequestTypeHTTP = {
  url: "/api/viewsFromWindow",
  method: "DELETE" /* .../{id} */,
};
