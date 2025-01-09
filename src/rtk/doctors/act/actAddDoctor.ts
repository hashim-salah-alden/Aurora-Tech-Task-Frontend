import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Schedules {
  branchId: string;
  startingTime: string;
  endingTime: string;
  workingWeekdays: string[];
}

interface DoctorData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  schedules: Schedules[];
}

// Define the expected structure of the API error response
interface ErrorResponse {
  message?: string[]; // Assuming `message` is an array based on your code
}

const actAddDoctor = createAsyncThunk(
  "doctors/actAddDoctor",
  async (doctorData: DoctorData, thunkAPI) => {
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
      if (axios.isAxiosError(error)) {
        // Type the error response explicitly
        const axiosError = error as AxiosError<ErrorResponse>;

        // Safely access the message
        const errorMessage = axiosError.response?.data?.message?.[0] || "An error occurred";

        toast.error(errorMessage);

        return rejectWithValue(errorMessage);
      } else {
        // Handle generic Error
        const genericError = error as Error;
        console.error(genericError.message);
        toast.error("An unexpected error occurred");
        return rejectWithValue(genericError.message);
      }
    }
  }
);

export default actAddDoctor;
