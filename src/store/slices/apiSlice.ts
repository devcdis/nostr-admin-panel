import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: update data for merchants and relays based on response from api
interface IMerchantData {
  id: number;
  pubkey: string;
  name: string;
  description: string;
  pricing: string;
  contact_details: Record<string, string>;
  latitude: number;
  longitude: number;
  balance: number;
  advertised_on?: Date;
  approved_at?: Date;
}

interface IRelayData {
  id: number;
  pubkey: string;
  name: string;
  description: string;
  pricing: string;
  contact_details: Record<string, string>;
  latitude: number;
  longitude: number;
  balance: number;
  advertised_on?: Date;
  approved_at?: Date;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders(headers) {
      // TODO: set api headers here.
      // headers.set("", "");
      return headers;
    },
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
        query: () => "/relays/requests",
      }),
      acceptMerchantRequest: builder.mutation<IMerchantData, number>({
        query: (id) => ({
          url: `/merchants/requests/accept`,
          method: "POST",
          body: { id: id },
        }),
      }),
      declineMerchantRequest: builder.mutation<IMerchantData, number>({
        query: (id) => ({
          url: `/merchants/requests/decline`,
          method: "POST",
          body: { id: id },
        }),
      }),
      deleteMerchant: builder.mutation<IMerchantData, number>({
        query: (id) => ({
          url: `/merchants`,
          method: "DELETE",
          body: { id: id },
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
} = apiSlice;
