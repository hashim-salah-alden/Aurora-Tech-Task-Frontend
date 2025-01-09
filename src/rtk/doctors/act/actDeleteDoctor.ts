/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const actDeleteDoctor = createAsyncThunk<string, string>(
  "doctors/actDeleteDoctor",
  async (doctorId, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      console.log(doctorId);
      const res = await axios.delete(
        `https://aurora-tech-task-backend.onrender.com/doctors/${doctorId}`,
        {
          signal,
        }
      );
      return doctorId;
    } catch (error) {
      console.log(error);
      const errors = error as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        console.log(errors);
      }
      // do what you want with your axios error
      return rejectWithValue(errors.message);
    }
  }
);

export default actDeleteDoctor;
