import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const actAddDoctor = createAsyncThunk(
  "doctors/actAddDoctor",

  async (doctorData, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    console.log(doctorData);
    try {
      const res = await axios.post(
        "https://aurora-tech-task-backend.onrender.com/doctors",
        doctorData,
        {
          signal,
        }
      );
      console.log(res);
      return res.data;
    } catch (error: unknown) {
      const errors = error as Error | AxiosError;
      toast.error(errors.response.data.message[0]);
      if (!axios.isAxiosError(error)) {
        console.log(errors);
      }
      // do what you want with your axios error

      return rejectWithValue(errors.message);
    }
  }
);

export default actAddDoctor;
