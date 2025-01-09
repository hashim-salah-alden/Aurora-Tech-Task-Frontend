'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";

import { actGetDoctors } from "@/rtk/doctors/doctorsSlice";


const useDoctors = () => {
  const { doctors, loading, doctorsError } = useAppSelector((state) => state.Doctors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(actGetDoctors());
    return () => {
      // cleadup fn here

      // to cansle unnecessary requests in background
      promise.abort();
    }
  }, [dispatch])

  return { doctors, loading, doctorsError }
}

export default useDoctors