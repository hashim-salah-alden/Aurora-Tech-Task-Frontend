import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const actGetReservations = createAsyncThunk(
  "reservations/actGetReservations",
  async (todayDate: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const res = await axios.get(
        `https://aurora-tech-task-backend.onrender.com/reservation?today=${todayDate}`,
        {
          signal,
        }
      );
      return res.data.data;
    } catch (error) {
      const errors = error as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        console.log(errors);
      }
      // do what you want with your axios error
      return rejectWithValue(errors.message);
    }
  }
);

export default actGetReservations;
