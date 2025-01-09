import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Define a type for reservation data (adjust according to your API's requirements)
interface ReservationData {
  doctorId: string;
  patientName: string;
  timeSlot: string;
  // other fields...
}

const actAddReservation = createAsyncThunk(
  "reservations/actAddReservation",

  async (reservationData: ReservationData, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    console.log(reservationData);
    try {
      const res = await axios.post(
        "https://aurora-tech-task-backend.onrender.com/reservation",
        reservationData,
        {
          signal,
        }
      );
      return res.data;
    } catch (error: unknown) {
      // Narrow down the error type
      const errors = error as AxiosError | Error;

      // Check if the error is an AxiosError
      if (axios.isAxiosError(errors)) {
        if (errors.response) {
          // If it's an AxiosError, and the response contains data, show the error message
          toast.error(errors.response.data.message[0]);
        } else {
          // If no response, show a generic network error
          toast.error("Network error or server unavailable");
        }
      } else {
        // If it's not an Axios error, log it and show a generic error
        console.error(errors);
        toast.error("An unexpected error occurred");
      }

      // Return the error message to be handled in the reducer
      return rejectWithValue(errors.message);
    }
  }
);

export default actAddReservation;


