import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IMerchantState {
  requests: IMerchantData[];
  approved: IMerchantData[];
  error: Error | null;
}

export interface IMerchantData {
  id: string;
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

const initialState: IMerchantState = {
  approved: [],
  requests: [],
  error: null,
};

export const listApprovedMerchants = createAsyncThunk(
  "merchants",
  async (): Promise<IMerchantData[]> => {
    throw new Error("Failed to fetch merchants.");
    // TODO: implement this function to make request to backend and fetch results.
    return [];
  }
);

export const listMerchantsSlice = createSlice({
  name: "merchants",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listApprovedMerchants.fulfilled, (state, action) => {
        // add merchants to state
        state.approved = action.payload;
        state.error = null;
      })
      .addCase(listApprovedMerchants.rejected, (state, action) => {
        // add merchants to state
        state.error = new Error(action.error.message);
      }),
});

export default listMerchantsSlice.reducer;
