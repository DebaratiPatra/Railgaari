import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from "../../utils/jwt.helper.js";

const baseUrl = "https://smart-transportaion-system.onrender.com";

export const stationApi = createApi({
    reducerPath: 'stationApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = await getAccessToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getShortestPath: builder.mutation({
            query: ({ source, destination }) => ({
                url: `/station/get-route`,
                method: 'POST',
                body: { source, destination },
            }),
        }),
        getStation: builder.query({
            query: (stationName) => `/station/get-station-database-details/${stationName}`,
        }),
        getAllStations: builder.query({
            query: () => `/station/get-all-stations`,
        }),
        getTrainStatus: builder.query({
            query: (trainNo) => `/station/get-train-details?trainNo=${trainNo}`,
        }),
        getAvailableTrainsBtwn: builder.mutation({
            query: (credentials) => ({
                url: `/station/get-train-between`,
                method: 'POST',
                body: credentials,
            }),
        }),
        getLRUTrains: builder.query({
            query: () => `/user/get-lru-trains`,
        }),
        setLRUTrains: builder.mutation({
            query: (train) => ({
                url: `/user/set-lru-trains`,
                method: 'POST',
                body: { train },
            }),
        }),
    }),
});

export const {
    useGetShortestPathMutation,
    useGetStationQuery,
    useGetAllStationsQuery,
    useGetTrainStatusQuery,
    useGetAvailableTrainsBtwnMutation,
    useGetLRUTrainsQuery,
    useSetLRUTrainsMutation,
} = stationApi;
