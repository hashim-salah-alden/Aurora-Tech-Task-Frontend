import { createSlice } from "@reduxjs/toolkit";
import actGetDoctors from "./act/actGetDoctors";
import actDeleteDoctor from "./act/actDeleteDoctor";
import actAddDoctor from "./act/actAddDoctor";

export interface Schedules {
  id: string;
  doctorId: string;
  branchId: string;
  startingTime: Date;
  endingTime: Date;
  workingWeekdays: string[];
}

export interface Doctors {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  doctorImage: string;
  schedules: Schedules[];
}

export interface DoctorsState {
  doctors: Doctors[];
  loading: "idle" | "pending" | "succeeded" | "failed"; // Loading status
  doctorsError: string | null | Record<string, unknown>; // Error handling
}

const initialState: DoctorsState = {
  doctors: [],
  loading: "idle",
  doctorsError: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add doctor
    builder.addCase(actAddDoctor.pending, (state) => {
      state.loading = "pending";
      state.doctorsError = null;
    });
    builder.addCase(actAddDoctor.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.doctors.push(action.payload.data);
    });
    builder.addCase(actAddDoctor.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.doctorsError = action.payload;
      }
    });

    //get all doctors
    builder.addCase(actGetDoctors.pending, (state) => {
      state.loading = "pending";
      state.doctorsError = null;
    });
    builder.addCase(actGetDoctors.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.doctors = action.payload;
    });
    builder.addCase(actGetDoctors.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.doctorsError = action.payload;
      }
    });

    // delete doctor
    builder.addCase(actDeleteDoctor.pending, (state) => {
      state.loading = "pending";
      state.doctorsError = null;
    });
    builder.addCase(actDeleteDoctor.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.doctors = state.doctors.filter(
        (doctor) => doctor.id !== action.payload
      );
    });
    builder.addCase(actDeleteDoctor.rejected, (state, action) => {
      state.loading = "failed";
      if (typeof action.payload === "string") {
        state.doctorsError = action.payload;
      }
    });
  },
});

export { actGetDoctors, actDeleteDoctor, actAddDoctor };
// export const {  } = announcementsSlice.actions;
export default doctorsSlice.reducer;
