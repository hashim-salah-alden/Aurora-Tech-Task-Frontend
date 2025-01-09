import { createSlice } from "@reduxjs/toolkit";
import actGetSessions from "./act/actGetSessions";

export interface sessionsTypes {
  id: string;
  name: string;
  price: number;
}

export interface SessionsState {
  sessionsTypes: sessionsTypes[];
  loading: "idle" | "pending" | "succeeded" | "failed"; // Loading status
  sessionsTypesError: string | null | Record<string, unknown>; // Error handling
}

const initialState: SessionsState = {
  sessionsTypes: [],
  loading: "idle",
  sessionsTypesError: null,
};

const sessionsTypesSlice = createSlice({
  name: "sessionsTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all doctors
    builder.addCase(actGetSessions.pending, (state) => {
      state.loading = "pending";
      state.sessionsTypesError = null;
    });
    builder.addCase(actGetSessions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.sessionsTypes = action.payload;
    });
    builder.addCase(actGetSessions.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.sessionsTypesError = action.payload;
      }
    });
  },
});

export { actGetSessions };
// export const {  } = announcementsSlice.actions;
export default sessionsTypesSlice.reducer;
