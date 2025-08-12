import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../../utils/jwt.helper.js";

const backendUrlUser = "https://smart-transportaion-system.onrender.com/user";
const backendUrlStation = "https://smart-transportaion-system.onrender.com/station";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "Stations"],
  endpoints: (builder) => ({
    // Delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${backendUrlUser}/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Get all users
    getAllUsers: builder.query({
      query: () => `${backendUrlUser}/admin/get-all-user`,
      providesTags: ["Users"],
    }),

    // Get a single user
    getSingleUser: builder.query({
      query: (id) => `${backendUrlUser}/admin/getuser/${id}`,
      providesTags: ["Users"],
    }),

    // Update user role
    updateUserRole: builder.mutation({
      query: (id) => ({
        url: `${backendUrlUser}/admin/update-role`,
        method: "POST",
        body: { id },
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["Users"],
    }),

    // Create a station
    createStation: builder.mutation({
      query: (stations) => ({
        url: `${backendUrlStation}/admin/station-create`,
        method: "POST",
        body: stations,
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["Stations"],
    }),

    // Delete a station
    deleteStation: builder.mutation({
      query: (stationNames) => ({
        url: `${backendUrlStation}/admin/station-delete`,
        method: "DELETE",
        body: { station_names: stationNames },
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["Stations"],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserRoleMutation,
  useCreateStationMutation,
  useDeleteStationMutation,
} = adminApi;
