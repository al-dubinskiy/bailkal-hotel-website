export type RequestTypeHTTP = {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  headers?: {
    "Content-Type"?:
      | "application/json"
      | "multipart/form-data"
      | "text/html; charset=UTF-8";
    Accept?: "application/json";
    Authorization?: string;
  };
};
