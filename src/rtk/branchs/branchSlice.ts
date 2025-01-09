import { createSlice } from "@reduxjs/toolkit";
import { Schedules } from "../doctors/doctorsSlice";
import actGetBranchs from "./act/actGetBranchs";

export interface Branchs {
  id: string;
  name: string;
  location?: string;
  schedules: Schedules[];
}

export interface BranchsState {
  branchs: Branchs[];
  loading: "idle" | "pending" | "succeeded" | "failed"; // Loading status
  branchsError: string | null | Record<string, unknown>; // Error handling
}

const initialState: BranchsState = {
  branchs: [],
  loading: "idle",
  branchsError: null,
};

const branchsSlice = createSlice({
  name: "branchs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all doctors
    builder.addCase(actGetBranchs.pending, (state) => {
      state.loading = "pending";
      state.branchsError = null;
    });
    builder.addCase(actGetBranchs.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.branchs = action.payload;
    });
    builder.addCase(actGetBranchs.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.branchsError = action.payload;
      }
    });
  },
});

export { actGetBranchs };
// export const {  } = announcementsSlice.actions;
export default branchsSlice.reducer;
