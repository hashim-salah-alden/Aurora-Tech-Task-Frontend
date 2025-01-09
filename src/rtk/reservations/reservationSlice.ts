import { createSlice } from "@reduxjs/toolkit";
import actGetReservations from "./act/actGetReservations";
import actAddReservation from "./act/actAddReservation";
import { Branchs } from "../branchs/branchSlice";
import { Doctors } from "../doctors/doctorsSlice";
import { sessionsTypes } from "../sessionsTypes/sessionsTypesSlice";

export interface Reservation {
  id: string;
  sessionTypeId: string;
  date: string;
  branchId: string;
  time: string;
  doctorId: string;
  branch: Branchs[];
  doctor: Doctors[]; // This will be populated from the doctor API endpoint
  sessionType: sessionsTypes[];
}

export interface ReservationsState {
  reservations: Reservation[];
  loading: "idle" | "pending" | "succeeded" | "failed"; // Loading status
  reservationsError: string | null | Record<string, unknown>; // Error handling
}

const initialState: ReservationsState = {
  reservations: [],
  loading: "idle",
  reservationsError: null,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    cleanReservation: (state) => {
      state.reservations = [];
    },
  },
  extraReducers: (builder) => {
    //add reservation
    builder.addCase(actAddReservation.pending, (state) => {
      state.loading = "pending";
      state.reservationsError = null;
    });
    builder.addCase(actAddReservation.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.reservations.push(action.payload.data);
    });
    builder.addCase(actAddReservation.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.reservationsError = action.payload;
      }
    });

    //get all doctors
    builder.addCase(actGetReservations.pending, (state) => {
      state.loading = "pending";
      state.reservationsError = null;
    });
    builder.addCase(actGetReservations.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.reservations = action.payload;
    });
    builder.addCase(actGetReservations.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.reservationsError = action.payload;
      }
    });
  },
});

export { actGetReservations, actAddReservation };
export const { cleanReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;
