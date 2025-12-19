import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers) => {
      // Get token from cookies if available
      const token =
        Cookies.get("token") || Cookies.get("auth-token") || Cookies.get("jwt");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Placeholder",
    "User",
    "Post",
    "Comment",
    "Todo",
    "Album",
    "Photo",
  ],
  endpoints: () => ({}),
});
