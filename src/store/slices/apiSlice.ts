import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: update data for merchants and relays based on response from api
export interface IMerchantData {
  pubkey: string;
    name: string,
    description: string,
    pricing: string,
    contact_details: Record<string, string | number>,
    latitude: number,
    longitude: number,
    balance: number,
    advertisedOn?: string,
    approvedTill?: string
}

export interface IRelayData {
  pubkey: string;
  name: string;
  url: string;
  pricing: string;
  description: string;
  contactDetails: Record<string, string | number>;
  latitude: number;
  longitude: number;
  locationFormat: string;
  approvedAt: Date;
}

export interface IRelayIDResponse{
  id: string;
}

export const apiSlice = createApi({
  keepUnusedDataFor:10,
  reducerPath: "api",
  refetchOnFocus:true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders(headers) {
      headers.set("content-type", "application/json")
      return headers;
    },
    keepalive: false,
    cache: "no-cache",
  }),
  endpoints(builder) {
    return {
      listMerchants: builder.query<IMerchantData[], void>({
        query: () => "/merchants",
      }),
      listMerchantRequests: builder.query<IMerchantData[], void>({
        query: () => "/merchants/requests",
      }),
      listRelays: builder.query<IRelayData[], void>({
        query: () => "/relays",
      }),
      listRelayRequests: builder.query<IRelayData[], void>({
        query: () => "/relay-requests",
      }),
      deleteRelay: builder.mutation<IRelayIDResponse, string>({
        query: (pubkey) => ({
          url: `/relays/${pubkey}`,
          method: "DELETE"
        }),
      }),
      acceptRelayRequest: builder.mutation<
      IRelayIDResponse,
        string
      >({
        query: (pubkey) => ({
          url: `/relay-requests/accept/${pubkey}`,
          method: "POST"
        }),
      }),
      declineRelayRequest: builder.mutation<
      IRelayIDResponse,
      string
    >({
      query: (pubkey) => ({
        url: `/relay-requests/decline/${pubkey}`,
        method: "POST"
      }),
    }),
      acceptMerchantRequest: builder.mutation<
      IRelayIDResponse,
        { pubkey: string; approved_till: string; balance: number }
      >({
        query: (data) => ({
          url: `/merchants/accept`,
          method: "POST",
          body: data,
        }),
      }),
      declineMerchantRequest: builder.mutation<IRelayIDResponse, string>({
        query: (pubkey) => ({
          url: `/merchants/decline/${pubkey}`,
          method: "POST"
        }),
      }),
      deleteMerchant: builder.mutation<IMerchantData, IRelayIDResponse>({
        query: (pubkey) => ({
          url: `/merchants/${pubkey}`,
          method: "DELETE"
        }),
      }),
      editMerchant: builder.mutation<
      IRelayIDResponse,
        { pubkey: string; balance: number; approved_till: string }
      >({
        query: (data) => ({
          url: `/merchants`,
          method: "POST",
          body: data,
        }),
      }),
    };
  },
});

export const {
  useListMerchantsQuery,
  useListMerchantRequestsQuery,
  useListRelaysQuery,
  useListRelayRequestsQuery,
  useAcceptMerchantRequestMutation,
  useDeclineMerchantRequestMutation,
  useDeleteRelayMutation,
  useAcceptRelayRequestMutation,
  useDeclineRelayRequestMutation
} = apiSlice;
